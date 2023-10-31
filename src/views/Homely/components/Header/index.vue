<script setup lang="ts">
import { ref } from 'vue'
import { AddCol } from '../'

const addColRef = ref<InstanceType<typeof AddCol> | null>(null)

/**
 * 打开弹窗
 */
const handleOpenModal = () => {
  addColRef?.value?.handleOpenModal?.()
}
</script>
<template>
  <div class="header-wrap flex items-center justify-between">
    <div class="title">头部区域</div>
    <div>
      <a-button type="primary" @click="handleOpenModal">新增列</a-button>
    </div>
    <AddCol ref="addColRef" />
  </div>
</template>
<style scoped lang="less">
.header-wrap {
  height: 64px;
  box-shadow: 0 8px 24px -2px rgba(0, 0, 0, 0.05);
  padding: 0 58px;
  background: #ffffff;
  margin-bottom: 30px;
}
</style>
