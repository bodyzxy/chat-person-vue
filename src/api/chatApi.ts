
import {useMsgStore} from "@/store/msg"
import {userInfo} from "@/store/user";
import { useChatOptionsStore } from "@/store/options";
import type { ChatDTO,ChatDTORag } from "./dto";
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


    const dto: ChatDTORag = {
        messages: chatMessageStore.getGlobalMessage.map(({ id, ...rest }) => rest),
        chatOptions: chatOptions.getChatOptions,
        prompt: input,
        databaseId: databaseInfo
    };

    try{
        const response = await request.post(ChatApi.StreamChat, JSON.stringify(dto))
        console.log("23128671873681726817638172681763817-=-=-=-==-=-=-=-=" + JSON.stringify(response.data))

        const aiMessage = { sender: "assistant", content: response.data }

        openDB(databaseInfo, 1, databaseInfo, "id", ['sender', 'content']).then((db) => {
            console.log("准备装入数据库!", db);
            addData(db, databaseInfo, aiMessage);
        }).catch((err) => {
            console.log('#数据库写入失败', err);
        });
    }catch (error) {
        console.log(error)
    }finally{
        isSending.value = false
        window.location.reload();
    }

}