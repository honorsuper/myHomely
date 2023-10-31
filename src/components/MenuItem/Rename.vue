<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'ant-design-vue'

const open = ref(false)

// 表单
const formRef = ref<FormInstance>()

const formState = reactive({
  mainTitle: '',
})

const handleOpenRename = () => {
  open.value = true
}

/**
 * 提交
 */
const handleSubmit = () => {
  formRef.value
    ?.validate()
    .then((values) => {
      console.log('values', values)
    })
    .catch((err) => {
      console.log('err', err)
    })
}

/**
 * 取消
 */
const handleCancel = () => {
  formState.mainTitle = ''
  open.value = false
}
defineExpose({
  handleOpenRename,
})
</script>
<template>
  <a-modal
    v-model:open="open"
    title="重命名"
    ok-text="确认"
    cancel-text="取消"
    :onOk="handleSubmit"
    :onCancel="handleCancel"
  >
    <a-form ref="formRef" name="rename_form" :model="formState">
      <a-form-item
        name="mainTitle"
        label="主标题"
        :rules="[{ required: true, message: '请输入主标题' }]"
      >
        <a-input v-model:value="formState.mainTitle" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<style scoped lang="less"></style>
