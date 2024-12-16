<script setup lang="ts">
import {visibleDataBase,handleScroll} from '../api/user/plazaMiddle';
import {ArrowRedoCircle} from '@vicons/ionicons5';
</script>

<template>
    <div>
        <n-space vertical size="large">
            <n-layout has-sider sider-placement="right">
                <n-layout-content content-style="padding: 10px">
                    <n-h2>热门点击数据库</n-h2>
                    <div
                        style="overflow-y: auto; background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);border-radius: 20px;">
                        <n-list-item v-for="(task, index) in visibleDataBase">
                            <RouterLink :to="{ name: 'taskDetails', params: { id: task.title } }"
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
                                    <n-row style="margin-left: 80%;">
                                        <n-col :span="12">
                                            <n-statistic label="用户点击">
                                                1,234,123
                                            </n-statistic>
                                        </n-col>
                                    </n-row>
                                </n-thing>
                            </RouterLink>
                        </n-list-item>
                    </div>
                </n-layout-content>
                <n-layout-sider collapse-mode="transform" :collapsed-width="120" :width="240" :native-scrollbar="false"
                    show-trigger="bar" content-style="padding:14px;" bordered>
                    <div>
                        <!-- TODO:此处取用户数据获取用户简介 -->
                        <n-card title="简介" style="border-radius: 20px;">
                            做事啊多好似的看就是打开就是不对啊可是几乎都可参加啊社保卡是随处可见啊还是可参加吧思考
                            啊是空间啊多喝水看得见哈开始卡建设的卡建设到你卡数据吃辣椒收到了卡
                        </n-card>
                    </div>
                </n-layout-sider>
            </n-layout>
        </n-space>
    </div>
</template>

<style>
</style>