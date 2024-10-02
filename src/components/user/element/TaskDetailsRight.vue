<template>
    <div>
        <n-icon class="autherClass" @click="showPopover = !showPopover">
            <FingerPrintSharp />
        </n-icon>
        <n-popover v-model:show="showPopover" trigger="manual" placement="bottom" class="popoverClass">
            <template #trigger>
                <span></span>
            </template>
            <!--TODO:根据用户ID跳转页面-->
            <div class="avatarContainer">
                <RouterLink
                :to="{name:'autherInfo',params:{id: props.databaseId}}"
                style="text-decoration: none;"
                >
                    <n-avatar round :size="60" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                </RouterLink>
            </div>
            <!--TODO:根据传过来的id找到用户信息显示-->
            <div class="nameClass">
                <p>name</p>
            </div>
            <div class="likeClass">
                <n-icon class="likeIcon" @click="handleLike">
                    <HeartSharp />
                </n-icon>
                <n-icon class="likeIcon" @click="handleDislike">
                    <HeartDislikeSharp />
                </n-icon>
            </div>
        </n-popover>
    </div>
</template>

<script setup lang="ts">
import {FingerPrintSharp,HeartSharp,HeartDislikeSharp} from '@vicons/ionicons5';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const showPopover = ref(false)
const props = defineProps<{ databaseId: string | null }>();  // 允许 databaseId 为 string 或 null

const handleLike = () => {
  console.log('Liked!');
};

const handleDislike = () => {
  console.log('Disliked!');
};
</script>

<style>
.autherClass{
    margin-top: 10px;
    margin-left: 20px;
    font-size: 40px;
}
.popoverClass{
    width: 200px;
    height: 300px;
    display: flex;               /* 使用 flex 布局 */
    justify-content: center;      /*水平居中 */
    align-items: center;          /* 垂直居中 */
    flex-direction: column;       /* 垂直方向排列 */
}
.likeClass{
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 20px;
    margin-top: 50px;
    /* background-color: blue; */
    font-size: 50px;
    display: flex;     /*启用 flex 布局 */
    gap: 20px;         /* 设置图标之间的距离，可以根据需要调整 */
    align-items: center; /* 垂直居中图标 */
}
.nameClass{
    margin-top: 20px;
    display: flex;               /* 使用 flex 布局 */
    /* justify-content: center;      水平居中 */
    align-items: center;          /* 垂直居中 */
    flex-direction: column;       /* 垂直方向排列 */
    font-size: 20px;
}
.avatarContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; /* 确保容器宽度占满 popover */
}
.likeIcon:active {
    transform: scale(0.9);         /* 点击时缩小图标 */
}

.likeIcon:hover {
    color: red;                   /* 悬停时改变颜色 */
}
</style>