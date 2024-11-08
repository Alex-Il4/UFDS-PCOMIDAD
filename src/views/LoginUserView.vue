<template>
  <v-container class="pa-0 ma-0 fill-height" fluid>
    <v-row class="no-gutters fill-height">
      <!-- Primer v-col que siempre se mostrará -->
      <v-col class="pa-0 fill-height d-flex justify-center align-center" xs="12" sm="12" md="4" lg="4" xl="4" xxl="4">
        <v-sheet class="pa-0 fill-height" color="transparent">
          <v-card class="mx-auto pa-10 pb-2 fill-height" elevation="1" max-width="400" rounded="md">
            <v-form ref="form" fast-fail>
              <v-img class="mx-auto my-6" max-width="80" src="../assets/logosuper.svg"></v-img>

              <div class="orange--text text-subtitle-1 text-medium-emphasis">
                <strong class="text-amber-darken-3">Correo</strong>
              </div>

              <v-text-field
                v-model="correo"
                :rules="[rules.required, rules.email]"
                density="compact"
                placeholder="Ingresa tu correo"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                color="warning"
              ></v-text-field>

              <div class="orange--text text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                <strong class="text-amber-darken-3">Contraseña</strong>
              </div>

              <v-text-field
                v-model="password"
                :rules="[rules.required]"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="ingresa tu contraseña"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
                color="warning"
              ></v-text-field>

              <v-btn
                class="mb-8"
                color="orange"
                size="large"
                variant="tonal"
                block
                @click="onsubmit">
                <strong class="text-amber-darken-3">Iniciar Sesión</strong>
              </v-btn>

              <v-card-text class="text-center">
                <span class="text-blue text-decoration-none" style="cursor: pointer;" @click="this.$router.push('/crear-cuenta')">
                  <strong class="text-amber-darken-3">No tienes cuenta?</strong>
                </span>
              </v-card-text>

              <v-card-text class="text-center">
                <span class="text-blue text-decoration-none" @click="redirectToRestaurantLogin"
                  style="cursor: pointer;">
                  <strong class="text-amber-darken-3">Iniciar como restaurante</strong>
                </span>
              </v-card-text>
            </v-form>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col class="pa-0 fill-height d-flex hide-on-sm-xs-md" md="6" lg="6" xl="8" xxl="8">
        <v-sheet class="pa-0 fill-height caja2"></v-sheet>
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
  name: 'LoginUser',
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
    colorAlert: '',
    iconAlert: '',
    titleAlert: '',
    textAlert: '',
    isVisible: false,
  }),
  methods: {
    async onsubmit() {
      const valid = this.validateFields()
      if (valid) {
        const json = {
          "correo": this.correo,
          "password": this.password,
        };
        try {
          const response = await axios.post(`${process.env.VUE_APP_API_URL}/loginMethods/api/login/`, json);
          if (response.status === 200) {
            const respuesta = response.data.data;

            if(respuesta.isCliente){
              console.log(JSON.stringify(respuesta, null, 2));
              this.isVisible = true;
              this.colorAlert = 'success';
              this.iconAlert = 'mdi-check-circle-outline';
              this.titleAlert = 'Login exitoso';
              this.textAlert = 'Se ha realizado el login con exito';
              this.dialog = false;
              localStorage.setItem("access", respuesta.access);
              localStorage.setItem("refresh", respuesta.refresh);
              localStorage.setItem("CorreoCliente", respuesta.correo);
              localStorage.setItem("ClienteID", respuesta.usuarioID);
              localStorage.setItem('NombreCliente', respuesta.nombre);
              setTimeout(() => {
                this.$router.push("/home");
              }, 2000);
            }else{
              this.isVisible = true;
              this.colorAlert = 'error';
              this.iconAlert = 'mdi-alert-circle-outline';
              this.titleAlert = 'Error';
              this.textAlert = 'No eres un cliente';
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
    redirectToRestaurantLogin() {
      this.$router.push('/restaurante/login');
    },

    async validateFields () {
      const { valid } = await this.$refs.form.validate()

      if (valid) return true
      else return false
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
  width: 100vw;
}

.v-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-card {
  max-height: 100%;
  width: 100%;
}

.caja2 {
  background-image: url(../assets/deliv.jpg);
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}

@media (max-width: 950px) {

  /* xs and sm breakpoints */
  .hide-on-sm-xs-md {
    display: none !important;
  }
}
</style>
