<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <n-space vertical>
    <n-layout>
      <n-layout has-sider>
        <n-layout-sider bordered show-trigger collapse-mode="width" :collapsed-width="64" :width="240"
          :native-scrollbar="false" :inverted="inverted" :style="{height: siderHeight}">
          <n-menu :inverted="inverted" :collapsed-width="64" :collapsed-icon-size="22" :options="commonMenu"
            @update:value="handleMenuSelect" />
        </n-layout-sider>
        <!-- TODO:视屏展示 -->
        <n-layout class="windows">
          <div class="video-container">
            <n-card class="vidde-card" v-if="selectedUrl">
              <video controls>
                <source :src="selectedUrl" type="video/mp4">
                你的浏览器不支持视频播放。
              </video>
            </n-card>
            <n-card v-else title="暂无视屏" class="vidde-card">
              <n-empty description="请选择其他节进行播放" />
            </n-card>
          </div>
        </n-layout>
        <!-- 对话框的展示 -->
        <n-layout-content class="chatWindows">
          <div class="chatContent" ref="chatBox">
            <!--对话的显示需要定义数据类型，这里要使用v-for进行循环遍历-->
            <div v-for="(messageInfo, index) in messages" :key="index" class="home-message-container"
              :class="{'home-ai-message': messageInfo.sender === 'assistant'}">
              <!--AI回答时在左边显示-->
              <n-avatar v-if="messageInfo.sender === 'assistant' && load" round :size="48" src="">
                <!-- 显示加载动画 -->
                <n-spin size="large" />
              </n-avatar>

              <!--用户的消息显示在右边-->
              <n-avatar v-else round :size="48" src="" />

              <!-- 消息内容显示 -->
              <div class="home-message">
                <p>{{ messageInfo.content }}</p>
              </div>
            </div>
          </div>
          <n-input v-model:value="inputMessage" round placeholder="输入" class="input" type="textarea" :autosize="{
              minRows: 1,
              maxRows: 3
            }">
            <template #prefix>
              <span class="icon-wrapper" @click="sendEmail()">
                <n-icon :component="Unlink" size="20px" />
              </span>
            </template>
            <template #suffix>
              <span class="icon-wrapper" @click="sendMessage(activeKey)" :disabled="isSending" v-if="sendLoad">
                <n-icon :component="PaperPlaneOutline" size="20px" />
              </span>
            </template>
          </n-input>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts" name="Home">
import { h,  onMounted,  ref, VNode, watch, watchEffect, type Component,} from 'vue';
import { MenuOption, NIcon} from 'naive-ui';
import {messages,inputMessage,sendMessage,isSending,load
} from '../api/user/home';
import {
  PaperPlaneOutline,
  Unlink
} from '@vicons/ionicons5';
import { cursorGetData, deleteData, openDB } from '../api/db/indexedDB';
import {useMsgStore} from '../store/msg';
import {userInfo} from '../store/user';
import { CustomMenuOption } from '../common/menu';
import { commonMenu, loadMenu, selectedUrl } from '../api/user/homeMenu';

const inverted = ref(false);
const siderHeight = ref('95vh');
const activeKey = ref<string>(''); // 用于保存当前选中的菜单项 key
const use_message = useMsgStore();
const user_info = userInfo();
const keyValue = ref();//用户存储课程信息
const sendLoad = ref(false)

// 监听菜单项的选择，更新 activeKey
function handleMenuSelect(key: string) {
  sendLoad.value = true

  const selectedItem = findMenuOptionByKey(commonMenu.value, key);
  keyValue.value = key;
  console.log(selectedItem)
  if(selectedItem !== null){
    activeKey.value = selectedItem?.label; //获取文本
    console.log("sdasdasdasdas", messages.value)
    selectedUrl.value = selectedItem?.url;
    messages.value = [];
    use_message.messages = [];
    if (activeKey.value != '') {
      openDB(activeKey.value, 1, activeKey.value, "id", ['sender', 'content']).then((db) => {
        //打开数据库成功
        console.log("准备查询", db);
        cursorGetData(db, activeKey.value, use_message)
        messages.value = use_message.getMessages;
      })
    }
    console.log(activeKey.value)
  }
}

function findMenuOptionByKey(options: CustomMenuOption[], key: string): CustomMenuOption | null {
  for (const option of options) {
    if (option.key === key) {
      return option;
    }
    // if (option.children) {
    //   const found = findMenuOptionByKey(option.children, key);
    //   if (found) return found;
    // }
  }
  return null;
}

function sendEmail(){
  console.log("上传!!")
}


onMounted(() => {
  loadMenu();
  deleteData("且听风吟 1973年的弹珠玩具 寻羊冒险记 寻羊冒险记 寻羊冒险记 舞，舞，舞")
  deleteData("")
})

watch(() => isSending.value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    console.log("isSending changed from", oldVal, "to", newVal);
    if(newVal){
      handleMenuSelect(keyValue.value)
    } else {
      handleMenuSelect(keyValue.value)
    }
  }
}, { immediate: true }); // 设置 immediate 为 true 以便在初始化时就触发一次

</script>

<style scoped lang="less">
.menu {
  width: 250px;
}
.windows{
  max-height: 100%;
  max-width: 50%;
  // background-color: #d4fc79;
}

.chatWindows{
  width: 6%;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
}

.input{
  position: absolute;
  bottom: 30px;
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

.icon-wrapper{
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  cursor: pointer;
}

.chatContent {
  top: 20px;
  position: absolute; /* 或者 fixed，根据需要 */
  bottom: 70px; /* 固定在底部 */
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto; /* 超出时显示滚动条 */
  max-height: 600px; /* 设置最大高度 */
}
ul {
  list-style: none;
  padding: 20px;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
}
li.left {
  margin-right: 20px;
}
li.left span {
  display: inline-block;
  border-radius: 0 15px 15px;
  background-color: rgba(66, 196, 240, 0.1);
  padding: 10px 15px;
}
li.right {
  margin-left: 20px;
  text-align: right;
}
li.right span {
  display: inline-block;
  border-radius: 15px 0 15px 15px;
  background-color: rgba(73, 154, 41, 0.1);
  padding: 10px 15px;
}
li+li {
  margin-top: 20px;
}
.home-message-container {
  display: flex;
  align-items: flex-start; /* 垂直对齐 */
  margin-bottom: 10px; /* 消息之间的间距 */
  flex-direction: row-reverse;
}
.home-message-container.home-ai-message {
  flex-direction: row;/* AI 消息内容反向排列（头像在左） */
}
.home-message {
  max-width: 70%; /* 消息框的最大宽度 */
  padding: 10px;
  background-color: #f0f0f0; /* 消息框的背景色 */
  border-radius: 10px; /* 圆角 */
  font-size: 16px; /* 字体大小自适应 */
  word-wrap: break-word; /* 文字自动换行 */
}
.video-container {
  display: flex;
  // justify-content: center;  /* 水平居中 */
  align-items: center;      /* 垂直居中（可选） */
  height: 100%;            /* 让它撑满父级高度 */
}
.vidde-card{
  height: 90%;
  margin-top: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;  /* 水平居中 */
  // align-items: center;      /* 垂直居中（可选） */
}
video{
  height: 100%;
  width: 100%;
}
</style>