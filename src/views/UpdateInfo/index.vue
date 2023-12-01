<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { updateUserInfo, updateUserInfoCaptcha } from '@/utils/request'

interface FormState {
  nickName: string
  email: string
  captcha: string
}

const formState = reactive<FormState>({
  nickName: '',
  email: '',
  captcha: '',
})

const router = useRouter()

const onFinish = async (values: any) => {
  const { confirmPassword, ...rest } = values
  const res = await updateUserInfo({
    ...rest,
  })
  const { data } = res.data
  if (res.status === 201 || res.status === 200) {
    message.success('修改成功')
  } else {
    message.error(data || '系统繁忙，请稍后再试')
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const sendCaptcha = async () => {
  const res = await updateUserInfoCaptcha(formState.email)
  const { data } = res.data
  if (res.status === 201 || res.status === 200) {
    message.success('发送成功')
  } else {
    message.error(data || '系统繁忙，请稍后再试')
  }
}
</script>
<template>
  <div class="register-wrap flex justify-center items-center">
    <div class="form-wrap">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="昵称"
          name="nickName"
          :rules="[{ required: true, message: '请输入昵称!' }]"
        >
          <a-input v-model:value="formState.nickName" />
        </a-form-item>

        <a-form-item
          label="邮箱"
          name="email"
          :rules="[
            { required: true, message: '请输入邮箱!' },
            { type: 'email', message: '请输入合法邮箱地址!' },
          ]"
        >
          <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-form-item
          label="验证码"
          name="captcha"
          :rules="[{ required: true, message: '请输入验证码!' }]"
        >
          <a-input v-model:value="formState.captcha" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" @Click="sendCaptcha">发送验证码</a-button>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <router-link to="/login">已有账号，去登录</router-link>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">注册</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<style scoped lang="less">
.register-wrap {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
}

.form-wrap {
  width: 400px;
}
</style>
