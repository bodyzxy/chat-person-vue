import axios from "axios";
import { BASE_URL, HEADER } from "./config";
import router from "@/router/router";

const service = axios.create({
    baseURL:BASE_URL,
    withCredentials: false,
    headers:HEADER
});

//请求
export const request = {
    get(url: string, params?: any){
        return service.get(url,{params})
    },
    post(url:string, data?: any){
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
        const token = localStorage.getItem("token");
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
        console.log(res);
        return res.data;
    },
    (error) => {
        let message = "";
        console.error(error);
        return Promise.reject(message);
    }
);