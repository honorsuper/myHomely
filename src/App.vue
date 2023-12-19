<script setup lang="ts">
import { computed } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { isMobile } from './utils'

const flag = computed(() => {
  return isMobile()
})
</script>

<template>
  <a-config-provider
    :locale="zhCN"
    :theme="{
      token: {
        colorPrimary: '#6965db',
      },
    }"
  >
    <div v-if="flag" class="bg-white h-full w-full flex justify-center items-center">
      本应用暂不支持移动端，请在PC端打开！
    </div>
    <RouterView v-else />
  </a-config-provider>
</template>

<style scoped></style>
