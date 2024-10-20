<template>
    <v-container class="pa-0 ma-0 fill-height" fluid>
      <v-row class="no-gutters fill-height">
        <v-col class="pa-0 fill-height d-flex" cols="4">
          <v-sheet class="pa-0 fill-height" color="transparent">
            <div class="ConLogin">
              <v-card
                class="mx-auto pa-10 pb-2"
                elevation="2"
                max-width="400"
                rounded="md"
              >
                <v-img
                  class="mx-auto my-6"
                  max-width="80"
                  src="../assets/logosuper.svg"
                ></v-img>
  
                <div class="orange--text text-subtitle-1 text-medium-emphasis">
                  <strong class="text-amber-darken-3">Correo</strong> 
                </div>
  
                <v-text-field
                  density="compact"
                  placeholder="Ingresa tu correo"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                ></v-text-field>
  
                <div class="orange--text text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                  <strong class="text-amber-darken-3">Contraseña</strong>
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
                  color="orange"
                  size="large"
                  variant="tonal"
                  block
                  @click="redirectToAccountUser"
                >
                  <strong class="text-amber-darken-3">Iniciar Sesion</strong> 
                </v-btn>
  
                <v-card-text class="text-center">
                  <span
                    class="text-blue text-decoration-none"
                    @click="redirectToLoginUser"
                    style="cursor: pointer;"
                  >
                    <strong class="text-amber-darken-3">iniciar como usuario</strong>
                  </span>
                </v-card-text>
              </v-card>
            </div>
          </v-sheet>
        </v-col>
  
        <v-col class="pa-0 fill-height d-flex" cols="8">
          <v-sheet class="pa-0 fill-height caja4">
          
          </v-sheet>
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
  
  <style>
  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  .fill-height {
    height: 100vh; /* 100% de la altura del viewport */
    width: 100vw;  /* 100% del ancho del viewport */
  }
  .ConLogin {
    margin-top: 5%;
  }
  .caja4{
   
    background-size: cover;
    background-position: center;
  }
  </style>
  