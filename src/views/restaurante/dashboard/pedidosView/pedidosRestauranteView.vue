<template>
    <v-responsive>
        <v-app :theme="theme">
            <menu-component
                :current-title="currentTitle"
                :theme="theme"
                @toggle-theme="onClick"
            />
            <v-main>
                <!-- Contenido principal -->
                <component :is="currentComponent" />
                <!-- Menú inferior reutilizable -->
                <bottom-navigation-menu
                  :menu-items="menuItems"
                  :current-value="value"
                  :bg-color="color"
                  @menu-item-click="onMenuItemClick"
                />
              </v-main>
        </v-app>
    </v-responsive>
</template>

<script>
import MenuComponent from '@/components/restauranteComponents/MenuRestauranteComponent.vue'
import BottomNavigationMenu from '@/components/restauranteComponents/BottomNavigationMenu.vue'
import TablaInformacionComponent from '@/components/restauranteComponents/TablaInformacionComponent.vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
export default {
    name: "pedidosRestauranteView",
    components: {
        MenuComponent,
        BottomNavigationMenu,
        TablaInformacionComponent
    },
    data: () => ({
        value: 0,
        restauranteID: null,
        theme: 'light',
        menuItems: [
            { label: 'Mis Pedidos', icon: 'bi bi-card-list' },
            { label: 'Agregar Menú', icon: 'bi bi-plus-circle' },
        ],
        headers: [
            { title: "ID", value: "id", align: "start", key: "id" },
            { title: "cliente", value: "cliente", align: "start", key: "nombre" },
            { title: "tiempoEstimado", value: "tiempoEstimado", align: "start", key: "puntaje" },
            { title: "menus", value: "menus", align: "start", key: "telefono" },
            { title: "Actions", key: "actions", sortable: false },
        ],
    }),
    methods: {
        onClick() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        },
        onMenuItemClick(index) {
            this.value = index;
        },
        async getPedidosByRestauranteID() {
            const access = localStorage.getItem('access');
            const headers = {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json',
            };
            const json = {
                "restauranteID": this.restauranteID,
            };
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/pedidosMethods/api/listar/ByRestaurante/`, json, {headers});
                const respuesta = response.data.data.pedidosByRestaurante;
                console.log(respuesta);
                if (respuesta) {
                    const tabla = respuesta.map(item => {
                        return {
                            id: item.id,
                            nombre: item.nombre,
                            puntaje: item.puntaje,
                            telefono: item.telefono,
                            tipoCocina: item.tipoCocina,
                            descripcion: item.descripcion,
                            ubicacion: item.ubicacion,
                        }
                    });
                    console.log(respuesta);
                    this.ListaPedidos = tabla
                }else {
                    console.error(respuesta.error);
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.restauranteID = this.route.params.id;
        console.log("ID del Restaurante:", this.restauranteID);
        this.getPedidosByRestauranteID();
    },
    computed: {
    color() {
      switch (this.value) {
        case 0: return 'red-lighten-1';
        case 1: return 'teal';
        case 2: return 'orange-darken-2';
        case 3: return 'indigo';
        default: return 'blue-grey';
      }
    },
    currentTitle() {
      switch (this.value) {
        case 0: return 'Mis Pedidos';
        case 1: return 'Agregar Menú';
        case 2: return 'Estadísticas';
        case 3: return 'Configuración';
        default: return 'Dashboard';
      }
    },
    currentComponent() {
      switch (this.value) {
        case 0: return 'TablaInformacionComponent';
        case 1: return 'AgregarMenuComponent';
        default: return 'PedidosComponent';
      }
    }
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    return {
      router,
      route,
    };
  },
}
</script>

<style scoped>

</style>