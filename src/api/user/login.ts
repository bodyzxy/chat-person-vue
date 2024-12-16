import {request} from '@/http/index';
import type {LoginUser} from '@/common/user/loginUser';
import router from "@/router/router";
import {username} from '../../common/global/userInfo';
import { userInfo } from '@/store/user';

interface User{
    username: string;
    userId: number;
}

export const userLogin = async (param:LoginUser) => {
    const user_info = userInfo();
    try{
        const response = await request.post("/user/login",param);
        const token = response.data.token;
        const username = response.data.username;
        const userId = response.data.userId;
        localStorage.setItem('token',token);
        //将用户信息存储到全局变量中
        // username.value = user;
        // user_info.saveUserInfo(userId)
        //登录成功继续导航
        router.push('/home');
    } catch (error) {
        console.error('Error logging in:',error);
        throw error;
    }
}