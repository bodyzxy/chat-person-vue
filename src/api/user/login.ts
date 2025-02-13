import {request} from '@/http/index';
import type {LoginUser} from '@/common/user/loginUser';
import router from "@/router/router";
import {username} from '../../common/global/userInfo';
import { userInfo } from '@/store/user';
import { loadHotTitle } from './plazaMiddleHotTitle';
import { loadHotGithub } from './plazaMiddleHotGithub';
import { loadHotBook } from './plazaMiddleHotBook';

interface User{
    username: string;
    id: number;
}

export const userLogin = async (param:LoginUser) => {
    const user_info = userInfo();
    try{
        const response = await request.post("/user/login",param);
        const token = response.data.token;
        const username = response.data.username;
        const userId = response.data.id;
        localStorage.setItem('token',token);

        const user: User = {
            username: username,
            id: userId
        }
        //将用户信息存储到全局变量中
        // username.value = user;
        user_info.saveUserInfo(user)
        localStorage.setItem('user', JSON.stringify(user));
        //登录成功继续导航
        router.push('/home');
        // loadHotTitle();
        // loadHotGithub();
        // loadHotBook();
    } catch (error) {
        console.error('Error logging in:',error);
        throw error;
    }
}