<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { updateUserInfo, updateUserInfoCaptcha } from '@/utils/request'
import useAsync from '@/hooks/useQuery'
import { userStore } from '@/stores/user'

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
const store = userStore()

const { run: runUpdateUserInfo } = useAsync(updateUserInfo, {
  manual: true,
  onSuccess: () => {
    message.success('修改成功')
    store.handleGetUserInfo()
    setTimeout(() => {
      router.push({
        name: 'home',
      })
    }, 500)
  },
})

const { run: runUpdateUserInfoCaptcha } = useAsync(updateUserInfoCaptcha, {
  manual: true,
  onSuccess: () => {
    message.success('发送成功')
  },
})

const onFinish = async (values: any) => {
  runUpdateUserInfo({
    ...values,
  })
}

const sendCaptcha = async () => {
  runUpdateUserInfoCaptcha(formState.email)
}

const handleToHome = () => {
  router.push({
    name: 'home',
  })
}
</script>
<template>
  <div
    class="flex justify-center items-center h-full login-wrapper flex-col register-wrap dark:bg-[#20293a]"
  >
    <div class="content-wrapper">
      <div class="text-xl mb-4">信息修改</div>
      <div class="form-wrap">
        <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish">
          <a-form-item name="nickName" :rules="[{ required: true, message: '请输入昵称' }]">
            <a-input v-model:value="formState.nickName" placeholder="请输入昵称" />
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
          <a-button @click="handleToHome" block class="h-10 rounded-full mt-4">返回</a-button>
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
