import axios from "axios";
import { BASE_URL } from "./config";
import router from "@/router/router";

const service = axios.create({
    baseURL:BASE_URL,
    withCredentials: false
});

//请求
export const request = {
    get(url: string, params?: any){
        return service.get(url,{params})
    },
    post(url: string, data?: any, p0?: { headers: { 'Content-Type': string; }; }){
        return service.post(url,data)
    },
    put(url: string, data?: any) {
        return service.put(url, data);
    },
    delete(url: string, params?: any) {
        return service.delete(url, { params });
    },
}

//拦截器
service.interceptors.request.use(
    (config) => {
        // 如果请求的数据是 FormData 类型，不设置 Content-Type，让浏览器自动处理
        if (!(config.data instanceof FormData)) {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        }
        const token = localStorage.getItem("token");
        console.log("-----------------------"+token)
        if(token != null){
            config.headers.Authorization = "Bearer " + token;
        } else{
            console.warn('No token found, redirecting to login');
            router.push('/login');
        }
        return config;
    },
    (error) =>{
        console.log(error);
        return Promise.reject(error);
        
    }
);

//响应拦截器
service.interceptors.response.use(
    (res:any) => {
        console.log(res.data);
        return res.data;
    },
    (error) => {
        const message = "";
        console.error(error);
        if(error.response && error.response.status === 401){
            // router.push('/login');
            // localStorage.removeItem("token");
            // localStorage.removeItem("user");
            // setTimeout(() => {
            //     window.location.reload();
            // },100);
        }
        return Promise.reject(message);
    }
);