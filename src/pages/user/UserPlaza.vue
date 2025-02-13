<template>
    <div class="grid">
        <div class="leftPlaza">
            <n-flex align="flex-start" class="leftIcon">
                <n-float-button-group shape="square" position="relative" style="width: 100%; border-radius: 20px; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);">
                    <n-float-button @click="changePlazaContent('PlazaMiddle')" style="width: 100%;">
                        数据库
                    </n-float-button>
                    <n-float-button @click="changePlazaContent('PlazaMiddleHotGithub')" style="width: 100%;">
                        热门自然语言处理项目
                    </n-float-button>
                    <n-float-button @click="changePlazaContent('PlazaMiddleHotBook')" style="width: 100%;">
                        热门自然语言处理书籍
                    </n-float-button>
                    <n-float-button style="width: 100%;" @click="changePlazaContent('PlazaMiddleHotTitle')">
                        热门博客地址
                    </n-float-button>
                    <n-float-button style="width: 100%;">
                        
                    </n-float-button>
                </n-float-button-group>
                <n-card content-style="padding: 0;" style="border-radius: 20px; box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5)">
                    <n-tabs
                    type="line"
                    size="large"
                    :tabs-padding="20"
                    pane-style="padding: 20px;"
                    >
                        <n-tab-pane name="热门作者">
                            <div class="scroll-container">
                                <!-- TODO: name记得修改为自己的业面 -->
                                <RouterLink
                                v-for="(author, index) in authors"
                                :key="index"
                                :to="{ name: 'autherInfo', params: { id: author.name } }" 
                                style="text-decoration: none;"
                                >
                                    <n-card style="margin-bottom: 10px; border-radius: 20px;">
                                        <template #header>{{ author.name }}</template>
                                        {{ author.description }}
                                    </n-card>
                                </RouterLink>
                             </div>
                        </n-tab-pane>
                        <n-tab-pane name="热门数据库">
                            <div class="scroll-container">
                                <!--TODO: 找到对应的数据库将params改为id更好-->
                                <RouterLink
                                v-for="(db, index) in databases"
                                :key="index"
                                :to="{ name: 'taskDetails', params: { id: db.name } }" 
                                style="text-decoration: none;"
                                >
                                    <n-card style="margin-bottom: 10px; border-radius: 20px;">
                                        <template #header>{{ db.name }}</template>
                                        {{ db.description }}
                                    </n-card>
                                </RouterLink>
                            </div>
                        </n-tab-pane>
                    </n-tabs>
                </n-card>
            </n-flex>
        </div>
        <div class="centerPlaza"><component :is="selectedPlaza"/></div>
        <div class="rightPlaza"><PlazaRight/></div>
    </div>
</template>

<script setup lang="ts" name="UserPlaza">
import { RouterLink } from 'vue-router';
import PlazaMiddle from './element/PlazaMiddle.vue'
import PlazaRight from './element/PlazaRight.vue'
import PlazaMiddleHotGithub from './element/PlazaMiddleHotGithub.vue' // Adjust to your component
import PlazaMiddleHotBook from './element/PlazaMiddleHotBook.vue'
import PlazaMiddleHotTitle from './element/PlazaMiddleHotTitle.vue'
import { DefineComponent, onMounted, ref } from 'vue';

const authors = [
  { name: 'bodyzxy', description: 'Description of Author 1' },
  { name: 'zxy', description: 'Description of Author 2' },
  { name: 'xy', description: 'Description of Author 3' },
  { name: 'xy', description: 'Description of Author 3' }
];

const databases = [
  { name: 'Database 1', description: 'Description of Database 1' },
  { name: 'Database 2', description: 'Description of Database 2' },
  { name: 'Database 3', description: 'Description of Database 3' }
];
const selectedPlaza = ref<DefineComponent | string>(PlazaMiddle);

// 点击左侧区域时切换显示的内容
const changePlazaContent = (content: string) => {
  if (content === 'PlazaMiddle') {
    selectedPlaza.value = PlazaMiddle;
  } else if (content === 'PlazaMiddleHotGithub') {
    selectedPlaza.value = PlazaMiddleHotGithub; // Ensure this is properly imported
  } else if (content === 'PlazaMiddleHotBook') {
    selectedPlaza.value = PlazaMiddleHotBook;
  } else if (content === 'PlazaMiddleHotTitle') {
    selectedPlaza.value = PlazaMiddleHotTitle;
  }
  console.log(selectedPlaza.value);
};
onMounted(async () => {
    // getHotDatabase()
})
</script>

<style>
.grid{
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 20% 60% 20%; /* 设置左中右三列宽度 */
}
.leftPlaza, .centerPlaza, .rightPlaza {
    display: flex;
    justify-content: center; /* 让内容水平居中 */
    /* align-items: center; 让内容垂直居中 */
    /* border: 1px solid black; 边框用于区分 */
}
.centerPlaza{
    height: 100%;
}
.rightPlaza{
    /* background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%) */
}
.leftIcon{
    /* background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%) */
}

.leftIcon{
    margin-top: 10px;
    width: 90%;
}
.scroll-container {
  max-height: 300px; /* 设置了最大高度，超出时内容会滚动*/
  overflow-y: auto; /*启用了垂直滚动条 */
  padding-right: 16px; /*为滚动条预留了空间，避免内容被遮挡*/
  width: 84%;
}
</style>