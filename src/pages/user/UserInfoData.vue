<template>
    <n-layout>
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
                <n-scrollbar style="max-height: 620px;">
                    <n-list-item v-for="(task, index) in dataBase">

                        <!--TODO:记得加数据库名字-->
                        <RouterLink to="/userDatabase" style="text-decoration: none;">
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
                        <n-icon @click="showModel = true" size="40px" class="share"
                            :component="ArrowRedoCircle"></n-icon>
                        <n-icon style="margin-left: 96%;" size="40" @click="removeDatabase(task.id)">
                            <RemoveCircleOutline />
                        </n-icon>
                        <!--TODO 实现上传-->
                        <n-modal v-model:show="showModel" :mask-closable="false" preset="dialog" title="确定"
                            content="确定上传吗？" positive-text="确认" @positive-click="onPositiveClick(task.id)"
                            @negative-click="onNegativeClick" />
                    </n-list-item>
                </n-scrollbar>
            </n-list>
        </n-layout-footer>
    </n-layout>
</template>

<script setup lang="ts" name="UserInfo">
    import {ArrowRedoCircle,RemoveCircleOutline} from '@vicons/ionicons5';
    import {showModel,onPositiveClick,onNegativeClick,removeDatabase} from '../../api/user/userInfo';
    import {dataBase} from '../../api/user/userInfoData';
import { RouterLink } from 'vue-router';
import { onMounted, ref } from 'vue';
import { request } from '../../http';
import { userInfo } from '../../store/user';

const user = userInfo()
const data2 = ref([])

// onMounted(async () => {
//     try{
//         const response = await request.get(`/database/getUserData/${user.id}`)
//         //TODO:将data2赋值上去记得
//         data2.value = response.data
//     }catch(error){
//         console.log("获取出错：",error)
//     }
// })
</script>

<style>
.userHeader{
    height: 20%;
}
.userSider{
    position: relative;
    height: 590px;
}
.avatar{
    left: 32%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 20px; 
}
.userFooter{
    height: 100%;
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
}

.share{
    margin-left: 96%;
}
.shareIcon{
    margin-left: 90%;
}
</style>