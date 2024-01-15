<script setup lang="ts">
import { ref, defineExpose, provide } from 'vue'
import UpdateInfo from './components/UpdateInfo/index.vue'
import ChangePassword from './components/ChangePassword/index.vue'
import BasicInfo from './components/BasicInfo/index.vue'

// 弹窗展示
const open = ref(false)
// 当前tab
const activeKey = ref('999')

/**
 * 打开弹窗
 */
const handleOpenModal = () => {
  open.value = true
  activeKey.value = '1'
}

/**
 * 关闭弹窗
 */
const handleCloseModal = () => {
  open.value = false
  activeKey.value = '999'
}

provide('setting', {
  handleCloseModal,
})

defineExpose({
  handleOpenModal,
})
</script>
<template>
  <a-modal v-model:open="open" title="设置" :width="1000" :footer="null">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="修改昵称" />
      <a-tab-pane key="2" tab="修改密码" />
      <a-tab-pane key="3" tab="基本设置"></a-tab-pane>
    </a-tabs>
    <UpdateInfo v-if="activeKey === '1'" />
    <ChangePassword v-if="activeKey === '2'" />
    <BasicInfo v-if="activeKey === '3'" />
  </a-modal>
</template>
<style scoped lang="less">
@import './index.less';
</style>
