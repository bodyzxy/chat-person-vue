<script setup lang="ts" name="PlazaMiddleHotGithub">
import { computed, onMounted, ref } from 'vue';
import { handleScroll, totalPages,  hotDataList, goToUrl, loadHotGithub, itemsPerPage, load} from '../../../api/user/plazaMiddleHotGithub';
const page = ref(1)

// 获取当前页显示的数据
const pagedData = computed(() => {
    const start = (page.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return hotDataList.value.slice(start, end);
});

onMounted(() => {
    // loadHotGithub();
    console.log("进入githubr")
})
</script>

<template>
    <n-layout>
        <n-layout-footer>
            <n-list hoverable clickable class="hotGithubList" v-if="hotDataList.length">
                <n-scrollbar>
                    <div class="plazaMiddleHotGithub" @scroll="handleScroll">
                        <n-list-item v-for="(task) in pagedData" :key="task.id" class="list-github-palaza"
                            @click="goToUrl(task)">
                            <!-- 左侧内容 -->
                            <div class="list-item-left">
                                <div class="item-title">{{ task.title }}</div>
                                <div class="item-description">{{ task.description }}</div>
                            </div>

                            <!-- 右侧预览框 -->
                            <div class="list-item-right">
                                <!-- <iframe :src="task.url" frameborder="0" class="preview-frame"></iframe> -->
                            </div>
                        </n-list-item>
                    </div>
                    <div class="pagination-container" v-if="hotDataList.length">
                        <n-pagination v-model:page="page" :page-count="totalPages" simple />
                    </div>
                </n-scrollbar>
            </n-list>
        </n-layout-footer>
    </n-layout>
</template>

<style>
.hotGithubList{
    border-radius: 10px;
    height: 80%;
}
.plazaMiddleHotGithub{
    max-height: 600px;
    overflow-y: auto; /*启用了垂直滚动条 */
    padding-right: 4px; /*为滚动条预留了空间，避免内容被遮挡*/
    flex: 1;
}
.list-github-palaza {
    height: 20vh; /* 使每个列表项的高度是浏览器视口高度的20% */
    background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
    width: 100%; /* 宽度占满容器 */
}
.list-item-left {
    flex: 1;
}

.item-title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
}

.item-description {
    font-size: 14px;
    color: #666;
}

.list-item-right {
    width: 120px; /* Set a fixed width for the preview box */
    height: 80px; /* Adjust the height for the preview box */
    margin-left: auto;
}

.preview-frame {
    width: 100%;
    height: 100%;
    border-radius: 8px;
}
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px; /* 根据需要调整高度 */
}
</style>