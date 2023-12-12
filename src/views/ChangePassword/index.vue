<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { ChangePasswordCaptcha, register } from '@/utils/request'

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
const route = useRoute()
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
  const res = await ChangePasswordCaptcha(formState.email)

  const { data } = res.data

  if (res.status === 201 || res.status === 200) {
    message.success('发送成功')
  } else {
    message.error(data || '系统繁忙，请稍后再试')
  }
}

const handleBack = () => {
  console.log('route', route)
  if (route.name === 'changePassword') {
    router.push({
      name: 'home',
    })
  } else {
    router.push({
      name: 'login',
    })
  }
}
</script>
<template>
  <div class="flex justify-center items-center h-full login-wrapper flex-col register-wrap">
    <div class="content-wrapper">
      <div class="text-xl mb-4">修改密码</div>
      <div class="form-wrap">
        <a-form
          :model="formState"
          name="basic"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码' }]"
            class="spec-form-item"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="请输入密码"
              autoComplete="new-password"
            />
          </a-form-item>

          <a-form-item
            name="confirmPassword"
            :rules="[{ required: true, message: '请再此输入密码' }]"
            class="spec-form-item"
          >
            <a-input-password
              v-model:value="formState.confirmPassword"
              placeholder="请再次输入密码"
              autoComplete="new-password"
            />
          </a-form-item>

          <a-form-item
            name="email"
            :rules="[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '请输入合法邮箱地址!' },
            ]"
          >
            <a-input v-model:value="formState.email" placeholder="请输入邮箱" />
          </a-form-item>

          <div class="flex justify-between gap-4">
            <a-form-item
              class="flex-1"
              :rules="[{ required: true, message: '请输入验证码' }]"
              name="captcha"
            >
              <a-input type="text" placeholder="请输入验证码" v-model:value="formState.captcha" />
            </a-form-item>

            <a-button
              tabindex="-1"
              :style="{ height: '40px' }"
              @Click="sendCaptcha"
              :disabled="!formState.email"
              >发送验证码</a-button
            >
          </div>

          <a-button type="primary" html-type="submit" block class="h-10 rounded-full"
            >确定</a-button
          >
          <a-button @click="handleBack" block class="h-10 rounded-full mt-4">返回</a-button>
        </a-form>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.register-wrap {
  background-color: gray;
}
.spec-form-item {
  :deep {
    input.ant-input {
      height: 30px !important;
    }
  }
}
.content-wrapper {
  width: 450px;
  background-color: #fff;
  border-radius: 20px;
  padding: 32px;
  :deep {
    input.ant-input {
      height: 40px;
    }
  }
}
</style>
