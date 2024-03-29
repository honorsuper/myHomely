<script setup lang="ts">
import { ref, provide } from 'vue'
import { Header, AddCol, FeedBack } from './components'
import { getMenuInfo, queryIsFirst, setFirst } from '@/utils/request'
import { message, type TourProps } from 'ant-design-vue'
import { userStore } from '@/stores/user'
import useAsync from '@/hooks/useQuery'

const ref1 = ref(null)
const ref2 = ref(null)
const headerRef = ref<InstanceType<typeof Header> | null>(null)
const addColRef = ref<InstanceType<typeof AddCol> | null>(null)
const feedBackRef = ref<InstanceType<typeof FeedBack> | null>(null)

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
    description: '极简白，极夜黑，图片模式',
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

const handleOpenFeedBackModal = () => {
  feedBackRef?.value?.handleOpenModal?.()
}

provide('homely', {
  handleGetMenuInfo,
  getColumnInfo: () => {
    return menuData.value
  },
})
</script>

<template>
  <div
    class="out-wrap flex flex-col dark:bg-[#20293a] bg-[#fafafa]"
    :class="{
      'bg-wrap-1': store.userInfo.bgType === '2' && store.userInfo.pictureBgType === '1',
      'bg-wrap-2': store.userInfo.bgType === '2' && store.userInfo.pictureBgType === '2',
    }"
  >
    <Header ref="headerRef" :handleOpenGuide="handleOpenGuide" />

    <div class="flex flex-col relative">
      <WaterFall :data="menuData" v-if="menuData?.length > 0" />
      <div class="flex h-full justify-center items-center" v-else>
        <a-empty description="暂无数据，点击右下角「加号」创建" />
      </div>
      <AddCol ref="addColRef" />
      <FeedBack ref="feedBackRef" />
    </div>

    <a-float-button-group shape="circle" :style="{ right: '34px' }">
      <a-float-button type="primary" ref="ref1" @click="handleOpenModal">
        <template #icon>
          <PlusOutlined />
        </template>
      </a-float-button>

      <a-float-button @click="handleOpenFeedBackModal" ref="ref2">
        <template #icon>
          <img src="@/assets/icons/email.png" />
        </template>
      </a-float-button>
    </a-float-button-group>

    <a-tour v-model:current="current" :open="open" :steps="steps" @close="handleOpen(false)" />
  </div>
</template>

<style lang="less" scoped>
.out-wrap {
  height: 100vh;
  overflow-y: auto;
}
.bg-wrap-1 {
  background: url('../../assets/images/bg1.jpg') no-repeat;
  background-size: cover;
  background-position: top;
}
.bg-wrap-2 {
  background: url('../../assets/images/bg2.jpg') no-repeat;
  background-size: cover;
  background-position: top;
}
</style>
