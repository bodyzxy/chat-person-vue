<template>
    <div class="database">
        <div class="message">
            <n-split direction="horizontal" style="height: 100%" default-size="200px">
                <template #1>
                    <!--TODO:需for循环遍历-->
                    <n-space>
                        <n-tag v-for="(tag, index) in tags" :key="index" type="info" closable size="large" round
                            @close="removeTag(index)">
                            {{ tag }}
                        </n-tag>
                    </n-space>
                </template>
                <!--对答,具体css样式在UserTaskDetails文件里面-->
                <template #2>
                    <div class="data-pane">
                        <div v-for="(message, index) in messages" :key="index" class="data-message-container"
                            :class="{'ai-message': message.sender === 'assistant'}">
                            <!--AI回答时在左边显示-->
                            <n-avatar v-if="message.sender === 'assistant'" round :size="48" src="" />

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
        <n-input placeholder="输入" v-model:value="inputMessage" class="dataInput" style="width: 1040px;" :autosize="{
            minRows: 1,
            maxRows: 3
        }" type="textarea">
            <template #prefix>
                <span class="icon-wrapper" @click="submitDatabse()">
                    <n-icon :component="Unlink" size="30px" />
                </span>
                <!-- 隐藏的文件输入框 -->
                <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
            </template>
            <template #suffix>
                <span class="icon-wrapper" @click="submit()" :disabled="isSending">
                    <n-icon :component="PaperPlaneOutline" size="30px" />
                </span>
            </template>
        </n-input>
    </div>
</template>

<script setup lang="ts" name="UserDatabase">
import {
    PaperPlaneOutline,
    Unlink
} from '@vicons/ionicons5';
import {submit,handleFileChange,fileInput,messages,removeTag,inputMessage,submitDatabse,isSending,tags,databaseId,
    requestTag
} from '../../api/userDatabase/userFiles';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { cursorGetData, openDB } from '../../api/db/indexedDB';
import { useMsgStore } from '../../store/msg';

const user_message = useMsgStore()

function updateChat(){
    openDB(String(databaseId.value), 1, String(databaseId.value), "id", ['sender', 'content']).then((db) => {
            //打开数据库成功
            console.log("查询成功",db)
            cursorGetData(db, String(databaseId.value), user_message)
            messages.value = user_message.getMessages;
    })
}

watch(() => isSending.value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    console.log("isSending changed from", oldVal, "to", newVal);
    if(newVal){
    //   updateChat()

    } else {
    //   updateChat()
    }
  }
}, { immediate: true }); // 设置 immediate 为 true 以便在初始化时就触发一次

onMounted(() => {
    const route = useRoute();
    if(route.params.id){
        databaseId.value = route.params.id;
        requestTag()
    }
    updateChat()
    
})
</script>

<style>
.database {
    height: 100%;
    display: flex;
    justify-content: center;
}

.dataInput {
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

.icon-wrapper {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    /* align-items: center; */
    /* 垂直居中 */
    /* cursor: pointer; */
}

.message {
    margin-top: 2%;
    width: 90%;
    height: 72%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    /*圆角*/
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
    display: flex; /* 使其支持 flex 布局 */
    flex-direction: column; /* 纵向排列子元素 */
}
.data-pane{
    padding: 20px;
  height: 90%;
  overflow-y: auto;
  flex: 1;
  /* position: fixed; 或者 fixed，根据需要 */
  /* bottom: 0; */
  border-radius: 20px;
}
.data-message-container{
    display: flex;
  align-items: flex-start; /* 垂直对齐 */
  margin-bottom: 10px; /* 消息之间的间距 */
  flex-direction: row-reverse;
}

.data-message-container.ai-message {
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

.data-message-container.ai-message .message {
  background-color: #e0f7fa; /* AI 消息框的背景色不同 */
}
</style>