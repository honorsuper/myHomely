<script setup lang="ts">
import { reactive, ref, watch, createVNode } from 'vue'
import { MinusCircleOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { message, type FormInstance, Modal } from 'ant-design-vue'
import { userStore } from '@/stores/user'
import { ColorPicker } from 'vue3-colorpicker'
import { updateColorConfig, resetColorConfig } from '@/utils/request'
import { DEFAULT_BG_COLOR, DEFAULT_COLOR } from '@/constants'
import useAsync from '@/hooks/useQuery'

interface IColorList {
  bgColor: string
  color: string
}

const open = ref<boolean>(false)
const store = userStore()
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{ colorList: IColorList[] }>({
  colorList: JSON.parse(store.userInfo.colorConfig || '[]'),
})

/**更新颜色配置 */
const { run: runUpdateColorConfig } = useAsync(updateColorConfig, {
  manual: true,
  onSuccess: () => {
    message.success('修改成功')
    store.handleGetUserInfo()
    onClose()
  },
})

/**重置颜色配置 */
const { run: runResetColorConfig } = useAsync(resetColorConfig, {
  manual: true,
  onSuccess: () => {
    message.success('操作成功')
    onClose()
    store.handleGetUserInfo()
  },
})

const removeColor = (item: IColorList) => {
  const index = dynamicValidateForm.colorList.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.colorList.splice(index, 1)
  }
}
const addColor = () => {
  dynamicValidateForm.colorList.push({
    bgColor: DEFAULT_BG_COLOR,
    color: DEFAULT_COLOR,
  })
}

const showDrawer = () => {
  open.value = true
}

const onClose = () => {
  open.value = false
}

const handleResetShow = () => {
  Modal.confirm({
    title: '颜色重置',
    icon: createVNode(ExclamationCircleOutlined),
    content: '确认将颜色配置重置为默认',
    okText: '确认',
    cancelText: '取消',
    onOk() {
      runResetColorConfig()
    },
  })
}

watch(open, (newValue) => {
  if (newValue) {
    dynamicValidateForm.colorList = JSON.parse(store.userInfo.colorConfig ?? '[]')
  }
})

/**
 * 提交
 */
const handleSubmit = () => {
  formRef.value
    ?.validate()
    .then(async (values) => {
      const params = {
        colorList: values.colorList,
      }
      runUpdateColorConfig(params)
    })
    .catch((err) => {
      console.log('err', err)
    })
}
defineExpose({
  showDrawer,
})
</script>
<template>
  <a-drawer
    title="颜色配置"
    :width="720"
    :open="open"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form ref="formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm">
      <a-space
        v-for="(item, index) in dynamicValidateForm.colorList"
        :key="`${index}-${item}`"
        style="margin-bottom: 8px"
        align="baseline"
        class="flex"
      >
        <a-form-item
          :name="['colorList', index, 'bgColor']"
          :label="`背景色${index + 1}`"
          :rules="{
            required: true,
            message: '请填写背景色',
          }"
          :style="{
            width: '200px',
          }"
        >
          <ColorPicker
            v-model:pureColor="item.bgColor"
            :disableAlpha="true"
            :disableHistory="true"
            shape="circle"
            format="hex"
          />
          <span>{{ item.bgColor }}</span>
        </a-form-item>
        <a-form-item
          label="字体颜色"
          :name="['colorList', index, 'color']"
          :rules="{
            required: true,
            message: '请填写字体颜色',
          }"
          :style="{
            marginLeft: '50px',
            width: '200px',
          }"
        >
          <ColorPicker
            v-model:pureColor="item.color"
            :disableAlpha="true"
            :disableHistory="true"
            shape="circle"
            format="hex"
          />
          <span>{{ item.color }}</span>
        </a-form-item>
        <MinusCircleOutlined @click="removeColor(item)" />
      </a-space>
      <a-form-item>
        <a-button type="dashed" block @click="addColor">
          <PlusOutlined />
          新增颜色配置
        </a-button>
      </a-form-item>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="handleResetShow">重置</a-button>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<style scoped lang="less"></style>
