import { ref } from "vue";
import { addData, openDB } from "../db/indexedDB";
import { streamChatApi } from "../chatApi";

// 存储对话消息
export const messages = ref<{ sender: string; content: string }[]>([]);
// 输入框的内容
export const inputMessage = ref('');
export const isSending = ref(false)



export async function sendMessage(activeKey: string){
    if(inputMessage.value.trim() && !isSending.value){
        //禁用发送
        isSending.value = true;
        try{
            //TODO:向后端发起请求
            streamChatApi(inputMessage.value, activeKey);
        } catch(error){
            console.error('Error fetching response:', error);
        } finally{
            //清空输入框
            inputMessage.value='';
            isSending.value = false; // 请求完成后，恢复按钮可点击状态
        }
    }
}
