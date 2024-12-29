import { ref } from 'vue'
import { useMessage} from 'naive-ui'
import { request } from '../../http'
import { userInfo } from '../../store/user'

const message = useMessage()
const showModalRef = ref(false)


export const showModel = showModalRef
const user = userInfo()

export function onNegativeClick(){
    message.success('Cancel')
    showModalRef.value = false
}

export async function onPositiveClick(id: number){
    try{
        const response = await request.get(`/database/shareDatabase/${id}`)
        if(response.code === 0){
            console.log("分享成功");
        }
    }catch(error){
        console.log("分享数据库出错：",error)
    }
    message.success('Submit')
    showModalRef.value = false
}

export async function createDatabase(name: string){
    //请求后端接口
    try{
        const response = await request.get(`/database/create/${user.$id}/${name}`)
        if (response.code === 0) {
            console.log("创建数据库成功:", response.data);
        }
    }catch(error){
        console.error("上传文件时发生错误:", error);
    }
    console.log(name);
}

export async function removeDatabase(id: number) {
    try{
        const response = await request.get(`"/database/delete/${id}`)
        if(response.code === 0){
            console.log("删除成功")
            window.location.reload()
        }
    }catch(error){
        console.log("删除错误：",error)
    }
}
