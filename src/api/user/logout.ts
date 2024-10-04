import {username} from '../../common/global/userInfo';
import {request} from '@/http/index';
import router from '@/router/router';
//此处拦截器那边返回的是.data所以这里不需要.data.code
export async function logout(){
    try{
        const response = await request.get("/user/logout");
        console.log(response.data);
        if(response.code === 0){
            localStorage.removeItem('token');
            username.value = '';
            console.log('Successfully logged out');

            // 登出后跳转到登录页面
            router.push('/login');
        }else{
            console.log("Failed to logout")
        }
        
    }catch(error){
        // 捕获并处理错误
        console.error('Error during logout:', error);
    }
}