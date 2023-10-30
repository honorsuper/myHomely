<script setup lang="ts">
import { onMounted } from 'vue'
import { WaterFall } from '@/components'
import { Header,AddCol } from './components'
import { menuData } from './constants.tsx'
</script>

<template>
  <div class="out-wrap flex flex-col">
    <Header />
    <WaterFall :data="menuData" />
    <AddCol/>
  </div>
</template>

<style lang="less" scoped>
.out-wrap {
  width: 100vw;
  min-height: 100vh;
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
