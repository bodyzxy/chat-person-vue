import { ref } from "vue";
import { addData, openDB } from "../db/indexedDB";

// 存储对话消息
export const messages = ref<{ sender: string; content: string }[]>([]);
// 输入框的内容
export const inputMessage = ref('');
export const isSending = ref(false)



export async function sendMessage(activeKey: string,user_info:any,use_message:any){
    if(inputMessage.value.trim() && !isSending.value){
        //禁用发送
        isSending.value = true;
        //TODO: 记得去获取ID
        // 1. 将用户输入的内容添加到 Pane 2 显示
        const sender = user_info.getUserInfo;
        // messages.value.push({sender: "databaseId.value",content: inputMessage.value})
        const userMessage = {sender, content: inputMessage.value}

        //存储用户的信息
        use_message.saveMessage(userMessage);

        //TODO:加到前端数据库以activeKey命名
        openDB(activeKey, 1, activeKey, "id", ['sender', 'content']).then((db) => {
            console.log("准备装入数据库!",db);
            addData(db, activeKey, userMessage);
        }).catch((err) => {
            console.log('#数据库写入失败',err);
        });

        try{
            //TODO:向后端发起请求
            const response = await fetchResponseFromAPI(inputMessage.value);
            // messages.value.push({sender: 'AI', content: response});
            const aiMessage = { sender: 'AI', content: response };
            // 通过 Vuex 保存 AI 消息
            use_message.saveMessage(aiMessage);

            //TODO:加到前端数据库以activeKey命名
            openDB(activeKey, 1, activeKey, "id", ['sender', 'content']).then((db) => {
                console.log("AI准备装入数据库!",db);
                addData(db, activeKey, aiMessage);
            }).catch((err) => {
                console.log('#数据库写入失败',err);
            });

        } catch(error){
            console.error('Error fetching response:', error);
        } finally{
            //清空输入框
            inputMessage.value='';
            isSending.value = false; // 请求完成后，恢复按钮可点击状态
        }
    }
}
//TODO:要去获取后端接口
// 模拟 API 请求，实际需要用真实 API 替换
async function fetchResponseFromAPI(message: string): Promise<string> {
    // 假设返回一个简单的回答
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`这是针对 "${message}" 的回答`);
      }, 1000);
    });
  }
