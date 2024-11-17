<template>
  <div class="authInfo">
    <div class="g-container">
      <div class="g-view">
        <div class="g-text">{{ autherId }} </div>
      </div>
      <div class="g-view">
        <div class="g-text">{{ autherId }} </div>
      </div>
      <div class="g-view">
        <div class="g-text">{{ autherId }} </div>
      </div>
      <div class="g-view">
        <div class="g-text">{{ autherId }} </div>
      </div>
      <div class="g-view">
        <div class="g-text">{{ autherId }} </div>
      </div>
      <div class="g-view">
        <div class="g-text">{{ autherId }} </div>
      </div>
      <div class="g-view">
        <div class="g-text">{{ autherId }} </div>
      </div>
      <div class="g-view">
        <div class="g-text">{{ autherId }} </div>
      </div>
      <div class="g-view">
        <div class="g-text">{{ autherId }} </div>
      </div>
      <div class="g-view">
        <div class="g-text">{{ autherId }} </div>
      </div>
      <div class="g-view">
        <div class="g-text">{{ autherId }} </div>
      </div>
    </div>
    <n-space>
      <n-button quaternary class="authSize gradientText" @click="currentView = 'database'">
        数据库
      </n-button>
      <n-button quaternary class="authSize gradientText" @click="currentView = 'introduction'">
        介绍
      </n-button>
      <n-button quaternary class="authSize gradientText" @click="currentView = 'sponsor'">
        赞助
      </n-button>
    </n-space>
    <n-divider />
    <n-layout class="autherLayout">
      <n-layout-footer class="autherFooter">
        <!--TODO 使用for循环遍历显示-->
        <n-list hoverable clickable class="autherList">
          <n-scrollbar>
            <div class="autherMiddle" @scroll="handleScroll">
              <div v-if="currentView === 'database'">
                <n-list-item v-for="(task, index) in visibleDataBase">
                  <RouterLink :to="{name:'taskDetails', params: {id:task.title}}" style="text-decoration: none;">
                    <n-thing :title="task.title" content-type="margin-top: 10px">
                      <template #description>
                        <n-space size="small" style="margin-top: 4px;">
                          <n-tag :bordered="false" type="info" size="small">
                            {{ task.time }}
                          </n-tag>
                        </n-space>
                      </template>
                      {{ task.content }}
                    </n-thing>
                  </RouterLink>
                </n-list-item>
              </div>
              <!--跳转介绍页面-->
              <div v-if="currentView === 'introduction'">
                <p>介绍</p>
              </div>
              <!--跳转赞助页面-->
              <div v-if="currentView === 'sponsor'">
                <p>赞助</p>
              </div>
            </div>
          </n-scrollbar>
        </n-list>
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<script setup lang="ts" name="AutherInfo">
import { onMounted, ref, onBeforeUnmount, onUnmounted } from "vue";
import { useRoute } from 'vue-router';
import {visibleDataBase,handleScroll} from '../../api/user/plazaMiddle';

const autherId = ref('')
const currentView = ref('database')

//TODO:此处的id应该未用户的ID
onMounted(() => {
    const route = useRoute();
    if(route.params.id){
        autherId.value = route.params.id as string;
    }
})
</script>

<style>
.autherLayout{
    width: 100%;
}
.gradientText {
    font-family: 'Arial', sans-serif;
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 1px 1px 1px #777777, /* 外部阴影 */
                 -1px -1px 1px #333333; /* 内部阴影 */
}
.autherFooter{
    height: 100%;
}
.autherList{
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    border-radius: 10px;
}
.autherMiddle{
    max-height: 640px;
    overflow-y: auto; /*启用了垂直滚动条 */
    padding-right: 4px; /*为滚动条预留了空间，避免内容被遮挡*/
}
.authInfo{
    height: calc(100vh - 50px);  /* 100vh 表示视口高度，减去顶部菜单高度 */
    background-color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow-y: auto;
    align-items: center;
}
.g-container {
  position: relative;
  margin: 10vh auto;
  width: 33vw;
  height: 6%;
  filter: blur(0.2vw) contrast(8);
}

.g-view {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg) scale(1);
  position: absolute;
  overflow: hidden;
  font-size: 6vw;
  height: 10vw;
}

.g-text {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 33vw;
  text-align: center;
}

