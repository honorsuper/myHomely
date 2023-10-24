<script setup lang="ts">
import {MenuItem} from "@/components"
</script>

<template>
<div class="out-wrap flex flex-col">

<div class="header">
头部区域
</div>
  <div class="content flex-1 flex gap-x-8">
    <MenuItem/>
    <MenuItem/>
  </div>
</div>
</template>

<style lang="less" scoped>
.out-wrap{
  width:100vw;
  min-height: 100vh;
}
.header{
  height: 64px;
  box-shadow: 0 8px 24px -2px rgba(0,0,0,.05);
  padding: 0 58px;
  background: #ffffff;
}
.content{
  overflow-y: auto;
  padding: 20px;
}
</style>
