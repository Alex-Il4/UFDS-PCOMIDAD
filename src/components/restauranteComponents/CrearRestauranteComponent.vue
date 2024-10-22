<template>
    <v-card
      class="mx-auto justify-center ma-12"
      max-width="490"
      prepend-icon="bi bi-building-add"
      title="Crea tu restaurante"
    >
      <v-container>
        <v-form fast-fail  ref="form">
            <v-text-field
            v-model="nombre"
            :rules="[rules.Required, rules.onlyString]"
            color="success"
            label="Nombre del restaurante"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="ubicacion"
            :rules="[rules.Required]"
            color="success"
            label="Ubicación del restaurante"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="descripcion"
            :rules="[rules.Required]"
            color="success"
            label="Descripción del restaurante"
            variant="underlined"
          ></v-text-field>

          <v-text-field
            v-model="telefono"
            :rules="[rules.Required,rules.telefono]"
            color="success"
            label="Telefono"
            placeholder="Ingresa el telefono"
            variant="underlined"
          ></v-text-field>

          <v-text-field
              v-model="puntaje"
              :rules="[rules.Required, rules.onlyNumber, rules.puntajeValido]"
              color="success"
              label="puntaje"
              placeholder="Ingresa el puntaje"
              variant="underlined"
          ></v-text-field>

          <v-text-field
              v-model="tipoCocina"
              :rules="[rules.Required, rules.onlyString]"
              color="success"
              label="tipo de cocina"
              placeholder="Ingresa el telefono"
              variant="underlined"
          ></v-text-field>
          <v-file-input
              :rules="[rules.imagen]"
              accept="image/png, image/jpeg, image/bmp"
              label="Imagen del restaurante"
              placeholder="Imagen del restaurante"
              prepend-icon="mdi-camera"
              color="success"
          ></v-file-input>
        </v-form>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" @click="onSubmit">
          <v-icon class="mr-2" icon="bi bi-building-check" end></v-icon>

          Registrar restaurante
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
        prepend-icon="mdi-update"
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
    name: 'CrearRestauranteComponent',
    data: () => ({
        nombre: '',
        ubicacion: '',
        descripcion: '',
        telefono: '',
        puntaje: '',
        tipoCocina: '',
        imagen: '',
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
            onlyString: (value) =>{
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
            const usuarioRestauranteID = localStorage.getItem("usuarioRestauranteID")
            if (valid) {
                const formData = new FormData();
                formData.append("usuarioRestaurante",usuarioRestauranteID );
                formData.append("nombre", this.nombre);
                formData.append("ubicacion", this.ubicacion);
                formData.append("descripcion", this.descripcion);
                formData.append("telefono", this.telefono);
                formData.append("puntaje", this.puntaje);
                formData.append("tipoCocina", this.tipoCocina);
                if (this.imagen) {
                    formData.append("imagen", this.imagen, this.imagen.name);
                }
                try {
                    const headers = {
                        'Authorization': `Bearer ${token_access}`,
                        'Content-Type': 'multipart/form-data',
                    }
                    const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/crear/`, formData, {headers});
                    const respuesta = response.data;
                    if (respuesta.data) {
                        this.isVisible = true;
                        this.colorAlert = 'success';
                        this.iconAlert = 'mdi-check-circle-outline';
                        this.titleAlert = 'Creado';
                        this.textAlert = 'El restaurante ha sido creado exitosamente';
                        if (this.$refs.form) {
                            this.$refs.form.reset();
                        }
                        this.$router.push("/restaurante/dashboard");
                    }else{
                        this.isVisible = true;
                        this.colorAlert = 'error';
                        this.iconAlert = 'mdi-alert-circle-outline';
                        this.titleAlert = 'Error';
                        this.textAlert = 'Hubo un error al crear el restaurante';
                    }
                } catch (error) {
                    console.log(error);
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

<style scoped></style>