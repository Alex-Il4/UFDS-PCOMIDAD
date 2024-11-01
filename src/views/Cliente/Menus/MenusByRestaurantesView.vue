<template>
    <v-responsive>
        <v-app :theme="theme">
            <v-layout>
                <SideBarComponent :theme="theme" @toggle-theme="onClick"></SideBarComponent>
                <v-main style="height: 250px">
                    <div class="pa-7">
                    </div>
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
    }),
    methods: {
        onClick() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        },
        async loadMenusByRestauranteData() {
            const json = {
                "restauranteID": this.restauranteID
            }
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/listar/restaurante/menu/todos/`, json,{ headers });
            console.log(JSON.stringify(response.data, null, 2));
        },
        async loadRestauranteData() {
            const json = {
                "restauranteID": this.restauranteID
            }
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/listar/restaurante/menu/todos/`, json,{ headers });
            console.log(JSON.stringify(response.data, null, 2));
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
