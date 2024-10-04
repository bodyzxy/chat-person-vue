import { ref } from "vue";
import {request} from '../../http/index';
import type { PdfRequest } from "@/common/user/userUpdateFiles";


// 引用文件输入框
export const fileInput = ref(null);
export const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;

    if(file){
        const formData = new FormData();
        formData.append("file",file);
        
        try{
            const response = await request.post("/user/update", formData);

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

export function submit() {
    console.log("发送信息");
}