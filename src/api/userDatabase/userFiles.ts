import { ref } from "vue";
import {request} from '../../http/index';
import type { PdfRequest } from "@/common/user/userUpdateFiles";


export const tags = ref(['mysql八股文', 'mysql八股文', 'mys']);
// 存储对话消息
export const messages = ref<{ sender: string; content: string }[]>([]);
// 输入框的内容
export const inputMessage = ref('');
export const isSending = ref(false)


// 引用文件输入框
export const fileInput = ref(null);
export const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;

    if(file){
        const formData = new FormData();
        formData.append("file",file);
        
        try{
            const response = await request.post("/file/update", formData);

            if (response.code === 0) {
                console.log("文件上传成功:", response.data);
            } else {
                console.log("文件上传失败:", response.msg);
            }
        }catch(error){
            console.error("上传文件时发生错误:", error);
        }
    }
}

export const submitDatabse = () => {
    if (fileInput.value) {  // 确保 fileInput.value 不为 null
        fileInput.value.click();  // 触发文件输入的点击事件
    } else {
        console.error("File input reference is null");
    }
};

export async function submit(){
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

export function removeTag(index: number){
    tags.value.splice(index, 1);
}