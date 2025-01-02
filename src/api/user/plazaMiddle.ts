import { ref } from "vue";
import { dataBase } from "./userInfoData";
import { request } from "../../http";

const itemsPerLoad = 6;
export const visibleDataBase = ref(dataBase.slice(0,itemsPerLoad))

let loadingMore = false


export const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;

    //判断是否滚动到底部
    if(target.scrollTop + target.clientHeight >= target.scrollHeight - 10 && !loadingMore){
        loadingMore = true;
        loadMore();
    }
}

const loadMore = () => {
const currentLength = visibleDataBase.value.length;
const nextItems = dataBase.slice(currentLength, currentLength + itemsPerLoad);

//TODO：模拟加载后面改成加载
setTimeout(() => {
    visibleDataBase.value = [...visibleDataBase.value, ...nextItems];
    loadingMore = false;
},500);
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