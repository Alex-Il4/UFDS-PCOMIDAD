<template>
    <v-container>
        <h2>Carrito de Compras</h2>
        <v-row>
            <v-col v-for="item in cartItems" :key="item.id" cols="12" md="4">
                <v-card>
                    <v-img :src="item.imagen" height="200px"></v-img>
                    <v-card-title>{{ item.titulo }}</v-card-title>
                    <v-card-subtitle>{{ item.restaurante }}</v-card-subtitle>
                    <v-card-text>
                        <div>Precio: ${{ item.precio }}</div>
                        <div>{{ item.descripcion }}</div>
                        <v-rating :model-value="item.puntaje" color="amber" density="compact" size="small" readonly></v-rating>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="removeMenuFromCart(item.id)" color="red" icon>
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'CarritoView',
    computed: {
        ...mapGetters('cart', ['cartItems'])
    },
    methods: {
        ...mapActions('cart', ['removeMenuFromCart'])
    }
};
</script>
