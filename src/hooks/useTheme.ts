import { userStore } from '@/stores/user'
import { watch } from 'vue'

export const useTheme = () => {
  const store = userStore()

  /**
   * 变更主题
   * @param {*} theme 主题的标记常量
   */
  const changeTheme = (theme: string) => {
    console.log('走了吗', theme)
    document.querySelector('html')!.className = theme
  }

  watch(() => store.theme, changeTheme, {
    // 初始执行一次
    immediate: true,
  })
}
