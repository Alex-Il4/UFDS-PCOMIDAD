<template>
    <v-responsive>
        <v-app :theme="theme">
            <v-layout>
                <SideBarComponent :theme="theme" @toggle-theme="onClick"></SideBarComponent>
                <v-main style="height: 250px">
                    <v-img class="bg-grey-lighten-2" max-height="200" :src="imagenRestaurante" cover></v-img>
                    <v-data-iterator :items="menusByRestaurante" :items-per-page="3" :search="search">
                        <template v-slot:header>
                            <v-toolbar class="px-2">
                                <v-text-field v-model="search" density="comfortable" placeholder="Busca un menu"
                                    prepend-inner-icon="mdi-magnify"  variant="solo" clearable
                                    hide-details></v-text-field>
                            </v-toolbar>
                        </template>
                        <template v-slot:default="{ items }">
                            <v-container>
                                <v-row dense>
                                    <v-col cols="12" v-for="(item, index) in items" :key="index">
                                        <v-card color="#e86e20">
                                            <div class="d-flex flex-no-wrap justify-space-between">
                                                <div>
                                                    <v-card-title class="text-h5">
                                                        {{ item.raw.titulo }}
                                                    </v-card-title>
                                                    <v-card-subtitle>
                                                        <v-chip color="white" class="ma-2">{{ item.raw.status }}</v-chip>
                                                    </v-card-subtitle>
                                                    <v-card-actions>
                                                        <v-btn class="ms-2" icon="mdi-play" variant="text"></v-btn>
                                                    </v-card-actions>
                                                </div>
                                                <v-avatar class="ma-3" rounded size="125"  v-if="item.raw.imagen !== null">
                                                    <v-img :src="item.raw.imagen" cover></v-img>
                                                </v-avatar>
                                            </div>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </template>

                        <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                            <div class="d-flex align-center justify-center pa-4">
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
    }),
    methods: {
        onClick() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
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
            const menu = menusData.map(item => {
                return {
                    nombre: item.nombre,
                    titulo: item.titulo,
                    precio: item.precio,
                    imagen: item.imagen ? process.env.VUE_APP_API_URL + item.imagen : null,
                    fecha: item.fecha,
                    status: item.status ? "Activo" : "Inactivo",
                    id: item.id
                }
            });
            console.log(JSON.stringify(menusData, null, 2));
            console.log(menu)
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
        }
    },
    created() {
        this.restauranteID = this.$route.params.id;
        this.loadRestaurante();
    }
}
</script>
