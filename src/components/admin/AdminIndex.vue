<template>
    <n-space vertical class="adminSpace"> 
        <n-layout>
            <n-layout-header class="adminTap">
                <n-button strong secondary round class="adminMain">
                    <RouterLink to="/adminHome" style="color: black;">首页</RouterLink>
                </n-button>
                <n-button strong secondary round class="logout">
                    退出
                </n-button>
            </n-layout-header>
        </n-layout>
    </n-space>
    <!-- <RouterView></RouterView> -->
    <RouterView v-slot="{Component, route}">
        <Transition name="fade" mode="out-in" appear>
            <component :is="Component" :key="route.path"/>
        </Transition>
    </RouterView>   
</template>

<script lang="ts" setup name="adminIndex">
    import { RouterLink, RouterView } from 'vue-router';
</script>

<style>
.adminSpace {
    position: relative; /* 确保 z-index 生效需要设置为 relative 或更高的定位 */
    z-index: 2; /* 比 .sider 的 z-index 高 */
}
.adminTap {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  background-color: transparent;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.adminMain {
  margin-left: auto;
}

</style>