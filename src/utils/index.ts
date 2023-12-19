/**
 * 退出登录
 */
export const handleLogout = () => {
  localStorage.clear()
  location.href = location.origin + '/login'
}

//判断手机端还是PC端
export const isMobile = () =>
  navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
  )
