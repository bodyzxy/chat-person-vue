<template>
    <div class="page">
        <n-layout has-sider class="userLayout">
            <n-layout-sider class="userSider">
                <RouterLink :to="{ name: 'userInfoMe' }">
                    <n-avatar class="avatar-user" round :size="100"
                        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                </RouterLink>
                <br>
                <n-gradient-text class="name" gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)">
                    {{ username }}
                </n-gradient-text>
                <n-divider />
                <n-button strong secondary round type="primary" style="width: 260px;height: 50px;">
                    <p style="color: black;">历史</p>
                </n-button>
                <n-button strong secondary round type="primary" class="word">
                    <RouterLink to="/userInfo/data" style="color: black;">数据库</RouterLink>
                </n-button>
                <n-button strong secondary round type="primary" class="word" @click="showModal = true">
                    <p style="color: black;">创建数据库</p>
                </n-button>
                <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="确认" content="你确认"
                    positive-text="确认" negative-text="算了" @positive-click="onPositiveClick"
                    @negative-click="onNegativeClick">
                    <template #default>
                        <n-input v-model:value="inputName" placeholder="请输入数据库名称" />
                    </template>
                </n-modal>
                <n-button strong secondary round type="primary" class="word" @click="logout">
                    退出
                </n-button>
            </n-layout-sider>
            <n-layout>
                <n-layout-footer class="userFooterInfo">
                    <!--TODO 使用for循环遍历显示-->
                    <n-list hoverable clickable class="list">
                        <n-scrollbar style="max-height: 100%;">
                            <n-list-item v-for="(task, index) in database">
                                <!--TODO: 这里需要将params改为id-->
                                <RouterLink :to="{name:'taskDetails', params: {id:task.name}}"
                                    style="text-decoration: none;">
                                    <n-thing :title="task.name" content-type="margin-top: 10px">
                                        <template #description>
                                            <n-space size="small" style="margin-top: 4px;">
                                                <n-tag :bordered="false" type="info" size="small">
                                                    {{ task.name }}
                                                </n-tag>
                                            </n-space>
                                        </template>
                                        {{ task.content }}
                                    </n-thing>
                                </RouterLink>
                                <n-icon style="margin-left: 95%;" size="30" @click="removeDatabase(task.name)">
                                    <RemoveCircleOutline />
                                </n-icon>
                            </n-list-item>
                        </n-scrollbar>
                    </n-list>
                </n-layout-footer>
            </n-layout>
        </n-layout>
    </div>
</template>

<script setup lang="ts" name="UserInfo">
import { RouterLink, useRouter} from 'vue-router';
import {logout} from '../../api/user/logout';
import { onMounted, ref } from 'vue';
import { createDatabase } from '../../api/user/userInfo';
import { useMessage } from 'naive-ui';
import {RemoveCircleOutline} from "@vicons/ionicons5"
import { deleteData } from '../../api/db/indexedDB';

const message = useMessage()
const showModal = ref(false)
const database = ref<DatabaseInfo[]>([]);
const inputName = ref('')
const router = useRouter()
const user = JSON.parse(localStorage.getItem('user') || '{}')
const username = ref<String>(user.username)
//创建数据库
async function onPositiveClick(){
    if(inputName.value.trim() && inputName.value != ''){
        await createDatabase(inputName.value);
        message.success("创建成功")
    } else {
        message.error("输入为空"+inputName.value)
    }
      
}

function onNegativeClick(){
    message.success('取消创建')
}

function removeDatabase(name: string | null){
    if(name != null){
        deleteData(name)
        window.location.reload()
    }else{
        console.log("数据库不存在")
    }
}

onMounted(async () => {
    if (indexedDB.databases) {
        const dbInfoList = await indexedDB.databases();
        database.value = dbInfoList.map(db => ({
            name: db.name,
            version: db.version,
            content: db.name // 示例内容
        }));
    }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
.page{
    height: 90%; 
    padding: 10px;
    margin: 10px;
    background-color: #fff; /* 可选：设置背景色 */
    border-radius: 8px; /* 可选：设置圆角 */
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);; /* 添加阴影效果 */
    opacity: 0.9;
}
.userLayout{
    height: 100%;
    width: 100%;
    margin-right: 20px; /* 右边距离页面边缘的距离 */
    margin-bottom: 20px; /* 底部距离页面边缘的距离 */
}
.userHeader{
    height: 20%;
}
.userSider{
    position: relative;
    height: 590px;
}
.avatar-user{
    left: 32%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 20px; 
}
.userFooterInfo{
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