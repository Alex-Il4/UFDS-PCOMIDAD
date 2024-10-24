<template>
    <v-card
      class="mx-auto justify-center ma-16"
      max-width="490"
    >
        <v-card-title class="text-green-darken-1 font-weight-bold">
            <v-icon class="mr-2" icon="bi bi-menu-button-wide-fill " end color="success"></v-icon>
            Crea tu menú de comida
        </v-card-title>
      <v-container>
        <v-form fast-fail  ref="form">
            <v-text-field
                v-model="titulo"
                :rules="[rules.Required, rules.onlyString]"
                color="success"
                label="Titulo del menú"
                variant="outlined"
                class="mb-2"
            ></v-text-field>
            <v-text-field
                v-model="nombre"
                :rules="[rules.Required, rules.onlyString]"
                color="success"
                label="Nombre del menú"
                variant="outlined"
                class="mb-2"
            ></v-text-field>

            <v-text-field
                v-model="precio"
                :rules="[rules.Required, rules.onlyNumber]"
                color="success"
                label="Precio"
                placeholder="Ingresa el precio del menú"
                variant="outlined"
                class="mb-2"
            ></v-text-field>

            <v-select
                clearable
                v-model="status"
                label="Status"
                :items="['true', 'false']"
                variant="outlined"
                class="mb-2"
            ></v-select>
            <div>
                <v-date-input v-model="fecha" clearable label="Fecha del menú" variant="outlined"></v-date-input>
            </div>
          <v-file-input
              :rules="[rules.imagen]"
              accept="image/png, image/jpeg, image/bmp"
              label="Imagen del restaurante"
              placeholder="Imagen del restaurante"
              prepend-icon="mdi-camera"
              color="success"
              variant="outlined"
          ></v-file-input>
        </v-form>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" @click="onSubmit" class="text-green-darken-1 font-weight-bold">
          <v-icon class="mr-2" icon="bi bi-menu-button-wide-fill" end></v-icon>
          Registrar Menu
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
            @click="isVisible = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';
export default {
    name: "AgregarMenuComponent",
    props: {
        idRestaurante: String,
    },
    data: () => ({
        search: '',
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
            onlyString: (value) =>{
                //expresion regular que solo acepte letras
                return /^[a-zA-Z\s]+$/.test(value) || 'Numeros no permitidos'
            },
            onlyNumber: (value) => {
                //expresion regular solo acepte numeros enteros
                return /^\d+(?:[.,]\d+)?$/.test(value) || 'Solo se perminen numeros'
            },
        },
        colorAlert: '',
        iconAlert: '',
        titleAlert: '',
        textAlert: '',
        isVisible: false,
    }),
    methods: {
        async onSubmit() {
            const valid = await this.validateFields()
            const token_access = localStorage.getItem("access")

            if (valid) {
                const formData = new FormData();
                formData.append("restaurante", this.idRestaurante);
                formData.append("titulo", this.titulo);
                formData.append("nombre", this.nombre);
                formData.append("precio", this.precio);
                formData.append("fecha", this.fecha);
                formData.append("status", this.status);
                if (this.imagen) {
                    formData.append("imagen", this.imagen, this.imagen.name);
                }
                try {
                    const headers = {
                        'Authorization': `Bearer ${token_access}`,
                        'Content-Type': 'multipart/form-data',
                    }
                    const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/crear/menu/`, formData, {headers});
                    const respuesta = response.data;
                    if (respuesta.data) {
                        this.isVisible = true;
                        this.colorAlert = 'success';
                        this.iconAlert = 'mdi-check-circle-outline';
                        this.titleAlert = 'Creado';
                        this.textAlert = 'El menú ha sido creado exitosamente';
                        if (this.$refs.form) {
                            this.$refs.form.reset();
                        }
                        this.$router.push("/restaurante/metodos/" + this.idRestaurante);
                    }else{
                        this.isVisible = true;
                        this.colorAlert = 'error';
                        this.iconAlert = 'mdi-alert-circle-outline';
                        this.titleAlert = 'Error';
                        this.textAlert = 'Hubo un error al crear el menú';
                    }
                } catch (error) {
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
        async validateFields () {
            const { valid } = await this.$refs.form.validate()

            if (valid) return true
            else return false
        },
    },
}

</script>