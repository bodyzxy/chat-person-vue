<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="card">
        <n-card style="height: 100%; border-radius: 20px;">
            <n-tabs type="line" size="small" :tabs-padding="20" pane-style="padding: 20px;">
                <n-tab-pane name="登录">
                    <n-input type="text" size="large" placeholder="昵称" style="width: 300px;" class="loginName" v-model:value="user.username">

                    </n-input>
                    <n-input type="password" 
                    show-password-on="click" 
                    placeholder="密码" 
                    :maxlength="20" 
                    class="password" 
                    style="width: 300px;" 
                    size="large"
                    v-model:value="user.password"
                    >
                        <template #password-visible-icon>
                            <n-icon :size="16" :component="GlassesOutline" />
                        </template>
                        <template #password-invisible-icon>
                            <n-icon :size="16" :component="Glasses" />
                        </template>
                    </n-input>
                    <n-button strong secondary round class="signIn" @click="userLogin(user)">
                        登录
                    </n-button>
                    <n-divider class="divider"/>
                    <div class="forgetPassword">
                        忘记密码？
                    </div>
                </n-tab-pane>
                <n-tab-pane name="注册">
                    <n-input v-model:value="registerUser.username" type="text" size="large" placeholder="昵称" style="width: 300px; border-radius: 20px;">

                    </n-input>
                    <n-input v-model:value="registerUser.email" type="text" size="large" placeholder="邮箱" style="width: 300px;" class="email">

                    </n-input>
                    <n-input v-model:value="registerUser.password" type="password"
                    show-password-on="click"
                    placeholder="密码"
                    :maxlength="20"
                    class="password"
                    style="width: 300px;"
                    size="large"
                    >
                        <template #password-visible-icon>
                            <n-icon :size="16" :component="GlassesOutline"/>
                        </template>
                        <template #password-invisible-icon>
                            <n-icon :size="16" :component="Glasses"/>
                        </template>
                    </n-input>
                    <n-input v-model:value="registerUser.confirmPassword" type="password"
                    show-password-on="click"
                    placeholder="确认密码"
                    :maxlength="20"
                    class="confirmPassword"
                    style="width: 300px;"
                    size="large"
                    >
                        <template #password-visible-icon>
                            <n-icon :size="16" :component="GlassesOutline"/>
                        </template>
                        <template #password-invisible-icon>
                            <n-icon :size="16" :component="Glasses"/>
                        </template>
                    </n-input>
                    <n-button strong secondary round class="signUp" @click="userRegister(registerUser)">
                        注册
                    </n-button>
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </div>
</template>

<script setup lang="ts" name="Login">
import { GlassesOutline, Glasses } from '@vicons/ionicons5'
import { ref } from 'vue';
import {userLogin} from '@/api/user/login';
import type { LoginUser } from '@/common/user/loginUser';
import {userRegister} from '../api/user/register';
import type { register } from '@/common/user/registerUser';

const user = ref<LoginUser>({
    username: "",
    password: "",
});

const registerUser = ref<register>({
    username: "",   // 字符串类型，最小长度 3，最大长度 20
    email: "",         // 字符串类型，必须为有效的邮箱格式，最大长度 50
    password: "",      // 字符串类型，最小长度 6，最大长度 40
    confirmPassword: "", // 字符串类型，最小长度 6，最大长度 40
    role: [],    // 可选的字符串集合类型
})

</script>

<style>
.card {
    width: 400px;
    height: 400px;
    margin: 0 auto;
    /* 水平居中 */
    padding: 60px;
}
.password{
    top: 40px;
    border-radius: 20px;
}
.loginName{
    top: 20px;
    border-radius: 20px;
}
.email{
    top: 20px;
    border-radius: 20px;
}
.signIn{
    top: 60px;
    width: 300px;
    height: 60px;
}
.divider{
    top: 80px;
    width: 300px;
}
.forgetPassword{
    margin-top: 90px;
}
.confirmPassword{
    margin-top: 60px;
    border-radius: 20px;
}
.signUp{
    margin-top: 10px;
    width: 300px;
    height: 50px;
}
</style>