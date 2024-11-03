<template>
    <v-responsive>
        <v-app :theme="theme">
            <menu-component
                :current-title="currentTitle"
                :theme="theme"
                @toggle-theme="onClick"
                is-dashboard
            />
            <v-main>
                <v-container>
                    <v-card prepend-icon="mdi-account" title="Perfil" color="blue-darken-2"></v-card>
                    <v-card variant="text">
                        <v-form ref="form" fast-fail>
                            <v-text-field
                                v-model="nombre"
                                label="Nombre"
                                prepend-icon="mdi-account-outline"
                                variant="outlined"
                                class="mt-5"
                                color="success"
                            ></v-text-field>
                            <v-text-field
                                v-model="correo"
                                label="Correo"
                                prepend-icon="mdi-email-outline"
                                variant="outlined"
                                disabled
                            ></v-text-field>
                            <!--Text field para password-->
                            <v-text-field
                                v-model="password"
                                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="visible ? 'text' : 'password'"
                                density="compact"
                                placeholder="Nueva Contraseña"
                                prepend-icon="mdi-lock-outline"
                                variant="outlined"
                                @click:append-inner="visible = !visible"
                                color="success"
                            ></v-text-field>
                        </v-form>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="$router.go(-1)">
                                <v-icon class="mr-2" icon="mdi-close"></v-icon>
                                Cancelar
                            </v-btn>
                            <v-btn color="primary" @click="onSubmit">
                                <v-icon class="mr-2" icon="mdi-account-circle" end></v-icon>
                                Actualizar Perfil
                                <v-icon icon="mdi-chevron-right" end></v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
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
                                    @click="isVisible = false;"
                                ></v-btn>
                            </template>
                        </v-card>
                    </v-dialog>
                </v-container>
            </v-main>
        </v-app>
    </v-responsive>
</template>

<script>
import MenuComponent from '@/components/restauranteComponents/MenuComponent/MenuRestauranteComponent.vue'
import axios from 'axios';
export default {
    name: "PerfilView",
    components:{
        MenuComponent
    },
    data: () => ({
        currentTitle: 'Perfil',
        theme: 'light',
        visible: false,
        nombre: '',
        correo: '',
        password: '',
        rules: {
            required: (value) => {
                return !!value || "Este campo es requerido";
            },
            email: (value) => {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    value || ""
                ) || "Por favor ingresa un correo valido";
            },
            minLength: (value) => {
                const min = 8;
                const isvalidation = value.length >= min;
                return isvalidation  || `El password debe tener al menos ${min} caracteres`;
            },
        },
        colorAlert: '',
        iconAlert: '',
        titleAlert: '',
        textAlert: '',
        isVisible: false,
    }),
    methods: {
        onClick() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        },
        async onSubmit() {
            const valid = await this.validateFields()
            if (valid) {
                const access = localStorage.getItem('access');
                const json = {
                    "id": localStorage.getItem('usuarioRestauranteID'),
                    "nombre": this.nombre,
                    "password": this.password,
                };
                const headers = {
                    'Authorization': `Bearer ${access}`,
                    'Content-Type': 'application/json',
                };
                try {
                    const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesLoginMethods/api/perfil/editar/`, json, {headers});
                    if (response.status === 200) {
                        const respuesta = response.data.data;
                        if (respuesta) {
                            console.log(JSON.stringify(respuesta, null, 2));
                            this.isVisible = true;
                            this.colorAlert = 'success';
                            this.iconAlert = 'mdi-check-circle-outline';
                            this.titleAlert = 'Perfil actualizado';
                            this.textAlert = 'El perfil ha sido actualizado exitosamente';
                            this.dialog = false;
                            localStorage.setItem('nombreRestaurante', respuesta.nombre);
                            localStorage.setItem('correoRestaurante', respuesta.correo);
                            localStorage.setItem('usuarioRestauranteID', respuesta.id);
                            setTimeout(() => {
                                this.$router.push('/restaurante/dashboard');
                            }, 1000);
                        }else{
                            this.isVisible = true;
                            this.colorAlert = 'error';
                            this.iconAlert = 'mdi-alert-circle-outline';
                            this.titleAlert = 'Error';
                            this.textAlert = 'Hubo un error al actualizar el perfil';
                            this.dialog = false;
                        }
                    }else{
                        this.isVisible = true;
                        this.colorAlert = 'error';
                        this.iconAlert = 'mdi-alert-circle-outline';
                        this.titleAlert = 'Error';
                        this.textAlert = 'Hubo un error al actualizar el perfil';
                        this.dialog = false;
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
            }else{
                console.log("Formulario no válido");
            }
        },
        async loadPerfil() {
            const access = localStorage.getItem('access');
            const headers = {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json',
            };
            const json = {
                "usuarioRestauranteID": localStorage.getItem('usuarioRestauranteID'),
            };
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesLoginMethods/api/perfil/informacion/`, json, { headers });
                const respuesta = response.data.data;
                if (respuesta) {
                    this.nombre = respuesta.nombre;
                    this.correo = respuesta.correo;
                } else {
                    console.error(respuesta.error);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async validateFields () {
            const { valid } = await this.$refs.form.validate()

            if (valid) return true
            else return false
        },
    },
    async created() {
        await this.loadPerfil();
    },
}
</script>
