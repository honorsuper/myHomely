<script setup lang="ts">
import { reactive, ref } from 'vue'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { message, type FormInstance } from 'ant-design-vue'
import { userStore } from '@/stores/user'
import { ColorPicker } from 'vue3-colorpicker'
import { updateColorConfig } from '@/utils/request'
import { useRouter } from 'vue-router'
import useQuery from '@/hooks/useQuery'

interface IColorList {
  bgColor: string
  color: string
}
const store = userStore()
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{ colorList: IColorList[] }>({
  colorList: JSON.parse(store.userInfo.colorConfig ?? '[]'),
})
const router = useRouter()

const { run: runUpdateColorConfig } = useQuery(updateColorConfig, {
  manual: true,
  onSuccess: () => {
    message.success('修改成功')
    store.handleGetUserInfo()
    router.back()
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
    bgColor: '#ececec',
    color: '#000000',
  })
}
const onFinish = async (values: IColorList[]) => {
  runUpdateColorConfig({
    colorList: values?.colorList?.colorlist,
  })
}
</script>
<template>
  <div class="color-setting-wrap">
    <a-form
      ref="formRef"
      name="dynamic_form_nest_item"
      :model="dynamicValidateForm"
      @finish="onFinish"
    >
      <a-space
        v-for="(item, index) in dynamicValidateForm.colorList"
        :key="`${index}-${item}`"
        style="display: flex; margin-bottom: 8px"
        align="baseline"
      >
        <a-form-item
          :name="['colorList', index, 'bgColor']"
          :label="`背景色${index + 1}`"
          :rules="{
            required: true,
            message: '请填写背景色',
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
      <a-form-item>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<style scoped lang="less">
.color-setting-wrap {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
}
</style>
