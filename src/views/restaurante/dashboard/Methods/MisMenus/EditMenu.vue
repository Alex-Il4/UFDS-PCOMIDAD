<template>
    <v-responsive>
        <v-app :theme="theme">
            <menu-component :current-title="currentTitle" :theme="theme" @toggle-theme="onClick" />
            <v-main>
                <v-container>
                </v-container>

            </v-main>
        </v-app>
    </v-responsive>
</template>

<script>
import MenuComponent from '@/components/restauranteComponents/MenuComponent/MenuRestauranteComponent.vue'
export default {
    name: "EditMenu",
    components: {
        MenuComponent,
    },
    data: () => ({
        theme: 'light',
        currentTitle: 'Editar Menú',
        restauranteID: null,
        menuID: null,
        titulo: '',
        nombre: '',
        precio: '',
        status: null,
        fecha: null,
        imagen: '',
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
            onlyNumber: (value) => {
                //expresion regular solo acepte numeros enteros
                return /^\d+(?:[.,]\d+)?$/.test(value) || 'Solo se perminen numeros'
            },
        },
    }),
    methods: {
        async validateFields() {
            const { valid } = await this.$refs.form.validate()

            if (valid) return true
            else return false
        },
        onClick() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        }
    },
}
</script>