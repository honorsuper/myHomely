<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { Sortable } from 'sortablejs-vue3'
import { MenuItem } from '@/components'
import { getMinHeightColumn, getMinHeight, getMaxHeight } from './utils'
import { sortColumn } from '@/utils/request'
import { message } from 'ant-design-vue'

const props = withDefaults(
  defineProps<{
    data: {
      _style?: {
        left?: number
        top?: number
      }
      id: number
      mainTitle: string
      list: {
        title: string
        url: string
        id: number | string
        isGroup?: number
        groupTitle?: string
        bgColor: string
        color: string
        groupList?: {
          subTitle: string
          subUrl: string
          id: number | string
        }[]
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
    rowSpacing: 30,
  },
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
  console.log('column', column)
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
    console.log('item', item)
    // 避免重复计算
    if (item._style) {
      console.log('_style', item._style)
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

const onOrderChange = async (event: any) => {
  if (event.oldIndex === event.newIndex) return

  const res = await sortColumn({
    fromIndex: event.oldIndex,
    toIndex: event.newIndex,
  })

  if (res.status === 201 || res.status === 200) {
    message.success('修改成功')
    // handleCancel()
    // homelyInfo?.handleGetMenuInfo?.()
  } else {
    message.error(res?.data || '系统繁忙，请稍后再试')
  }
}

watch(
  () => props.data,
  () => {
    useItemHeight()
  },
)

onMounted(() => {
  useColumnWidth()
  useColumnHeightObj()
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
    <Sortable
      :list="data"
      item-key="uid"
      tag="div"
      @end="onOrderChange"
      :options="{
        handle: '.my-handle',
      }"
    >
      <template #item="{ element }">
        <MenuItem
          :info="element"
          :key="element.mainTitle"
          :style="{
            width: columnWidth + 'px',
            left: element._style?.left + 'px',
            top: element._style?.top + 'px',
          }"
          class="cursor-move"
        />
      </template>
    </Sortable>
  </div>
</template>
<style scoped lang="less">
.waterfall-wrap {
  padding-left: 150px;
  padding-right: 150px;
}
</style>
