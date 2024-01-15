<script setup lang="ts">
import { ref, createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'
import { userStore } from '@/stores/user'
import { handleLogout } from '@/utils'
import ColorSetting from '../ColorSetting/index.vue'

import { ThemeType } from '@/enum'
import { Setting } from '../index'
import useAsync from '@/hooks/useQuery'
import { updateDarkLightMode } from '@/utils/request'

const props = defineProps<{
  handleOpenGuide: () => void
}>()

const colorSettingRef = ref<InstanceType<typeof ColorSetting> | null>(null)
const settingRef = ref<InstanceType<typeof Setting> | null>(null)
const store = userStore()
const ref3 = ref(null)
const ref4 = ref(null)
const ref5 = ref(null)
const ref6 = ref(null)

const handleClickMenu = (a: any) => {
  if (a?.key === 'logout') {
    handleLogoutConfirm()
  } else if (a?.key === 'color-setting') {
    colorSettingRef.value?.showDrawer?.()
  } else if (a?.key === 'setting') {
    settingRef.value?.handleOpenModal()
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

const { run: runUpdateDarkLightMode } = useAsync(updateDarkLightMode, {
  manual: true,
  onSuccess: () => {
    message.success('修改成功')
    store?.handleGetUserInfo()
  },
})

/**
 * 切换主题
 */
const handleChangeThemeType = () => {
  if (store.userInfo.bgType === '2') {
    message.warning('「图片模式」下不支持切换，请到「设置」中切换成「极简白、极夜黑模式')
  } else if (store.userInfo.bgType === '1') {
    if (store.userInfo.commonBgType === ThemeType.LIGHT) {
      runUpdateDarkLightMode({
        commonBgType: ThemeType.DARK,
      })
    } else {
      runUpdateDarkLightMode({
        commonBgType: ThemeType.LIGHT,
      })
    }
  }
}

const handleToGithub = () => {
  window.open('https://github.com/honorsuper/myHomely')
}

const openGuide = () => {
  props.handleOpenGuide()
}

defineExpose({
  getRef3: () => ref3,
  getRef4: () => ref4,
  getRef5: () => ref5,
  getRef6: () => ref6,
})
</script>
<template>
  <div
    class="header-wrap flex items-center justify-between"
    :class="{
      'dark:bg-[#000000]/20':
        store.userInfo.commonBgType === ThemeType.DARK && store.userInfo.bgType == '1',
    }"
  >
    <div class="title">
      <img
        src="@/assets/images/title_dark.png"
        v-if="store.userInfo.bgType === '1' && store.userInfo.commonBgType === ThemeType.LIGHT"
      />
      <img src="@/assets/images/title_light.png" v-else />
    </div>
    <div class="flex items-center gap-2">
      <div class="mode-icon-wrap dark:bg-[#f5f5f5]" ref="ref6" @click="handleToGithub">
        <img class="mode-icon" src="@/assets/icons/github.png" />
      </div>

      <div
        v-if="store.userInfo.commonBgType === ThemeType.LIGHT && store.userInfo.bgType === '1'"
        class="mode-icon-wrap"
        ref="ref5"
        @click="handleChangeThemeType"
      >
        <img class="mode-icon" src="@/assets/icons/light.png" />
      </div>
      <div
        class="mode-icon-wrap dark:bg-[#f5f5f5]"
        v-if="store.userInfo.commonBgType === ThemeType.DARK && store.userInfo.bgType == '1'"
        ref="ref5"
        @click="handleChangeThemeType"
      >
        <img class="mode-icon" src="@/assets/icons/dark.png" />
      </div>
      <div
        class="mode-icon-wrap dark:bg-[#f5f5f5]"
        v-if="store.userInfo.bgType === '2'"
        ref="ref5"
        @click="handleChangeThemeType"
      >
        <img class="mode-icon" src="@/assets/icons/bg.png" />
      </div>
      <div class="mode-icon-wrap" ref="ref4" @click="openGuide">
        <img class="mode-icon" src="@/assets/icons/guide.png" />
      </div>

      <a-dropdown>
        <div @click.prevent class="nickname" ref="ref3">
          <div>{{ store.userInfo.nickName }}</div>
        </div>
        <template #overlay>
          <a-menu mode="vertical" @click="handleClickMenu">
            <a-menu-item key="color-setting"> 颜色配置</a-menu-item>
            <a-menu-item key="setting"> 设置</a-menu-item>
            <a-menu-item key="logout"> 退出</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
  <ColorSetting ref="colorSettingRef" />
  <Setting ref="settingRef" />
</template>
<style scoped lang="less">
.header-wrap {
  height: 64px;
  box-shadow: 0 8px 24px -2px rgba(0, 0, 0, 0.05);
  padding: 0 30px;
  margin-bottom: 30px;
}

.title {
  img {
    width: 240px;
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
