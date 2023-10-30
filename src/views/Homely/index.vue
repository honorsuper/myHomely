<script setup lang="ts">
import { onMounted } from 'vue'
import { WaterFall } from '@/components'
import { menuData } from './constants.tsx'





</script>

<template>
  <div class="out-wrap flex flex-col">
    <div class="header">头部区域</div>
    <WaterFall :data="menuData" />
  </div>
</template>

<style lang="less" scoped>
.out-wrap {
  width: 100vw;
  min-height: 100vh;
}

.header {
  height: 64px;
  box-shadow: 0 8px 24px -2px rgba(0, 0, 0, 0.05);
  padding: 0 58px;
  background: #ffffff;
  margin-bottom: 30px;
}

.content {
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
}

#container {
  border: 1px solid blue;
  position: relative;
  width: 100%;
}

.box {
  width: 200px;
  border: 1px solid green;
  float: left;
  color: #fff;
}
</style>
