import { createRouter, createWebHistory } from 'vue-router'
import LoginUserView from '@/views/LoginUserView.vue'
import NewAccountUser from '@/views/NewAccountUser.vue'
import LoginRestauranteView from '@/views/restaurante/login/LoginRestauranteView.vue'
import CrearRestauranteView from '@/views/restaurante/login/CrearRestauranteView.vue'
import DashboardMain from '@/views/restaurante/dashboard/dashboard.vue'
import restaurantesMethodsView from '@/views/restaurante/dashboard/Methods/RestauranteMethodsView.vue'
import EditPedidoView from '@/views/restaurante/dashboard/Methods/EditPedidoView.vue'
import perfilView from '@/views/restaurante/dashboard/Methods/perfilView.vue'
import HomeView from '@/views/Cliente/home/HomeView.vue'
import MenusByRestaurantesView from '@/views/Cliente/Menus/MenusByRestaurantesView.vue'
import CarritoView from '@/views/Cliente/carrito/CarritoView.vue'
const routes = [
  {
    path: '/',
    name: 'LoginUserView',
    component: LoginUserView
  },
  {
    path: '/crear-cuenta',
    name: 'crearCuenta',
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
    path: '/restaurante/pedidos/edit/:id',
    name: 'editPedido',
    component: EditPedidoView
  },
  {
    path: '/restaurante/perfil',
    name: 'perfil',
    component: perfilView
  },
  {
    path: '/restaurante/dashboard',
    name: 'dashboard',
    component: DashboardMain
  },
  /*Rutas para los clientes de la aplicacion */
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/menus/restaurante/:id',
    name: 'menusRestaurante',
    component: MenusByRestaurantesView
  },
  {
    path: '/carrito',
    name: 'CarritoView',
    component: CarritoView
  }
  
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
