/**
 * 请求对象
 */
export interface Message {
    sender: string;
    content: string;
  }

export interface ChatOptions {
    model: string;
    maxHistoryLength: number;
    chatType: string;
    temperature: number;
}
export interface ChatDTO {
    messages: Message[];
    chatOptions: ChatOptions;
    prompt: string;
  }

export interface ChatDTORag {
  messages: Message[];
  chatOptions: ChatOptions;
  prompt: string;
  databaseId: string;
}