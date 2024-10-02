<template>
  <!--加载页面-->
  <div v-if="isShow">
    <svg viewBox="0 0 800 600" class="loading">
      <symbol id="s-text">
        <text text-anchor="middle" x="50%" y="35%" class="text--line">Chat</text>
        <text text-anchor="middle" x="50%" y="68%" class="text--line2">Pserson</text>
      </symbol>
      <g class="g-ants">
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
        <use xlink:href="#s-text" class="text-copy"></use>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup name="Loading">
import { ref } from 'vue';
const isShow = ref(false) //定位loading 的开关

const show = () => {
  isShow.value = true
}
const hide = () => {
  isShow.value = false
}
//对外暴露 当前组件的属性和方法
defineExpose({
  isShow,
  show,
  hide
})
</script>

<style scoped lang="less">
body {
  background: #000;
  background-size: .12em 100%;
  font: 16em/1 Arial;
}
.text--line {
  font-size: .5em;
}

.loading {
  position: absolute;
  width: 100%;
  height: 100%;
}

.text-copy {
  fill: none;
  stroke: white;
  stroke-dasharray: 7% 28%;
  stroke-width: 3px;
  -webkit-animation: stroke-offset 9s infinite linear;
          animation: stroke-offset 9s infinite linear;
}
.text-copy:nth-child(1) {
  stroke: #360745;
  stroke-dashoffset: 7%;
}
.text-copy:nth-child(2) {
  stroke: #D61C59;
  stroke-dashoffset: 14%;
}
.text-copy:nth-child(3) {
  stroke: #E7D84B;
  stroke-dashoffset: 21%;
}
.text-copy:nth-child(4) {
  stroke: #EFEAC5;
  stroke-dashoffset: 28%;
}
.text-copy:nth-child(5) {
  stroke: #1B8798;
  stroke-dashoffset: 35%;
}

@-webkit-keyframes stroke-offset {
  50% {
    stroke-dashoffset: 35%;
    stroke-dasharray: 0 87.5%;
  }
}

@keyframes stroke-offset {
  50% {
    stroke-dashoffset: 35%;
    stroke-dasharray: 0 87.5%;
  }
}
</style>