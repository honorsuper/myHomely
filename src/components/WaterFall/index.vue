<script setup lang="ts">
import { onMounted, ref, computed, nextTick } from 'vue'

import { getMinHeightColumn, getMinHeight, getMaxHeight } from './utils'
import { useFocus } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    data: {
      _style?: {
        left?: number
        top?: number
      }
      mainTitle: string
      content: {
        title: string
        url: string,
      }[]
    }[]
    // 列数
    column?: number
    // 列间距
    columnSpacing?: number
    // 行间距
    rowSpacing?: number
  }>(),
  {
    column: 6,
    columnSpacing: 30,
    rowSpacing: 30
  }
)
// 容器实例
const containerTarget = ref<HTMLElement | null>(null)
// 列宽
const columnWidth = ref(0)
// 容器总宽度(不包含 padding、margin、border)
const containerWidth = ref(0)
// 容器左边距，计算 item left 时，需要使用定位
const containerLeft = ref(0)
// 记录每列高度的容器。key：所在列  val：列高
const columnHeightObj = ref<Record<string, number>>({})
// 容器的总高度
const containerHeight = ref(0)
const itemTarget = ref<HTMLElement | null>(null)
// const focused = ref(false)
const { focused } = useFocus(containerTarget)
/**
 * 计算容器宽度
 */
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(containerTarget.value as HTMLElement, null)
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器宽度
  containerWidth.value =
    containerTarget.value!.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}

/**
 * 开始计算
 */
const useColumnWidth = () => {
  // 获取容器宽度
  useContainerWidth()
  // 计算列宽，元素的宽度是根据列数动态计算出来的
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}
// 列间距合计
const columnSpacingTotal = computed(() => {
  // 如果是5列，则存在 4 个列间距
  return (props.column - 1) * props.columnSpacing
})

/**
 * 返回下一个 item 的 left
 */
const getItemLeft = () => {
  // 最小高度所在的列 * (列宽 + 间距)
  const column = getMinHeightColumn(columnHeightObj.value)
  return Number(column) * (columnWidth.value + props.columnSpacing) + containerLeft.value
}

/**
 * 返回下一个 item 的 top
 */
const getItemTop = () => {
  // 列高对象中的最小的高度
  return getMinHeight(columnHeightObj.value)
}
// item 高度集合
let itemHeights: number[] = []

/**
 * 指定列高度自增
 */
const increasingHeight = (index: number) => {
  // 最小高度所在的列
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  // 该列高度自增
  columnHeightObj.value[minHeightColumn] += itemHeights[index] + props.rowSpacing
}

/**any
 * 图片不需要预加载时，计算 item 高度
 */
const useItemHeight = () => {
  itemHeights = []
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName('waterfall-item')] as HTMLElement[]
  // 计算 item 高度
  itemElements.forEach((el) => {
    // 依据传入数据计算出的 img 高度
    itemHeights.push(el.offsetHeight)
  })
  // 渲染位置
  useItemLocation()
}

/**
 * 为每个 item 生成位置属性
 */
const useItemLocation = () => {
  // 遍历数据源
  props.data.forEach((item, index) => {
    // 避免重复计算
    if (item._style) {
      return
    }
    // 生成 _style 属性
    item._style = {}
    // left
    item._style.left = getItemLeft()
    // top
    item._style.top = getItemTop()
    // 指定列高度自增
    increasingHeight(index)
  })

  // 指定容器高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}
/**
 * 构建记录各列的高度的对象,后续需要比较出哪列的高度最低
 */
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

onMounted(() => {
  useColumnWidth()
  useColumnHeightObj()
  useItemHeight()
})
</script>
<template>
  <div
    ref="containerTarget"
    class="relative waterfall-wrap"
    :style="{
      height: containerHeight + 'px', // 因为当前为 relative 布局，所以需要主动指定高度
    }"
  >
    >
    <div
      class="waterfall-item rounded absolute"
      v-for="info in data"
      :key="info.mainTitle"
      :style="{
        width: columnWidth + 'px',
        left: info._style?.left + 'px',
        top: info._style?.top + 'px'
      }"
    >
      <div class="title box-border flex justify-between font-medium">
        {{ info.mainTitle }}
<!--        <div :style="{ color: 'red' }">111</div>-->
      </div>
      <div class="menu-item-content flex-col flex gap-y-1.5 cursor-pointer">
        <div class="item" v-for="item in info.content" :key="item.title">{{ item.title }}</div>
      </div>
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
.waterfall-wrap{
  padding-left: 150px;
  padding-right: 150px;
}
</style>
