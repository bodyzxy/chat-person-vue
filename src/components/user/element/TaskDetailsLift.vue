<template>
    <div>
        <n-icon @click="showPopover = !showPopover" class="taskLift">
            <ChatbubbleEllipsesSharp />
        </n-icon>

        <n-popover v-model:show="showPopover" trigger="manual" placement="bottom">
            <template #trigger>
                <span></span>
            </template>
            <div class="userChat">
                <!--TODO:发送消息同步到下面显示-->
                <n-input v-model:value="message" placeholder="输入" class="taskDetailsInput" :autosize="{
            minRows: 1,
            maxRows: 3
        }" type="textarea">
                    <template #suffix>
                        <span class="task-icon-wrapper" @click="request()">
                            <n-icon :component="PaperPlaneOutline" size="30px" />
                        </span>
                    </template>
                </n-input>
                <!-- TODO:改为用户的评论 -->
                <n-list>
                    <n-list-item v-for="(users,index) in user" :key="index" @click="showChat(users)"
                        class="userChatList">
                        <n-card>
                            <template #header>
                                <div class="userCardHeader">

                                    <n-avatar :size="48" :src="users.image" />

                                    <span class="userName">{{ users.name }}</span>
                                </div>
                            </template>

                            <p class="userContent">{{ users.content }}</p>
                        </n-card>
                    </n-list-item>
                </n-list>

                <!--弹窗显示评论-->
                <transition name="modal">
                    <n-modal v-model:show="showModal" title="聊天" size="large">
                        <UserChatInfo :user="selectedUser" />
                    </n-modal>
                </transition>
            </div>
        </n-popover>
    </div>
</template>

<script setup lang="ts" name="TaskDetailsLift">
import {
    ChatbubbleEllipsesSharp,
    PaperPlaneOutline
} from '@vicons/ionicons5';
import {user} from '../../../api/user/userInfoData';
import UserChatInfo from './UserChatInfo.vue';
import {showPopover,showModal,selectedUser,showChat,message} from '../../../api/user/taskDetailsLift';

const props = defineProps<{ databaseId: string | null }>();  // 允许 databaseId 为 string 或 null

function request(){
    if (message.value.trim() !== '') {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        // 将新消息添加到选中的用户
        const newComment = {
            image: "https://images.app.goo.gl/iqqFALJ8q2SPwKMi6",
            name: "新用户",
            content: message.value,
            data: formattedDate,
        };
        //将新评论添加到user数组的头部
        user.value.unshift(newComment);
        
        // 清空输入框
        message.value = '';
    } else {
      console.log('消息为空');
    }
}
</script>

<style>
.taskLift{
    margin-top: 10px;
    margin-left: 10px;
    font-size: 30px;
}
.userChat{
    width: 300px;
    height: 450px;
    overflow-y: auto;
}
.taskDetailsInput{
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
.userChatList {
  margin-bottom: 10px;
}

.userCardHeader {
  display: flex;
  align-items: center;
}

.userName {
  font-weight: bold;
  margin-left: 10px;
}

.userContent {
  /* 控制文字溢出效果 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 限制显示两行 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
.task-icon-wrapper {
    cursor: pointer; /* 鼠标变成小手指 */
}
</style>