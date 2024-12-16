import { defineStore } from "pinia";

interface User{
    username: string;
}

export const userInfo = defineStore('user', {
    state: () => ({
        username: 'user',
    }),

    actions: {
        // 通过 action 提交 mutation 更新用户信息
        saveUserInfo(user: User) {
          this.username = user.username; // 更新用户名
        },
    },
    getters: {
        // 获取用户的 username
        getUserName(state) {
          return state.username;
        }
    }
})

