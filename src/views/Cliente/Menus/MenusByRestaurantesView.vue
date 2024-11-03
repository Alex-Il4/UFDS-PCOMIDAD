<template>
    <v-responsive>
        <v-app :theme="theme">
            <v-layout>
                <SideBarComponent :theme="theme" @toggle-theme="onClick"></SideBarComponent>
                <v-main style="height: 250px" :style="{ height: '100vh', overflowY: 'auto' }">
                    <v-img class="bg-grey-lighten-2" max-height="200" :src="imagenRestaurante" cover></v-img>
                    <v-data-iterator :items="menusByRestaurante" :items-per-page="4" :search="search">
                        <template v-slot:header>
                            <v-text-field class="px-2 mt-2" v-model="search" density="comfortable"
                                placeholder="Busca un menu" prepend-inner-icon="mdi-magnify" variant="outlined"
                                clearable hide-details color="orange-darken-2"></v-text-field>
                        </template>
                        <template v-slot:default="{ items }">
                            <v-container>
                                <v-row dense>
                                    <v-col v-for="(item, index) in items" :key="index">
                                        <v-card :disabled="loading" :loading="loading" class="my-3" max-width="355"
                                            max-height="560">
                                            <template v-slot:loader="{ isActive }">
                                                <v-progress-linear :active="isActive" color="deep-purple" height="4"
                                                    indeterminate></v-progress-linear>
                                            </template>

                                            <v-img height="250" :src="item.raw.imagen" cover></v-img>

                                            <v-card-item>
                                                <v-card-title>{{ item.raw.id}}{{  item.raw.titulo }} </v-card-title>
                                                <v-card-subtitle>
                                                    <span class="me-1">Restaurante • {{ item.raw.restaurante }}</span>
                                                    <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                                                </v-card-subtitle>
                                            </v-card-item>

                                            <v-card-text>
                                                <v-row align="center" class="mx-0">
                                                    <v-rating :model-value="item.raw.puntaje" color="amber"
                                                        density="compact" size="small" half-increments
                                                        readonly></v-rating>

                                                    <div class="text-grey ms-4">
                                                        {{ item.raw.puntaje }} (413)
                                                    </div>
                                                </v-row>

                                                <div class="my-4 text-subtitle-1">
                                                    ${{ item.raw.precio }} • <v-chip
                                                        :color="item.raw.status ? 'success' : 'error'" small>{{
                                                            item.raw.status }}</v-chip>
                                                </div>

                                                <div>{{ item.raw.descripcion }}</div>
                                            </v-card-text>

                                            <v-divider class="mx-4 mb-1"></v-divider>

                                            <v-card-title>Fecha de creación</v-card-title>

                                            <div class="px-4 mb-4">
                                                <v-chip color="orange-darken-3">{{ item.raw.fecha }}</v-chip>
                                            </div>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-fab color="orange-darken-4" icon="mdi-cart-arrow-down"
                                                    style="margin-top: 100px" size="54" app appear
                                                    @click="addMenuToCart(item.raw)"
                                                    ></v-fab>
                                            </v-card-actions>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </template>

                        <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                            <div class="d-flex align-center justify-center mb-4">
                                <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left"
                                    variant="tonal" rounded @click="prevPage"></v-btn>

                                <div class="mx-2 text-caption">
                                    Menus {{ page }} de {{ pageCount }}
                                </div>

                                <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right"
                                    variant="tonal" rounded @click="nextPage"></v-btn>
                            </div>
                        </template>
                    </v-data-iterator>
                </v-main>
            </v-layout>
        </v-app>
    </v-responsive>
</template>

<script>
import SideBarComponent from '@/components/ClienteComponents/SidebarComponent/SideBarComponent.vue'
import axios from 'axios';
export default {
    name: 'MenusByRestaurantesView',
    components: {
        SideBarComponent
    },
    data: () => ({
        theme: 'light',
        restauranteID: null,
        imagenRestaurante: null,
        menusByRestaurante: [],
        loading: false,
        search: '',
        baseURL: process.env.VUE_APP_API_URL,
        scrollInvoked: 0,
    }),
    methods: {
        onClick() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        },
        onScroll() {
            this.scrollInvoked++
        },
        async loadMenusByRestauranteData() {
            /*Aqui cargamos los menus del restaurante*/
            const json = {
                "restauranteID": this.restauranteID
            }
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/listar/restaurante/menu/todos/`, json, { headers });
            const menusData = response.data.data;
            const menu = menusData
                .filter(item => item.status === true)
                .map(item => {
                    const fecha = this.formatDate(item.fecha);
                    return {
                        nombre: item.nombre,
                        titulo: item.titulo,
                        precio: item.precio,
                        imagen: item.imagen ? process.env.VUE_APP_API_URL + item.imagen : null,
                        fecha: fecha,
                        status: "Activo",
                        descripcion: item.descripcion,
                        puntaje: item.puntaje ? item.puntaje : 0,
                        restaurante: item.restaurante.nombre,
                        id: item.id
                    }
                });

            console.log(JSON.stringify(menusData, null, 2));
            console.log(menu);
            this.menusByRestaurante = menu;

        },
        async loadRestauranteData() {
            /*Aqui cargamos toda la informacion del restaurante*/
            const json = {
                "restauranteID": this.restauranteID
            }
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/informacion/restaurante/`, json, { headers });
            const respuesta = response.data;
            if (respuesta.data) {
                const restaurante = respuesta.data;
                this.imagenRestaurante = `${process.env.VUE_APP_API_URL}/restaurantesMethods/api${restaurante.imagen}`;
            }
        },
        async loadRestaurante() {
            await this.loadMenusByRestauranteData();
            await this.loadRestauranteData();
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
        },
    },
    created() {
        this.restauranteID = this.$route.params.id;
        this.loadRestaurante();
    }
}
</script>
