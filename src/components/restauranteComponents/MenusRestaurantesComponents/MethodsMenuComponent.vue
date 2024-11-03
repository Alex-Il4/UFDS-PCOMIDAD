<template>
    <v-card class="mx-auto justify-center ma-16" max-width="490">
      <v-card-title class="text-green-darken-1 font-weight-bold">
        <v-icon class="mr-2" icon="bi bi-menu-button-wide-fill " end color="success"></v-icon>
        {{ isEditMode ? 'Edita tu menú de comida' : 'Crea tu menú de comida' }}
      </v-card-title>
      <v-container>
        <v-form fast-fail ref="form">
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
          <v-text-field
            v-model="descripcion"
            :rules="[rules.Required, rules.maxText]"
            color="success"
            label="Descripción"
            variant="outlined"
            class="mb-2"
          ></v-text-field>
          <v-text-field
            v-model="puntaje"
            :rules="[rules.Required, rules.onlyNumber]"
            color="success"
            label="Puntaje"
            placeholder="Ingresa el puntaje del menú"
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
            v-if="!isEditMode"
            :rules="[rules.imagen]"
            accept="image/png, image/jpeg, image/bmp"
            label="Imagen del restaurante"
            placeholder="Imagen del restaurante"
            prepend-icon="mdi-camera"
            color="success"
            variant="outlined"
            v-model="imagen"
          ></v-file-input>
        </v-form>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="onSubmit" class="text-green-darken-1 font-weight-bold">
          <v-icon class="mr-2" icon="bi bi-menu-button-wide-fill" end></v-icon>
          {{ isEditMode ? 'Actualizar Menu' : 'Registrar Menu' }}
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="isVisible" width="auto">
      <v-card :color="colorAlert" max-width="400" :prepend-icon="iconAlert" :text="textAlert" :title="titleAlert">
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Ok" @click="isVisible = false"></v-btn>
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
      menuId: { type: String, default: null }, // ID del menú para editar
      isEditMode: { type: Boolean, default: false },
    },
    data: () => ({
      titulo: '',
      nombre: '',
      precio: '',
      status: null,
      fecha: null,
      imagen: '',
      descripcion: '',
      puntaje: '',
      rules: {
        imagen: (value) =>!value || !value.length || value[0].size < 2000000 || 'El tamaño de la imagen debe ser menor a 2 MB!',
        Required: (value) => !!value || 'El campo es requerido',
        onlyString: (value) => /^[a-zA-Z\s]+$/.test(value) || 'Numeros no permitidos',
        onlyNumber: (value) => /^\d+(?:[.,]\d+)?$/.test(value) || 'Solo se perminen numeros',
        maxText: (value) => value.length <= 100 || 'El texto no puede superar los 100 caracteres',
      },
      colorAlert: '',
      iconAlert: '',
      titleAlert: '',
      textAlert: '',
      isVisible: false,
    }),
    methods: {
      async onSubmit() {
        const valid = await this.validateFields();
        const token_access = localStorage.getItem("access");
        const endpoint = this.isEditMode
          ? `${process.env.VUE_APP_API_URL}/restaurantesMethods/api/editar/menu/`
          : `${process.env.VUE_APP_API_URL}/restaurantesMethods/api/crear/menu/`;

        if (valid) {
          const formData = new FormData();
          if (this.menuId) {
            formData.append("menuID", this.menuId);
          }
          formData.append("restaurante", this.idRestaurante);
          formData.append("titulo", this.titulo);
          formData.append("nombre", this.nombre);
          formData.append("precio", this.precio);
          formData.append("descripcion", this.descripcion);
          formData.append("puntaje", this.puntaje);
          if (this.fecha) {
            formData.append("fecha", this.fecha);
          }
          formData.append("status", this.status);
          if (this.imagen) {
            formData.append("imagen", this.imagen, this.imagen.name);
          }
          try {
            const headers = {
              'Authorization': `Bearer ${token_access}`,
              'Content-Type': 'multipart/form-data',
            };
            const response = await axios.post(endpoint, formData, { headers });
            const respuesta = response.data;
            if (respuesta.data) {
              this.showAlert(true, this.isEditMode ? 'Actualizado' : 'Creado', 'El menú ha sido ' + (this.isEditMode ? 'actualizado' : 'creado') + ' exitosamente');
              this.$refs.form.reset();
              this.$emit('finish-edit');
              this.$router.replace({ path: `/restaurante/metodos/${this.idRestaurante}` });
            } else {
              this.showAlert(false, 'Error', 'Hubo un error al ' + (this.isEditMode ? 'actualizar' : 'crear') + ' el menú');
            }
          } catch (error) {
            this.showAlert(false, 'Error', 'Hubo un error al acceder al servidor');
          }
        } else {
          console.log("Formulario no válido");
        }
      },
      showAlert(success, title, message) {
        this.isVisible = true;
        this.colorAlert = success ? 'success' : 'error';
        this.iconAlert = success ? 'mdi-check-circle-outline' : 'mdi-alert-circle-outline';
        this.titleAlert = title;
        this.textAlert = message;
      },
      async loadMenuData() {
        if (this.isEditMode && this.menuId) {
          try {
            const token_access = localStorage.getItem("access");
            const json = { 'menuID': this.menuId };
            const headers = { Authorization: `Bearer ${token_access}` };
            const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/datos/menu/`,json, { headers });
            console.log(JSON.stringify(response.data.data, null, 2));
            const { titulo, nombre, precio, status, descripcion, puntaje} = response.data.data;
            this.titulo = titulo;
            this.nombre = nombre;
            this.precio = precio;
            this.status = status;
            this.descripcion = descripcion;
            this.puntaje = puntaje;
          } catch (error) {
            this.showAlert(false, 'Error', 'No se pudo cargar el menú para editar');
          }
        }
      },
      async validateFields() {
        const { valid } = await this.$refs.form.validate();
        return valid;
      },
    },
    mounted() {
      if (this.isEditMode) {
        this.loadMenuData();
      }
    },
  };
  </script>