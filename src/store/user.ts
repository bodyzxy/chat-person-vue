import { defineStore } from "pinia";

interface User{
    id: number;
    username: string;
}

export const userInfo = defineStore('user', {
    state: () => ({
        id:1,
        username: 'user nnnn',
    }),

    actions: {
        // 通过 action 提交 mutation 更新用户信息
        saveUserInfo(user: User) {
          this.username = user.username; // 更新用户名
          this.id = user.id;
        },
    },
    getters: {
        // 获取用户的 username
        getUserName(state) {
          return state.username;
        }
    }
})

