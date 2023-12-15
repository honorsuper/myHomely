import { message } from 'ant-design-vue'
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
  async (response: any) => {
    const { data, config } = response
    if (data.code === 0) {
      return response
    } else if (data.code === 401) {
      if (!config?.url?.includes('/user/refresh')) {
        if (refreshing) {
          return new Promise((resolve) => {
            queue.push({
              config,
              resolve,
            })
          })
        }
        refreshing = true
        const res = await refreshToken()
        refreshing = false
        const { data } = res.data
        if (res.status === 201 || res.status === 200) {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('refresh_token', data.refresh_token)
        } else {
          message.error(data || '系统繁忙，请稍后再试')
        }

        if (res.status === 200) {
          queue.forEach(({ config, resolve }) => {
            resolve(axiosInstance(config))
          })

          return axiosInstance(config)
        } else {
          setTimeout(() => {
            window.location.href = '/login'
          })
          return response
        }
      } else {
        setTimeout(() => {
          window.location.href = '/login'
        })
      }
    } else {
      message.error(data.message || '系统异常')
      return response
    }
  },
  async (error) => {
    return error.response
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

// 列表排序
export async function sortColumn(data: any) {
  return await axiosInstance.post('/menu/sort-column', data)
}

// 更新颜色信息
export async function updateColorConfig(data: any) {
  return await axiosInstance.post('/user/update-color', data)
}

// 重置颜色
export async function resetColorConfig() {
  return await axiosInstance.get('/user/reset-color')
}

// 获取用户信息
export async function queryUserInfo() {
  return await axiosInstance.get('/user/info')
}

// 上报首次进入
export async function setFirst() {
  return await axiosInstance.get('/user/set-first')
}

// 判断时候首次进入
export async function queryIsFirst() {
  return await axiosInstance.get('/user/is-first')
}
