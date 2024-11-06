<template>
    <v-responsive>
        <v-app :theme="theme">
            <v-layout>
                <SideBarComponent :theme="theme" @toggle-theme="onClick"></SideBarComponent>
                <v-main style="height: 250px" :style="{ height: '100vh', overflowY: 'auto' }">
                    <v-img class="bg-grey-lighten-2" max-height="200" :src="imagenRestaurante" cover>
                        <v-fab color="orange-darken-4" icon="bi bi-chat-left-dots-fill" app
                            appear @click="isComentarioDialog = true"></v-fab>
                    </v-img>
                     <!-- Alerta de pantalla completa -->
                    <v-alert 
                        v-if="alertVisible" 
                        type="success" 
                        dismissible 
                        transition="scale-transition" 
                    >
                        <span style="font-size: 24px; font-weight: bold; text-align: center;">Menú agregado al carrito</span>
                    </v-alert>
                    <v-data-iterator :items="menusByRestaurante" :items-per-page="4" :search="search">
                        <template v-slot:header>
                            <v-text-field 
                                class="px-2 mt-2" 
                                v-model="search" 
                                density="comfortable"
                                placeholder="Busca un menu" 
                                prepend-inner-icon="mdi-magnify" 
                                variant="outlined"
                                clearable 
                                hide-details 
                                color="orange-darken-2">
                            </v-text-field>
                        </template>
                        <template v-slot:default="{ items }">
                            <v-container>
                                <v-row dense>
                                    <v-col v-for="(item, index) in items" :key="index">
                                        <v-card :disabled="loading" :loading="loading" class="my-3" max-width="355" max-height="560">
                                            <template v-slot:loader="{ isActive }">
                                                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
                                            </template>

                                            <v-img height="250" :src="item.raw.imagen" cover></v-img>

                                            <v-card-item>
                                                <v-card-title>{{ item.raw.id }} {{ item.raw.titulo }}</v-card-title>
                                                <v-card-subtitle>
                                                    <span class="me-1">Restaurante • {{ item.raw.restaurante }}</span>
                                                    <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                                                </v-card-subtitle>
                                            </v-card-item>

                                            <v-card-text>
                                                <v-row align="center" class="mx-0">
                                                    <v-rating :model-value="item.raw.puntaje" color="amber" density="compact" size="small" half-increments readonly></v-rating>
                                                    <div class="text-grey ms-4">{{ item.raw.puntaje }} (413)</div>
                                                </v-row>

                                                <div class="my-4 text-subtitle-1">
                                                    ${{ item.raw.precio }} • 
                                                    <v-chip :color="item.raw.status ? 'success' : 'error'" small>{{ item.raw.status }}</v-chip>
                                                </div>

                                                <div>{{ item.raw.descripcion }}</div>
                                            </v-card-text>

                                            <v-divider class="mx-4 mb-1"></v-divider>

                                            <v-card-title>Fecha de creación</v-card-title>
                                            <div class="px-4 mb-4">
                                                <v-chip color="orange-darken-3">{{ item.raw.fecha }}</v-chip>
                                            </div>

                                            <v-card-actions>
                                                <v-speed-dial location="top center" transition="slide-x-transition">
                                                    <template v-slot:activator="{ props: activatorProps }">
                                                        <v-fab v-bind="activatorProps" color="orange-darken-4"
                                                            icon="mdi-cart-arrow-down" size="50" app appear  ></v-fab>
                                                    </template>
                                                    <v-tooltip text="Agregar al carrito">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn key="1" v-bind="props" color="orange-darken-4" icon="mdi-cart" @click="agregarAlCarrito(item.raw)"></v-btn>
                                                        </template>
                                                    </v-tooltip>

                                                    <v-tooltip text="Comentar menú">
                                                        <template v-slot:activator="{ props }">
                                                        <v-btn key="2" v-bind="props" color="orange-darken-4" icon="bi bi-chat-square-quote-fill"></v-btn>
                                                        </template>
                                                    </v-tooltip>
                                                </v-speed-dial>
                                            </v-card-actions>
                                            <v-divider></v-divider>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </template>

                        <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                            <div class="d-flex align-center justify-center mb-4">
                                <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal" rounded @click="prevPage"></v-btn>
                                <div class="mx-2 text-caption">Menus {{ page }} de {{ pageCount }}</div>
                                <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right" variant="tonal" rounded @click="nextPage"></v-btn>
                            </div>
                        </template>
                    </v-data-iterator>
                    <v-row>
                        <v-col cols="12">
                            <v-alert icon="bi bi-chat-quote-fill" color="info" variant="outlined"
                                :title="`Comentarios de ${nombreRestaurante}`" class="mr-8 ml-8">
                            </v-alert>
                            <TableComentariosComponent :Comentarios="comentariosRestaurantes">
                            </TableComentariosComponent>
                        </v-col>
                    </v-row>
                    <v-dialog v-model="isComentarioDialog" max-width="600">
                        <v-card title="Haz un comentario">
                            <template v-slot:prepend>
                                <v-icon icon="bi bi-chat-square-dots-fill" size="large" color="warning"></v-icon>
                            </template>
                            <v-card-text>
                                <v-row dense>
                                    <v-col cols="12">
                                        <v-text-field v-model="comentario" label="Comentario" type="text"
                                            variant="outlined" clearable color="warning"
                                            :rules="[rules.maxlength, rules.required]">
                                            <template v-slot:prepend>
                                                <v-icon color="warning">bi bi-chat-quote-fill</v-icon>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-select :items="[1, 2, 3, 4,5]" label="Puntaje*"
                                            required
                                            variant="outlined"
                                            color="warning"
                                            v-model="puntajeComentario"
                                            :rules="[rules.required, rules.onlyNumber, rules.puntajeValido]"
                                        >
                                            <template v-slot:prepend>
                                                <v-icon color="warning">bi bi-chat-quote-fill</v-icon>
                                            </template>
                                        </v-select>
                                    </v-col>
                                </v-row>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text="Cerrar" variant="plain" @click="isComentarioDialog = false"></v-btn>
                                    <v-btn color="primary" text="Comentar" variant="tonal" @click="sendComentarioRestaurante()" ></v-btn>
                                </v-card-actions>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-main>
            </v-layout>
        </v-app>
    </v-responsive>
