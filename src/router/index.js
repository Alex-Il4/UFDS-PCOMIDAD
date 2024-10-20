import { createRouter, createWebHistory } from 'vue-router'
import LoginUserView from '@/views/LoginUserView.vue'
import NewAccountUser from '@/views/NewAccountUser.vue'

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

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
