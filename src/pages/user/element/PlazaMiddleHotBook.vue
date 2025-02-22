<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { handleScrollBook, totalPages,  hotDataListBook, goToUrl, loadHotBook, itemsPerPage} from '../../../api/user/plazaMiddleHotBook';
const page = ref(1)

// 获取当前页显示的数据
const pagedDataBook = computed(() => {
    const start = (page.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return hotDataListBook.value.slice(start, end);
});

onMounted(() => {
    // loadHotBook();
})
</script>

<template>
    <n-layout>
        <n-layout-footer>
            <n-list hoverable clickable class="hotBookList" v-if="hotDataListBook.length">
                <n-scrollbar>
                    <div class="plazaMiddleHotBook" @scroll="handleScrollBook">
                        <n-list-item v-for="(task) in pagedDataBook" :key="task.id" class="list-book-palaza"
                            @click="goToUrl(task)">
                            <!-- 左侧内容 -->
                            <div class="list-item-left-book">
                                <div class="item-title-book">{{ task.title }}</div>
                                <div class="item-description-book">{{ task.description }}</div>
                            </div>

                            <!-- 右侧预览框 -->
                            <div class="list-item-right-book">
                                <!-- <iframe :src="task.url" frameborder="0" class="preview-frame-book"></iframe> -->
                            </div>
                        </n-list-item>
                    </div>
                    <div class="pagination-container" v-if="hotDataListBook.length">
                        <n-pagination v-model:page="page" :page-count="totalPages" simple />
                    </div>
                </n-scrollbar>
            </n-list>
        </n-layout-footer>
    </n-layout>
</template>

<style>
.hotBookList{
    border-radius: 10px;
    height: 100%;
}
.plazaMiddleHotBook{
    max-height: 600px;
    overflow-y: auto; /*启用了垂直滚动条 */
    padding-right: 4px; /*为滚动条预留了空间，避免内容被遮挡*/
    flex: 1;
}
.list-book-palaza{
    height: 20vh; /* 使每个列表项的高度是浏览器视口高度的20% */
    background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
    width: 100%; /* 宽度占满容器 */
}
.list-item-left-book {
    flex: 1;
}

.item-title-book {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
}

.item-description-book {
    font-size: 14px;
    color: #666;
}

.list-item-right-book {
    width: 120px; /* Set a fixed width for the preview box */
    height: 80px; /* Adjust the height for the preview box */
    margin-left: auto;
}

.preview-frame-book {
    width: 100%;
    height: 100%;
    border-radius: 8px;
}
.loading-container-book {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px; /* 根据需要调整高度 */
}
</style>