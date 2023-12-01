<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { register, registerCaptcha } from '@/utils/request'

interface FormState {
  username: string
  password: string
  nickName: string
  confirmPassword: string
  email: string
  captcha: string
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  nickName: '',
  confirmPassword: '',
  email: '',
  captcha: '',
})

const router = useRouter()

const onFinish = async (values: any) => {
  const { confirmPassword, ...rest } = values
  const res = await register({
    ...rest,
  })
  const { data } = res.data
  if (res.status === 201 || res.status === 200) {
    message.success('注册成功')
    setTimeout(() => {
      router.push({
        name: 'login',
      })
    }, 500)
  } else {
    message.error(data || '系统繁忙，请稍后再试')
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const sendCaptcha = async () => {
  const res = await registerCaptcha(formState.email)
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
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="昵称"
          name="nickName"
          :rules="[{ required: true, message: '请输入昵称!' }]"
        >
          <a-input v-model:value="formState.nickName" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item
          label="确认密码"
          name="confirmPassword"
          :rules="[{ required: true, message: '请输入确认密码!' }]"
        >
          <a-input-password v-model:value="formState.confirmPassword" />
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
