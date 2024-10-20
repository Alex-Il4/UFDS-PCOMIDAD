<template>
    <v-container class="pa-0 ma-0 fill-height" fluid>
      <v-row class="no-gutters fill-height">
        <v-col class="pa-0 fill-height d-flex justify-center align-center" cols="4">
          <v-sheet class="pa-0 fill-height" color="transparent">
            <v-card
              class="mx-auto pa-10 pb-2 fill-height"
              elevation="2"
              max-width="400"
              rounded="md"
            >
              <!-- Contenido del v-card -->
              <v-img
                class="mx-auto my-6"
                max-width="80"
                src="../assets/logosuper.svg"
              ></v-img>
  
              <div class="orange--text text-subtitle-1 text-medium-emphasis">
                <strong class="text-red-accent-3 ">Correo</strong>
              </div>
  
              <v-text-field
                density="compact"
                placeholder="Ingresa tu correo"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
              ></v-text-field>
  
              <div class="orange--text text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                <strong class="text-red-accent-3">Contraseña</strong>
              </div>
  
              <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="ingresa tu contraseña"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
              ></v-text-field>
  
              <v-card class="mb-12" color="surface-variant" variant="tonal">
              </v-card>
  
              <v-btn
                class="mb-8"
                color="red"
                size="large"
                variant="tonal"
                block
                @click="redirectToAccountUser"
              >
                <strong class="text-red-accent-3">Iniciar Sesión</strong>
              </v-btn>
  
              <v-card-text class="text-center">
                <span
                  class="text-blue text-decoration-none"
                  @click="redirectToCreateRestaurant"
                  style="cursor: pointer;"
                >
                  <strong class="text-red-accent-3">Crear restaurante</strong>
                </span>
              </v-card-text>
  
              <v-card-text class="text-center">
                <span
                  class="text-blue text-decoration-none"
                  @click="redirectToLoginUser"
                  style="cursor: pointer;"
                >
                  <strong class="text-red-accent-3">Iniciar como usuario</strong>
                </span>
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
  
        <v-col class="pa-0 fill-height d-flex" cols="8">
          <v-sheet class="pa-0 fill-height caja4"></v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  
  <script>
  export default {
    name: 'LoginUser',
    data() {
      return {
        visible: false // Define la propiedad visible en el data
      };
    },
    methods: {
      redirectToLoginUser() {
        this.$router.push('/'); // Cambia la ruta a '/AccountUser'
      },
      redirectToCreateRestaurant() {
        this.$router.push('/'); // Cambia la ruta a '/AccountUser'
      }
    }
  }
  </script>
  
  <style scoped>
 html, body, #app {
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

.caja4 {
    background-image: url(../assets/res.jpg);
    background-size: 100vh;
    background-position: center;
    background-repeat: no-repeat;
}

  </style>
  