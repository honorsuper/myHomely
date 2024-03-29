<script setup lang="ts">
import { ref, createVNode, computed, inject } from 'vue'
import { useElementHover } from '@vueuse/core'
import { message, Modal } from 'ant-design-vue'
import {
  DownSquareOutlined,
  ExclamationCircleOutlined,
  CaretDownOutlined,
} from '@ant-design/icons-vue'
import { AddCol } from '../../views/Homely/components'
import { deleteColumn } from '@/utils/request'
import { userStore } from '@/stores/user'
import { DEFAULT_BG_COLOR, DEFAULT_COLOR } from '@/constants'
import useAsync from '@/hooks/useQuery'

const props = defineProps<{
  info: {
    id: number
    _style?: {
      left?: number
      top?: number
    }
    mainTitle: string
    list: {
      title: string
      url: string
      id: number | string
      isGroup?: number
      groupTitle?: string
      bgColor: string
      color: number
      groupList?: {
        subTitle: string
        subUrl: string
        id: number | string
      }[]
    }[]
  }
}>()

const target = ref()
const isHovered = useElementHover(target)
const open = ref(false)
const addColRef = ref<InstanceType<typeof AddCol> | null>(null)
const store = userStore()

const colorList = computed(() => {
  return JSON.parse(store.userInfo.colorConfig) ?? []
})

const { run: runDeleteColumn } = useAsync(deleteColumn, {
  manual: true,
  onSuccess: () => {
    message.success('删除成功')
    setTimeout(() => {
      homelyInfo?.handleGetMenuInfo?.()
    }, 500)
  },
})

/**
 * 打开编辑弹窗
 */
const handleOpenModal = () => {
  open.value = false
  addColRef.value?.handleOpenModal(props?.info)
}

// 删除
const handleDel = async (id: number | string) => {
  runDeleteColumn({
    id,
  })
}
/**
 * 确认删除
 */
const delConfirm = (id: number | string) => {
  open.value = false
  Modal.confirm({
    title: '确认操作',
    icon: createVNode(ExclamationCircleOutlined),
    content: '是否确认删除该组数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => handleDel(id),
  })
}

/**
 * 页面跳转
 * @param url 跳转路径
 */
const jumpToUrl = (url: string) => {
  if (store.userInfo.clickType === '1') {
    location.href = url
  } else {
    window.open(url)
  }
}

const homelyInfo = inject<any>('homely')
</script>

<template>
  <div class="waterfall-item rounded absolute" :key="info.mainTitle">
    <div class="title box-border flex justify-between items-center font-medium" ref="target">
      <a-tooltip
        placement="topLeft"
        color="#F5F5F5"
        :overlayInnerStyle="{
          color: '#000000',
        }"
        v-if="info.notes"
      >
        <template #title>{{info.notes}}</template>
        <a-typography-text
          :ellipsis="{ tooltip: info.mainTitle }"
          :style="{ width: '122px' }"
          :content="info.mainTitle"
        />
      </a-tooltip>
      <a-typography-text
        v-else
        :ellipsis="{ tooltip: info.mainTitle }"
        :style="{ width: '122px' }"
        :content="info.mainTitle"
      />

      <div class="cursor-pointer flex items-center" v-if="isHovered || open">
        <a-dropdown v-model:open="open">
          <DownSquareOutlined />
          <template #overlay>
            <a-menu>
              <a-menu-item key="3" @click="handleOpenModal">修改</a-menu-item>
              <a-menu-item key="5" @click="() => delConfirm(info.id)">删除</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="menu-item-content flex-col flex gap-y-2 cursor-pointer">
      <div v-for="item in info.list" :key="item.id">
        <div
          :style="{
            background: colorList[item.color]?.bgColor ?? DEFAULT_BG_COLOR,
            color: colorList[item.color]?.color ?? DEFAULT_COLOR,
          }"
          class="item flex justify-center"
          @click="jumpToUrl(item.url)"
          v-if="!item?.isGroup"
        >
          {{ item.title }}
        </div>

        <a-dropdown v-else>
          <div
            class="item flex justify-center"
            :style="{
              background: colorList[item.color]?.bgColor ?? DEFAULT_BG_COLOR,
              color: colorList[item.color]?.color ?? DEFAULT_COLOR,
            }"
          >
            {{ item.groupTitle }}
            <div class="flex items-center">
              <CaretDownOutlined />
            </div>
          </div>

          <template #overlay>
            <a-menu>
              <a-menu-item v-for="innerItem in item.groupList" :key="innerItem.id">
                <a target="_self" rel="noopener noreferrer" :href="innerItem.subUrl">
                  {{ innerItem.subTitle }}
                </a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <AddCol ref="addColRef" />
  </div>
</template>
<style scoped lang="less">
.waterfall-item {
  float: left;
  color: #fff;
  background: #fff;
}

.title {
  height: 40px;
  padding: 10px;
  background: #f5f5f5;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 500;
  border: 1px solid #dddddd;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.item {
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 4px;
}

.menu-item-content {
  padding: 10px;
  border: 1px solid #dddddd;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
