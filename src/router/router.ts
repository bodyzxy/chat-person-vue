import Login from "@/pages/Login.vue";
import { createRouter, createWebHistory } from "vue-router";

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
            component: () => import('@/pages/Home.vue'),
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
            component: () => import('@/pages/user/index.vue'),
            meta: {requiresAuth: true} //路由认证
        },
        {
            name:'userDatabase',
            path:'/userDatabase/:id',
            component: () => import('@/pages/user/UserDatabase.vue'),
            meta: {requiresAuth: true} //路由认证
        },
        {
            name:'userInfoData',
            path:'/userInfo/data',
            component: () => import('@/pages/user/UserInfoData.vue'),
            meta:{requiresAuth: true}
        },
        {
            name:'userPlaza',
            path:'/userPlaza',
            component: () => import('@/pages/user/UserPlaza.vue'),
            meta:{requiresAuth: true}
        },
        {
            name:'taskDetails',
            path:'/task/:id',
            component: () => import('@/pages/user/UserTaskDetails.vue'),
            meta: {requiresAuth: true} //路由认证
        },
        {
            name:'autherInfo',
            path:'/autherInfo/:id',
            component: () => import('@/pages/user/AutherInfo.vue'),
            meta: {requiresAuth: true} //路由认证
        },
        {
            name: 'practice',
            path:'/practice',
            component: () => import('@/pages/nlpPractice/PracticePage.vue'),
            meta: {requiresAuth: true}
        },
        {
            name: 'userInfoMe',
            path: '/userInfoMe',
            component: () => import('@/components/UserInfoMe.vue'),
            meta: {requiresAuth: true}
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