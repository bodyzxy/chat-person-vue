<script setup lang="ts">
// TODO：需要去全局获取用户ID然后取api中请求数据

import {LogoGithub,MailOutline} from "@vicons/ionicons5"
import { computed, onMounted, reactive, ref } from "vue";
import { FormInst, FormItemInst, FormItemRule, FormRules, useMessage } from "naive-ui";
import { getUserInfo, saveInfomation } from "../api/user/userInfo";
import { useUserInfoStore } from "../store/userInfoStore";

interface ModelType {
  password: string | null
  reenteredPassword: string | null
}

const value = ref('')
const userInfoStore = useUserInfoStore()
const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const message = useMessage()
const introduction = ref("我这辈子最疯狂的事，发生在我在 Amazon"+
                        "当软件工程师的时候，故事是这样的："+
                        "那时我和女朋友住在一起，正在家里远程工作。忽然同事给我发来了紧急消息：”我们的服务出现了"+
                        "SEV 2 级别的故障！需要所有的人马上协助！“我们组的应用全挂掉了。"+
                       " 当我还在费力的寻找修复方法的时候，忽然闻到隔壁房间的的焦味，防火报警器开始鸣叫。");
const model = ref<ModelType>({
      password: userInfoStore.password,
      reenteredPassword: userInfoStore.rpassword
})
const rules: FormRules = {
    password: [
        {
          required: true,
          message: '请输入密码'
        }
      ],
      reenteredPassword: [
        {
          required: true,
          message: '请再次输入密码',
          trigger: ['input', 'blur']
        },
        {
          validator: validatePasswordStartWith,
          message: '两次密码输入不一致',
          trigger: 'input'
        },
        {
          validator: validatePasswordSame,
          message: '两次密码输入不一致',
          trigger: ['blur', 'password-input']
        }
    ]
}

const dynamicForm = reactive({
    name: '',
    user: {
        address: ''
    },
    phone: '',
    hobbies: [{ hobby: '' }]
})
const options = computed(() => {
  return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
    const prefix = value.value.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
})
function handlePasswordInput() {
    if (model.value.reenteredPassword) {
        rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
    }
}
function validatePasswordStartWith(
      rule: FormItemRule,
      value: string
    ): boolean {
      return (
        !!model.value.password
        && model.value.password.startsWith(value)
        && model.value.password.length >= value.length
      )
}
function validatePasswordSame(rule: FormItemRule, value: string): boolean {
    return value === model.value.password
}

onMounted(() => {
    //     getUserInfo()
    dynamicForm.name = userInfoStore.username
    dynamicForm.user.address = userInfoStore.address
    dynamicForm.phone = userInfoStore.phone
    value.value = userInfoStore.email
})
</script>

<template>
    <div style="display: flex; margin-top: 10px;">
        <div style="flex: 1; border-right: 1px; margin-right: 6px;">
            <n-divider />
            <n-h3 style="text-align: center;">
                介绍一下吧
            </n-h3>
            <n-tabs type="segment" animated>
                <n-tab-pane name="chap1" tab="自我介绍">
                    <n-card style="border-radius: 20px; height: 500px;">
                        <n-input v-model:value="introduction" type="textarea" placeholder="基本的 Textarea" style="height: 100%;"/>
                    </n-card>
                    <n-button strong secondary round type="primary"
                        style="margin-left: 42%; margin-top: 10px; width: 100px;" @click="saveInfomation(introduction)">
                        保存
                    </n-button>
                </n-tab-pane>
                <!-- <n-tab-pane name="chap2" tab="兴趣爱好">

                </n-tab-pane> -->
                <n-tab-pane name="chap3" tab="个人网址">
                    <div style="align-items: center; justify-content: center;">
                        <n-card style="margin-bottom: 10px; border-radius: 20px;">
                            <LogoGithub style="width: 20px; height: 20px; margin-right: 8px;" />
                            <n-button strong secondary round type="primary">
                                <a href="https://github.com/">GitHub启动！！</a>
                            </n-button>
                            <div>
                                <p>此处包含了作者的各种学习经历以及笔记，若有喜欢的朋友可以自行获取</p>
                            </div>
                        </n-card>
                        <n-card style="margin-bottom: 10px; border-radius: 20px;">
                            <MailOutline style="width: 20px; height: 20px; margin-right: 8px;" />
                            <n-button strong secondary round type="primary">
                                <a href="https://github.com/">邮箱启动！！</a>
                            </n-button>
                            <div>
                                <p>若各位有合作或者有什么问题的可以发送邮箱给作者，作者会及时回复的。</p>
                            </div>
                        </n-card>
                    </div>
                </n-tab-pane>
            </n-tabs>
        </div>
        <div style="flex: 1; overflow-y: auto;">
            <n-divider />
            <n-form ref="fromRef" :model="dynamicForm" style="maxWidth: 640px; margin-top: 50px;">
                <n-form-item label="姓名" path="name" :rule="{
                    required: true,
                    message: '请输入姓名',
                    trigger: ['input','blur']
                }">
                    <n-input v-model:value="dynamicForm.name" clearable />
                </n-form-item>
                <n-form-item label="地址" path="user.address">
                    <n-input v-model:value="dynamicForm.user.address" placeholder="输入地址" />
                </n-form-item>
                <n-form-item label="电话号码" path="phone">
                    <n-input v-model:value="dynamicForm.phone" placeholder="电话号码" />
                </n-form-item>
            </n-form>
            <n-form ref="formRef" :model="model" :rules="rules">
                <n-form-item path="password" label="密码">
                    <n-input v-model:value="model.password" type="password" @input="handlePasswordInput"
                        @keydown.enter.prevent />
                </n-form-item>
                <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="重复密码">
                    <n-input v-model:value="model.reenteredPassword" :disabled="!model.password" type="password"
                        @keydown.enter.prevent />
                </n-form-item>
            </n-form>
            <n-auto-complete v-model:value="value" :input-props="{
                autocomplete: 'disabled',
            }" :options="options" placeholder="邮箱" clearable style="margin-top: 6px;" />

            <n-button strong secondary round type="primary" style="width: 100px; margin-left: 40%; margin-top: 20px;">
                保存
            </n-button>
        </div>
    </div>
</template>

<style>
</style>