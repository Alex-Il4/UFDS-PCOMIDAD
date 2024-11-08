

<template>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" color="">
        <v-list-item prepend-icon="bi bi-person-badge-fill" :title="nombre" nav class="justify-center text-capitalize">
            <template v-slot:append>
                <v-btn
                    icon="bi bi-app"
                    variant="text"
                    @click.stop="rail = !rail"
                ></v-btn>
                <v-btn :prepend-icon="theme === 'light' ? ' mdi-weather-night' : 'mdi-weather-sunny'"  variant="text" @click="onClick"></v-btn>
            </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="bi bi-shop" title="Inicio" value="home" to="/home"></v-list-item>
            <v-list-item prepend-icon="bi bi-file-person-fill" title="Perfil" value="account" to="/cliente/perfil"></v-list-item>
            <v-list-item prepend-icon="bi bi-cart-plus-fill" title="Carrito" value="users" to="/cliente/carrito"></v-list-item>
            <v-list-item prepend-icon="bi bi-door-open-fill" title="Cerrar sesión" value="logout" @click="logout"></v-list-item>
        </v-list>
    </v-navigation-drawer>

</template>

<script>
  export default {
    name: 'SideBarComponent',
    props: {
        theme: {
            type: String,
            required: true
        },
    },
    data: () => ({
      drawer: null,
      nombre: localStorage.getItem("NombreCliente"),
      rail: false,
    }),
    methods: {
      onClick() {
        this.$emit("toggle-theme");
      },
      logout() {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('CorreoCliente');
        localStorage.removeItem('ClienteID');
        localStorage.removeItem('NombreCliente');
        localStorage.clear();
        this.$router.push("/");
      },
      onPerfil() {
        this.$router.push("/perfil");
      },
      //funcion que si esta en modo celular se oculte el sibar
      hideSideBar() {
        this.drawer = false;
      }
    },
  }
</script>