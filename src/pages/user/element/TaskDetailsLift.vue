<template>
    <div>
        <div>
            <n-float-button position="relative" @click="togglePopover">
                <n-badge :value="counts" :offset="[6, -8]">
                    <n-icon>
                        <ChatbubbleEllipsesOutline />
                    </n-icon>
                </n-badge>
            </n-float-button>
        </div>
        <n-virtual-list
        style="max-height: 540px; margin-top: 20px; border-radius: 20px;margin-right: 10%;"
        :item-size="50"
        :items="items"
        item-resizable
        >
            <template #default="{ item, index }">
                <div
                :key="item.key"
                class="item"
                @click="showChat(index)"
                style="
                    padding: 10px; 
                    margin: 5px 0; 
                    background-color: #e6f7ff; 
                    border-radius: 10px; 
                    border-bottom: 1px solid #d9d9d9; 
                    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
                "         
                >
                <span
                    style="
                        font-size: 12px; 
                        line-height: 1.5; 
                        word-wrap: break-word; 
                        word-break: break-word; 
                        white-space: normal;
                    "
                    >
                        {{ item.message }}
                    </span>
                </div>
            </template>
        </n-virtual-list>

        <transition name="modal">
            <n-modal v-model:show="showModal" title="聊天" size="large">
                <UserChatInfo :user="selectedUser" />
            </n-modal>
        </transition>

    </div>
</template>

<script setup lang="ts" name="TaskDetailsLift">
import {
    ChatbubbleEllipsesOutline
} from '@vicons/ionicons5';
import {user} from '../../../api/user/userInfoData';
import UserChatInfo from './UserChatInfo.vue';
import {showPopover,showModal,selectedUser,message} from '../../../api/user/taskDetailsLift';

const props = defineProps<{ databaseId: string | null }>();  // 允许 databaseId 为 string 或 null

const counts = user.value.length;

const items = user.value.map((u, i) => ({
  key: `${i}`,
  avatar: u.image,
  message: u.content,
}));
// 点击 n-list-item 时显示用户详情
function showChat(index: number) {
  selectedUser.value = user.value[index];  // 设置当前选择的用户
  showModal.value = true;  // 显示弹框
}
// 切换显示状态
function togglePopover() {
    showPopover.value = !showPopover.value;
}
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
.item {
  display: flex;
  align-items: flex-start;
}
.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>