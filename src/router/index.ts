import { createRouter, createWebHistory } from 'vue-router'
import Homely from '../views/Homely/index.vue'
import Login from '../views/Login/index.vue'
import Register from '../views/Register/index.vue'
import UserInfo from "../views/UpdateInfo/index.vue"
import ChangePassword from "../views/ChangePassword/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homely,
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
      path: '/change/password',
      name: 'changePassword',
      component: ChangePassword,
    },
  ],
})

export default router
