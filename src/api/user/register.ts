import type { register } from "@/common/user/registerUser";
import { request } from "@/http";
import router from "@/router/router";
import { ref } from "vue";



export const userRegister = async (param:register) => {
    try{
        const response = await request.post("/user/register",param);
        if(response.code === 0){
            param.username = '';
            param.email = '';
            param.password = '';
            param.confirmPassword = '';
            param.role = [];
            //登录成功继续导航
            router.push('/login');
            console.log("注册成功")
            setTimeout(() => {
                window.location.reload();
            },1000);
        }else{
            console.log("注册失败")
        }
    }catch(error){
        console.log("Register Error")
    }
}