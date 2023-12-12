<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'
import { WaterFall } from '@/components'
import { Header, AddCol } from './components'
import { getMenuInfo } from '@/utils/request'
import { message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'

const menuData = ref<any[]>([])
const addColRef = ref<InstanceType<typeof AddCol> | null>(null)


const handleGetMenuInfo = async () => {
  const res = await getMenuInfo()

  if (res.status === 201 || res.status === 200) {
    menuData.value = JSON.parse(res?.data?.data?.menuConfig)
  } else {
    message.error(res?.data || '系统繁忙，请稍后再试')
  }
}

/**
 * 打开弹窗
 */
const handleOpenModal = () => {
  addColRef?.value?.handleOpenModal?.()
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
    <AddCol ref="addColRef" />

    <a-float-button type="primary">
      <template #icon>
        <PlusOutlined @click="handleOpenModal" />
      </template>
    </a-float-button>
    <!-- <a-float-button @click="handleOpenModal" /> -->
  </div>
</template>

<style lang="less" scoped>
.out-wrap {
  width: 100vw;
  min-height: 100vh;
}
</style>
