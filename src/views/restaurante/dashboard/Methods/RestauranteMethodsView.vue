<template>
    <v-responsive>
        <v-app :theme="theme">
            <menu-component :current-title="currentTitle" :theme="theme" @toggle-theme="onClick" />
            <v-main>
                <!-- Contenido principal -->
                <component :is="currentComponent" v-if="value === 0" titleTable="Mis pedidos" color="red-lighten-1"
                    icon="bi bi-cart4" :items="ListaPedidos" :headers="headers" />
                <component :is="currentComponent" v-if="value === 1" titleTable="Agregar menú" color="orange-lighten-1"
                    icon="bi bi-plus-circle" :idRestaurante="restauranteID" />

                <component :is="currentComponent" v-if="value === 2" titleTable="Mis menús" color="warning"
                    icon="bi bi-cart4" :items="ListaMenu" :headers="headersMenu" :textEliminar="'Eliminar menú'"
                    :textEditar="'Editar menú'" />
                <!-- Menú inferior reutilizable -->
                <bottom-navigation-menu :menu-items="menuItems" :current-value="value" :bg-color="color"
                    @menu-item-click="onMenuItemClick" />
            </v-main>
        </v-app>
    </v-responsive>
</template>

<script>
import MenuComponent from '@/components/restauranteComponents/MenuComponent/MenuRestauranteComponent.vue'
import BottomNavigationMenu from '@/components/restauranteComponents/MenuComponent/BottomNavigationMenu.vue'
import TablaInformacionComponent from '@/components/restauranteComponents/ViewDataComponent/TablaInformacionComponent.vue'
import AgregarMenuComponent from '@/components/restauranteComponents/MenusRestaurantesComponents/AgregarMenuComponent.vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
export default {
    name: "restaurantesMethodsView",
    components: {
        MenuComponent,
        BottomNavigationMenu,
        TablaInformacionComponent,
        AgregarMenuComponent
    },
    data: () => ({
        value: 0,
        restauranteID: null,
        ListaPedidos: [],
        ListaMenu: [],
        theme: 'light',
        menuItems: [
            { label: 'Mis Pedidos', icon: 'bi bi-card-list' },
            { label: 'Agregar Menú', icon: 'bi bi-plus-circle' },
            { label: 'Mis Menús', icon: 'bi bi-cart4' },

        ],
        headers: [
            { title: "ID", value: "id", align: "start", key: "id" },
            { title: "cliente", value: "cliente", align: "start", key: "nombre" },
            { title: "tiempoEstimado", value: "tiempoEstimado", align: "start", key: "puntaje" },
            { title: "menus", value: "menus", align: "start", key: "telefono" },
            { title: "Actions", key: "actions", sortable: false },
        ],
        headersMenu: [
            { title: "ID", value: "id", align: "start", key: "id" },
            { title: "Titulo", value: "titulo", align: "start", key: "titulo" },
            { title: "Nombre", value: "nombre", align: "start", key: "nombre" },
            { title: "Precio", value: "precio", align: "start", key: "precio" },
            { title: "Status", value: "status", align: "start", key: "status" },
            { title: "Fecha", value: "fecha", align: "start", key: "fecha" },
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
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/pedidosMethods/api/listar/ByRestaurante/`, json, { headers });
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
                } else {
                    console.error(respuesta.error);
                }
            } catch (error) {
                console.log(error);
            }
        },

        async getMenuByRestauranteID() {
            const access = localStorage.getItem('access');
            const headers = {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json',
            };
            const json = {
                "restauranteID": this.restauranteID,
            };
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/listar/restaurante/menu/`, json, { headers });
                const respuesta = response.data.data;
                if (respuesta) {
                    const tabla = respuesta.map(item => {
                        return {
                            id: item.id,
                            titulo: item.titulo,
                            nombre: item.nombre,
                            precio: item.precio,
                            status: item.status,
                            fecha: item.fecha,
                            imagen: item.imagen,
                        }
                    });
                    console.log("tabla", tabla);
                    this.ListaMenu = tabla
                } else {
                    console.error(respuesta.error);
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    watch: {
        value() {
            if (this.value === 0) {
                this.getPedidosByRestauranteID();
            }
            if (this.value === 2) {
                this.getMenuByRestauranteID();
            }
        }
    },
    async created() {
        this.restauranteID = this.route.params.id;
        console.log("ID del Restaurante:", this.restauranteID);
        await this.getPedidosByRestauranteID();
        await this.getMenuByRestauranteID();
        console.log(this.ListaMenu);
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
                case 2: return 'Mis Menús';
                default: return 'Dashboard';
            }
        },
        currentComponent() {
            switch (this.value) {
                case 0: return 'TablaInformacionComponent';
                case 1: return 'AgregarMenuComponent';
                case 2: return 'TablaInformacionComponent';
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

<style scoped></style>