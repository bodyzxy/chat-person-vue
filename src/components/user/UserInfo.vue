<template>
    <div class="page">
        <n-layout has-sider class="userLayout">
            <n-layout-sider class="userSider">
                <n-avatar class="avatar" round :size="100"
                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                <br>
                <n-gradient-text class="name" gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)">
                    姓名
                </n-gradient-text>
                <n-divider />
                <n-button strong secondary round type="primary" style="width: 260px;height: 50px;">
                    历史
                </n-button>
                <n-button strong secondary round type="primary" class="word">
                    <RouterLink to="/userInfo/data" style="color: black;">数据库</RouterLink>
                </n-button>
                <n-button strong secondary round type="primary" class="word">
                    <RouterLink to="/userDatabase" style="color: black;">创建数据库</RouterLink>
                </n-button>
                <n-button strong secondary round type="primary" class="word" @click="logout">
                    退出
                </n-button>
            </n-layout-sider>
            <n-layout>
                <n-layout-footer class="userFooter">
                    <!--TODO 使用for循环遍历显示-->
                    <n-list hoverable clickable class="list">
                        <n-scrollbar style="max-height: 100%;">
                            <n-list-item v-for="(task, index) in dataBase">
                                <!--TODO: 这里需要将params改为id-->
                                <RouterLink :to="{name:'taskDetails', params: {id:task.title}}" style="text-decoration: none;">
                                    <n-thing :title="task.title" content-type="margin-top: 10px">
                                        <template #description>
                                            <n-space size="small" style="margin-top: 4px;">
                                                <n-tag :bordered="false" type="info" size="small">
                                                    {{ task.time }}
                                                </n-tag>
                                            </n-space>
                                        </template>
                                        {{ task.content }}
                                    </n-thing>
                                </RouterLink>
                            </n-list-item>
                        </n-scrollbar>
                    </n-list>
                </n-layout-footer>
            </n-layout>
        </n-layout>
    </div>
</template>

<script setup lang="ts" name="UserInfo">
    import { RouterLink,RouterView } from 'vue-router';
    import {dataBase} from '../../api/user/userInfoData';
    import {logout} from '../../api/user/logout';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
.page{
    height: 90%; 
    padding: 10px;
    margin: 10px;
    background-color: #fff; /* 可选：设置背景色 */
    border-radius: 8px; /* 可选：设置圆角 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
    opacity: 0.9;
}
.userLayout{
    height: 100%;
    width: 100%;
    margin-right: 20px; /* 右边距离页面边缘的距离 */
    margin-bottom: 20px; /* 底部距离页面边缘的距离 */
}
.userHeader{
    height: 20%;
}
.userSider{
    position: relative;
    height: 590px;
}
.avatar{
    left: 32%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 20px; 
}
.userFooter{
    height: 100%;
}
.name{
    font-size: 24px;
    top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.word{
    width: 260px;
    height: 50px;
    margin-top: 10px;
}
.list{
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    border-radius: 10px;
}

.share{
    margin-left: 96%;
}

.shareIcon{
    margin-left: 90%;
}
</style>