.g-view:nth-child(0) {
  width: 0vw;
  -webkit-animation: rotate 1.5s ease-in 0ms;
          animation: rotate 1.5s ease-in 0ms;
  z-index: 10;
}
.g-view:nth-child(0)::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: -3vw;
  height: 10vw;
  background: #fff;
  z-index: 1;
}

.g-view:nth-child(1) {
  width: 3vw;
  -webkit-animation: rotate 1.5s ease-in 100ms;
          animation: rotate 1.5s ease-in 100ms;
  z-index: 9;
}
.g-view:nth-child(1)::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0vw;
  height: 10vw;
  background: #fff;
  z-index: 1;
}

.g-view:nth-child(2) {
  width: 6vw;
  -webkit-animation: rotate 1.5s ease-in 200ms;
          animation: rotate 1.5s ease-in 200ms;
  z-index: 8;
}
.g-view:nth-child(2)::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3vw;
  height: 10vw;
  background: #fff;
  z-index: 1;
}

.g-view:nth-child(3) {
  width: 9vw;
  -webkit-animation: rotate 1.5s ease-in 300ms;
          animation: rotate 1.5s ease-in 300ms;
  z-index: 7;
}
.g-view:nth-child(3)::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6vw;
  height: 10vw;
  background: #fff;
  z-index: 1;
}

.g-view:nth-child(4) {
  width: 12vw;
  -webkit-animation: rotate 1.5s ease-in 400ms;
          animation: rotate 1.5s ease-in 400ms;
  z-index: 6;
}
.g-view:nth-child(4)::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 9vw;
  height: 10vw;
  background: #fff;
  z-index: 1;
}

.g-view:nth-child(5) {
  width: 15vw;
  -webkit-animation: rotate 1.5s ease-in 500ms;
          animation: rotate 1.5s ease-in 500ms;
  z-index: 5;
}
.g-view:nth-child(5)::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12vw;
  height: 10vw;
  background: #fff;
  z-index: 1;
}

.g-view:nth-child(6) {
  width: 18vw;
  -webkit-animation: rotate 1.5s ease-in 600ms;
          animation: rotate 1.5s ease-in 600ms;
  z-index: 4;
}
.g-view:nth-child(6)::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15vw;
  height: 10vw;
  background: #fff;
  z-index: 1;
}

.g-view:nth-child(7) {
  width: 21vw;
  -webkit-animation: rotate 1.5s ease-in 700ms;
          animation: rotate 1.5s ease-in 700ms;
  z-index: 3;
}
.g-view:nth-child(7)::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 18vw;
  height: 10vw;
  background: #fff;
  z-index: 1;
}

.g-view:nth-child(8) {
  width: 24vw;
  -webkit-animation: rotate 1.5s ease-in 800ms;
          animation: rotate 1.5s ease-in 800ms;
  z-index: 2;
}
.g-view:nth-child(8)::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 21vw;
  height: 10vw;
  background: #fff;
  z-index: 1;
}

.g-view:nth-child(9) {
  width: 27vw;
  -webkit-animation: rotate 1.5s ease-in 900ms;
          animation: rotate 1.5s ease-in 900ms;
  z-index: 1;
}
.g-view:nth-child(9)::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24vw;
  height: 10vw;
  background: #fff;
  z-index: 1;
}

.g-view:nth-child(10) {
  width: 30vw;
  -webkit-animation: rotate 1.5s ease-in 1000ms;
          animation: rotate 1.5s ease-in 1000ms;
  z-index: 0;
}
.g-view:nth-child(10)::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 27vw;
  height: 10vw;
  background: #fff;
  z-index: 1;
}

.g-view:nth-child(11) {
  width: 33vw;
  -webkit-animation: rotate 1.5s ease-in 1100ms;
          animation: rotate 1.5s ease-in 1100ms;
  z-index: -1;
}
.g-view:nth-child(11)::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 10vw;
  background: #fff;
  z-index: 1;
}

@-webkit-keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1, 1);
  }
  70% {
    transform: translate(-50%, -50%) rotate(180deg) scale(0.1, 0.5);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) scale(1, 1);
  }
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1, 1);
  }
  70% {
    transform: translate(-50%, -50%) rotate(180deg) scale(0.1, 0.5);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) scale(1, 1);
  }
}
</style>