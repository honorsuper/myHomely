<script setup lang="ts">
import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { login } from '@/utils/request'
import { userStore } from '@/stores/user'
import useAsync from '@/hooks/useQuery'

interface FormState {
  username: string
  password: string
}

const formState = reactive<FormState>({
  username: '',
  password: '',
})

const router = useRouter()
const store = userStore()

const { run: runLogin } = useAsync(login, {
  manual: true,
  onSuccess: (res: any) => {
    const { data } = res
    message.success('登录成功')
    localStorage.setItem('access_token', data.accessToken)
    localStorage.setItem('refresh_token', data.refreshToken)
    localStorage.setItem('user_info', JSON.stringify(data.userInfo))
    store.setSystemInfo(data.userInfo)
    setTimeout(() => {
      router.push({
        name: 'home',
      })
    }, 500)
  },
})

const onFinish = async (values: any) => {
  runLogin(values.username, values.password)
}

const toRigister = () => {
  router.push({
    name: 'register',
  })
}

const toForgetPassword = () => {
  router.push({
    name: 'forgetPassword',
  })
}
</script>
<template>
  <div class="wrapper h-full relative justify-center items-center flex">
    <div class="title absolute flex items-center">
      <img src="@/assets/images/title.png" />
    </div>

    <div class="flex login-wrapper flex-col">
      <div class="content-wrapper">
        <div class="text-xl mb-4">账号登录</div>
        <div class="form-wrap">
          <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish">
            <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
              <a-input v-model:value="formState.username" placeholder="请输入用户名">
                <template #prefix>
                  <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
              <a-input-password v-model:value="formState.password" placeholder="请输入密码">
                <template #prefix>
                  <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input-password>
            </a-form-item>

            <a-button type="primary" html-type="submit" block class="h-10 rounded-full"
              >登录</a-button
            >

            <a-form-item>
              <div class="flex justify-between gap-4 mt-6">
                <a-button class="w-1/2" @click="toRigister">账号注册</a-button>
                <a-button class="w-1/2" @click="toForgetPassword">忘记密码</a-button>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrapper {
  background-color: #fafafa;
}
.title {
  left: 80px;
  top: 50px;
  img {
    width: 400px;
  }
}
.login-wrapper {
  background-color: #fafafa;
  // border: 1px solid red;
  // flex: 1;
}

.content-wrapper {
  width: 450px;
  background-color: #fff;
  border-radius: 20px;
  padding: 32px 32px 8px 32px;
  // border: 1px solid #000000;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;

  :deep {
    input.ant-input {
      height: 30px;
    }
  }
}
</style>
