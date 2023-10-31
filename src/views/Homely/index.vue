<script setup lang="ts">
import { WaterFall } from '@/components'
import { Header, AddCol } from './components'
import { menuData } from './constants.tsx'
</script>

<template>
  <div class="out-wrap flex flex-col">
    <Header />
    <WaterFall :data="menuData" />
    <AddCol />
  </div>
</template>

<style lang="less" scoped>
.out-wrap {
  width: 100vw;
  min-height: 100vh;
}
</style>
