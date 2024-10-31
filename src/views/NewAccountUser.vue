<template>
  <!-- v-container sin margen ni padding, y con fluid para ocupar todo el ancho -->
  <v-container class="pa-0 ma-0 fill-height" fluid>
    <v-row class="no-gutters fill-height">
      <!-- Columna 1 ocupando 4/12 partes del espacio horizontal -->
      <v-col class="pa-0 fill-height d-flex  align-center" cols="4" xs="12" sm="12" md="4" lg="4" xl="4" xxl="4">
        <v-sheet class="pa-0 fill-height" color="transparent">
          <v-card class="mx-auto pa-10 pb-2 fill-height" elevation="1" max-width="400" rounded="md">
            <v-form ref="form" fast-fail>
              <v-icon icon="bi bi-person-bounding-box" size="70" color="orange"
                class="d-flex mx-auto my-6 align-content-center"></v-icon>

              <div class="orange--text text-subtitle-1 text-medium-emphasis">
                <strong class="text-amber-darken-3">Nombre</strong>
              </div>

              <v-text-field v-model="nombre" :rules="[rules.required]" density="compact" placeholder="Nombre" prepend-inner-icon="mdi-account-outline"
                variant="outlined"></v-text-field>

              <div class="orange--text text-subtitle-1 text-medium-emphasis">
                  <strong class="text-amber-darken-3">Apellido</strong>
              </div>
  
              <v-text-field 
                v-model="apellido"
                :rules="[rules.required]"
                density="compact"
                placeholder="Apellido"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
              ></v-text-field>
              <div class="orange--text text-subtitle-1 text-medium-emphasis">
                <strong class="text-amber-darken-3">Correo electrónico</strong>
              </div>

              <v-text-field v-model="correo" :rules="[rules.required, rules.email]" density="compact" placeholder="ejemplo@ejemplo.com" prepend-inner-icon="mdi-email-outline"
                variant="outlined"></v-text-field>

              <div class="orange--text text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                <strong class="text-amber-darken-3">Nueva contraseña</strong>
              </div>

              <v-text-field  v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'" density="compact" placeholder="ingresa tu nueva contraseña"
                prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visible = !visible" :rules="[rules.required]"
              ></v-text-field>

              <div class="orange--text text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                <strong class="text-amber-darken-3">Confirmar contraseña</strong>
              </div>

              <v-text-field v-model="validatePassword" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'" density="compact" placeholder="Repite tu nueva contraseña"
                prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visible = !visible"
                :rules="[rules.required, rules.isSamePassword]"
              ></v-text-field>

              <v-btn class="mb-8" color="orange" size="large" variant="tonal" block @click="onsubmit">
                <strong class="text-amber-darken-3">Crear Cuenta</strong>
              </v-btn>

              <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" @click="redirectToLogin" style="cursor: pointer;"
                  rel="noopener noreferrer" target="_blank">
                  <strong class="text-amber-darken-3">Ya tienes cuenta?</strong>
                </a>
              </v-card-text>
            </v-form>
          </v-card>
        </v-sheet>
      </v-col>

      <!-- Columna 2 ocupando 8/12 partes del espacio horizontal -->
      <v-col class="pa-2 fill-height d-flex hide-on-sm-xs-md" cols="8" md="6" lg="6" xl="8" xxl="8">
        <v-sheet class="pa-0 fill-height caja3"></v-sheet>
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
  name: 'NewAccountUser',
  data: () => ({
    visible: false,
    apellido: "",
    correo: "",
    password: "",
    validatePassword: "",
    nombre: "",
    colorAlert: '',
    iconAlert: '',
    titleAlert: '',
    textAlert: '',
    isVisible: false,
  }),
  methods: {
    redirectToLogin() {
      this.$router.push('/');
    },
    async onsubmit() {
      const valid = this.validateFields()
      if (valid) {
        const json = {
          "nombre": this.nombre,
          "correo": this.correo,
          "apellido": this.apellido,
          "password": this.password,
        };
        try {
          const response = await axios.post(`${process.env.VUE_APP_API_URL}/loginMethods/api/create/`, json);
          if (response.status === 200) {
            const respuesta = response.data;
            console.log(JSON.stringify(respuesta, null, 2));
            if(respuesta.data){
              console.log(JSON.stringify(respuesta, null, 2));
              this.isVisible = true;
              this.colorAlert = 'success';
              this.iconAlert = 'mdi-check-circle-outline';
              this.titleAlert = 'Login exitoso';
              this.textAlert = 'Se ha realizado el login con exito';
              this.dialog = false;
              console.log(JSON.stringify(respuesta, null, 2));
              setTimeout(() => {
                this.$router.push("/");
              }, 2000);
            }else{
              this.isVisible = true;
              this.colorAlert = 'error';
              this.iconAlert = 'mdi-alert-circle-outline';
              this.titleAlert = 'Error';
              this.textAlert = 'Hubo un error al iniciar sesión';
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
      }
    },

    async validateFields () {
      const { valid } = await this.$refs.form.validate()

      if (valid) return true
      else return false
    },
  },
  computed: {
    rules() {
      return {
        required: (value) => {
          return !!value || "Este campo es requerido";
        },
        email: (value) => {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value || ""
          ) || "Por favor ingresa un correo válido";
        },
        minLength: (value) => {
          const min = 8;
          return value.length >= min || `El password debe tener al menos ${min} caracteres`;
        },
        isSamePassword: (value) => {
          return value === this.password || "Las contraseñas no coinciden";
        },
      };
    },
  },
}
</script>

<style scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.fill-height {
  height: 100vh;
  /* 100% de la altura del viewport */
  width: 100vw;
  /* 100% del ancho del viewport */
}

.caja3 {
  background-image: url(../assets/delivery2.jpg);
  background-size: 85%;
  /* O puedes cambiarlo a contain según lo que desees */
  background-position: center;
  background-repeat: no-repeat;
  /* Evita que la imagen se repita */

}

@media (max-width: 950px) {

  /* xs and sm breakpoints */
  .hide-on-sm-xs-md {
    display: none !important;
  }
}
</style>
