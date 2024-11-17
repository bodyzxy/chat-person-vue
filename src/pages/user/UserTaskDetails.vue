<template>
    <div class="taskDatabase">
        <div class="taskLift">
            <TaskDetailsLift :databaseId="databaseId" />
        </div>
        <div class="taskMessage">
            <n-split direction="horizontal" style="height: 100%;" default-size="200px">
                <template #1>
                    <!--TODO:需for循环遍历-->
                    <n-space>
                        <n-tag v-for="(tag, index) in tags" :key="index" type="info" closable size="large" round
                            @close="removeTag(index)">
                            {{ tag }}
                        </n-tag>
                    </n-space>
                </template>
                <!--对答-->
                <template #2>
                    <div class="pane">
                        <div v-for="(message, index) in messages" :key="index" class="message-container"
                            :class="{'ai-message': message.sender === 'AI'}">
                            <!--AI回答时在左边显示-->
                            <n-avatar v-if="message.sender === 'AI'" round :size="48" src="" />

                            <!--用户的消息显示在右边-->
                            <n-avatar v-else round :size="48" src=""/>

                            <!-- 消息内容显示 -->
                            <div class="message">
                                <p>{{ message.content }}</p>
                            </div>
                        </div>
                    </div>
                </template>
            </n-split>
        </div>
        <!--TODO:另一个页面实现-->
        <div class="taskRight">
            <TaskDetailsRight :databaseId="databaseId" />
        </div>
        <n-input v-model:value="inputMessage" placeholder="输入" class="taskDataInput" style="width: 1040px;" :autosize="{
            minRows: 1,
            maxRows: 3
        }" type="textarea">
            <template #suffix>
                <span class="task-icon-wrapper" @click="request(user_message, user_info)" :disabled="isSending">
                    <n-icon :component="PaperPlaneOutline" size="30px" />
                </span>
            </template>
        </n-input>
    </div>
</template>

<script setup lang="ts" name="UserTaskDetails">
import {
    PaperPlaneOutline,
} from '@vicons/ionicons5';
import TaskDetailsLift from './element/TaskDetailsLift.vue';
import TaskDetailsRight from './element/TaskDetailsRight.vue';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import {databaseId,tags,removeTag,messages,inputMessage,
    request,isSending
} from '../../api/user/taskDetails';
import useMsgStore from '../../store/msg';
import userInfo from '../../store/user';
import { cursorGetData, openDB } from '../../api/db/indexedDB';

const user_message = useMsgStore()
const user_info = userInfo()


onMounted(() => {
    user_message.messages = []
    messages.value = []
    const route = useRoute(); // 确保 useRoute 在 mounted 生命周期中调用
  
    // 获取并设置初始的 route params
    databaseId.value = route.params.id as string;

    if(databaseId.value != ""){
        openDB(databaseId.value, 1, databaseId.value, "id", ['sender', 'content']).then((db) => {
            //打开数据库成功
            console.log("查询成功",db)
            cursorGetData(db, databaseId.value, user_message)
            messages.value = user_message.getMessages;
        })
    }
  
    // 监听路由变化
    watch(() => route.params.id, (newId) => {
      databaseId.value = newId as string;
    });
  });

</script>

<style>
.taskDatabase {
    height: 100%;
    display: flex;
    justify-content: center;
}

.taskDataInput {
    position: absolute;
    border-radius: 40px;
    bottom: 30px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    /*剧中*/
    background-color: transparent;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.task-icon-wrapper {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    /* align-items: center; */
    /* 垂直居中 */
    /* cursor: pointer; */
}

.taskMessage {
    margin-top: 2%;
    width: 100%;
    height: 75%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    /*圆角*/
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
    display: flex; /* 使其支持 flex 布局 */
    flex-direction: column; /* 纵向排列子元素 */
}
.taskLift{
    width: 22%;
}
.taskRight{
    width: 25%;
}
.pane {
  padding: 20px;
  height: 90%;
  overflow-y: auto;
  flex: 1;
  /* position: fixed; 或者 fixed，根据需要 */
  /* bottom: 0; */
  border-radius: 20px;
}
.message-container {
  display: flex;
  align-items: flex-start; /* 垂直对齐 */
  margin-bottom: 10px; /* 消息之间的间距 */
  flex-direction: row-reverse;
}
.message-container.ai-message {
  flex-direction: row;/* AI 消息内容反向排列（头像在左） */
}

.message {
  max-width: 70%; /* 消息框的最大宽度 */
  padding: 10px;
  background-color: #f0f0f0; /* 消息框的背景色 */
  border-radius: 10px; /* 圆角 */
  font-size: 16px; /* 字体大小自适应 */
  word-wrap: break-word; /* 文字自动换行 */
}

.message-container.ai-message .message {
  background-color: #e0f7fa; /* AI 消息框的背景色不同 */
}

</style>