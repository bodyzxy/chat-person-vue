import { ref } from "vue";
import type { ChatDTO } from "../dto";
import { useMsgStore } from "@/store/msg";
import { useChatOptionsStore } from "@/store/options";
import { request } from "@/http";
import type { HotTitle } from "@/common/plazadata/hotTitle";

export const totalPages = ref(0);
const loadingMore = ref(false)
export const currentPage = ref(0);
export const hotDataListTitle = ref<HotTitle[]>([]);
const chatMessageStore = useMsgStore();
const chatOptions = useChatOptionsStore();
export const itemsPerPage = 7; // 每页显示6条数据
export const load = ref(true)

export const handleScrollTitle = (event: Event) => {
    const target = event.target as HTMLElement;

    //判断是否滚动到底部
    if(target.scrollTop + target.clientHeight >= target.scrollHeight - 10 && !loadingMore.value){
        loadingMore.value = true;
        loadMore();
    }
}

const loadMore = () => {
    if (loadingMore.value || currentPage.value >= totalPages.value) return;
    loadHotTitle();
}

export const goToUrl = (task: any) => {
    window.open(task.url, '_blank'); // 使用 '_blank' 在新标签页打开链接
}

//后端请求数据
export const loadHotTitle = async() => {
    const dto: ChatDTO ={
        messages:chatMessageStore.getGlobalMessage,
        chatOptions: chatOptions.getChatOptions,
        prompt: ""
    }
    try{
        load.value = true
        const response = await request.post('/chat/hotTitle',dto);
        console.log(response);
        // 假设 response.data 是你从后端获取的响应
        let responseData = response.data;

        // 移除前后的 "```json" 和 "```" 标记
        responseData = responseData.replace(/^```json\n/, '').replace(/\n```$/, '');
        responseData = responseData.replace(/([{,])\s*([^":\s]+)\s*:/g, '$1"$2":'); 
        const data = JSON.parse(responseData); // 解析 JSON 字符串为数组

        // 遍历数组，获取每个项的 id 和 title
        hotDataListTitle.value = data.map((item: { id: any; title: any; time: any; description: any; url: any; }) => ({
            id: item.id,
            title: item.title,
            time: item.time,
            description: item.description,
            url: item.url
        }));
        totalPages.value = Math.ceil(hotDataListTitle.value.length / itemsPerPage);//计算页数
        loadingMore.value = false
        load.value = false
    }catch(error){
        console.log(error);
        loadingMore.value = false
        load.value = false
    }
}