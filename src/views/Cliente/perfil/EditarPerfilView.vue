<template>
    <div>
        <v-img class="mx-auto my-6 fill-height" rounded max-height="120" src="../../../assets/logo.png"></v-img>

        <v-card class="mx-auto pa-12 pb-8" elevation="8" width="450" rounded="lg">
            <v-form ref="form" fast-fail>
                <div class="text-subtitle-1 text-medium-emphasis">Nombre</div>

                <v-text-field v-model="nombre" :rules="[rules.Required, rules.onlyString]" density="compact" placeholder="Nombre" variant="outlined">
                    <template v-slot:prepend-inner>
                        <v-icon icon="bi bi-person-bounding-box" class="mr-2"></v-icon>
                    </template>
                </v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis">Apellido</div>

                <v-text-field v-model="apellido" :rules="[rules.Required, rules.onlyString]" density="compact" placeholder="Apellido" variant="outlined">
                    <template v-slot:prepend-inner>
                        <v-icon icon="bi bi-person-lines-fill" class="mr-2"></v-icon>
                    </template>
                </v-text-field>
                <v-card class="mb-12" color="surface-variant" variant="tonal">
                    <v-card-text class="text-medium-emphasis text-caption">
                        Precaucion: Se debe proporcionar el nombre y apellido para poder actualizar la informacion.
                        Campos obligatorios.
                    </v-card-text>
                </v-card>

                <v-btn class="mb-8" color="success" size="large" variant="tonal" block
                    @click="confirmActualizar.isVisible = true">
                    Actualizar
                </v-btn>
            </v-form>
            <v-card-text class="text-center">
                <v-chip color="error" variant="elevated" class="ma-2 font-weight-bold"
                    append-icon="bi bi-x-octagon-fill" @click="$emit('close')">Cancelar</v-chip>
            </v-card-text>
        </v-card>
        <v-dialog v-model="confirmActualizar.isVisible" width="auto">
            <v-card class="mx-auto" max-width="450" title="Confirmar">
                <v-card-text class="text-center">
                    <v-chip color="success" variant="elevated" class="ma-2 font-weight-bold"
                        append-icon="bi bi-check-circle-fill" @click="actualizar">Actualizar</v-chip>
                    <v-chip color="error" variant="elevated" class="ma-2 font-weight-bold"
                        append-icon="bi bi-x-octagon-fill"
                        @click="confirmActualizar.isVisible = false">Cancelar</v-chip>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
            {{ snackbar.message }}
        </v-snackbar>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "EditarPerfilView",
    data: () => ({
        nombre: '',
        apellido: '',
        visible: false,
        access: localStorage.getItem("access"),
        confirmActualizar: {
            isVisible: false,
        },
        id: localStorage.getItem("ClienteID"),
        snackbar: {
            show: false,
            message: "",
            color: "success",
        },
        rules: {
            Required: (value) => {
                return !!value || 'El campo es requerido'
            },
            onlyString: (value) => {
                //expresion regular que solo acepte letras
                return /^[a-zA-Z\s]+$/.test(value) || 'Numeros no permitidos'
            },
        },
    }),
    methods: {
        async actualizar() {
            const valid = this.validarFields()
            if (valid) {
                const headers = {
                    Authorization: `Bearer ${this.access}`,
                    "Content-Type": "application/json",
                }
                const json = {
                    id: this.id,
                    nombre: this.nombre,
                    apellido: this.apellido,
                };
                try {
                    const response = await axios.post(`${process.env.VUE_APP_API_URL}/loginMethods/api/perfil/editar/`, json, { headers });
                    const respuesta = response.data.data;
                    if (respuesta) {
                        localStorage.setItem("NombreCliente", respuesta.nombre);
                        this.nombre = '';
                        this.apellido = '';
                        this.pass = '';
                        this.confirmActualizar.isVisible = false;
                        this.snackbar.show = true;
                        this.snackbar.message = 'Perfil actualizado exitosamente';
                        this.snackbar.color = 'success';
                        this.$emit('close');
                    } else {
                        this.snackbar.show = true;
                        this.snackbar.message = 'Error al actualizar el perfil';
                        this.snackbar.color = 'error';
                        this.confirmActualizar.isVisible = false;
                    }
                } catch (error) {
                    console.log(error);
                    this.snackbar.show = true;
                    this.snackbar.message = 'Error al actualizar el perfil';
                    this.snackbar.color = 'error';
                    this.confirmActualizar.isVisible = false;
                }
            } else {
                this.snackbar.show = true;
                this.snackbar.message = 'Error al actualizar el perfil';
                this.snackbar.color = 'error';
                this.confirmActualizar.isVisible = false;
            }
        },
        async validarFields() {
            const { valid } = await this.$refs.form.validate()

            if (valid) return true
            else return false
        },
    },
}
</script>