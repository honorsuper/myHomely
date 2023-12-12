<script setup lang="ts">
import { ref } from "vue"
import { useRouter, } from 'vue-router'
import { userStore } from '@/stores/user'
import { handleLogout } from '@/utils'
import ColorSetting from '../ColorSetting/index.vue';

const colorSettingRef = ref<InstanceType<typeof ColorSetting> | null>(null)
const router = useRouter()

const store = userStore()

const handleClickMenu = (a: any) => {
  if (a?.key === 'logout') {
    handleLogout()
  } else if (a?.key === 'update-userinfo') {
    router.push({
      name: 'updateUser',
    })
  } else if (a?.key === 'update-password') {
    router.push({
      name: 'changePassword',
    })
  } else if (a?.key === 'color-setting') {
    colorSettingRef.value?.showDrawer?.()
  }
}


</script>
<template>
  <div class="header-wrap flex items-center justify-between">
    <div class="title">my-Homely</div>
    <div class="flex items-center gap-2">
      <a-dropdown>
        <div @click.prevent class="nickname">
          <div>{{ store.userInfo.nickName }}</div>
        </div>
        <template #overlay>
          <a-menu mode="vertical" @click="handleClickMenu">
            <a-menu-item key="update-userinfo"> 修改信息</a-menu-item>
            <a-menu-item key="update-password"> 修改密码</a-menu-item>
            <a-menu-item key="color-setting"> 颜色配置</a-menu-item>
            <a-menu-item key="logout"> 退出</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

  </div>
  <ColorSetting ref="colorSettingRef" />
</template>
<style scoped lang="less">
.header-wrap {
  height: 64px;
  box-shadow: 0 8px 24px -2px rgba(0, 0, 0, 0.05);
  padding: 0 20px;
  background: #ffffff;
  margin-bottom: 30px;
}

.nickname {
  :hover {
    cursor: pointer;
  }
}
</style>
