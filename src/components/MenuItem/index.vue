<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFocus } from '@vueuse/core'

const target = ref()
const { focused } = useFocus(target)

const props = defineProps<{
  info: {
    mainTitle: string
    content: {
      title: string
      url: string
    }[]
  }
}>()
</script>

<template>
  <div class="box rounded">
    <div class="title box-border" ref="target">
      {{ info.mainTitle }}
      <div v-if="focused">111</div>
    </div>
    <div class="menu-item-content flex-col flex gap-y-1.5 cursor-pointer">
      <div class="item" v-for="item in info.content" :key="item.title">{{ item.title }}</div>
    </div>
  </div>
</template>
<style scoped lang="less">
.box {
  background: #ffffff;
  width: 150px;
}

.title {
  height: 40px;
  padding: 10px;
  color: red;
  //background: #f5f5f5;
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
