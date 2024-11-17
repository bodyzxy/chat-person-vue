import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import { createRouter, createWebHistory } from "vue-router";
import UserInfo from "@/pages/user/index.vue";
import UserDatabase from "@/pages/user/UserDatabase.vue";
import UserInfoData from "@/pages/user/UserInfoData.vue";
import UserPlaza from "@/pages/user/UserPlaza.vue";
import TaskDetails from "@/pages/user/UserTaskDetails.vue";
import AutherInfo from "@/pages/user/AutherInfo.vue";
import PracticePage from "@/pages/nlpPractice/PracticePage.vue";

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
        },
        {
            name: 'practice',
            path:'/practice',
            component:PracticePage,
            meta: {requiresAuth: true}
        }
    ]
})

// router.beforeEach((to, from,next) => {
//     const token = localStorage.getItem('token');
//     if(to.matched.some(record => record.meta.requiresAuth) && !token){
//         //若未登录重定向
//         next('/login')
//     }else{
//         next();//继续导航
//     }
// })

export default router