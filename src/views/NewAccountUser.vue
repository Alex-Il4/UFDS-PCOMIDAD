<template>
    <!-- v-container sin margen ni padding, y con fluid para ocupar todo el ancho -->
    <v-container class="pa-0 ma-0 fill-height" fluid>
      <v-row class="no-gutters fill-height">
        <!-- Columna 1 con fondo rojo claro, ocupando el 100% del espacio horizontal -->
        <v-col class="pa-0 fill-height d-flex" cols="4">
          <v-sheet class="pa-0 fill-height" color="transparent">
            <div class="ConLogin">
              <v-card
                class="mx-auto pa-10 pb-2"
                elevation="2"
                max-width="400"
                rounded="md"
              >
                <div class="orange--text text-subtitle-1 text-medium-emphasis">
                    <strong class="text-amber-darken-3">Nuevo usuario</strong> 
                </div>
  
                <v-text-field
                  density="compact"
                  placeholder="usuario"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                ></v-text-field>   
  
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
                    <strong class="text-amber-darken-3">Nueva contraseña</strong>
  
               
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
                
                <div class="orange--text text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    <strong class="text-amber-darken-3">Confirmar contraseña</strong>
  
               
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
                  color="orange"
                  size="large"
                  variant="tonal"
                  block
                >
                <strong class="text-amber-darken-3">Crear Cuenta</strong> 
                </v-btn>
  
                <v-card-text class="text-center">
                  <a
                    class="text-blue text-decoration-none"
                    href="/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                  <strong class="text-amber-darken-3">Ya tienes cuenta?</strong> 
                  </a>
                </v-card-text>
              </v-card>
            </div>
          </v-sheet>
        </v-col>
        
        <!-- Columna 2 con fondo azul claro, ocupando el 100% del espacio horizontal -->
        <v-col class="pa-0 fill-height d-flex" cols="8">
          <v-sheet class="pa-0 fill-height caja3">
           
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'NewAccountUser',
    data() {
      return {
        visible: false // Define la propiedad visible en el data
      };
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
  .caja3 {
  background-image: url(../assets/delivery2.jpg);
  background-size: 70%; /* O puedes cambiarlo a contain según lo que desees */
  background-position: center;
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  height: 100%; /* Asegúrate de que ocupe toda la altura disponible */
}
  </style>
  