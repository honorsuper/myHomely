<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { addOpinion } from '@/utils/request'
// 弹窗展示
const open = ref(false)
// 表单
const formRef = ref<FormInstance>()

const formState = reactive({
  opinion: '',
})

const handleOpenModal = () => {
  open.value = true
}

const handleCancel = () => {
  open.value = false
}
const handleOk = () => {
  formRef.value
    ?.validate()
    .then(async (values) => {
      console.log('values', values)

      const res = await addOpinion(values)

      if (res.status === 201 || res.status === 200) {
        message.success('留言成功')
        handleCancel()
      } else {
        message.error(res?.data || '系统繁忙，请稍后再试')
      }
    })
    .catch((err) => {
      console.log('err', err)
    })
}

watch(open, (newValue) => {
  if (!newValue) {
    formState.opinion = ''
  }
})

defineExpose({
  handleOpenModal,
})
</script>
<template>
  <a-modal v-model:open="open" title="意见反馈" :width="750" @ok="handleOk">
    <div class="p-3"></div>
    <a-form ref="formRef" name="opinion_form" :model="formState">
      <a-form-item
        name="opinion"
        label="留言"
        :rules="[{ required: true, message: '请输入您宝贵的意见' }]"
      >
        <a-textarea
          v-model:value="formState.opinion"
          show-count
          :maxlength="500"
          :autosize="{
            minRows: 5,
            maxRows: 8,
          }"
        /> </a-form-item></a-form
  ></a-modal>
</template>
<style scoped lang="less"></style>
