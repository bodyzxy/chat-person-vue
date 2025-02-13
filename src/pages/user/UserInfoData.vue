<template>
    <div class="infoData">
        <n-layout style="height: 100%;">
            <n-layout-header class="userHeader">
                <!--使用for循环遍历得到-->
                <n-space>
                    <n-tag type="info" size="large" round>
                        Mysql八股文
                    </n-tag>
                </n-space>
            </n-layout-header>
            <n-divider />
            <n-layout-footer class="userFooter">
                <!--TODO 使用for循环遍历显示-->
                <n-list hoverable clickable class="list">
                    <n-scrollbar class="infoScrollbar">
                        <n-list-item v-for="(task, index) in dataBase">

                            <!--TODO:记得加数据库名字-->
                            <RouterLink :to="'/userDatabase/' + task.id" style="text-decoration: none;">
                                <n-thing :title="task.title" content-type="margin-top: 10px">
                                    <template #description>
                                        <n-space size="small" style="margin-top: 4px;">
                                            <n-tag :bordered="false" type="info" size="small">
                                                {{ task.time }}
                                            </n-tag>
                                        </n-space>
                                    </template>
                                </n-thing>
                            </RouterLink>
                            <n-icon @click="openModal(task.id)" size="40px" class="share"
                                :component="ArrowRedoCircle"></n-icon>
                            <n-icon style="margin-left: 96%;" size="40" @click="removeDatabase(task.id)">
                                <RemoveCircleOutline />
                            </n-icon>
                            <!--TODO 实现上传-->
                            <n-modal v-model:show="showModel" :mask-closable="false" preset="dialog" title="确定"
                                content="确定上传吗？" positive-text="确认" @positive-click="onPositiveClick"
                                @negative-click="onNegativeClick" />
                        </n-list-item>
                    </n-scrollbar>
                </n-list>
            </n-layout-footer>
        </n-layout>
    </div>
</template>

<script setup lang="ts" name="UserInfo">
    import {ArrowRedoCircle,RemoveCircleOutline} from '@vicons/ionicons5';
    import {showModel,onPositiveClick,onNegativeClick,removeDatabase,openModal} from '../../api/user/userInfo';
    import {dataBase, feathData} from '../../api/user/userInfoData';
import { RouterLink } from 'vue-router';
import { onMounted, ref } from 'vue';
import { request } from '../../http';
import { userInfo } from '../../store/user';

const user = userInfo()
const data2 = ref([])


onMounted(async () => {
    feathData();
})
</script>

<style>
.infoData {
    min-height: 600px; /* Set a minimum height */
    height: auto; /* Allow the height to grow based on content */
    overflow: auto; /* Optional: handle overflow if content exceeds the container */
}
.userHeader{
    height: 20%;
}
.avatar{
    left: 32%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 20px; 
}
.userFooter{
    display: flex;
    flex-direction: column; /* 垂直排列子元素 */
    max-height: 900px; /* 设置最大高度 */
    overflow: auto; /* 允许内容溢出时滚动 */
    margin-bottom: 200px; /* 设置底部间距 */
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
.list{
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    border-radius: 10px;
    flex: 1;
}

.share{
    margin-left: 96%;
}
.shareIcon{
    margin-left: 90%;
}
.infoScrollbar{
    max-height: 100%; /* 设置最大高度 */
    overflow: auto; /* 允许内容溢出时滚动 */
}
</style>