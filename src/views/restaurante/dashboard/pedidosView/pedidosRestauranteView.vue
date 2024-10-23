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

export default {
    name: "pedidosRestauranteView",
    components: {
        MenuComponent,
        BottomNavigationMenu,
    },
    data: () => ({
        value: 0,
        restauranteID: null,
        theme: 'light',
        menuItems: [
            { label: 'Mis Pedidos', icon: 'bi bi-card-list' },
            { label: 'Agregar Menú', icon: 'bi bi-plus-circle' },
        ],
    }),
    methods: {
        onClick() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        },
        onMenuItemClick(index) {
            this.value = index;
        },
    },
    created() {
        // Acceder al ID desde la URL
        this.restauranteID = this.$route.params.id;
        console.log("ID del Restaurante:", this.restauranteID);
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
        case 0: return 'PedidosComponent';
        case 1: return 'AgregarMenuComponent';
        default: return 'PedidosComponent';
      }
    }
  },
}
</script>

<style scoped>

</style>