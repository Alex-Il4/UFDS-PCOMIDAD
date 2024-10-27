<template>
    <v-responsive>
        <v-app :theme="theme">
            <menu-component :current-title="currentTitle" :theme="theme" @toggle-theme="onClick" />
            <v-main>
                <!-- Contenido principal -->
                <component :is="currentComponent" v-if="value === 0" titleTable="Mis pedidos" color="red-lighten-1"
                    icon="bi bi-cart4" :items="ListaPedidos" :headers="headersPedidos" :idRestaurante="restauranteID" textEliminar="Eliminar pedido"
                    textEditar="Editar pedido"/>
                <component :is="currentComponent" v-if="value === 1" :titleTable="isEditMode ? 'Editar menú' : 'Agregar menú'"
                    icon="bi bi-plus-circle" :idRestaurante="restauranteID"
                    :menuId="menuId"
                    :isEditMode="isEditMode"
                    @finish-edit="resetEditMode"
                />

                <component :is="currentComponent" v-if="value === 2" titleTable="Mis menús" color="warning"
                    icon="bi bi-cart4" :items="ListaMenu" :headers="headersMenu" :textEliminar="'Eliminar menú'"
                    :textEditar="'Editar menú'"  @delete-item="onDeleteMenu"  @edit-item="onEditMenu"/>

                <!-- Menú inferior reutilizable -->
                <bottom-navigation-menu :menu-items="menuItems" :current-value="value" :bg-color="color"
                    @menu-item-click="onMenuItemClick" />
            </v-main>
            <edit-dialog-component :title="titleDialog" :text="textDialog" :color="colorDialog" :icon="iconDialog"
                @confirm="onConfirmDeleteMenu" />
        </v-app>
    </v-responsive>
</template>

<script>
import MenuComponent from '@/components/restauranteComponents/MenuComponent/MenuRestauranteComponent.vue'
import BottomNavigationMenu from '@/components/restauranteComponents/MenuComponent/BottomNavigationMenu.vue'
import TablaInformacionComponent from '@/components/restauranteComponents/ViewDataComponent/TablaInformacionComponent.vue'
import AgregarMenuComponent from '@/components/restauranteComponents/MenusRestaurantesComponents/MethodsMenuComponent.vue'
import EditDialogComponent from '@/components/restauranteComponents/ViewDataComponent/EditDialogComponent.vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
export default {
    name: "restaurantesMethodsView",
    components: {
        MenuComponent,
        BottomNavigationMenu,
        TablaInformacionComponent,
        AgregarMenuComponent,
        EditDialogComponent
    },
    data: () => ({
        value: 0,
        restauranteID: null,
        menuID: null,
        ListaPedidos: [],
        ListaMenu: [],
        theme: 'light',
        menuItems: [
            { label: 'Mis Pedidos', icon: 'bi bi-card-list' },
            { label: 'Agregar Menú', icon: 'bi bi-plus-circle' },
            { label: 'Mis Menús', icon: 'bi bi-cart4' },

        ],
        headersPedidos: [
            { title: "ID", value: "id", align: "start", key: "id" },
            { title: "Cliente", value: "cliente", align: "start", key: "cliente" },
            { title: "Ubicacion", value: "ubicacion", align: "start", key: "ubicacion" },
            { title: "Tiempo estimado", value: "tiempoEstimado", align: "start", key: "tiempoEstimado" },
            { title: "menus", value: "menus", align: "start", key: "menus" },
            { title: "status", value: "status", align: "start", key: "status" },
            { title: "Actions", key: "actions", sortable: false },
        ],
        headersMenu: [
            { title: "ID", value: "id", align: "start", key: "id" },
            { title: "Titulo", value: "titulo", align: "start", key: "titulo" },
            { title: "Nombre", value: "nombre", align: "start", key: "nombre" },
            { title: "Precio", value: "precio", align: "start", key: "precio" },
            { title: "Status", value: "status", align: "start", key: "status" },
            { title: "Fecha", value: "fecha", align: "start", key: "fecha" },
            { title: "Imagen", value: "imagen", align: "center", key: "imagen" },
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
                        console.log("cliente: ",);
                        return {
                            id: item.id,
                            cliente: item.cliente.correo,
                            tiempoEstimado: item.tiempoEstimado,
                            menus: item.menus[0].titulo,
                            status: item.status,
                            ubicacion: item.ubicacionEntrega,
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
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/listar/restaurante/menu/todos/`, json, { headers });
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
                            imagen: item.imagen ? item.imagen : null,
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
        async onDeleteMenu(item) {
            /*Función para eliminar menú de la base de datos*/
            console.log("item", item);
            const access = localStorage.getItem('access');
            const headers = {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json',
            };
            const json = {
                "menuID": item,
            };
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/eliminar/restaurante/menu/`, json, { headers });
                const respuesta = response.data.data;
                if (respuesta) {
                    console.log("respuesta", respuesta);
                    this.getMenuByRestauranteID();
                } else {
                    console.error(respuesta.error);
                }
            } catch (error) {
                console.log(error);
            }
        },
        onEditMenu(menuId) {
            this.isEditMode = true;
            this.menuId = menuId;
            this.value = 1;
        },
        resetEditMode() {
            this.menuId = null;
            this.isEditMode = false;
        },
    },
    watch: {
        value() {
            if (this.value === 0) {
                this.getPedidosByRestauranteID();
                this.isEditMode = false;
            }
            if (this.value === 2) {
                this.getMenuByRestauranteID();
                this.isEditMode = false;
            }
        },
        onDeleteMenu:{
            deep: true,
            handler() {
                this.getMenuByRestauranteID();
            }
        },
        onEditMenu: {
            deep: true,
            handler() {
                this.getMenuByRestauranteID();
                this.isEditMode = false;
                this.menuId = null;
            }
        },
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