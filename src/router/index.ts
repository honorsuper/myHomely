import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/index.vue'
import Register from '../views/Register/index.vue'
import UserInfo from '../views/UpdateInfo/index.vue'
import ChangePassword from '../views/ChangePassword/index.vue'
import ColorSetting from '../views/ColorSetting/index.vue'
import Layout from '../layout/basic.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'basic',
      component: Layout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/Homely/index.vue'),
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('../views/Setting/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/update/user',
      name: 'updateUser',
      component: UserInfo,
    },
    {
      path: '/forget/password',
      name: 'forgetPassword',
      component: ChangePassword,
    },
    {
      path: '/change/password',
      name: 'changePassword',
      component: ChangePassword,
    },
    {
      path: '/color/setting',
      name: 'colorSetting',
      component: ColorSetting,
    },
  ],
})

export default router
