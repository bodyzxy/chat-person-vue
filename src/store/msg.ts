import type { Message } from "@/api/dto";
import { defineStore } from "pinia";

// 定义消息类型
const defaultMessage: Message[] = [
  {
    sender: "",
    content: "",
  },
];
  
export const useMsgStore = defineStore('msg', {
    state: () => ({
      messages: [] as Message[], // 初始化消息数组

      // globalMessage: [] as Message[],
    }),
    actions: {
      // 添加消息
      saveMessage(message: Message) {
        this.messages.push(message); // 将消息添加到数组
      },

      //设置当前
      setCurrMessage(currAIMessage: string) {
        // 当前AI回复放在最后一个对话列表中 this.globalMessage 的类型时Message[]
        // eslint-disable-next-line prefer-const
        let len = this.messages.length;
        this.messages[len - 1].content = currAIMessage;
      },

      setGlobalMessage(messages: Message[]) {
        this.$patch({ messages });
      },
    },
    getters: {
      // 获取所有消息
      getMessages(state) {
        return state.messages; // 返回消息数组
      },

      getGlobalMessage(): Message[] {
        return this.messages;
      },
    },
  });
