import { ref } from 'vue'
import { useMessage} from 'naive-ui'
import { request } from '../../http'
import { userInfo } from '../../store/user'
import { useUserInfoStore } from '../../store/userInfoStore'

const message = useMessage()
const showModalRef = ref(false)


export const showModel = showModalRef
const user = userInfo()
const userInformation = useUserInfoStore()

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

export const getUserInfo = async () => {
    try{
        const response = await request.get(`/user/getUserInfo/${user.username}`)
        //TODO:使用全局变量存储个人信息
        userInformation.saveUserInfo(response.data)
    }catch(error){
        console.log("错误信息",error);
    }
}

export async function saveInfomation(infomation: string){
    const formData = new FormData()
    formData.append('introduction', infomation);
    formData.append('userId',user.id.toString())
    try{
        const response = await request.post("/user/changeIntroduction",formData)
        if(response.code === 0){
            console.log("修改成功")
            window.location.reload()
        }
    }catch(error){
        console.log("错误信息",error);
    }
}