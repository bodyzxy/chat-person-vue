import { ref} from "vue";
import { dataBase } from "./userInfoData";
import { request } from "../../http";
import type { DataBaseInfo, PageData } from "@/common/global/page";
import { dayjs } from "element-plus";

const itemsPerLoad = 6;
const databaseList = ref<DataBaseInfo[]>([]); // 存储所有数据
export const visibleDataBase = ref<DataBaseInfo[]>([]); // 存储当前可见的数据
export const currentPage = ref(0);
export const totalPages = ref(0);
// export const visibleDataBase = ref(dataBase.slice(0,itemsPerLoad))

const loadingMore = ref(false)



export const loadDatabaseData = async () => {
    try {
        const requestData = {
            page: currentPage.value,
            pageSize: itemsPerLoad
        };
        const response = await request.post('/database/getShareDatabase', requestData);
    
        const data = response.data;
        if (data && data.content) {
            // 清空当前可见数据并加载新数据
            visibleDataBase.value = data.content.map((item: DataBaseInfo) => ({ ...item,
                time: dayjs(item.time).format('YYYY-MM-DD')
             })); // 直接赋值为当前页的数据
            totalPages.value = data.totalPages; // 更新总页数
        }
    } catch (error) {
        console.error('Failed to fetch database:', error);
    }
}

export const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;

    //判断是否滚动到底部
    if(target.scrollTop + target.clientHeight >= target.scrollHeight - 10 && !loadingMore.value){
        loadingMore.value = true;
        loadMore();
    }
}

const loadMore = () => {
    if (loadingMore.value || currentPage.value >= totalPages.value) return;
    loadDatabaseData();
}

//TODO:获取热门数据库
export const getHotDatabase = async () => {
    try{
        const response = await request.get("/database/getHotDatabase")
        console.log(response + "热门数据数据获取")
    }catch(error){
        console.log("获取出错：",error);
    }
}