import { defineStore } from "pinia";

interface User{
    username: string;
}

const userInfo = defineStore('user', {
    state: () => ({
        username: '1',
    }),

    actions: {
        // 通过 action 提交 mutation 更新用户信息
        saveUserInfo(user: User) {
          this.username = user.username; // 更新用户名
        },
    },
    getters: {
        // 获取用户的 username
        getUserInfo(state) {
          return state.username;
        },
    }
})


export default userInfo;