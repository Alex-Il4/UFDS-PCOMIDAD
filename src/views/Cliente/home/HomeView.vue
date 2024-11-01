<template>
    <v-responsive>
        <v-app :theme="theme">
            <v-layout>
                <SideBarComponent :theme="theme" @toggle-theme="onClick">

                </SideBarComponent> <v-main>
                    <div class="pa-7">
                        <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact"
                            placeholder="Busca Restaurantes" variant="outlined" hint="Busca tus restaurantes preferidos"
                            single-line clearable color="orange" @click:append-inner="onClick"> <template v-slot:loader>
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
                                            <v-img height="250" :src="baseUrl+item.imagen" cover>
                                            </v-img>
                                        </div>
                                        <v-card-item>
                                            <v-card-title>{{ item.nombre }}</v-card-title>
                                            <v-card-subtitle>
                                                <v-chip color="warning"  small>{{ item.tipoCocina }}</v-chip>
                                            </v-card-subtitle>
                                        </v-card-item>
                                        <v-card-text>
                                            <v-row align="center" class="mx-0 mb-2 mt-1">
                                                <v-rating :model-value="item.puntaje" color="amber" density="compact"
                                                size="small" half-increments readonly>
                                            </v-rating>
                                        </v-row>
                                        <span class="me-1 mt-1">{{item.ubicacion}}</span>
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
    data: () => ({
        theme: 'light',
        restaurantes: [],
        loading: false,
        baseUrl: process.env.VUE_APP_API_URL,
    }),
    methods: {
        onClick() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        },
        async goMenus(id) {
            this.$router.push(`/menus/restaurante/${id}`);
        },
        async ListarRestaurant() {
            try {
                const token = localStorage.getItem('access'); // Asegúrate de obtener el token del localStorage
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/listar/`, { headers }); // Pasa las cabeceras correctamente
                const restauranteFormat = response.data.data.map(item => {
                    return {
                        id: item.id,
                        nombre: item.nombre,
                        ubicacion: item.ubicacion,
                        tipoCocina: item.tipoCocina,
                        descripcion: item.descripcion,
                        puntaje: item.puntaje,
                        imagen: item.imagen ? item.imagen : null,
                    }
                });
    
                this.restaurantes = restauranteFormat;
                console.log(JSON.stringify(restauranteFormat, null, 2));
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.ListarRestaurant();
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