import { defineStore } from 'pinia'
import { getUserInfo } from '@/stores/utils'

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
  },
})
