<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { getMenuInfo, menuRename } from '@/utils/request'
import { message } from 'ant-design-vue'

// 弹窗显示状态
const open = ref(false)
// 表单
const formRef = ref<FormInstance>()
// 当前模块id
const currentId = ref<number | null>(null)
// 表单数据
const formState = reactive({
  mainTitle: '',
})

/**
 * 打开重命名弹窗
 * @param id 当前模块id
 * @param mainTitle 当前模块标题
 */
const handleOpenRename = ({ id, mainTitle }: { id: number; mainTitle: string }) => {
  currentId.value = id
  formState.mainTitle = mainTitle
  open.value = true
}

/**
 * 提交
 */
const handleSubmit = () => {
  formRef.value
    ?.validate()
    .then(async (values) => {
      const res = await menuRename({
        ...values,
        id: currentId.value,
      })

      if (res.status === 201 || res.status === 200) {
        message.success('修改成功')
        handleCancel()
      } else {
        message.error(res?.data || '系统繁忙，请稍后再试')
      }
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
  currentId.value = null
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
