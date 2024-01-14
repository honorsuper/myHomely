<script setup lang="ts">
import { ref } from 'vue'
import { Header } from '../views/Homely/components'
import { getMenuInfo, queryIsFirst, setFirst } from '@/utils/request'
import { type TourProps } from 'ant-design-vue'
import { userStore } from '@/stores/user'
import useAsync from '@/hooks/useQuery'

const ref1 = ref(null)
const ref2 = ref(null)
const headerRef = ref<InstanceType<typeof Header> | null>(null)
const menuData = ref<any[]>([])

const open = ref(false)
const store = userStore()
const current = ref(0)

/**获取书签信息 */
useAsync(getMenuInfo, {
  onSuccess: (res: any) => {
    menuData.value = JSON.parse(res?.data?.menuConfig)
  },
})

/**获取是否首次进入 */
useAsync(queryIsFirst, {
  onSuccess: (res: any) => {
    if (res?.data.isFirst) {
      handleOpen(true)
    }
  },
})

/**首次访问上报 */
const { run: runSetFirst } = useAsync(setFirst, {
  manual: true,
  onSuccess: () => {
    store.handleGetUserInfo()
  },
})

const handleOpen = async (val: boolean) => {
  open.value = val
  if (!val) {
    runSetFirst()
  }
  if (!val) {
    current.value = 0
  }
}

const handleOpenGuide = () => {
  open.value = true
}

const steps: TourProps['steps'] = [
  {
    title: '新增',
    description: '点击新增模块',
    target: () => ref1.value && ref1.value.$el,
    placement: 'topRight',
  },
  {
    title: '留言',
    description: '留下您宝贵的意见，您的意见是我前进的动力',
    target: () => ref2.value && ref2.value.$el,
    placement: 'topRight',
  },
  {
    title: '信息设置',
    description: '信息修改，密码修改，颜色配置，退出登录',
    target: () => headerRef.value?.getRef3?.()?.value,
    placement: 'topRight',
  },
  {
    title: '打开引导',
    description: '功能引导',
    target: () => headerRef.value?.getRef4?.()?.value,
    placement: 'topRight',
  },
  {
    title: '主题切换',
    description: '极简白，极夜黑',
    target: () => headerRef.value?.getRef5?.()?.value,
    placement: 'topRight',
  },
  {
    title: '收藏',
    description: '创作不易，喜欢请三连哈',
    target: () => headerRef.value?.getRef6?.()?.value,
    placement: 'topRight',
  },
]
</script>

<template>
  <div class="out-wrap flex flex-col dark:bg-[#20293a] bg-[#fafafa]">
    <Header ref="headerRef" :handleOpenGuide="handleOpenGuide" />
    <div class="flex-"><router-view /></div>

    <a-tour v-model:current="current" :open="open" :steps="steps" @close="handleOpen(false)" />
  </div>
</template>

<style lang="less" scoped>
.out-wrap {
  height: 100vh;
  overflow-y: auto;
  background: url('../assets/images/bg1.jpg') no-repeat;
  background-size: cover;
  background-position: top;
}
</style>
