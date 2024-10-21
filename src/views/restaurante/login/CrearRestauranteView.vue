<template>
  <!-- v-container sin margen ni padding, y con fluid para ocupar todo el ancho -->
  <v-container class="pa-0 ma-0 fill-height" fluid>
    <v-row class="no-gutters fill-height">
      <!-- Columna 1 con fondo rojo claro, ocupando el 100% del espacio horizontal -->
      <v-col class="pa-0 fill-height d-flex" cols="4">
        <v-sheet
          class="pa-0 fill-height align-content-lg-center"
          color="transparent"
        >
          <v-img
            class="mx-auto my-6"
            max-width="80"
            src="@/assets/logosuper.svg"
          >
          </v-img>
          <v-form fast-fail  ref="form">
            <div class="ConLogin">
              <v-card
                class="mx-auto pa-10 pb-2"
                elevation="2"
                max-width="400"
                rounded="md"
              >
                <div class="orange--text text-subtitle-1 text-medium-emphasis">
                  <strong class="text-red-lighten-1">Nombre del restaurante</strong>
                </div>

                <v-text-field
                  v-model="nombre"
                  :rules="[rules.required]"
                  density="compact"
                  placeholder="Restaurante"
                  hint="Ingrese el nombre del restaurante"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  required
                  color="success"
                ></v-text-field>

                <div class="orange--text text-subtitle-1 text-medium-emphasis">
                  <strong class="text-red-lighten-1">Correo del restaurante</strong>
                </div>

                <v-text-field
                  v-model="correo"
                  density="compact"
                  placeholder="restaurante@restaurante.com"
                  hint="Ingrese el correo del restaurante"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  :rules="[rules.required, rules.email]"
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
                  placeholder="ingresa tu nueva contraseña"
                  prepend-inner-icon="mdi-lock-outline"
                  hint="Ingrese su contraseña"
                  variant="outlined"
                  @click:append-inner="visible = !visible"
                  color="success"
                  :rules="[rules.required]"
                ></v-text-field>

                <div
                  class="orange--text text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
                >
                  <strong class="text-red-lighten-1">Confirmar contraseña</strong>
                </div>

                <v-text-field
                  v-model="passwordConfirm"
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="visible ? 'text' : 'password'"
                  density="compact"
                  placeholder="Repite tu nueva contraseña"
                  hint="Confirme su contraseña"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  @click:append-inner="visible = !visible"
                  color="success"
                  :rules="[rules.required]"
                ></v-text-field>

                <v-btn
                  class="mb-8"
                  color="error"
                  size="large"
                  variant="tonal"
                  block
                  @click="onSubmit"
                >
                  <strong class="text-red-lighten-1">Crear Cuenta</strong>
                </v-btn>

                <v-card-text class="text-center">
                  <v-btn
                  class="mb-1"
                  value=""
                  to="/restaurante/login"
                  variant="tonal"
                  color="warning"
                  block
                >
                  <v-icon icon="mdi-account-outline"  class="mr-2" size="large"></v-icon>
                  <strong class="text-orange-lighten-1">¿Ya tienes cuenta?</strong>
                </v-btn>
                </v-card-text>
              </v-card>
            </div>
          </v-form>

        </v-sheet>
      </v-col>

      <!-- Columna 2 con fondo azul claro, ocupando el 100% del espacio horizontal -->
      <v-col class="pa-0 fill-height d-flex" cols="8">
        <v-sheet class="pa-0 fill-height caja3"> </v-sheet>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="bi bi-check-square-fill"
        color="success"
        text="El restaurante ha sido creado exitosamente"
        title="Mensaje"
      >
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: "CrearRestauranteView",
  data: () => ({
    visible: false,
    correo: "",
    nombre: "",
    password: "",
    passwordConfirm: "",
    dialog: false,
    rules: {
      required: (value) => {
        return !!value || "Este campo es requerido";
      },
      email: (value) => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value || ""
        ) || "Por favor ingresa un correo valido";
      },
    },
  }),
  methods: {
    async onSubmit() {
      const valid = await this.validateFields()
      if (valid) {
        if (this.password === this.passwordConfirm) {
          console.log(this.password);
          console.log(this.passwordConfirm);
          const json = {
            "nombre": this.nombre,
            "correo": this.correo,
            "password": this.password,
          };
          try {
            const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesLoginMethods/api/crear/`, json);
            const data = response.data;
            console.log(data);
            this.dialog = true;
            setTimeout(() => {
              this.$router.push("/restaurante/login");
            }, 3000);
          } catch (error) {
            console.log(error);
          }
        }else{
          console.log("Las contraseñas no coinciden");
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
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.fill-height {
  height: 100vh; /* 100% de la altura del viewport */
  width: 100vw; /* 100% del ancho del viewport */
}
.caja3 {
  background-image: url(@/assets/compras.jpg);
  background-size: 70%; /* O puedes cambiarlo a contain según lo que desees */
  background-position: center;
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  height: 100%; /* Asegúrate de que ocupe toda la altura disponible */
}
</style>
