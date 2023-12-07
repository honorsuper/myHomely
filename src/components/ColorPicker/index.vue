<script setup lang="ts">
import { userStore } from '@/stores/user'
import { ref, watch } from 'vue'

const props = defineProps<{
  value: number
  'onUpdate:value': (value: number) => void
  onUpdateValue: (value: number) => void
}>()

const val = ref(props.value)
const selected = ref(true)

const store = userStore()

const colorList = JSON.parse(store.userInfo.colorConfig).colorList

const handleChangeStatus = () => {
  selected.value = false
}

const handleSelectColor = (index: number) => {
  props?.['onUpdate:value']?.(index)
  props?.onUpdateValue?.(index)
  selected.value = true
}

watch(
  () => props.value,
  (newVal: number) => {
    val.value = newVal
  },
)
</script>
<template>
  <div
    :style="{
      background: '#ffffff',
      padding: '10px',
      borderRadius: '6px',
    }"
  >
    <div
      v-if="selected"
      @click="handleChangeStatus"
      class="cursor-pointer"
      :style="{
        background: colorList[value || 0].bgColor,
        color: colorList[value || 0].color,
        width: '25px',
        height: '25px',
      }"
    />
    <div class="flex gap-4" v-else>
      <div
        v-for="(item, index) in colorList"
        :key="index"
        class="cursor-pointer"
        @click="handleSelectColor(index)"
        :style="{
          background: item.bgColor,
          color: item.color,
          width: '25px',
          height: '25px',
        }"
      />
    </div>
  </div>
</template>
<style scoped lang="less"></style>
