<template>
  <v-container class="pa-0 ma-0 fill-height" fluid>
    <v-row class="no-gutters fill-height">
      <v-col class=" fill-height d-flex" cols="4">
        <v-sheet class=" fill-height d-flex align-center justify-center" color="transparent">
          <v-card
            class="mx-auto pa-10 pb-2"
            elevation="2"
            max-width="400"
            rounded="md"
          >
            <!-- Contenido del v-card -->
            <v-img
              class="mx-auto my-6"
              max-width="80"
              src="@/assets/logosuper.svg"
            ></v-img>
            <div class="text-center">
              <p class="text-red-lighten-1 font-weight-bold">
                Inicia sesion a tu dashboard!
              </p>
            </div>
            <v-form fast-fail  ref="form" >
              <div class="text-subtitle-1 text-medium-emphasis">
                <strong class="text-red-lighten-1">Correo</strong>
              </div>

              <v-text-field
                v-model="correo"
                density="compact"
                placeholder="Ingresa tu correo"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                hint="Ingrese su correo para acceder al dashboard"
                :rules="[rules.required, rules.email]"
                required
                color="success"
              ></v-text-field>

              <div
                class="orange--text text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
              >
                <strong class="text-red-lighten-1">Contraseña</strong>
              </div>
              <v-text-field
                v-model="password"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="ingresa tu contraseña"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                hint="Ingrese su contraseña para acceder al dashboard"
                @click:append-inner="visible = !visible"
                :rules="[rules.required]"
                required
                color="success"
              ></v-text-field>

              <v-btn
                class="mb-8 mt-8"
                color="error"
                size="large"
                variant="tonal"
                block
                @click="onSubmit"
              >
                <v-icon icon="bi bi-door-open-fill" class="mr-2" size="large"></v-icon>
                <strong class="text-red-lighten-1">Iniciar Sesión</strong>
              </v-btn>
            </v-form>

            <v-card-text class="text-center">
              <v-btn
                class="mb-3"
                value=""
                to="/restaurante/crear"
                variant="tonal"
                color="error"
                block
              >
                <v-icon icon="bi bi-shop" class="mr-2" size="large"></v-icon>
                <strong class="text-red-lighten-1">¿Cuenta de restaurante?</strong>
              </v-btn>
              <v-btn
                class="mb-1"
                value=""
                to="/"
                variant="tonal"
                color="warning"
                block
              >
                <v-icon icon="mdi-account-outline"  class="mr-2" size="large"></v-icon>
                <strong class="text-orange-lighten-1">¿Eres usuario?</strong>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col class="pa-0 fill-height d-flex hide-on-sm-xs-md" cols="8" md="6" lg="6" >
        <v-sheet class="pa-0 fill-height caja4"></v-sheet>
      </v-col>
    </v-row>
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
</template>

<script>
import axios from 'axios';
export default {
  name: "LoginRestauranteView",
  data: () => ({
    visible: false,
    correo: "",
    password: "",
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
    dialog: false,
    colorAlert: '',
    iconAlert: '',
    titleAlert: '',
    textAlert: '',
    isVisible: false,
  }),
  methods: {
    async onSubmit() {
      const valid = await this.validateFields()
      if (valid) {
        const json = {
          "correo": this.correo,
          "password": this.password,
        };
        try {
          const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesLoginMethods/api/login/`, json);
          if (response.status === 200) {
            const respuesta = response.data.data;

            if(respuesta.isRestaurante){
              console.log(JSON.stringify(respuesta, null, 2));
              this.isVisible = true;
              this.colorAlert = 'success';
              this.iconAlert = 'mdi-check-circle-outline';
              this.titleAlert = 'Login exitoso';
              this.textAlert = 'Se ha realizado el login con exito';
              this.dialog = false;
              localStorage.setItem("access", respuesta.access);
              localStorage.setItem("refresh", respuesta.refresh);
              localStorage.setItem("correoRestaurante", respuesta.correo);
              localStorage.setItem("usuarioRestauranteID", respuesta.restauranteID);
              localStorage.setItem('nombreRestaurante', respuesta.nombre);
              setTimeout(() => {
                this.$router.push("/restaurante/dashboard");
              }, 2000);
            }else{
              this.isVisible = true;
              this.colorAlert = 'error';
              this.iconAlert = 'mdi-alert-circle-outline';
              this.titleAlert = 'Error';
              this.textAlert = 'No eres usuario de restaurante';
              this.dialog = false;
            }
          }else{
            this.isVisible = true;
            this.colorAlert = 'error';
            this.iconAlert = 'mdi-alert-circle-outline';
            this.titleAlert = 'Error';
            this.textAlert = 'Hubo un error acceder al servidor';
            this.dialog = false;
          }
        } catch (error) {
          console.log('Hubo un error al acceder al servidor', error);
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
};
</script>

<style scoped>
html, body, #app  {
  height: 100%;
  margin: 0;
  padding: 0;
}

.fill-height {
  height: 100vh;
  width: 100vw;
}

.caja4 {
  background-image: url(@/assets/res.jpg);
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
@media (max-width: 950px) { /* xs and sm breakpoints */
  .hide-on-sm-xs-md {
    display: none !important;
  }
}
</style>
