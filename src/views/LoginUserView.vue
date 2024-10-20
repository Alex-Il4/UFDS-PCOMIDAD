<template>
    <!-- v-container sin margen ni padding, y con fluid para ocupar todo el ancho -->
    <v-container class="pa-0 ma-0 fill-height" fluid>
      <v-row class="no-gutters fill-height">
        <!-- Columna 1 con fondo rojo claro, ocupando el 100% del espacio horizontal -->
        <v-col class="pa-0 fill-height d-flex" cols="5">
          <v-sheet class="pa-0 fill-height" color="red lighten-4">
            <div class="ConLogin">
                <v-img
                class="mx-auto my-6"
                max-width="80"
                src="../assets/logosuper.svg"
                ></v-img>

                <v-card
                class="mx-auto pa-10 pb-2"
                elevation="2"
                max-width="400"
             
                rounded="md"
                >
                <div class="text-subtitle-1 text-medium-emphasis">Account</div>

                <v-text-field
                    density="compact"
                    placeholder="Email address"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password

                    <a
                    class="text-caption text-decoration-none text-blue"
                    href="#"
                    rel="noopener noreferrer"
                    target="_blank"
                    >
                    Forgot login password?</a>
                </div>

                <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="compact"
                    placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="visible = !visible"
                ></v-text-field>

                <v-card
                    class="mb-12"
                    color="surface-variant"
                    variant="tonal"
                >

                </v-card>

                <v-btn
                    class="mb-8"
                    color="blue"
                    size="large"
                    variant="tonal"
                    block
                >
                    Log In
                </v-btn>

                <v-card-text class="text-center">
                    <a
                    class="text-blue text-decoration-none"
                    href="#"
                    rel="noopener noreferrer"
                    target="_blank"
                    >
                    Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </v-card-text>
                </v-card>
            </div>

          </v-sheet>
        </v-col>
        
        <!-- Columna 2 con fondo azul claro, ocupando el 100% del espacio horizontal -->
        <v-col class="pa-0 fill-height d-flex" cols="7">
          <v-sheet class="pa-0 fill-height" color="blue lighten-4">
            dede
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'ColoredColumnsExample'
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
  .ConLogin{
   margin-top: 10%;
 
  }
  </style>
  