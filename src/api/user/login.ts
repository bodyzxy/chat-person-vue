import {request} from '@/http/index';
import type {LoginUser} from '@/common/user/loginUser';
import router from "@/router/router";

export const userLogin = async (param:LoginUser) => {
    try{
        const response = await request.post("/user/login",param);
        const token = response.data.token;
        localStorage.setItem('token',token);
        //登录成功继续导航
        router.push('/home');
    } catch (error) {
        console.error('Error logging in:',error);
        throw error;
    }
}