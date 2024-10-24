<template>
    <v-app-bar class="px-3" :elevation="0">
      <v-app-bar-title>{{ currentTitle }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        text="Toggle Theme"
        slim
        @click="onClick"
      ></v-btn>

      <template v-slot:append>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-list-item
              prepend-avatar="https://img.freepik.com/vector-premium/icono-avatar-camarero-estilo-color-gris-metalico-servicio-cafeteria-restaurante_755164-15887.jpg"
              :subtitle="correoRestaurante"
              :title="nombreRestaurante"
              v-bind="props"
            ></v-list-item>
          </template>
          <v-list>
            <v-list-item @click="logout"><v-icon>mdi-logout</v-icon>Salir de la cuenta</v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
  </template>

  <script>
  export default {
    name: "MenuComponent",
    props: {
      currentTitle: {
        type: String,
        required: true
      },
      theme: {
        type: String,
        required: true
      }
    },
    data: () => ({
        nombreRestaurante: localStorage.getItem('nombreRestaurante'),
        correoRestaurante: localStorage.getItem('correoRestaurante'),
    }),
    methods: {
      onClick() {
        this.$emit("toggle-theme");
      },
      logout() {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('correoRestaurante');
        localStorage.removeItem('usuarioRestauranteID');
        localStorage.removeItem('nombreRestaurante');
        this.$router.push("/restaurante/login");
      }
    }
  };
  </script>
  