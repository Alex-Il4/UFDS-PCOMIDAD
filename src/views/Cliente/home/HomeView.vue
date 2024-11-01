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
                                <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
                                    <v-card class="mx-auto my-12" max-width="344">
                                        <template>
                                            <v-progress-linear color="deep-purple" height="4"
                                                indeterminate></v-progress-linear>
                                        </template>
                                        <v-img height="250"
                                            src="https://t3.ftcdn.net/jpg/08/30/03/98/240_F_830039876_Jrvqi8UUd6FDnuWibRWUOrbBcp9rC3vg.jpg"
                                            cover>
                                        </v-img> <v-card-item>
                                            <v-card-title>NOMBRE DEL RESTAURANTE</v-card-title>
                                            <v-card-subtitle>
                                                <span class="me-1">UBUCACION</span>
                                                <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                                            </v-card-subtitle>
                                        </v-card-item>
                                        <v-card-text>
                                            <v-row align="center" class="mx-0">
                                                <v-rating :model-value="4.5" color="amber" density="compact"
                                                    size="small" half-increments readonly>
                                                </v-rating>
                                                <div class="text-grey ms-4"> PUNTAJE</div>
                                            </v-row>
                                            <div class="my-4 text-subtitle-1"> TIPO DE CUCINA </div>
                                            <div> DESCRIPCION DEL RESTAURENTE
                                            </div>
                                        </v-card-text> <v-divider class="mx-4 mb-1"></v-divider>
                                        <v-card-actions> <v-btn color="amber-darken-4" text="OPCIONES" block border
                                                @click="reserve"></v-btn>
                                        </v-card-actions> </v-card>
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
        selection: 1,
    }),
    methods: {
        onClick() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        },
        async ListarRestaurant() {
            try {
                const token = localStorage.getItem('access'); // Asegúrate de obtener el token del localStorage
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/listar/`, { headers }); // Pasa las cabeceras correctamente
                this.restaurantes = response.data.data;
                console.log(response.data);
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