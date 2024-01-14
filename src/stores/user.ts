import { defineStore } from 'pinia'
import { getUserInfo } from '@/stores/utils'
import { queryUserInfo } from '@/utils/request'
import { message } from 'ant-design-vue'
import { ThemeType } from '@/enum'

interface UserState {
  userInfo: any
  theme: string
}

export const userStore = defineStore({
  id: 'app-system',
  state: (): UserState => ({
    userInfo: getUserInfo(),
    theme: ThemeType.PICTURE,
  }),
  actions: {
    /**设置用户名*/
    setSystemInfo(data: any = {}) {
      this.userInfo = data
    },

    /**
     * 获取用户信息
     */
    async handleGetUserInfo() {
      const res = await queryUserInfo()
      const { data } = res.data
      if (res.status === 201 || res.status === 200) {
        localStorage.setItem('user_info', JSON.stringify(data.userInfo))
        this.setSystemInfo(data.userInfo)
      } else {
        message.error(data || '系统繁忙，请稍后再试')
      }
    },

    /**
     * 切换主题
     * @param type 主题类型
     */
    changeThemeType(type: string) {
      this.theme = type
    },
  },
})
