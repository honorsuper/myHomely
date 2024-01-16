<script setup lang="ts">
import { reactive, inject, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { updateBasicInfo } from '@/utils/request'
import useAsync from '@/hooks/useQuery'
import bg1 from '@/assets/images/bg1.jpg'
import bg2 from '@/assets/images/bg2.jpg'

import { userStore } from '@/stores/user'

interface FormState {
  clickType: string
  bgType: string
  pictureBgType: string
}

const formState = reactive<FormState>({
  clickType: '1',
  bgType: '1',
  pictureBgType: '1',
})

const store = userStore()

const { run: runUpdateBasicInfo } = useAsync(updateBasicInfo, {
  manual: true,
  onSuccess: () => {
    message.success('修改成功')
    handleCancel()
    store?.handleGetUserInfo()
  },
})

const onFinish = async (values: any) => {
  runUpdateBasicInfo(values)
}

const handleCancel = () => {
  parentInfo?.handleCloseModal?.()
  handleReset()
}

const handleReset = () => {
  formState.clickType = '1'
  formState.bgType = '1'
  formState.pictureBgType = '1'
}

const handleChangeModal = () => {
  formState.pictureBgType = '1'
}

const parentInfo: any = inject('setting')

onMounted(() => {
  const userInfo = store.userInfo
  formState.clickType = userInfo.clickType
  formState.bgType = userInfo.bgType
  formState.pictureBgType = userInfo.pictureBgType
})
</script>
<template>
  <div class="flex justify-center items-center h-full login-wrapper flex-col">
    <div class="content-wrapper">
      <div class="form-wrap">
        <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish">
          <a-form-item label="点击菜单" name="clickType">
            <a-radio-group v-model:value="formState.clickType">
              <a-radio value="1">当前Tab打开</a-radio>
              <a-radio value="2">新开一个Tab</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item label="背景类型" name="bgType">
            <a-radio-group v-model:value="formState.bgType" @change="handleChangeModal">
              <a-radio value="1">极简白、极夜黑</a-radio>
              <a-radio value="2">图片背景</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="图片类型" name="pictureBgType" v-if="formState.bgType === '2'">
            <a-radio-group v-model:value="formState.pictureBgType">
              <a-radio value="1">
                <a-image :width="150" :src="bg1" />
              </a-radio>
              <a-radio value="2">
                <a-image :width="150" :src="bg2" />
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <div
            class="flex items-center gap-6"
            :style="{
              width: '500px',
            }"
          >
            <a-button type="primary" html-type="submit" class="h-10 rounded-full flex-1"
              >确定</a-button
            >
            <a-button @click="handleCancel" class="h-10 rounded-full flex-1">取消</a-button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.spec-form-item {
  :deep {
    input.ant-input {
      height: 30px !important;
    }
  }
}
.content-wrapper {
  width: 800px;

  border-radius: 20px;
  padding: 32px;
  :deep {
    input.ant-input {
      height: 40px;
    }
  }
}
</style>
