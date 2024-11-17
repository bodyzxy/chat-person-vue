<template>
    <div style="height: 100%;">
        <div class="practiceTitleContainer">
            <div class="practiceTitle" v-for="(title, index) in titles" :key="index">
                <n-button strong secondary round type="info" @click="setSearch(title.titleName)">
                    {{ title.titleName }}
                </n-button>
            </div>
        </div>
        <div class="practiceMain" :class="{ 'split': isSplit }">
            <div class="practiceLeft">
                <p>
                    Chat-person意在帮助大家理解交流学习，主要是个工具，主要学习方向还是来源于课本和事件，此处是用来帮助各位理解NLP文本
                    分割的一个过程，让大家更好的理解NLP是如何一步一步分割理解自然语言的。
                </p>
                <n-dynamic-input v-model:value="value" placeholder="请输入" :min="3" :max="4" />
                <pre>{{ JSON.stringify(value, null, 2) }}</pre>
                <n-button :loading="loadingRef" @click="handleClick" class="practiceSend">
                    开始
                </n-button>
            </div>
            <div class="practiceMiddon" v-if="isSplit">

            </div>
            <div class="practiceCenter" v-if="isSplit">
                <!-- 中间内容 -->
                <h2>右边内容</h2>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup name="PracticePage">
import {titles} from '@/api/nlpPractice/title';
import { ref } from 'vue';

const search = ref('');
const isSplit = ref(false);
const value = ref(['','','','']);

const loadingRef=ref(false);

function handleClick(){
    loadingRef.value = true;
    setTimeout(() => {
        loadingRef.value = false;
        toggleSplit();
    }, 2000)  
}

function toggleSplit() {
    if(isSplit.value == false){
        isSplit.value = !isSplit.value; // 切换状态
    }
}

function setSearch(titleName: string) {
    search.value = titleName; // 将按钮文字传递给 search
}

</script>

<style>
.practiceTitleContainer {
    display: flex; /* 使用 Flexbox */
    flex-wrap: wrap; /* 允许换行 */
}
.practiceMain{
    display: flex;
    transition: all 0.3s ease; /* 平滑过渡 */
    height: 85%;
    padding-bottom: 20px;
    box-sizing: border-box; /* 确保内边距计算在高度内 */
}
.practiceTitle{
    height: 50px;
    /* background-color: greenyellow; */
    margin-right: 10px; /* 添加间距 */
}
.practiceLeft, .practiceCenter {
    flex: 1; /* 左侧和中间区域占据相同宽度 */
    padding: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    border-radius: 20px; 
}
.practiceMiddon{
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    /* display: flex; */
    width: 33%;
    flex-direction: column; /* 垂直排列 */
    padding: 20px;
    border-radius: 20px; 
    transition: all 0.3s ease; /* 添加平滑过渡 */
}
.practiceCenter {
    text-align: center; /* 中间内容文本居中 */
}

/* 处理分割状态 */
.practiceMain.split .practiceLeft {
    transform: translateX(-0%); /* 向左移动 */
}

.practiceMain.split .practiceCenter {
    transform: translateX(0%); /* 向右移动 */
}

.practiceMain.split .practiceMiddon {
    transform: translateX(0); /* 恢复到中心 */
}
.practiceSend{
    position: absolute; /* 绝对定位 */
    bottom: 40px; /* 距离底部20px */
    right: 40px; /* 距离右侧10px */
}
</style>