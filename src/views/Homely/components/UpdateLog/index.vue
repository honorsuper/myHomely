<script setup lang="ts">
import { ref,} from 'vue'
// 弹窗展示
const open = ref(false)

/**
 * 打开弹窗
 */
const handleOpenModal = () => {
  open.value = true
}

defineExpose({
  handleOpenModal,
})
</script>
<template>

  <a-drawer
      v-model:open="open"
      title="更新日志"
  >
  <div>
    <div class="text-2xl mb-2.5">1.1.0</div>
    <div class="flex flex-col gap-2.5">
      <div class="item">- 新增菜单时，增加备注字段</div>
      <div class="item">- 新增更新日志模块</div>
    </div>
  </div>
  </a-drawer>
</template>
<style scoped lang="less">
@import './index.less';
</style>