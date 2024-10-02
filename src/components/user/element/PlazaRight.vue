<template>
    <div style="display: flex; flex-direction: column; height: 100%;">
        <n-carousel autoplay style="height: 270px;">
            <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg">
            <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg">
            <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg">
            <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg">
        </n-carousel>
        <n-timeline class="timeline" style="flex-grow: 1; margin-left: 10px;">
            <n-timeline-item type="success" title="网站初创" time="2024-09-22 19:30">
                <n-popover trigger="hover">
                    <template #trigger>
                        <n-button>网站成立</n-button>
                    </template>
                    <span>虽然简易但希望可以帮助到你</span>
                </n-popover>
            </n-timeline-item>
        </n-timeline>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>