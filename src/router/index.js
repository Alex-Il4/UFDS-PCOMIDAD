import { createRouter, createWebHistory } from 'vue-router'
import LoginUserView from '@/views/LoginUserView.vue'
import NewAccountUser from '@/views/NewAccountUser.vue'
import LoginRestauranteView from '@/views/LoginRestauranteView.vue'

const routes = [
  {
    path: '/',
    name: 'LoginUserView',
    component: LoginUserView
  },
  {
    path: '/AccountUser',
    name: 'NewAccountUser',
    component: NewAccountUser
  },
  {
    path: '/loginRestaurante',
    name: 'loginRestaurante',
    component: LoginRestauranteView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
