import { onMounted, ref, watch } from "vue";
import { useRoute } from 'vue-router';
import { addData, openDB } from "../db/indexedDB";
import { useMsgStore } from "@/store/msg";
import { useChatOptionsStore } from "@/store/options";
import type { ChatDTO } from "../dto";
import { request } from "@/http";
import { streamChatApi } from "../chatApi";

export const tags = ref([]);
// 存储对话消息
export const messages = ref<{ sender: string; content: string }[]>([]);
// 输入框的内容
export const inputMessage = ref('');
export const isSending = ref(false)

// export const databaseId = ref<string | null>(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id);
// 确保 `databaseId` 是字符串或 null
export const databaseId = ref(0);

export const databaseIdString = ref("");
const chatMessageStore = useMsgStore();
const chatOptions = useChatOptionsStore();


export async function requestTag(){
  if(databaseIdString.value != ""){
    return;
  }else{
    try{
      const response = await request.get(`/file/contents/${databaseId.value}`)
      tags.value = response.data;
    }catch(error){
      console.log("获取标签时出错：",error);
    }
    
  }
}

export async function requestChat(use_message: any, user_info: any){
    if(inputMessage.value.trim() && !isSending.value){
        //禁用发送
        isSending.value = true;

        // const sender = user_info.getUserInfo;
        //TODO: 记得去获取ID
        // 1. 将用户输入的内容添加到 Pane 2 显示
        // const userMessage = {sender, content: inputMessage.value}
        // // messages.value.push({sender: "databaseId.value",content: inputMessage.value})
        // //存储用户的信息
        // use_message.saveMessage(userMessage);

        try{
            //TODO: 请求普通接口
            if(databaseIdString.value != ""){
              const dto: ChatDTO ={
                messages:chatMessageStore.getGlobalMessage,
                chatOptions: chatOptions.getChatOptions,
                prompt: inputMessage.value
              }

              const userMessage = { sender: "user", content: inputMessage.value }
              //TODO:加到前端数据库以activeKey命名
              openDB(databaseIdString.value, 1, databaseIdString.value, "id", ['sender', 'content']).then((db) => {
                console.log("准备装入数据库!", db);
                addData(db, databaseIdString.value, userMessage);
              }).catch((err) => {
                console.log('#数据库写入失败', err);
              });

              const response = await request.post('/chat/talk', dto);

              const aiMessage = { sender: "assistant", content: response.data }

              openDB(databaseIdString.value, 1, databaseIdString.value, "id", ['sender', 'content']).then((db) => {
                console.log("准备装入数据库!", db);
                addData(db, databaseIdString.value, aiMessage);
              }).catch((err) => {
                console.log('#数据库写入失败', err);
              });
            }
            //TODO:请求rag接口
            streamChatApi(inputMessage.value, String(databaseId.value));
        } catch(error){
            console.error('Error fetching response:', error);
        }finally{
          //清空输入框
          inputMessage.value='';
          isSending.value = false; // 请求完成后，恢复按钮可点击状态
        }
        
  
    }
}

export function removeTag(index: number){
    tags.value.splice(index, 1);
}



