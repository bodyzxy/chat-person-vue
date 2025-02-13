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
import {submit,handleFileChange,fileInput,messages,removeTag,inputMessage,submitDatabse,isSending,tags} from '../../api/userDatabase/userFiles';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const databaseId = ref();

onMounted(() => {
    const route = useRoute();
    if(route.params.id){
        databaseId.value = route.params.id;
    }
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
    align-items: center;
    /* 垂直居中 */
    cursor: pointer;
}

.message {
    margin-top: 2%;
    width: 90%;
    height: 72%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    /*圆角*/
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
}
</style>