import { reactive, ref } from 'vue'
import { useMessage} from 'naive-ui'
import { request } from '../../http'
import { userInfo } from '../../store/user'
import { useUserInfoStore } from '../../store/userInfoStore'
import type { UserForm } from '@/common/user/userInforInterface'
import router from '@/router/router'

const message = useMessage()
const showModalRef = ref(false)


export const showModel = showModalRef
const user = JSON.parse(localStorage.getItem('user') || '{}')
const userInformation = useUserInfoStore()
export const introduction = ref("");
const selectedId = ref(0); // 用于存储当前点击的 task.id

export const openModal = (id:number) => {
    selectedId.value = id; // 记录当前点击的 task.id
    showModel.value = true; // 显示模态框
};

export const dynamicForm = reactive<UserForm>({
    name: "",
    user: {
        address: ""
    },
    phone: "",
    password: "",
    reenteredPassword: "",
    email: "",
    hobbies: [{ hobby: '' }]
})

export function onNegativeClick(){
    message.success('Cancel')
    showModalRef.value = false
}

export const onPositiveClick = async() =>{
    try{
        if (selectedId.value) {
            console.log("确认上传 ID:", selectedId.value);
            const response = await request.get(`/database/shareDatabase/${selectedId.value}`)
            if (response.code === 0) {
                console.log("分享成功");
                window.location.reload()
            }
        }
    }catch(error){
        console.log("分享数据库出错：",error)
    }
    // message.success('Submit')
    showModalRef.value = false
}

export async function createDatabase(name: string){
    //请求后端接口
    try{
        const response = await request.get(`/database/create/${user.id}/${name}`)
        if (response) {
            console.log("创建数据库成功:", response);
            router.push({
                path: `/userDatabase/${response}`
            });
            setTimeout(() => {
                window.location.reload(); // 让页面强制刷新
            }, 200);
        }
    }catch(error){
        console.error("上传文件时发生错误:", error);
    }
    console.log(name);
}

export async function removeDatabase(id: number) {
    try{
        const response = await request.get(`/database/delete/${id}`)
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
        console.log(response);
        userInformation.saveUserInfo(response.data)
        
        // 更新 dynamicForm 的值
        introduction.value = response.data.introduction;
        dynamicForm.name = response.data.username;
        dynamicForm.user.address = response.data.address;
        dynamicForm.phone = response.data.phone;
        dynamicForm.password = response.data.password;
        dynamicForm.reenteredPassword = response.data.rpassword;
        dynamicForm.email = response.data.email;
    }catch(error){
        console.log("错误信息",error);
    }
}

//修改个人简介
export async function saveInfomation(infomation: string){
    const formData = new FormData()
    formData.append('introduction', infomation);
    formData.append('userId',user.id.toString());

    console.log(formData);  
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

//修改个人信息
export async function saveUserInfo(userInfoChange: UserForm): Promise<void> {
    const formData = new FormData();
    formData.append('userId', user.id.toString());
    formData.append('username', userInfoChange.name);
    formData.append('address', userInfoChange.user.address);
    formData.append('phone', userInfoChange.phone);
    formData.append('password', userInfoChange.password);
    formData.append('rpassword', userInfoChange.reenteredPassword);
    formData.append('email', userInfoChange.email);

    try{
        const response = await request.post("/user/changeUserInfo", formData);
        if (response.code === 0) {
            console.log("修改成功");
            window.location.reload();
        }
    }catch(error){
        console.log("错误信息",error);
    }
}