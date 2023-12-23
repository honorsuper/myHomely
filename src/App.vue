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
    <div v-if="flag" class="bg-white h-full w-full flex justify-center items-center flex-col">
      暂不支持移动端，请在PC端使用！
      <img src="@/assets/images/home.jpg" class="w-4/5 mt-4" />
    </div>
    <RouterView v-else />
  </a-config-provider>
</template>

<style scoped></style>
