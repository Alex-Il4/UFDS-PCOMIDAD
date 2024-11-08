<template>
    <v-app-bar class="px-3" :elevation="0">
      <v-app-bar-title>{{ currentTitle }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isDashboard"
        prepend-icon="mdi-arrow-left"
        text="Atras"
        @click="$router.go(-1)"
      >
      </v-btn>
      <v-btn
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        text="Cambiar tema"
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
            <v-list-item @click="$emit('edit-profile')"><v-icon class="mr-2">mdi-account-circle</v-icon>Mi Perfil</v-list-item>
            <v-list-item @click="logout"><v-icon class="mr-2">mdi-logout</v-icon>Salir de la cuenta</v-list-item>
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
      },
      isDashboard: {
        type: Boolean,
        required: true
      },
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
        localStorage.clear();
        this.$router.push("/restaurante/login");
      },
      onPerfil() {
        this.$router.push("/restaurante/perfil");
      }
    }
  };
  </script>