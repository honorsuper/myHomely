/**
 * 退出登录
 */
export const handleLogout = () => {
  localStorage.clear()
  location.href = location.origin + '/login'
}
