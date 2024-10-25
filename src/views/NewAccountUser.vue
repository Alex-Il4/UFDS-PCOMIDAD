<template>
  <!-- v-container sin margen ni padding, y con fluid para ocupar todo el ancho -->
  <v-container class="pa-0 ma-0 fill-height" fluid>
    <v-row class="no-gutters fill-height">
      <!-- Columna 1 ocupando 4/12 partes del espacio horizontal -->
      <v-col class="pa-0 fill-height d-flex  align-center" cols="4" xs="12" sm="12" md="4" lg="4" xl="4" xxl="4">
        <v-sheet class="pa-0 fill-height" color="transparent">
          <v-card
            class="mx-auto pa-10 pb-2 fill-height d-flex flex-column justify-space-between"
            elevation="1"
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

            <v-btn class="mb-8" color="orange" size="large" variant="tonal" block>
              <strong class="text-amber-darken-3">Crear Cuenta</strong>
            </v-btn>

            <v-card-text class="text-center">
              <a
                class="text-blue text-decoration-none"
                @click="redirectToLogin"
                style="cursor: pointer;"
                rel="noopener noreferrer"
                target="_blank"
              >
                <strong class="text-amber-darken-3">Ya tienes cuenta?</strong>
              </a>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>

      <!-- Columna 2 ocupando 8/12 partes del espacio horizontal -->
      <v-col class="pa-2 fill-height d-flex hide-on-sm-xs-md" cols="8" md="6" lg="6" xl="8" xxl="8">
        <v-sheet class="pa-0 fill-height caja3"></v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NewAccountUser',
  data() {
    return {
      visible: false,// Define la propiedad visible en el data
      nombre: "",
      correo: "",
      apellido: "",
      password: ""
    };
  },
  methods: {
    redirectToLogin() {
      this.$router.push('/'); // Cambia la ruta a '/'
    },


     //con este metodo se creara el usuario en la db
     async crearUsuario() {
      try {
        const response = await fetch('http://127.0.0.1:8000/loginMethods/api/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: this.nombre,
            correo: this.correo,
            apellido: this.apellido,
            password: this.password
          })
        });

        const data = await response.json();
        if (response.ok) {
          alert('Usuario creado exitosamente');
          this.redirectToLogin(); // Redirige a login si es exitoso
        } else {
          alert(`Error: ${data.message || 'No se pudo crear el usuario'}`);
        }
      } catch (error) {
        console.error(error);
        alert('Hubo un problema al crear el usuario');
      }
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
  height: 100vh; /* 100% de la altura del viewport */
  width: 100vw;  /* 100% del ancho del viewport */
}

.caja3 {
  background-image: url(../assets/delivery2.jpg);
  background-size: 85%; /* O puedes cambiarlo a contain según lo que desees */
  background-position: center;
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  
}

@media (max-width: 950px) { /* xs and sm breakpoints */
  .hide-on-sm-xs-md {
    display: none !important;
  }
}
</style>
