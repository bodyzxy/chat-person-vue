
import {useMsgStore} from "@/store/msg"
import {userInfo} from "@/store/user";
import { useChatOptionsStore } from "@/store/options";
import type { ChatDTO } from "./dto";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { BASE_URL } from "@/http/config";
import { ChatApi } from "./common";
import { ref } from "vue";
import { addData, openDB } from "./db/indexedDB";
import { request } from "@/http";
class FatalError extends Error {}
class RetriableError extends Error {}

export const isSending = ref(false) //是否禁止发送

//流式对话
export const streamChatApi = async(input: string, databaseInfo: string) => {

    const user_info = userInfo();
    const chatMessageStore = useMsgStore();
    const chatOptions = useChatOptionsStore();

    isSending.value = true
    //添加用户提问
    chatMessageStore.saveMessage({
        sender: user_info.getUserName,
        content: input
    });


    const sender = user_info.getUserName

    const userMessage = { sender, content: input}
    //TODO:加到前端数据库以activeKey命名
    openDB(databaseInfo, 1, databaseInfo, "id", ['sender', 'content']).then((db) => {
        console.log("准备装入数据库!",db);
        addData(db, databaseInfo, userMessage);
    }).catch((err) => {
        console.log('#数据库写入失败',err);
    });


    const dto: ChatDTO = {
        messages: chatMessageStore.getGlobalMessage.map(({ id, ...rest }) => rest),
        chatOptions: chatOptions.getChatOptions,
        prompt: input
    };

    const ctrl = new AbortController();

    //添加当前AI回复
    //TODO: 添加到对应的数据库中
    // eslint-disable-next-line prefer-const
    let answer = "";
    chatMessageStore.saveMessage({
        sender: "assistant",
        content: answer,
    });
    
    const onMessage = (e: any) => {
        console.log("-=-===-=-=="+JSON.parse(e))
        // eslint-disable-next-line prefer-const
        let result = JSON.parse(e.data).result.at(0).output.content;


        if (result != null){
            answer += result;
            chatMessageStore.setCurrMessage(answer)
        }
    }
    const onError = (err: any) => {
        throw err;
    };

    const onClose = () => {
        //TODO，将问答数据存到数据库中
        // chatMessageStore.storeMessage();
        console.warn("SSE 连接关闭，尝试重新连接...");
        const aiMessage = {sender: "assistant", content: answer}

        // TODO:加到前端数据库以activeKey命名
        openDB(databaseInfo, 1, databaseInfo, "id", ['sender', 'content']).then((db) => {
            console.log("准备装入数据库!",db);
            addData(db, databaseInfo, aiMessage);
        }).catch((err) => {
            console.log('#数据库写入失败',err);
        });
        
    };

    const onOpen = async (response: any) => {
        console.log("🔍 SSE 连接状态:", response.status);

        if (response.ok) {
            console.log("✅ SSE 连接成功");
            return;
        }

        if (response.status === 401) {
            console.error("❌ 鉴权失败，token 可能无效");
            alert("登录已过期，请重新登录");
            // localStorage.removeItem("token"); // 清除 token
            // window.location.href = "/login"; // 跳转到登录页
        } else if (response.status === 429) {
            console.warn("⚠️ 请求过于频繁，稍后再试");
            throw new RetriableError();
        } else if (response.status >= 400 && response.status < 500) {
            console.error("❌ 客户端请求错误:", response.status);
            throw new FatalError();
        } else {
            console.error("⚠️ 服务器错误:", response.status);
            throw new RetriableError();
        }
    };

    const token = localStorage.getItem("token");
    // const responses = await request.post(ChatApi.textChat,JSON.stringify(dto))
    // console.log("23128671873681726817638172681763817-=-=-=-==-=-=-=-="+JSON.stringify(responses.data))
    if(token){
        console.log("========"+JSON.stringify(dto))
        fetchEventSource("/api" + ChatApi.StreamChat, {
            method: "POST",
            // openWhenHidden: true, //禁止重复调用
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer "+token
            },
            body: JSON.stringify(dto),
            signal: ctrl.signal,
            onmessage: onMessage,
            onerror: onError,
            onclose: onClose,
            onopen: onOpen,
        });
    }
}