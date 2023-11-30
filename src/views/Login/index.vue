<script setup lang="ts">
import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import { login } from '@/utils/request'

interface FormState {
  username: string
  password: string
}

const formState = reactive<FormState>({
  username: '',
  password: '',
})
const onFinish = async (values: any) => {
  const res = await login(values.username, values.password)
  const { data } = res.data
  if (res.status === 201 || res.status === 200) {
    message.success('登录成功')

    localStorage.setItem('access_token', data.accessToken)
    localStorage.setItem('refresh_token', data.refreshToken)
    localStorage.setItem('user_info', JSON.stringify(data.userInfo))
  } else {
    message.error(data || '系统繁忙，请稍后再试')
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
<template>
  <div class="login-wrap flex justify-center items-center">
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
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <div class="flex justify-between">
            <router-link to="/rigist">创建账号</router-link>
            <router-link to="/update_password">忘记密码</router-link>
          </div>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<style scoped lang="less">
.login-wrap {
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
}
.form-wrap {
  width: 400px;
}
</style>
