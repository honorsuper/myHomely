<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message, type FormInstance } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { register, registerCaptcha } from '@/utils/request'
import useAsync from '@/hooks/useQuery'

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
const formRef = ref<FormInstance>()

const { run: runRegister } = useAsync(register, {
  manual: true,
  onSuccess: () => {
    message.success('注册成功')
    setTimeout(() => {
      router.push({
        name: 'login',
      })
    }, 500)
  },
})

const { run: runRegisterCaptcha } = useAsync(registerCaptcha, {
  manual: true,
  onSuccess: () => {
    message.success('发送成功')
  },
})

const onFinish = async (values: any) => {
  const { confirmPassword, ...rest } = values

  runRegister({
    ...rest,
  })
}

const sendCaptcha = async () => {
  runRegisterCaptcha(formState.email)
}

const handleToLogin = () => {
  router.push({
    name: 'login',
  })
}

const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请输入密码')
  } else {
    if (formState.confirmPassword !== '') {
      formRef.value?.validateFields?.('confirmPassword')
    }
    return Promise.resolve()
  }
}
const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('请再次输入密码')
  } else if (value !== formState.password) {
    return Promise.reject('两次密码输入不一致')
  } else {
    return Promise.resolve()
  }
}
</script>
<template>
  <div class="flex justify-center items-center h-full login-wrapper flex-col register-wrap">
    <div class="content-wrapper">
      <div class="text-xl mb-4">账号注册</div>
      <div class="form-wrap">
        <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" ref="formRef">
          <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名' }]">
            <a-input v-model:value="formState.username" placeholder="请输入用户名" />
          </a-form-item>

          <a-form-item name="nickName" :rules="[{ required: true, message: '请输入昵称' }]">
            <a-input v-model:value="formState.nickName" placeholder="请输入昵称" />
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[{ required: true, validator: validatePass, trigger: 'change' }]"
            class="spec-form-item"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="请输入密码"
              autoComplete="new-password"
              :maxlength="20"
            />
          </a-form-item>

          <a-form-item
            name="confirmPassword"
            :rules="[{ validator: validatePass2, trigger: 'change' }]"
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
          <a-button @click="handleToLogin" block class="h-10 rounded-full mt-4">返回</a-button>
        </a-form>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.register-wrap {
  background-color: #fafafa;
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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  border-radius: 20px;
  padding: 32px;
  :deep {
    input.ant-input {
      height: 40px;
    }
  }
}
</style>
