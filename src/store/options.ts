import type { ChatOptions } from "@/api/dto";
import { defineStore } from "pinia";

export const CHAT_OPTIONS = "chat-person"
export const defaultChatOptions: ChatOptions = {
    model: "gpt-3.5-turbo",
    maxHistoryLength: 10,
    chatType: "rag",
    temperature: 0.5,
};

const SYSTEM_PROMPT = "你是一个AI助教，致力于通过AI进行自然语言处理的教学";

export const useChatOptionsStore = defineStore("options",{
    state: () => {
        //此处从数据库获取
        // eslint-disable-next-line prefer-const
        let optionsToken: string | null = null;

        // eslint-disable-next-line prefer-const
        let systemPrompt: string = ""
        
        // eslint-disable-next-line prefer-const
        let globalOptions: ChatOptions = optionsToken == null ? defaultChatOptions : JSON.parse(optionsToken);

        return {
            globalOptions,
            systemPrompt,
        };
    },
    getters: {
        getChatOptions(): ChatOptions {
            return this.globalOptions;
        },
        getSystemPrompt(): string {
            return this.systemPrompt;
        }
    },

    actions: {
        setChatOptions(globalOptions: ChatOptions){
            //本地存储
            // localStorage.setItem(CHAT_OPTIONS, JSON.stringify(globalOptions));
            this.$patch({globalOptions});
        },
        setSystemPrompt(systemPrompt: string) {
            // localStorage.setItem(SYSTEM_PROMPT, systemPrompt);
            this.$patch({systemPrompt});
        }
    }
})
