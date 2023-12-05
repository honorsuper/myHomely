import { useRouter } from 'vue-router'

/**
 * 退出登录
 */
export const handleLogout = () => {
  const router = useRouter()
  localStorage.clear()
  location.href = location.origin + '/login'
}
