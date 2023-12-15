<script setup lang="ts">
import { ref, createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { userStore } from '@/stores/user'
import { handleLogout } from '@/utils'
import ColorSetting from '../ColorSetting/index.vue'
import { ThemeType } from '@/enum'

const colorSettingRef = ref<InstanceType<typeof ColorSetting> | null>(null)
const router = useRouter()
const store = userStore()
const ref3 = ref(null)
const ref4 = ref(null)
const ref5 = ref(null)

const handleClickMenu = (a: any) => {
  if (a?.key === 'logout') {
    handleLogoutConfirm()
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

// 退出确认
const handleLogoutConfirm = () => {
  Modal.confirm({
    title: '退出登录',
    icon: createVNode(ExclamationCircleOutlined),
    content: '是否确认退出登录',
    okText: '确认',
    cancelText: '取消',
    onOk() {
      handleLogout()
    },
  })
}

/**
 * 切换主题
 */
const handleChangeThemeType = () => {
  if (store.theme === ThemeType.LIGHT) {
    store.changeThemeType(ThemeType.DARK)
  } else {
    store.changeThemeType(ThemeType.LIGHT)
  }
}

defineExpose({
  getRef3: () => ref3,
  getRef4: () => ref4,
  getRef5: () => ref5,
})
</script>
<template>
  <div class="header-wrap flex items-center justify-between dark:bg-[#000000]/20">
    <div class="title"><img src="@/assets/images/title.png" /></div>
    <div class="flex items-center gap-2">
      <div class="mode-icon-wrap dark:bg-[#f5f5f5]" ref="ref5">
        <img class="mode-icon" src="@/assets/icons/github.png" />
      </div>

      <div v-if="store.theme === ThemeType.LIGHT" class="mode-icon-wrap" ref="ref4">
        <img class="mode-icon" src="@/assets/icons/light.png" @click="handleChangeThemeType" />
      </div>
      <div class="mode-icon-wrap dark:bg-[#f5f5f5]" v-else>
        <img class="mode-icon" src="@/assets/icons/dark.png" @click="handleChangeThemeType" />
      </div>

      <a-dropdown>
        <div @click.prevent class="nickname" ref="ref3">
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
  padding: 0 30px;
  // background-color: #ffffff;
  margin-bottom: 30px;
}

.title {
  img {
    width: 120px;
  }
}

.nickname {
  margin-right: 10px;
  font-size: 16px;
  color: #262626;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 10px;
  :hover {
    cursor: pointer;
  }
}
.mode-icon-wrap {
  width: 37.89px;
  height: 37.89px;
  line-height: 36px;
  text-align: center;
  background: #f5f5f5;
  border-radius: 8px;

  cursor: pointer;
}
.mode-icon {
  width: 22px;
}
</style>
