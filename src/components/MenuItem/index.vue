<script setup lang="ts">
import { ref, createVNode } from 'vue'
import { useElementHover } from '@vueuse/core'
import { Modal } from 'ant-design-vue'
import { DownSquareOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { AddCol } from '../../views/Homely/components'
import Rename from './Rename.vue'

defineProps<{
  info: {
    _style?: {
      left?: number
      top?: number
    }
    mainTitle: string
    content: {
      title: string
      url: string
      bgColor?: string
      color?: string
    }[]
  }
}>()

const target = ref()
const isHovered = useElementHover(target)
const open = ref(false)
const addColRef = ref<InstanceType<typeof AddCol> | null>(null)
const renameRef = ref<InstanceType<typeof Rename> | null>(null)

/**
 * 打开编辑弹窗
 */
const handleOpenModal = () => {
  open.value = false
  addColRef.value?.handleOpenModal()
}

/**
 * 打开重命弹窗
 */
const handelOpenRename = () => {
  open.value = false
  renameRef.value?.handleOpenRename?.()
}
// 删除
const handleDel = () => {
  console.log('删除')
}
/**
 * 确认删除
 */
const delConfirm = () => {
  open.value = false
  Modal.confirm({
    title: '确认操作',
    icon: createVNode(ExclamationCircleOutlined),
    content: '是否确认删除该组数据',
    okText: '确认',
    cancelText: '取消',
    onOk: handleDel,
  })
}
</script>

<template>
  <div class="waterfall-item rounded absolute" :key="info.mainTitle">
    <div class="title box-border flex justify-between items-center font-medium" ref="target">
      标题{{ info.mainTitle }}
      <div class="cursor-pointer flex items-center" v-if="isHovered || open">
        <a-dropdown v-model:open="open">
          <DownSquareOutlined />
          <template #overlay>
            <a-menu>
              <a-menu-item key="3" @click="handleOpenModal">修改</a-menu-item>
              <a-menu-item key="4" @click="handelOpenRename">重命名</a-menu-item>
              <a-menu-item key="5" @click="delConfirm">删除</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="menu-item-content flex-col flex gap-y-2 cursor-pointer">
      <div
        class="item flex justify-center"
        v-for="item in info.content"
        :key="item.title"
        :style="{
          background: item.bgColor,
          color: item.color,
        }"
      >
        {{ item.title }}
      </div>
    </div>
    <AddCol ref="addColRef" />
    <Rename ref="renameRef" />
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
}

.item {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
}

.menu-item-content {
  padding: 10px;
}
</style>
