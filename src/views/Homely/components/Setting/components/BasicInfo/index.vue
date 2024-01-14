<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message, type FormInstance } from 'ant-design-vue'
import { ChangePasswordCaptcha, changePassword } from '@/utils/request'
import type { Rule } from 'ant-design-vue/es/form'
import useAsync from '@/hooks/useQuery'
import { handleLogout } from '@/utils'

interface FormState {
  clickType: string
  bgType: string
}

const formState = reactive<FormState>({
  clickType: '1',
  bgType: '1',
})

const router = useRouter()
const route = useRoute()
const formRef = ref<FormInstance>()

const { run: runChangePassword } = useAsync(changePassword, {
  manual: true,
  onSuccess: () => {
    message.success('修改成功')
    handleLogout()
    setTimeout(() => {
      router.push({
        name: 'login',
      })
    }, 500)
  },
})

const { run: runChangePasswordCaptcha } = useAsync(ChangePasswordCaptcha, {
  manual: true,
  onSuccess: () => {
    message.success('发送成功')
  },
})

const onFinish = async (values: any) => {
  const { confirmPassword, ...rest } = values
  runChangePassword({
    ...rest,
  })
}

const sendCaptcha = async () => {
  runChangePasswordCaptcha(formState.email)
}

const handleBack = () => {
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
  <div class="flex justify-center items-center h-full login-wrapper flex-col">
    <div class="content-wrapper">
      <div class="form-wrap">
        <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish">
          <a-form-item label="点击菜单" name="clickType">
            <a-radio-group v-model:value="formState.clickType">
              <a-radio value="1">新开一个Tab</a-radio>
              <a-radio value="2">当前Tab打开</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item label="背景类型" name="bgType">
            <a-radio-group v-model:value="formState.clickType">
              <a-radio value="1">极简包、极夜黑</a-radio>
              <a-radio value="2">图片1</a-radio>
              <a-radio value="3">图片2</a-radio>
            </a-radio-group>
          </a-form-item>
          <div class="flex items-center gap-6">
            <a-button type="primary" html-type="submit" class="h-10 rounded-full flex-1"
              >确定</a-button
            >
            <a-button @click="handleBack" class="h-10 rounded-full flex-1">返回</a-button>
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
  width: 500px;

  border-radius: 20px;
  padding: 32px;
  :deep {
    input.ant-input {
      height: 40px;
    }
  }
}
</style>
