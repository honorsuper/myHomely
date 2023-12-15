<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'
import { WaterFall } from '@/components'
import { Header, AddCol } from './components'
import { getMenuInfo, queryIsFirst, setFirst } from '@/utils/request'
import { message, type TourProps } from 'ant-design-vue'
import { PlusOutlined, GithubOutlined } from '@ant-design/icons-vue'
import { userStore } from '@/stores/user'

const ref1 = ref(null)
const ref2 = ref(null)
const headerRef = ref<InstanceType<typeof Header> | null>(null)
const menuData = ref<any[]>([])
const addColRef = ref<InstanceType<typeof AddCol> | null>(null)
const open = ref(false)
const store = userStore()
const current = ref(0)

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
  {
    title: '收藏',
    description: '创作不易，喜欢请三连哈',
    target: () => ref2.value && ref2.value.$el,
    placement: 'topRight',
  },
  {
    title: '信息设置',
    description: '信息修改，密码修改，颜色配置，退出登录',
    target: () => headerRef.value?.getRef3?.()?.value,
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

const handleToGithub = () => {
  window.open('https://github.com/honorsuper/myHomely')
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
  <div class="out-wrap flex flex-col dark:bg-[#20293a]">
    <Header ref="headerRef" />
    <WaterFall :data="menuData" />
    <AddCol ref="addColRef" />
    <a-float-button-group shape="circle" :style="{ right: '34px' }">
      <a-float-button type="primary" ref="ref1" @click="handleOpenModal">
        <template #icon>
          <PlusOutlined />
        </template>
      </a-float-button>

      <a-float-button @click="handleToGithub" ref="ref2">
        <template #icon>
          <img src="@/assets/icons/email.png" />
          <!-- <GithubOutlined /> -->
        </template>
      </a-float-button>
    </a-float-button-group>

    <a-tour v-model:current="current" :open="open" :steps="steps" @close="handleOpen(false)" />
  </div>
</template>

<style lang="less" scoped>
.out-wrap {
  height: 100%;
  background-color: #fafafa;
}
</style>
