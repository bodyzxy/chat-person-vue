<template>
    <div v-if="user" class="chatInfo">
        <div class="userTitle">
            <n-avatar round :size="48" :src="image" />
            <n-space class="userChatName">
                <n-button quaternary>
                    {{ props.user.userName }}
                </n-button>
            </n-space>
        </div>
        <div class="userContent">
            {{ props.user.content }}
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

                                    <n-avatar round :size="48" :src="image" />

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

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { ChatbubbleEllipsesSharp, PaperPlaneOutline } from '@vicons/ionicons5';
import { userInfo } from '../../../store/user';

const props = defineProps<{
  user: { 
    id: number;
    pid: number;
    databaseId: number;
    content: string;
    userName: string;
    toUserName: string | null;
    likesCount: number;
    createTime: string;
    updateTime: string;
    replies: Array<any>; // 这里定义为一个数组，表示评论的回复
  };
  replies: Array<any>; // 接收评论的回复
}>();

// 为方便使用 props，定义本地变量
// eslint-disable-next-line vue/no-dupe-keys
const user = userInfo(); // 当前用户
const userChat = props.replies; // 回复列表
const userChatMessage = ref(''); // 用于存储用户输入的评论消息
const parentCommentId = ref(props.user.pid); // 父评论ID，来自传入的 user
const image = "https://images.app.goo.gl/iqqFALJ8q2SPwKMi6"

function userChatRequest() {
  if (userChatMessage.value.trim()) {
    const newComment = {
      pid: parentCommentId.value, // 父评论的ID
      databaseId: props.user.databaseId, // 假设这个是你要提交的数据库ID
      content: userChatMessage.value, // 评论内容
      userName: user.username, // 当前用户的用户名
      toUserName: '', // 回复对象的用户名，一级评论为空
    };
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    // 将新的评论添加到 userChat（假设是将新的评论添加到当前评论列表中）
    userChat.unshift({
      ...newComment,
      data: formattedDate,
      content: userChatMessage.value
    });

    // 清空评论框
    userChatMessage.value = '';
  } else {
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