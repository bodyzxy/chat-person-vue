<script setup lang="ts">
import { computed, ref } from 'vue';
import { handleScrollTitle, totalPages,  hotDataListTitle, goToUrl, itemsPerPage} from '../../../api/user/plazaMiddleHotTitle';
const page = ref(1)

const pagedDataTitle = computed(() => {
    const start = (page.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return hotDataListTitle.value.slice(start, end);
});
</script>

<template>
     <n-layout>
        <n-layout-footer>
            <n-list hoverable clickable class="hotTitleList" v-if="hotDataListTitle.length">
                <n-scrollbar>
                    <div class="plazaMiddleHotTitle" @scroll="handleScrollTitle">
                        <n-list-item v-for="(task) in pagedDataTitle" :key="task.id" class="list-title-palaza"
                            @click="goToUrl(task)">
                            <!-- 左侧内容 -->
                            <div class="list-item-left-title">
                                <div class="item-title-title">{{ task.title }}</div>
                                <div class="item-description-title">{{ task.description }}</div>
                            </div>

                            <!-- 右侧预览框 -->
                            <div class="list-item-right-title">
                                <iframe :src="task.url" frameborder="0" class="preview-frame-title"></iframe>
                            </div>
                        </n-list-item>
                    </div>
                    <div class="pagination-container" v-if="hotDataListTitle.length">
                        <n-pagination v-model:page="page" :page-count="totalPages" simple />
                    </div>
                </n-scrollbar>
            </n-list>
        </n-layout-footer>
    </n-layout>
</template>

<style>
.hotTitleList{
    border-radius: 10px;
    height: 100%;
}
.plazaMiddleHotTitle{
    max-height: 770px;
    overflow-y: auto; /*启用了垂直滚动条 */
    padding-right: 4px; /*为滚动条预留了空间，避免内容被遮挡*/
    flex: 1;
}
.list-title-palaza{
    height: 20vh; /* 使每个列表项的高度是浏览器视口高度的20% */
    background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
    width: 100%; /* 宽度占满容器 */
}
.list-item-left-title {
    flex: 1;
}

.item-title-title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
}

.item-description-title {
    font-size: 14px;
    color: #666;
}

.list-item-right-title {
    width: 120px; /* Set a fixed width for the preview box */
    height: 80px; /* Adjust the height for the preview box */
    margin-left: auto;
}

.preview-frame-title {
    width: 100%;
    height: 100%;
    border-radius: 8px;
}
.loading-container-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px; /* 根据需要调整高度 */
}
</style>