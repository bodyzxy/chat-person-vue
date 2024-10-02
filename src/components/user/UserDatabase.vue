<template>
    <div class="database">
        <div class="message">
            <n-split direction="horizontal" style="height: 100%" default-size="200px">
                <template #1>
                    <!--需for循环遍历-->
                    <n-space>
                        <n-tag type="info" closable size="large" round @close="">
                            mysql八股文
                        </n-tag>
                        <n-tag type="info" closable size="large" round @close="">
                            mysql八股文
                        </n-tag>
                        <n-tag type="info" closable size="large" round @close="">
                            mys
                        </n-tag>
                    </n-space>
                </template>
                <!--对答-->
                <template #2>
                    Pane 2
                </template>
            </n-split>
        </div>
        <n-input placeholder="输入" class="dataInput" style="width: 1040px;" :autosize="{
            minRows: 1,
            maxRows: 3
        }" type="textarea">
            <template #prefix>
                <span class="icon-wrapper" @click="submitDatabse()">
                    <n-icon :component="Unlink" size="30px" />
                </span>
            </template>
            <template #suffix>
                <span class="icon-wrapper" @click="request()">
                    <n-icon :component="PaperPlaneOutline" size="30px" />
                </span>
            </template>
        </n-input>
    </div>
</template>

<script setup lang="ts" name="UserDatabase">
import {
    PaperPlaneOutline,
    Unlink
} from '@vicons/ionicons5';

function submitDatabse() {
    console.log("上传文件");
}
function request() {
    console.log("发送信息");
}
</script>

<style>
.database {
    height: 100%;
    display: flex;
    justify-content: center;
}

.dataInput {
    position: absolute;
    border-radius: 40px;
    bottom: 30px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    /*剧中*/
    background-color: transparent;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.icon-wrapper {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    cursor: pointer;
}

.message {
    margin-top: 2%;
    width: 90%;
    height: 72%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    /*圆角*/
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
}
</style>