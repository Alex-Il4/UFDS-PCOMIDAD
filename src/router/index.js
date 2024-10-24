import { createRouter, createWebHistory } from 'vue-router'
import LoginUserView from '@/views/LoginUserView.vue'
import NewAccountUser from '@/views/NewAccountUser.vue'
import LoginRestauranteView from '@/views/restaurante/login/LoginRestauranteView.vue'
import CrearRestauranteView from '@/views/restaurante/login/CrearRestauranteView.vue'
import DashboardMain from '@/views/restaurante/dashboard/dashboard.vue'
import restaurantesMethodsView from '@/views/restaurante/dashboard/Methods/RestauranteMethodsView.vue'

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
    path: '/restaurante/login',
    name: 'loginRestaurante',
    component: LoginRestauranteView
  },
  {
    path: '/restaurante/crear',
    name: 'crearRestauranteView',
    component: CrearRestauranteView
  },
  {
    path: '/restaurante/metodos/:id',
    name: 'metodos',
    component: restaurantesMethodsView
  },
  {
    path: '/restaurante/dashboard',
    name: 'dashboard',
    component: DashboardMain
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
