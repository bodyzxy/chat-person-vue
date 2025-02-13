import { request } from '@/http';
import { userInfo } from '@/store/user';
import { dayjs } from 'element-plus';
import { defineComponent, ref } from 'vue'

// 定义用户对象的类型
export interface User {
    image:string;
    name: string;
    content: string;
    data:string;
  }
export interface userBase{
    id:number,
    name:string,
    title:string,
    time:string
}
export const dataBase = ref<userBase[]>([]);
const adminUser = userInfo();
export const feathData = async () => {
    try{
        const response = await request.get(`/database/getUserData/${adminUser.id}`);
        console.log(response.data);
        dataBase.value = response.data.map((item: { time: string | number | Date | dayjs.Dayjs | null | undefined; }) => ({
            ...item,
            time: dayjs(item.time).format('YYYY-MM-DD')
        }));
    } catch(error){
        console.log("错误信息",error);
    }
}

export const user = ref<User[]>([
    {
        'image':"https://images.app.goo.gl/iqqFALJ8q2SPwKMi6",
        'name':"zxx",
        'content':"askdhaksjhdasjhdkajsbdajsbkajsbkajsbdasdasd",
        'data':'2024-09-09'
    },
    {
        'image':"https://images.app.goo.gl/iqqFALJ8q2SPwKMi6",
        'name':"z",
        'content':"askdhaksjhdasjhdkajsbdajsbkajsbkajsbdasdasd",
        'data':'2024-09-09'
    },
    {
        'image':"https://images.app.goo.gl/iqqFALJ8q2SPwKMi6",
        'name':"实时",
        'content':"askdhaksjhdasjhdkajsbdajsbkajsbkajsbdasdasd",
        'data':'2024-09-09'
    },
    {
        'image':"https://images.app.goo.gl/iqqFALJ8q2SPwKMi6",
        'name':"史蒂夫",
        'content':"askdhaksjhdasjhdkajsbdajsbkajsbkajsbdasdasd",
        'data':'2024-09-09'
    },
    {
        'image':"https://images.app.goo.gl/iqqFALJ8q2SPwKMi6",
        'name':"史蒂夫",
        'content':"askdhaksjhdasjhdkajsbdajsbkajsbkajsbdasdasd",
        'data':'2024-09-09'
    },
    {
        'image':"https://images.app.goo.gl/iqqFALJ8q2SPwKMi6",
        'name':"是的减肥呢",
        'content':"askdhaksjhdasjhdkajsbdajsbkajsbkajsbdasdasd",
        'data':'2024-09-09'
    },
])