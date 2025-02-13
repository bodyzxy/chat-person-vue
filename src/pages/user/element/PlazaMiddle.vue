<!-- eslint-disable vue/valid-v-for -->
<template>
    <n-layout>
        <n-layout-footer class="plazaFooter">
            <!--TODO 使用for循环遍历显示-->
            <n-list hoverable clickable class="plazaList">
                <n-scrollbar>
                    <div class="plazaMiddle" @scroll="handleScroll">
                        <n-list-item v-for="(task, index) in visibleDataBase" class="list-item-palaza">
                            <RouterLink :to="{name:'taskDetails', params: {id:task.id}}"
                                style="text-decoration: none;">
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
                    <div class="pagination-container" v-if="visibleDataBase.length">
                        <n-pagination v-model:page="page" :page-count="totalPages" simple/>
                    </div>
                </n-scrollbar>
            </n-list>
        </n-layout-footer>
    </n-layout>

</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { visibleDataBase, handleScroll, totalPages, loadDatabaseData, currentPage } from '../../../api/user/plazaMiddle';
const page = ref(1)

watch(page, (newPage) => {
    currentPage.value = newPage - 1; // 更新当前页（假设 page 从 1 开始）
    loadDatabaseData(); // 重新加载数据
})
onMounted(() => {
    loadDatabaseData();
})

</script>

<style>
.plazaFooter{
    display: flex;
    flex-direction: column;
    height: 100vh; /* 使 Footer 高度撑满整个页面 */
}
.name{
    font-size: 24px;
    top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.word{
    width: 260px;
    height: 50px;
    margin-top: 10px;
}
.plazaList{
    /* background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%); */
    border-radius: 10px;
    height: 100%;
}

.share{
    margin-left: 96%;
}
.shareIcon{
    margin-left: 90%;
}
.plazaMiddle{
    max-height: 770px;
    overflow-y: auto; /*启用了垂直滚动条 */
    padding-right: 4px; /*为滚动条预留了空间，避免内容被遮挡*/
    flex: 1;
}
.list-item-palaza {
    height: 20vh; /* 使每个列表项的高度是浏览器视口高度的20% */
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    width: 100%; /* 宽度占满容器 */
}
.pagination-container {
  display: flex;
  justify-content: center;
  padding: 100px 0; /* 确保分页与列表的间距 */
}
</style>