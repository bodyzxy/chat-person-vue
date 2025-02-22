import type { CustomMenuOption } from "@/common/menu";
import { request } from "@/http";
import { NIcon } from "naive-ui";
import { h, ref, type Component } from "vue";
import {
    BookOutline as BookIcon,
    PaperPlaneOutline,
    Unlink
  } from '@vicons/ionicons5';


export const commonMenu = ref<CustomMenuOption[]>([]);
export const selectedUrl = ref<string | undefined>(undefined);

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
  }

export const loadMenu = async() => {

    try{
        const response = await request.get("/title/getTitle");
        console.log(response.data)
        commonMenu.value = response.data.map((item: any) => ({
            ...item,
            icon: renderIcon(BookIcon)
        }));
    }catch(error){
        console.log("获取菜单出错：",error);
    }

}