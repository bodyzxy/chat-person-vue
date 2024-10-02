import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import { createRouter, createWebHistory } from "vue-router";
import UserInfo from "@/components/user/index.vue";
import UserDatabase from "@/components/user/UserDatabase.vue";
import AdminHome from "@/components/admin/AdminHome.vue";
import ChangeUser from '@/components/admin/ChangeUser.vue';
import UserInfoData from "@/components/user/UserInfoData.vue";
import UserPlaza from "@/components/user/UserPlaza.vue";
import TaskDetails from "@/components/user/UserTaskDetails.vue";
import AutherInfo from "@/components/user/AutherInfo.vue";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            name:'home',
            path:'/home',
            component:Home,
            meta: {requiresAuth: true} //路由认证
        },
        {
            name:'login',
            path:'/login',
            component:Login
        },
        {
            name:'userInfo',
            path:'/userInfo',
            component:UserInfo,
            meta: {requiresAuth: true} //路由认证
        },
        {
            name:'userDatabase',
            path:'/userDatabase',
            component:UserDatabase,
            meta: {requiresAuth: true} //路由认证
        },
        {
            name:'adminHome',
            path:'/adminHome',
            component:AdminHome,
            meta: {requiresAuth: true} //路由认证
        },
        {
            name:'changeUser',
            path:'/changeUser',
            component:ChangeUser,
            meta: {requiresAuth: true} //路由认证
        },
        {
            name:'userInfoData',
            path:'/userInfo/data',
            component:UserInfoData,
            meta:{requiresAuth: true}
        },
        {
            name:'userPlaza',
            path:'/userPlaza',
            component:UserPlaza,
            meta:{requiresAuth: true}
        },
        {
            name:'taskDetails',
            path:'/task/:id',
            component:TaskDetails,
            meta: {requiresAuth: true} //路由认证
        },
        {
            name:'autherInfo',
            path:'/autherInfo/:id',
            component:AutherInfo,
            meta: {requiresAuth: true} //路由认证
        }
    ]
})

router.beforeEach((to, from,next) => {
    const token = localStorage.getItem('token');
    if(to.matched.some(record => record.meta.requiresAuth) && !token){
        //若未登录重定向
        next('/login')
    }else{
        next();//继续导航
    }
})

export default router