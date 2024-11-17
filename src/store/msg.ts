import { defineStore } from "pinia";

// 定义消息类型
interface Message {
    sender: string;
    content: string;
  }
  
const useMsgStore = defineStore('msg', {
    state: () => ({
      messages: [] as Message[], // 初始化消息数组
    }),
    actions: {
      // 添加消息
      saveMessage(message: Message) {
        this.messages.push(message); // 将消息添加到数组
      },
    },
    getters: {
      // 获取所有消息
      getMessages(state) {
        return state.messages; // 返回消息数组
      },
    },
  });

export default useMsgStore;