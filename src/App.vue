<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>

<template>
  <a-config-provider
    :locale="zhCN"
    :theme="{
      token: {
        colorPrimary: '#6965db',
      },
    }"
    ><RouterView
  /></a-config-provider>
</template>

<style scoped></style>
