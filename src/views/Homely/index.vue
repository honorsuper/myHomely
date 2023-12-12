<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'
import { WaterFall } from '@/components'
import { Header, AddCol } from './components'
import { getMenuInfo, queryIsFirst, setFirst } from '@/utils/request'
import { message, type TourProps } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { userStore } from '@/stores/user'

const ref1 = ref(null)
const menuData = ref<any[]>([])
const addColRef = ref<InstanceType<typeof AddCol> | null>(null)
const open = ref(false)
const store = userStore()

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

const handleOpen = async (val: boolean) => {
  open.value = val
  if (!val) {
    const res = await setFirst()
    if (res.status === 201 || res.status === 200) {
      store.handleGetUserInfo()
    } else {
      message.error(res?.data || '系统繁忙，请稍后再试')
    }
  }
}

const steps: TourProps['steps'] = [
  {
    title: '新增',
    description: '点击新增模块',
    target: () => ref1.value && ref1.value.$el,
    placement: 'topRight',
  },
]

/**
 * 获取是否首次进入
 */
const handleGetIsFirst = async () => {
  const res = await queryIsFirst()
  if (res.status === 201 || res.status === 200) {
    if (res.data.data.isFirst) {
      handleOpen(true)
    }
  } else {
    message.error(res?.data || '系统繁忙，请稍后再试')
  }
}

provide('homely', {
  handleGetMenuInfo,
})

onMounted(() => {
  handleGetMenuInfo()
  handleGetIsFirst()
})
</script>

<template>
  <div class="out-wrap flex flex-col">
    <Header />
    <WaterFall :data="menuData" />
    <AddCol ref="addColRef" />

    <a-float-button type="primary" ref="ref1" @click="handleOpenModal">
      <template #icon>
        <PlusOutlined />
      </template>
    </a-float-button>

    <a-tour :current="0" :open="open" :steps="steps" @close="handleOpen(false)" />
  </div>
</template>

<style lang="less" scoped>
.out-wrap {
  width: 100vw;
  min-height: 100vh;
}
</style>
