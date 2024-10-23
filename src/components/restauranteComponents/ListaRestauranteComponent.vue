<template>
  <div>
    <v-card class="mx-auto" :title="titleTable" :color="color" :prepend-icon="icon">
      <v-data-table :items="items" :headers="headers" height="68vh">
        <template v-slot:[`item.actions`]="{ item }">
          <div class="">
            <v-chip append-icon="bi bi-file-text-fill" color="success" class="d-flex justify-center align-center mb-2 mt-2" small @click="getID(item.id)">Editar restaurante</v-chip>

            <v-chip color="error" class="d-flex justify-center align-center mb-2" small append-icon="bi bi-trash3-fill" @click="deleteRestaurant(item.id)">
              Eliminar restaurante
            </v-chip>

            <v-chip color="warning" class="d-flex justify-center align-center mb-2" small append-icon="bi bi-arrow-up-right-square-fill" @click="redirectMetdosRestaurante(item.id)">
              Funciones restaurante
            </v-chip>

          </div>
        </template>
        <template v-slot:[`item.puntaje`]="{ item }">
          <v-chip :color="getColor(item.puntaje)">
            {{ item.puntaje }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>

    <div class="pa-4 text-center">
      <v-dialog v-model="dialog" max-width="600">
        <v-form fast-fail  ref="form">
          <v-card prepend-icon="mdi-account" title="Editar restaurante">
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="nombre" color="success" label="Nombre*" :rules="[rules.Required, rules.onlyString]"
                    required></v-text-field>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="puntaje" color="success" hint="Ingrese un numero entre 1 y 5"
                    :rules="[rules.Required, rules.onlyNumber, rules.puntajeValido]" label="Puntaje*"></v-text-field>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                  <v-text-field v-model="telefono" color="success" hint="Ingrese el telefono" label="telefono*"
                    :rules="[rules.Required, rules.telefono]" required></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field v-model="tipoCocina" color="success" label="Tipo de cocina*" :rules="[rules.Required, rules.onlyString]"
                    required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="ubicacion" color="success" label="Ubicación*" :rules="[rules.Required]" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="descripcion" color="success" label="Descripción*" :rules="[rules.Required]"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-file-input v-model="imagen" color="success" accept="image/png, image/jpeg, image/bmp"
                    label="Imagen del restaurante" placeholder="Imagen del restaurante"
                    prepend-icon="mdi-camera"></v-file-input>
                </v-col>
              </v-row>


              <small class="text-caption text-medium-emphasis">*indicates required field</small>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text="Cancelar" color="error" variant="plain" @click="dialog = false"></v-btn>

              <v-btn color="primary" text="Actualizar" variant="tonal" @click="EditRestaurant()"></v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </div>
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
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ListaRestauranteComponent",
  props: {
    items: Array,
    titleTable: String,
    color: String,
    icon: String,
  },
  data: () => ({
    headers: [
      { title: "ID", value: "id", align: "start", key: "id" },
      { title: "Nombre", value: "nombre", align: "start", key: "nombre" },
      { title: "Puntaje", value: "puntaje", align: "start", key: "puntaje" },
      { title: "Telefono", value: "telefono", align: "start", key: "telefono" },
      {
        title: "Tipo de Cocina",
        value: "tipoCocina",
        align: "start",
        key: "tipoCocina",
      },
      {
        title: "Descripción",
        value: "descripcion",
        align: "start",
        key: "descripcion",
      },
      {
        title: "Ubicación",
        value: "ubicacion",
        align: "start",
        key: "ubicacion",
      },
      { title: "Actions", key: "actions", sortable: false },
    ],
    rules: {
      imagen: (value) => {
        return !value || !value.length || value[0].size < 2000000 || 'El tamaño de la imagen debe ser menor a 2 MB!'
      },
      Required: (value) => {
        return !!value || 'El campo es requerido'
      },
      telefono: (value) => {
        return /^\d{8}$/.test(value) || 'Ingrese un telefono valido'
      },
      onlyString: (value) => {
        //expresion regular que solo acepte letras
        return /^[a-zA-Z\s]+$/.test(value) || 'Numeros no permitidos'
      },
      onlyNumber: (value) => {
        //expresion regular solo acepte numeros enteros
        return /^\d$/.test(value) || 'Solo se perminen numeros'
      },
      puntajeValido: (value) => {
        return /^[1-5]$/.test(value) || 'Solo se permiten valores de 1 a 5'
      },
    },
    dialog: false,
    restauranteID: null,
    colorAlert: '',
    iconAlert: '',
    titleAlert: '',
    textAlert: '',
    isVisible: false,
    nombre: '',
    ubicacion: '',
    descripcion: '',
    telefono: '',
    puntaje: '',
    tipoCocina: '',
    imagen: '',
  }),
  methods: {
    async EditRestaurant() {
      const valid = await this.validateFields()
      if (valid) {
        try {
          const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`,
            'Content-Type': 'multipart/form-data',
          }
          const formData = new FormData();
          formData.append("restauranteID", this.restauranteID);
          formData.append("nombre", this.nombre);
          formData.append("ubicacion", this.ubicacion);
          formData.append("descripcion", this.descripcion);
          formData.append("telefono", this.telefono);
          formData.append("puntaje", this.puntaje);
          formData.append("tipoCocina", this.tipoCocina);
          if (this.imagen) {
            formData.append("imagen", this.imagen, this.imagen.name);
          }
          const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/editar/restaurante/`, formData, {headers});
          const respuesta = response.data;
          if (respuesta.data) {
            this.$emit("refreshListaRestaurantes");
            this.isVisible = true;
            this.colorAlert = 'success';
            this.iconAlert = 'mdi-check-circle-outline';
            this.titleAlert = 'Creado';
            this.textAlert = 'El restaurante ha sido actualizado exitosamente';
            this.dialog = false;
          }else {
            this.isVisible = true;
            this.colorAlert = 'error';
            this.iconAlert = 'mdi-alert-circle-outline';
            this.titleAlert = 'Error';
            this.textAlert = 'Hubo un error al actualizar el restaurante';
            this.dialog = false;
          }
        } catch (error) {
          console.log(error);
          this.isVisible = true;
          this.colorAlert = 'error';
          this.iconAlert = 'mdi-alert-circle-outline';
          this.titleAlert = 'Error';
          this.textAlert = 'Hubo un error al actualizar el restaurante';
          this.dialog = false;
        }
      }else{
        console.log("Formulario no válido");
      }
    },
    getID(id){
      this.restauranteID = id;
      this.items.forEach(item => {
        if (item.id === id) {
          this.nombre = item.nombre;
          this.ubicacion = item.ubicacion;
          this.descripcion = item.descripcion;
          this.telefono = item.telefono;
          this.puntaje = item.puntaje;
          this.tipoCocina = item.tipoCocina;
        }
      });
      this.dialog = true;
    },
    async deleteRestaurant(id) {
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
        'Content-Type': 'multipart/form-data',
      }
      const json = {
        "restauranteID": id,
      };
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/eliminar/restaurante/`, json, {headers});
        const respuesta = response.data;
        if (respuesta.data) {
          this.$emit("refreshListaRestaurantes");
          this.isVisible = true;
          this.colorAlert = 'success';
          this.iconAlert = 'bi bi-archive-fill';
          this.titleAlert = 'Eliminado';
          this.textAlert = 'El restaurante ha sido eliminado exitosamente';
          this.dialog = false;
        }else {
          this.isVisible = true;
          this.colorAlert = 'error';
          this.iconAlert = 'bi bi-x-octagon-fill';
          this.titleAlert = 'Error';
          this.textAlert = 'Hubo un error al eliminar el restaurante';
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
    },
    getColor(puntaje) {
      if (puntaje > 3) return "red";
      else if (puntaje > 2) return "orange";
      else return "green";
    },
    async validateFields () {
      const { valid } = await this.$refs.form.validate()

      if (valid) return true
      else return false
    },
    redirectMetdosRestaurante(id) {
      this.$router.push(`/restaurante/metodos/${id}`);
    },
  },
};
</script>