</template>

<script>

import SideBarComponent from '@/components/ClienteComponents/SidebarComponent/SideBarComponent.vue'
import TableComentariosComponent from '@/components/ClienteComponents/ComentariosComponents/TableComentariosComponent.vue'
import axios from 'axios';

export default {
    name: 'MenusByRestaurantesView',
    components: {
        SideBarComponent,
        TableComentariosComponent,
    },
    data: () => ({
        theme: 'light',
        isActive: false,
        restauranteID: null,
        imagenRestaurante: null,
        menusByRestaurante: [],
        loading: false,
        search: '',
        baseURL: process.env.VUE_APP_API_URL,
        nombreRestaurante: 'null',
        descripcionRestaurante: 'null',
        puntajeRestaurante: 0,
        comentariosRestaurantes: [],
        rules: {
            required: value => !!value || 'El campo es requerido',
            maxlength: value => value.length <= 255 || 'El texto no puede superar los 255 caracteres',
            onlyNumber: (value) => {
                //expresion regular solo acepte numeros enteros
                return /^\d$/.test(value) || 'Solo se perminen numeros'
            },
            puntajeValido: (value) => {
                return /^[1-5]$/.test(value) || 'Solo se permiten valores de 1 a 5'
            },
        },
        comentario: '',
        puntajeComentario: 0,
        isComentarioDialog: false,
    }),
    methods: {
        onClick() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        },
        async loadMenusByRestauranteData() {
            const json = { "restauranteID": this.restauranteID };
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
            this.menusByRestaurante = menu;
        },
        async loadRestauranteData() {
            const json = { "restauranteID": this.restauranteID };
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/informacion/restaurante/`, json, { headers });
            const respuesta = response.data;
            if (respuesta.data) {
                const restaurante = respuesta.data;
                this.imagenRestaurante = `${process.env.VUE_APP_API_URL}/restaurantesMethods/api${restaurante.imagen}`;
                this.nombreRestaurante = restaurante.nombre;
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
        async loadComentariosRestaurantes() {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/comentariosMethods/api/comentarios/restautante-listar/${this.restauranteID}`, { headers });
            const comentariosData = response.data.data;
            //hacer validacion si comentarioData esta vacio
            console.log(comentariosData);
            if (comentariosData === null) {
                this.comentariosRestaurantes = [];
                return;
            }else{
                const formatComentarios = comentariosData.map(item => {
                    const fecha = this.formatDate(item.fecha);
                    return {
                        id: item.id,
                        comentario: item.comentario,
                        fecha: fecha,
                        usuario: item.usuario ? item.usuario.nombre : 'Usuario sin nombre',
                        imagen: item.imagen ? process.env.VUE_APP_API_URL + item.imagen : null,
                        puntaje: item.puntaje,
                    }
                });
                this.comentariosRestaurantes = formatComentarios;
            }
        },

        async sendComentarioRestaurante() {
            const json = {
                "restaurante": Number(this.restauranteID),
                "usuario": Number(localStorage.getItem("ClienteID")),
                "comentario": this.comentario,
                "puntaje": this.puntajeComentario
            };
            console.log(json);
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            };
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/comentariosMethods/api/comentarios/restautante-crear/`, json, { headers });
                const respuesta = response.data.data;
                console.log(respuesta);
                if (respuesta) {
                    this.comentarioRestaurante = '';
                    this.loadComentariosRestaurantes();
                    this.isComentarioDialog = false
                }
                this.isComentarioDialog = false
            } catch (error) {
                console.log(error);
                this.isComentarioDialog = false
            }
        },
        agregarAlCarrito(item) {
            const menuData = {
                id: item.id,
                titulo: item.titulo,
                precio: item.precio,
                imagen: item.imagen,
                descripcion: item.descripcion,
                puntaje: item.puntaje,
                restaurante: item.restaurante,
                fecha: item.fecha,
                status: item.status
            };

            this.$store.commit('agregarItemAlCarrito', menuData); // Agrega el objeto del menú al carrito en Vuex
            this.alertVisible = true; // Muestra la alerta

            // Oculta la alerta después de 2 segundos
            setTimeout(() => {
                this.alertVisible = false;
            }, 2000);
        },
    },
    created() {
        this.restauranteID = this.$route.params.id;
        this.loadRestaurante();
        this.loadComentariosRestaurantes();
    }
}
</script>
