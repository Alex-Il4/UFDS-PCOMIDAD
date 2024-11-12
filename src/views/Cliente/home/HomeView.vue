<template>
    <v-responsive>
        <v-app :theme="theme">
            <v-layout>
                <SideBarComponent :theme="theme" @toggle-theme="onClick">

                </SideBarComponent> <v-main>
                    <div class="pa-7">
                        <v-text-field v-model="FiltroRestaurante" :custom="custom" append-inner-icon="mdi-magnify"
                            density="compact" placeholder="Busca Restaurantes" variant="outlined"
                            hint="Busca tus restaurantes preferidos" single-line clearable color="orange"
                            @click:append-inner="filtrarRestaurantes">
                            <template v-slot:customer>
                                <v-progress-linear :active="custom" color="orange" :model-value="progress" height="7"
                                    indeterminate></v-progress-linear>
                            </template>
                        </v-text-field>
                        <div class="container">
                            <v-row class="mt-8">
                                <v-col v-for="item in restaurantes" :key="item" cols="12" sm="6" md="4">
                                    <v-card class="mx-auto my-12" max-width="344">
                                        <template>
                                            <v-progress-linear color="deep-purple" height="4"
                                                indeterminate></v-progress-linear>
                                        </template>
                                        <div v-if="item.imagen === null">
                                            <v-img height="250" src="https://bitsofco.de/img/Qo5mfYDE5v-350.avif" cover>

                                            </v-img>
                                        </div>
                                        <div v-else>
                                            <v-img height="250" :src="baseUrl + item.imagen" cover>
                                            </v-img>
                                        </div>
                                        <v-card-item>
                                            <v-card-title>{{ item.nombre }}</v-card-title>
                                            <v-card-subtitle>
                                                <v-chip color="warning" small>{{ item.tipoCocina }}</v-chip>
                                            </v-card-subtitle>
                                        </v-card-item>
                                        <v-card-text>
                                            <v-row align="center" class="mx-0 mb-2 mt-1">
                                                <v-rating :model-value="item.puntaje" color="amber" density="compact"
                                                    size="small" half-increments readonly>
                                                </v-rating>
                                            </v-row>
                                            <span class="me-1 mt-1">{{ item.ubicacion }}</span>
                                            <div> {{ item.descripcion }}
                                            </div>
                                        </v-card-text> <v-divider class="mx-4 mb-1">
                                        </v-divider>
                                        <v-card-actions>
                                            <v-btn color="amber-darken-4" text="MENUS" block border
                                                @click="goMenus(item.id)"></v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                </v-main>
            </v-layout>
        </v-app>
    </v-responsive>
</template>

<script>
import SideBarComponent from '@/components/ClienteComponents/SidebarComponent/SideBarComponent.vue';
import axios from 'axios';

export default {
    name: 'HomeView',
    components: {
        SideBarComponent
    },
    data() {
        return {
            theme: 'light',
            custom: false,
            restaurantes: [],
            baseUrl: process.env.VUE_APP_API_URL,
            FiltroRestaurante: '',
            progress: 0
        };
    },
    methods: {
        async filtrarRestaurantes() {
            this.custom = true;
            try {
                const token = localStorage.getItem('access');
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };

                // Intento 1: Buscar por nombre
                let response = await axios.post(
                    `${this.baseUrl}/restaurantesMethods/api/buscar/restaurante/`,
                    { nombre: this.FiltroRestaurante },
                    { headers }
                );

                // Verificar si se encontraron restaurantes
                if (response.data.data && response.data.data.length > 0) {
                    this.restaurantes = this.formatearRestaurantes(response.data.data);
                    this.custom = false;
                } else {
                    // Intento 2: Buscar por tipoCocina si no hubo resultados con nombre
                    response = await axios.post(
                        `${this.baseUrl}/restaurantesMethods/api/buscar/restaurante/`,
                        { tipoCocina: this.FiltroRestaurante },
                        { headers }
                    );

                    if (response.data.data && response.data.data.length > 0) {
                        this.restaurantes = this.formatearRestaurantes(response.data.data);
                        this.custom = false;
                    } else {
                        // Intento 3: Buscar por ubicacion si no hubo resultados con tipoCocina
                        response = await axios.post(
                            `${this.baseUrl}/restaurantesMethods/api/buscar/restaurante/`,
                            { ubicacion: this.FiltroRestaurante },
                            { headers }
                        );

                        if (response.data.data && response.data.data.length > 0) {
                            this.restaurantes = this.formatearRestaurantes(response.data.data);
                            this.custom = false;
                        } else {
                            // Si no se encontraron resultados en ninguno de los intentos
                            this.custom = false;
                            this.restaurantes = [];
                        }
                    }
                }
            } catch (error) {
                console.error('Error al buscar restaurantes:', error);
            } finally {
                this.custom = false;
            }
        },

        // Método para formatear los datos de los restaurantes
        formatearRestaurantes(data) {
            return data.map(item => ({
                id: item.id,
                nombre: item.nombre,
                ubicacion: item.ubicacion,
                tipoCocina: item.tipoCocina,
                descripcion: item.descripcion,
                puntaje: item.puntaje,
                imagen: item.imagen ? item.imagen : null
            }));
        },

        onClick() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        },

        async goMenus(id) {
            this.$router.push(`/menus/restaurante/${id}`);
        },

        async ListarRestaurant() {
            this.custom = true;
            try {
                const token = localStorage.getItem('access');
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };

                const response = await axios.get(`${this.baseUrl}/restaurantesMethods/api/listar/`, { headers });

                // Formateo de los restaurantes
                const restauranteFormat = response.data.data.map(item => {
                    return {
                        id: item.id,
                        nombre: item.nombre,
                        ubicacion: item.ubicacion,
                        tipoCocina: item.tipoCocina,
                        descripcion: item.descripcion,
                        puntaje: item.puntaje,
                        imagen: item.imagen ? item.imagen : null
                    };
                });

                this.restaurantes = restauranteFormat;
                console.log(JSON.stringify(restauranteFormat, null, 2));
            } catch (error) {
                console.log(error);
            } finally {
                this.custom = false;
            }
        }
    },
    mounted() {
        this.ListarRestaurant();
    },
    watch: {
        FiltroRestaurante() {
            this.ListarRestaurant();
        }
    }
};
</script>
<style scoped>
.v-card {
    transition: all 0.3s ease-in-out;
}

.v-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.container {
    width: 100%;
    max-width: 1200px;
    /* Ajusta este valor según sea necesario */
    margin: 0 auto;
    /* Centra el contenedor horizontalmente */
    padding: 0 15px;
    /* Espaciado horizontal */
    display: flex;
    /* Asegura que el contenido se centre */
    justify-content: center;
    /* Centra el contenido dentro del contenedor */
}
</style>