<template>
  <n-space vertical class="space">
    <n-layout>
      <n-layout-header class="tap">
        <n-button strong secondary round class="register">
          <RouterLink to="/home" style="color: black;">首页</RouterLink>
        </n-button>
        <n-button strong secondary round class="plaza">
          <RouterLink to="/userPlaza" style="color: black;">广场</RouterLink>
        </n-button>
        <n-button strong secondary round class="userInfo">
          <!-- TODO 这里要进行ROLE的判断然后来去定显示什么 -->
          <RouterLink to="/userInfo" style="color: black;">个人中心</RouterLink>
          <!-- admin的时候显示 -->
          <!-- <RouterLink>退出</RouterLink> -->
        </n-button>
      </n-layout-header>
    </n-layout>
  </n-space>
  <!--切换动画-->
  <RouterView v-slot="{Component, route}">
    <Transition name="fade" mode="out-in" appear>
      <component :is="Component" :key="route.path"/>
    </Transition>
  </RouterView>
</template>

<script setup lang="ts" name="IndexHome">
    import {onMounted} from 'vue';
    import { RouterLink,RouterView } from 'vue-router';
    //页面整体颜色
    onMounted(() => {
        document.querySelector("body")?.setAttribute("style", "background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)");
    });
</script>

<style>
.tap {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  background-color: transparent;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.userInfo {
  margin-right: 10px;
}

.register {
  margin-left: auto;
}


/* 路由切换动画 */
/* fade-transform */
.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
}
 
/* 可能为enter失效，拆分为 enter-from和enter-to */
.fade-enter-from {  
  opacity: 0;
  transform: translateY(-30px);
}
.fade-enter-to { 
  opacity: 1;
  transform: translateY(0px);
}
 
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.plaza{
  margin-right: 5px;
  margin-left: 5px;
}
</style>