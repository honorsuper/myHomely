import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api/',
  timeout: 3000,
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    return error.response
  },
)

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


