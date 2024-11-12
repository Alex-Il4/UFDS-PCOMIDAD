<template>
    <v-responsive>
        <v-app :theme="theme">
            <menu-restaurante-component
                :current-title="currentTitle"
                :theme="theme"
                @toggle-theme="onClick"
                is-dashboard="false"
                @edit-profile="onEditProfile"
            />
            <v-main>
                <v-container max-width="45%">
                    <v-card prepend-icon="mdi-cart-plus" :title="currentTitle" color="blue-darken-2" class="mb-4"></v-card>
                    <v-card variant="text">
                        <v-form ref="form" fast-fail>
                            <v-text-field
                                v-model="clienteID"
                                label="ID"
                                prepend-icon="bi bi-person-badge-fill"
                                variant="solo-filled"
                                disabled
                            ></v-text-field>
                            <v-text-field
                                v-model="correo"
                                label="Correo"
                                prepend-icon="bi bi-envelope-arrow-up-fill"
                                variant="solo-filled"
                                disabled
                            ></v-text-field>
                            <v-text-field
                                v-model="cliente"
                                label="Cliente"
                                prepend-icon="bi bi-person-circle"
                                variant="solo-filled"
                                disabled
                            ></v-text-field>

                            <v-text-field
                                v-model="tiempoEstimado"
                                label="Tiempo estimado"
                                prepend-icon="mdi-clock-outline"
                                variant="solo-filled"
                                disabled
                                class="mb-5"
                            ></v-text-field>
                            <v-select
                                chips
                                clearable
                                append-icon="bi bi-bookmark-star-fill"
                                v-model="status"
                                label="Selecciona el estado del pedido"
                                :items="items"
                                variant="outlined"
                                color="success"
                                class="text-capitalize"
                            ></v-select>
                            <v-data-table class="mb-5" :headers="headersMenu" :items="menus" hide-default-footer>
                                <template v-slot:top>
                                    <v-toolbar flat :color="theme === 'light' ? 'white' : 'dark'">
                                        <v-icon icon="bi bi-bag-heart-fill" color="grey" class="ml-2 mr-2"></v-icon>
                                        <v-toolbar-title class="text-grey"> Menús</v-toolbar-title>
                                    </v-toolbar>
                                </template>
                            </v-data-table>
                            <v-divider color="primary"></v-divider>
                        </v-form>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="$router.go(-1)">
                                <v-icon class="mr-2" icon="mdi-close"></v-icon>
                                Cancelar
                            </v-btn>
                            <v-btn color="primary" @click="onSubmit">
                                <v-icon class="mr-2" icon="mdi-cart-plus" end></v-icon>
                                {{ editText }}
                                <v-icon icon="mdi-chevron-right" end></v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-container>
                <v-dialog
                    v-model="isVisible"
                    width="auto"
                >
                    <v-card
                        :color="colorAlert"
                        max-width="400"
                        :prepend-icon="iconAlert"
                        :text="textAlert"
                        :title="titleAlert"
                    >
                        <template v-slot:actions>
                            <v-btn
                                class="ms-auto"
                                text="Ok"
                                @click="isVisible = false"
                            ></v-btn>
                        </template>
                    </v-card>
                </v-dialog>
            </v-main>
        </v-app>
    </v-responsive>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import MenuRestauranteComponent from '@/components/restauranteComponents/MenuComponent/MenuRestauranteComponent.vue';
export default {
    name: "EditPedidoView",
    components: {
        MenuRestauranteComponent,
    },
    data: () => ({
        isVisible: false,
        colorAlert: '',
        iconAlert: '',
        titleAlert: '',
        textAlert: '',
        currentTitle: 'Editar pedido',
        theme: 'light',
        editText: 'Editar pedido',
        rules: {
            imagen: (value) => {
                return !value || !value.length || value[0].size < 2000000 || 'El tamaño de la imagen debe ser menor a 2 MB!'
            },
            Required: (value) => {
                return !!value || 'El campo es requerido'
            },
            onlyString: (value) => {
                //expresion regular que solo acepte letras
                return /^[a-zA-Z\s]+$/.test(value) || 'Numeros no permitidos'
            },
        },
        headersMenu: [
            { title: "ID", value: "id", align: "center", key: "id" },
            { title: "titulo", value: "titulo", align: "center", key: "titulo" },
            { title: "Nombre", value: "nombre", align: "center", key: "nombre" },
        ],
        items: ['Pendiente', 'Procesado', 'Enviado', 'Entregado', 'Cancelado'],
        status: null,
        menus: [],
        cliente: '',
        clienteID: '',
        correo: '',
        tiempoEstimado: null,
        restauranteID: null,
    }),
    methods: {
        onClick() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        },
        async onSubmit() {
            const access = localStorage.getItem('access');
            const headers = {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json',
            };
            const json = {
                "pedidoID": this.$route.params.id,
                "status": this.status.toLowerCase(),
                "tiempoEstimado": this.tiempoEstimado,
            };
            console.log(this.status.toLowerCase());
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/pedidosMethods/api/actualizar/estado/pedido/`, json, { headers });
                const respuesta = response.data.data;
                console.log(JSON.stringify(respuesta, null, 2));
                //evalular si respuesta.data es igual a  errorSerializer
                if (respuesta.done) {
                    console.log(JSON.stringify(respuesta, null, 2));
                    this.isVisible = true;
                    this.colorAlert = 'success';
                    this.iconAlert = 'mdi-check-circle-outline';
                    this.titleAlert = 'Actualizado';
                    this.textAlert = 'El pedido ha sido actualizado exitosamente';
                    setTimeout(() => {
                        this.$router.push(`/restaurante/metodos/${this.restauranteID}`);
                    }, 1000);
                } else {
                    this.isVisible = true;
                    this.colorAlert = 'error';
                    this.iconAlert = 'mdi-alert-circle-outline';
                    this.titleAlert = 'Error';
                    this.textAlert = 'Hubo un error al actualizar el pedido';
                }
            } catch (error) {
                console.log(error);
                this.isVisible = true;
                this.colorAlert = 'deep-orange-darken-3';
                this.iconAlert = 'bi bi-shield-fill-x';
                this.titleAlert = 'Error';
                this.textAlert = 'Hubo un error al acceder al servidor';
                this.dialog = false;
            }
        },
        async loadPedido() {
            const access = localStorage.getItem('access');
            const headers = {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json',
            };
            const json = {
                "pedidoID": this.$route.params.id,
            };
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/pedidosMethods/api/informacion/pedido/`, json, { headers });
                const respuesta = response.data.data;
                if (respuesta) {
                    console.log(JSON.stringify(respuesta, null, 2));
                    this.restauranteID = respuesta.restaurante;
                    this.clienteID = respuesta.id;
                    this.correo = respuesta.cliente.correo;
                    this.cliente = respuesta.cliente.nombre;
                    this.tiempoEstimado = respuesta.tiempoEstimado;
                    this.status = respuesta.status;
                    const datosTabla = respuesta.menus;
                    this.menus = datosTabla.map(item => {
                        return {
                            id: item.id,
                            titulo: item.titulo,
                            nombre: item.nombre,
                        }
                    });
                } else {
                    console.error(respuesta.error);
                }
            } catch (error) {
                console.log(error);
            }
        },
        onEditProfile() {
            this.$router.push("/restaurante/perfil");
        },
    },
    async created() {
        await this.loadPedido();
    },
    setup() {
        const router = useRouter();
        return {
            router
        }
    }
}
</script>