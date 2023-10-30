<script setup lang="ts">
import { ref } from 'vue'
import { useElementHover } from '@vueuse/core'
import {Dropdown} from "ant-design-vue"
import { DownSquareOutlined } from '@ant-design/icons-vue'

const target = ref()
const isHovered = useElementHover(target)
const open = ref(false)

defineProps<{
  info: {
    _style?: {
      left?: number
      top?: number
    }
    mainTitle: string
    content: {
      title: string
      url: string,
      bgColor?:string,
      color?:string
    }[]
  }
}>()
</script>

<template>
  <div class="waterfall-item rounded absolute" :key="info.mainTitle">
    <div class="title box-border flex justify-between items-center font-medium" ref="target">
      标题{{ info.mainTitle }}
      <div class="cursor-pointer flex items-center" v-if="isHovered || open">
        <a-dropdown v-model:open="open" >
          <DownSquareOutlined />
          <template #overlay>
            <a-menu>
              <a-menu-item key="3">修改</a-menu-item>
              <a-menu-item key="4">重命名</a-menu-item>
              <a-menu-item key="5">删除</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="menu-item-content flex-col flex gap-y-2 cursor-pointer">
      <div class="item flex justify-center" v-for="item in info.content" :key="item.title" :style="{
        background:item.bgColor,
        color:item.color
      }">{{ item.title }}</div>
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
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
}

.menu-item-content {
  padding: 10px;
}
</style>
