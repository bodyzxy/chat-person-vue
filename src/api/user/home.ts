import { ref } from "vue";

// 存储对话消息
export const messages = ref<{ sender: string; content: string }[]>([]);
// 输入框的内容
export const inputMessage = ref('');
export const isSending = ref(false)

export async function sendMessage(){
    if(inputMessage.value.trim() && !isSending.value){
        //禁用发送
        isSending.value = true;
        //TODO: 记得去获取ID
        // 1. 将用户输入的内容添加到 Pane 2 显示
        messages.value.push({sender: "databaseId.value",content: inputMessage.value})

        try{
            const response = await fetchResponseFromAPI(inputMessage.value);
            messages.value.push({sender: 'AI', content: response});
        } catch(error){
            console.error('Error fetching response:', error);
        }
        //清空输入框
        inputMessage.value='';
        isSending.value = false; // 请求完成后，恢复按钮可点击状态
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
