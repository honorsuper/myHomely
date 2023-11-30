import { createRouter, createWebHistory } from 'vue-router'
import Homely from '../views/Homely/index.vue'
import Login from '../views/Login/index.vue'

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
  ],
})

export default router
