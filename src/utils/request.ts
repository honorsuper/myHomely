import axios, { type AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api/',
  timeout: 3000,
})

axiosInstance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem('access_token')
  if (accessToken) {
    config.headers.authorization = 'Bearer ' + accessToken
  }
  return config
})

interface PendingTask {
  config: AxiosRequestConfig
  resolve: Function
}

let refreshing = false
const queue: PendingTask[] = []

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const { data, config } = error.response

    if (refreshing) {
      new Promise((resolve) => {
        queue.push({
          config,
          resolve,
        })
      })
    }
    if (data.code === 401 && !config.url.includes('/user/refresh')) {
      refreshing = true
      const res = await refreshToken()
      refreshing = false

      if (res.status === 200) {
        queue.forEach(({ config, resolve }) => {
          resolve(axiosInstance(config))
        })

        return axiosInstance(config)
      } else {
        setTimeout(() => {
          window.location.href = '/login'
        }, 1500)
      }
    } else {
      return error.response
    }
  },
)

async function refreshToken() {
  const res = await axiosInstance.get('/user/refresh', {
    params: {
      refresh_token: localStorage.getItem('refresh_token'),
    },
  })
  return res
}

// 用户登录
export async function login(username: string, password: string) {
  return await axiosInstance.post('/user/login', {
    username,
    password,
  })
}

// 用户注册
export async function register(data: any) {
  return await axiosInstance.post('/user/register', data)
}

// 用户注册验证码
export async function registerCaptcha(address: string) {
  return await axiosInstance.get(`/user/register-captcha?address=${address}`)
}

// 修改用户信息
export async function updateUserInfo(data: any) {
  return await axiosInstance.post('/user/update', data)
}

// 修改用户信息验证码
export async function updateUserInfoCaptcha(address: string) {
  return await axiosInstance.get(`/user/update-captcha?address=${address}`)
}

//修改密码
export async function changePassword(data: any) {
  return await axiosInstance.post('/user/update_password', data)
}

// 修改密码验证码
export async function ChangePasswordCaptcha(address: string) {
  return await axiosInstance.get(`/user/update_password-captcha?address=${address}`)
}

// 获取导航菜单
export async function getMenuInfo() {
  return await axiosInstance.get('/menu/column-info')
}

// 修改菜单
export async function editMenu(data: any) {
  return await axiosInstance.post('/menu/edit-column', data)
}

// 新增菜单
export async function addMenu(data: any) {
  return await axiosInstance.post('/menu/add-column', data)
}

// 重命名
export async function menuRename(data: any) {
  return await axiosInstance.post('/menu/rename', data)
}

// 删除列
export async function deleteColumn(data: any) {
  return await axiosInstance.post('/menu/del-column', data)
}
