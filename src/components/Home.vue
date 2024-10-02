<template>
  <n-space vertical>
    <n-layout>
      <n-layout has-sider>
        <n-layout-sider bordered show-trigger collapse-mode="width" :collapsed-width="64" :width="240"
          :native-scrollbar="false" :inverted="inverted" :style="{height: siderHeight}">
          <n-menu :inverted="inverted" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
        </n-layout-sider>
        <n-layout class="windows">
        </n-layout>
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
              <span class="icon-wrapper" @click="sendMessage()">
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
import { h,  ref, type Component, onMounted} from 'vue';
import { NIcon} from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import {messages,inputMessage,sendMessage
} from '../api/user/home';
import {
  BookOutline as BookIcon,
  PaperPlaneOutline,
  Unlink
} from '@vicons/ionicons5';

const inverted = ref(false);
const siderHeight = ref('95vh');
const info = ref("");

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

//页面整体颜色
onMounted(() => {
  document.querySelector("body")?.setAttribute("style", "background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)");
});

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
}

.icon-wrapper{
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  cursor: pointer;
}

.chatContent {
  overflow-x: hidden;
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