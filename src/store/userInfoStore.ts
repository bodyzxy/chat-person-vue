import { defineStore } from "pinia";

// 定义与 Java UserInfo 类匹配的接口
export interface UserInfo {
    id: number;
    username: string;
    password: string;
    address: string;
    phone: string;
    email: string;
    rpassword: string;
    introduction: string;
}

export const useUserInfoStore = defineStore('userInfo', {
    state: (): UserInfo => ({
        id: 1,
        username: 'user',
        password: '123456',
        address: '撒多久啊还是可大可久说的',
        phone: '1232312312312',
        email: '29331777@qq.com',
        rpassword: '1232312312312',
        introduction: '1232312312312',
    }),

    actions: {
        // 更新用户信息
        saveUserInfo(user: Partial<UserInfo>) {
            // 使用 Object.assign 更新状态
            Object.assign(this, user);
        },
    },

    getters: {
        // 获取用户的 username
        getUserName(state): string {
            return state.username;
        },

        // 获取完整用户信息
        getUserInfo(state): UserInfo {
            return state;
        },
    },
});
