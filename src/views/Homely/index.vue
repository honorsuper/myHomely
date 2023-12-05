<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'
import { WaterFall } from '@/components'
import { Header, AddCol } from './components'
import { ChangePasswordCaptcha, getMenuInfo } from '@/utils/request'
import { message } from 'ant-design-vue'

const menuData = ref<any[]>([])

const handleGetMenuInfo = async () => {
  const res = await getMenuInfo()

  if (res.status === 201 || res.status === 200) {
    menuData.value = JSON.parse(res?.data?.data?.menuConfig)
  } else {
    message.error(res?.data || '系统繁忙，请稍后再试')
  }
}

provide('homely', {
  handleGetMenuInfo,
}) // 若提供的是非字符串值会导致错误

onMounted(() => {
  handleGetMenuInfo()
})
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
