import { ref } from "vue";
import { addData, cursorGetData, openDB } from "../db/indexedDB";
import { streamChatApi } from "../chatApi";
import type { ChatDTO } from "../dto";
import { useMsgStore } from "@/store/msg";
import { useChatOptionsStore } from "@/store/options";
import { request } from "@/http";

// 存储对话消息
export const messages = ref<{ sender: string; content: string }[]>([]);
// 输入框的内容
export const inputMessage = ref('');
export const isSending = ref(false)
export const load = ref(false)
const chatMessageStore = useMsgStore();
const chatOptions = useChatOptionsStore();



export async function sendMessage(activeKey: string){
    if(inputMessage.value.trim() && !isSending.value){   
        //禁用发送
        isSending.value = true;
        try{
            //TODO:向后端发起请求
            // streamChatApi(inputMessage.value, activeKey);
            const dto: ChatDTO ={
                messages:chatMessageStore.getGlobalMessage.map(({ id, ...rest }) => rest),
                chatOptions: chatOptions.getChatOptions,
                prompt: inputMessage.value
            }
            
            console.log(dto);
            const userMessage = { sender: "user", content: inputMessage.value}
            //TODO:加到前端数据库以activeKey命名
            openDB(activeKey, 1, activeKey, "id", ['sender', 'content']).then((db) => {
                console.log("准备装入数据库!",db);
                addData(db, activeKey, userMessage);
            }).catch((err) => {
                console.log('#数据库写入失败',err);
            });

            const response = await request.post('/chat/talk',dto);

            const aiMessage = {sender: "assistant", content: response.data}

            openDB(activeKey, 1, activeKey, "id", ['sender', 'content']).then((db) => {
                console.log("准备装入数据库!",db);
                addData(db, activeKey, aiMessage);
            }).catch((err) => {
                console.log('#数据库写入失败',err);
            });

            
            load.value = true
        } catch(error){
            console.error('Error fetching response:', error);
        } finally{
            //清空输入框
            inputMessage.value='';
            isSending.value = false; // 请求完成后，恢复按钮可点击状态
            load.value = false
        }
    }
}
