<template>
    <div style="height: 100%;">
        <n-layout has-sider style="height: 100%;">
            <n-layout-sider
                bordered
                collapse-mode="width"
                :collapsed-width="64"
                :width="240"
                show-trigger
            >
                <n-menu
                    :collapsed-width="64"
                    :collapsed-icon-size="22"
                    :options="menuOptions"
                >
                    <RouterLink to=menuOptions.key></RouterLink>
                </n-menu>
            </n-layout-sider>
            <n-layout class="search">
                <!--插槽-->
                <slot name="content">
                    <div class="listCard">
                        <n-card class="userCard">
                            <div style="display: flex; height: 100%; align-items: stretch;">
                                <!-- 左侧 -->
                                <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                                    <h2 style="margin: 0;">在线用户总数</h2>
                                    <h2 style="margin: 0;">231231</h2>
                                </div>
                                <!-- 右侧 -->
                                <div style="width: 50%; height: 100%;" ref="chartOption">
                                </div>
                            </div>
                        </n-card>
                        <n-card class="userCard">
                            <div style="display: flex; height: 100%; align-items: stretch;">
                                <!-- 左侧 -->
                                <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                                    <h2 style="margin: 0;">课程时长</h2>
                                    <h2 style="margin: 0;">231231</h2>
                                </div>
                                <!-- 右侧 -->
                                <div style="width: 50%; height: 100%;" ref="source">
                                </div>
                            </div>
                        </n-card>
                        <n-card class="userCard">
                            <div style="display: flex; height: 100%; align-items: stretch;">
                                <!-- 左侧 -->
                                <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                                    <h2 style="margin: 0;">用户总数</h2>
                                    <h2 style="margin: 0;">231231</h2>
                                </div>
                                <!-- 右侧 -->
                                <div style="width: 50%; height: 100%;" ref="userCount">
                                </div>
                            </div>
                        </n-card>
                    </div>
                    <div class="time">
                        <h3>学习总时长</h3>
                    </div>
                    <div style="display: flex;" class="last">
                        <n-card title="热评词汇" class="lastCard">

                        </n-card>
                        <n-card title="用户意见" class="lastCard">

                        </n-card>
                    </div>
                </slot>
            </n-layout> 
        </n-layout>
    </div>
</template>

<script lang="ts" setup name="adminHome">
    import { NIcon, type MenuOption } from 'naive-ui';
import { h, onMounted, ref, type Component } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import {
    BodySharp as UserInfo,
    BookOutline as BookLine,
    HomeSharp
} from '@vicons/ionicons5';
import * as echarts from "echarts";

    const navigateTo = (path: string) => {
        const router = useRouter();
        if (router) {
            router.push(path);
        } else {
            console.error('Router object is undefined');
        }
    };

    function renderIcon(icon: Component){
        return () => h(NIcon, null, { default: () => h(icon)})
    }

    const menuOptions: MenuOption[] = [
        {
            label: () => h(RouterLink, {to: '/adminHome'},{default: () => '首页'}),
            key: "adminHome",
            icon: renderIcon(HomeSharp)
        },
        {
            label: () => h(RouterLink, {to: '/changeUser'}, {default: () => '用户信息'}),
            key: 'changeUser',
            icon :renderIcon(UserInfo)
        },
        {
            label: () => h(RouterLink, {to: ''}, {default: () => '课程信息'}),
            key: "couresInfo",
            icon: renderIcon(BookLine)
        }
    ]
    const chartOption = ref(null)
    const source = ref(null)
    const userCount = ref(null)

    onMounted(() =>{
        const myChart = echarts.init(chartOption.value)
        const sourceChart = echarts.init(source.value)
        const userChat = echarts.init(userCount.value)

        //图表自适应
        window.addEventListener(
            "resize",
            () => {
                myChart.resize(),
                sourceChart.resize()
            },
            false
        );

        //定义图表配制
        let options = {
            xAxis: {
                data: ['A', 'B', 'C', 'D', 'E'],
                show: false
            },
            yAxis: {show: false},
                series: [
                    {
                        data: [10, 22, 28, 43, 42],
                        type: 'line',
                        stack: 'x',
                        smooth: true,
                        areaStyle: {}
                    },
                ]
        };

        let sourceOptions = {
            xAxis: {
                data: ['A', 'B', 'C', 'D', 'E'],
                show: false
            },
            yAxis: {show: false},
            series: [
                {
                    data: [25, 14, 23, 35, 10],
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        color: '#ff0',
                        opacity: 0.5
                    }
                }
            ]
        };

        let userCountOptions = {
            xAxis: {
                data: ['A', 'B', 'C', 'D', 'E'],
                show: false
            },
            yAxis: {show: false},
            series: [
                {
                    data: [10, 22, 28, 23, 19, 21, 30, 21],
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        color: '#ff0',
                        opacity: 0.5
                    }
                }
            ]
        };

        // 将配置应用到图表实例
        myChart.setOption(options);
        sourceChart.setOption(sourceOptions);
        userChat.setOption(userCountOptions);
    })
</script>

<style>
.right-content{
    position: absolute;
    left: 200px;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    padding: 20px; /* 内边距 */
}
.listCard{
    width: 100%;
    height: 10%;
    display: flex;
}
.userCard{
    width: 33%;
    height: 100%;
    padding: 10px;
    justify-content: center;
    margin: 10px;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}
.time{
    height: 30%;
    margin: 10px;
    margin-top: 20px;
    background-color: #84fab0;
}
.last{
    height: 60%;
}
.lastCard{
    height: 80%;
    width: 50%;
    margin: 10px;
}
</style>