<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <n-space vertical>
    <n-layout>
      <n-layout has-sider>
        <n-layout-sider bordered show-trigger collapse-mode="width" :collapsed-width="64" :width="240"
          :native-scrollbar="false" :inverted="inverted" :style="{height: siderHeight}">
          <n-menu :inverted="inverted" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
          @click="handleMenuSelect" />
        </n-layout-sider>
        <!-- TODO:视屏展示 -->
        <n-layout class="windows">
        </n-layout>
        <!-- 对话框的展示 -->
        <n-layout-content class="chatWindows">
          <div class="chatContent" ref="chatBox">
            <!--对话的显示需要定义数据类型，这里要使用v-for进行循环遍历-->
            <div v-for="(messageInfo, index) in messages" :key="index" class="home-message-container"
              :class="{'home-ai-message': messageInfo.sender === 'AI'}">
              <!--AI回答时在左边显示-->
              <n-avatar v-if="messageInfo.sender === 'AI'" round :size="48" src="" />

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
              <span class="icon-wrapper" @click="sendMessage(activeKey,user_info,use_message)" :disabled="isSending">
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
import { h,  onMounted,  ref, type Component,} from 'vue';
import { NIcon} from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import {messages,inputMessage,sendMessage,isSending
} from '../api/user/home';
import {
  BookOutline as BookIcon,
  PaperPlaneOutline,
  Unlink
} from '@vicons/ionicons5';
import { cursorGetData, deleteData, openDB } from '../api/db/indexedDB';
import useMsgStore from '../store/msg';
import userInfo from '../store/user';

const inverted = ref(false);
const siderHeight = ref('95vh');
const activeKey = ref<string>(''); // 用于保存当前选中的菜单项 key
const use_message = useMsgStore();
const user_info = userInfo();

// 监听菜单项的选择，更新 activeKey
function handleMenuSelect(key: string) {
  activeKey.value = key.srcElement.innerText; //获取文本
  console.log("sdasdasdasdas",messages.value)
  messages.value = [];
  use_message.messages = [];
  if(activeKey.value != ''){
    openDB(activeKey.value, 1, activeKey.value, "id", ['sender', 'content']).then((db) => {
      //打开数据库成功
				console.log("准备查询", db);
        cursorGetData(db, activeKey.value,use_message)
        messages.value = use_message.getMessages;
    })
  }
  console.log(activeKey.value)
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
function sendEmail(){
  console.log("上传!!")
}
const menuOptions: MenuOption[] = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    // disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    // key: 'a-wild-sheep-chase',
    // disabled: true,
    icon: renderIcon(BookIcon)
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    // disabled: true,
    icon: renderIcon(BookIcon)
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    // disabled: true,
    icon: renderIcon(BookIcon)
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '第一节',
        key: 'people',
        icon: renderIcon(BookIcon),
        children: [
          {
            label: '1.1节',
            key: 'narrator',
            icon: renderIcon(BookIcon)
          },
          {
            label: '1.2节',
            key: 'sheep-man',
            icon: renderIcon(BookIcon)
          }
        ]
      },
      {
        label: '第二节',
        key: 'second',
        icon: renderIcon(BookIcon),
        children: [
          {
            label: '2.1节',
            key: 'whisky',
            icon: renderIcon(BookIcon),
          }
        ]
      },
    ]
  }
]

onMounted(() => {
  // if(activeKey.value != ''){
  //   openDB(activeKey.value, 1, activeKey.value, "id", ['sender', 'content']).then((db) => {
  //     //打开数据库成功
	// 			console.log("准备查询", db);
  //       cursorGetData(db, activeKey.value,use_message)
  //       messages.value = use_message.getMessages;
  //   })
  // }
})

</script>

<style scoped lang="less">
.menu {
  width: 250px;
}
.windows{
  max-height: 100%;
  max-width: 50%;
  background-color: #d4fc79;
}

.chatWindows{
  width: 6%;
  background-color: aqua;
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
</style>