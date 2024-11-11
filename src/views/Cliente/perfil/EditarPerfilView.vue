<template>
    <div>
        <v-img class="mx-auto my-6 fill-height" rounded max-height="120"
            src="../../../assets/logo.png"></v-img>

        <v-card class="mx-auto pa-12 pb-8" elevation="8" width="450" rounded="lg">
            <div class="text-subtitle-1 text-medium-emphasis">Nombre</div>

            <v-text-field v-model="nombre" density="compact" placeholder="Nombre" prepend-inner-icon="mdi-email-outline"
                variant="outlined"></v-text-field>
            <div class="text-subtitle-1 text-medium-emphasis">Apellido</div>

                <v-text-field v-model="apellido" density="compact" placeholder="Apellido" prepend-inner-icon="mdi-email-outline"
                    variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Contraseña
            </div>

            <v-text-field v-model="pass" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
                variant="outlined" @click:append-inner="visible = !visible"></v-text-field>

            <v-btn class="mb-8" color="success" size="large" variant="tonal" block @click="confirmActualizar.isVisible = true">
                Actualizar
            </v-btn>

            <v-card-text class="text-center">
                <v-chip color="error" variant="elevated" class="ma-2 font-weight-bold" append-icon="bi bi-x-octagon-fill" @click="$emit('close')">Cancelar</v-chip>
            </v-card-text>
        </v-card>
        <v-dialog v-model="confirmActualizar.isVisible" width="auto">
            <v-card class="mx-auto" max-width="450" title="Confirmar">
                <v-card-text class="text-center">
                    <v-chip color="success" variant="elevated" class="ma-2 font-weight-bold" append-icon="bi bi-check-circle-fill" @click="actualizar">Actualizar</v-chip>
                    <v-chip color="error" variant="elevated" class="ma-2 font-weight-bold" append-icon="bi bi-x-octagon-fill" @click="confirmActualizar.isVisible = false">Cancelar</v-chip>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "EditarPerfilView",
    data: () => ({
        nombre: '',
        apellido: '',
        pass: '',
        visible: false,
        access: localStorage.getItem("access"),
        confirmActualizar: {
            isVisible: false,
        },
        id: localStorage.getItem("ClienteID"),
    }),
    methods: {
        async actualizar() {
            const headers = {
                Authorization: `Bearer ${this.access}`,
                "Content-Type": "application/json",
            }
            const json = {
                nombre: this.nombre,
                apellido: this.apellido,
                password: this.pass,
            };
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/loginMethods/api/perfil/editar/`, json, { headers });
                const respuesta = response.data.data;
                if (respuesta) {
                    this.nombre = '';
                    this.apellido = '';
                    this.pass = '';
                    this.confirmActualizar.isVisible = false;
                } else {
                    alert(response.data.error);
                    this.confirmActualizar.isVisible = false;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
}
</script>