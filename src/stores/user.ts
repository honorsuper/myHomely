import { defineStore } from 'pinia'
import { getUserInfo } from '@/stores/utils'
import { queryUserInfo } from '@/utils/request'
import { message } from 'ant-design-vue'

interface UserState {
  userInfo: any
}

export const userStore = defineStore({
  id: 'app-system',
  state: (): UserState => ({
    userInfo: getUserInfo(),
  }),
  actions: {
    /**设置用户名，公司列表 */
    setSystemInfo(data: any = {}) {
      this.userInfo = data
    },

    async handleGetUserInfo() {
      // const res = getUserInfo()
      const res = await queryUserInfo()
      const { data } = res.data
      if (res.status === 201 || res.status === 200) {
        localStorage.setItem('user_info', JSON.stringify(data.userInfo))
        this.setSystemInfo(data.userInfo)
      } else {
        message.error(data || '系统繁忙，请稍后再试')
      }
    },
  },
})
