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
                density="compact"
                placeholder="Restaurante"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
              ></v-text-field>

              <div class="orange--text text-subtitle-1 text-medium-emphasis">
                <strong class="text-red-lighten-1">Correo del restaurante</strong>
              </div>

              <v-text-field
                density="compact"
                placeholder="restaurante@restaurante.com"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
              ></v-text-field>

              <div
                class="orange--text text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
              >
                <strong class="text-red-lighten-1">Contraseña</strong>
              </div>

              <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="ingresa tu nueva contraseña"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
              ></v-text-field>

              <div
                class="orange--text text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
              >
                <strong class="text-red-lighten-1">Confirmar contraseña</strong>
              </div>

              <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Repite tu nueva contraseña"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
              ></v-text-field>

              <v-btn
                class="mb-8"
                color="error"
                size="large"
                variant="tonal"
                block
              >
                <strong class="text-red-lighten-1">Crear Cuenta</strong>
              </v-btn>

              <v-card-text class="text-center">
                <a
                  class="text-blue text-decoration-none"
                  @click="redirectToLogin"
                  style="cursor: pointer"
                  rel="noopener noreferrer"
                >
                  <strong class="text-red-lighten-1">Ya tienes cuenta?</strong>
                </a>
              </v-card-text>
            </v-card>
          </div>
        </v-sheet>
      </v-col>

      <!-- Columna 2 con fondo azul claro, ocupando el 100% del espacio horizontal -->
      <v-col class="pa-0 fill-height d-flex" cols="8">
        <v-sheet class="pa-0 fill-height caja3"> </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CrearRestauranteView",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    redirectToLogin() {
      this.$router.push("/loginRestaurante");
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
