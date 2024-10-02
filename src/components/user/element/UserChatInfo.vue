<template>
    <div v-if="user" class="chatInfo">
        <div class="userTitle">
            <n-avatar round :size="48" :src="user.image" />
            <n-space class="userChatName">
                <n-button quaternary>
                    {{ user.name }}
                </n-button>
            </n-space>
        </div>
        <div class="userContent">
            {{ user.content }}
        </div>
        <div class="userChatWithUser">
            <n-input v-model:value="userChatMessage" placeholder="评论" class="userChatWithUserInput" :autosize="{
            minRows: 1,
            maxRows: 3
        }" type="textarea">
                    <template #suffix>
                        <span class="task-icon-wrapper" @click="userChatRequest()">
                            <n-icon :component="PaperPlaneOutline" size="30px" />
                        </span>
                    </template>
                </n-input>
            <!--TODO:记得获取评论-->
            <n-list>
                <n-list-item v-for="(users,index) in userChat" :key="index"
                        class="userChatUserList">
                        <n-card>
                            <template #header>
                                <div class="userChatCardHeader">

                                    <n-avatar round :size="48" :src="users.image" />

                                    <span class="userChatName">{{ users.name }}</span>

                                    <p class="userChatData">{{ users.data }}</p>
                                </div>
                            </template>
                            <p class="userChatContent">{{ users.content }}</p>
                        </n-card>
                </n-list-item>
            </n-list>
        </div>
    </div>
</template>

<script setup lang="ts" name="UserChatInfo">
import { defineProps } from 'vue';
import {
    ChatbubbleEllipsesSharp,
    PaperPlaneOutline
} from '@vicons/ionicons5';
import {user as userChat, type User} from '../../../api/user/userInfoData';
import {userChatMessage} from '../../../api/user/userChatInfo';

// 使用 defineProps 来接收父组件传递的 props
// 定义 props，允许 user 为 null
const props = defineProps<{
  user: {
    image: string;
    name: string;
    content: string;
    data?: string;
  } | null;
}>();

// 解构 props 方便使用
const { user } = props;

function userChatRequest(){
    if(userChatMessage.value.trim() !== ''){
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const newComment = {
            image: "https://images.app.goo.gl/iqqFALJ8q2SPwKMi6",
            name: "新用户",
            content: userChatMessage.value,
            data: formattedDate,
        };

        //将新的评论添加到user中最前面
        userChat.value.unshift(newComment);
        //将userChatInfo清空
        userChatMessage.value = '';
    }else{
        console.log('输入信息为空');
    }
}

</script>

<style>
.chatInfo{
    width: 900px;
    height: 600px;
    background-color: aliceblue;
    border-radius: 10px;
    overflow-y: auto;
}
.userTitle{
    margin-top: 10px;
    height: 10%;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 10px;
    overflow-y: auto;
    display: flex;         /* 使内部元素水平排列 */
    background-color: white;
}
.userChatName{
    margin-left: 10px;
    margin-top: 0%;
}
.userContent{
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    height: 60%;
    border-radius: 10px;
    font-size: 20px;
    text-align: center;  /* 使文字水平居中 */
    background-color: white;
}
.userChatWithUser{
    height: 20%;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 10px;
    background-color: white;
}
.userChatWithUserInput{
    position: sticky;
    top: 0;
    z-index: 1000; /* 确保在页面滚动时一直在最前面 */
    background-color: white; /* 避免覆盖在其他元素上时背景透明 */
    width: 100%;
    border-radius: 40px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    /*剧中*/
    background-color: transparent;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.userChatUserList{
    margin-bottom: 10px;
}
.userChatCardHeader{
    display: flex;
    align-items: center;
}
.userChatName{
    font-weight: bold;
    margin-left: 10px;
}
.userChatContent{

}
.userChatData{
    margin-left: auto;
}
</style>