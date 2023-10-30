<script setup lang="ts">
import { ref } from 'vue'
import { useElementHover } from '@vueuse/core'
import {DownSquareOutlined} from "@ant-design/icons-vue"

const target = ref()
const isHovered = useElementHover(target)

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
    }[]
  }
}>()
</script>

<template>
  <div class="waterfall-item rounded absolute" :key="info.mainTitle">
    <div class="title box-border flex justify-between items-center font-medium" ref="target">
      标题{{ info.mainTitle }}
      <div class="cursor-pointer flex items-center" v-if="isHovered"><DownSquareOutlined /></div>
    </div>
    <div class="menu-item-content flex-col flex gap-y-1.5 cursor-pointer">
      <div class="item" v-for="item in info.content" :key="item.title">{{ item.title }}</div>
    </div>
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
  padding: 6px 12px;
  font-size: 14px;
  background: red;
  border-radius: 4px;
}

.menu-item-content {
  padding: 10px;
}
</style>
