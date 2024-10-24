<template>
  <v-responsive>
    <v-app :theme="theme">
      <menu-component :current-title="currentTitle" :theme="theme" @toggle-theme="onClick" />
      <v-main>
        <v-container>
          <component :is="currentComponent" :items="ListaRestaurante" v-if="value === 0"
            :title-table="'Mis Restaurantes'" :color="color" :icon="'bi bi-building-check'"
            @refreshListaRestaurantes="GetRestaurantes" />
          <component :is="currentComponent" v-if="value === 1"></component>
          <component :is="currentComponent" v-if="value === 2"></component>
          <component :is="currentComponent" v-if="value === 3"></component>
          <v-bottom-navigation v-model="value" :bg-color="color" mode="shift">
            <v-btn @click="value = 0">
              <v-icon icon="bi bi-card-list"></v-icon>
              <span>Mis Restaurantes</span>
            </v-btn>
            <v-btn @click="value = 1">
              <v-icon icon="bi bi-bookmarks-fill"></v-icon>
              <span>Todos Mis pedidos</span>
            </v-btn>
            <v-btn @click="value = 2">
              <v-icon icon="bi bi-building-add"></v-icon>
              <span>Crear Restaurantes</span>
            </v-btn>
            <v-btn @click="value = 3">
              <v-icon>mdi-image</v-icon>
              <span>Image</span>
            </v-btn>
          </v-bottom-navigation>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script>
import ListaRestauranteComponent from '@/components/restauranteComponents/ListaRestauranteComponent.vue'
import CrearRestauranteComponent from '@/components/restauranteComponents/CrearRestauranteComponent.vue'
import MenuComponent from '@/components/restauranteComponents/MenuComponent/MenuRestauranteComponent.vue'
import axios from 'axios';
export default {
  name: "DashboardMain",
  components: {
    ListaRestauranteComponent,
    CrearRestauranteComponent,
    MenuComponent,
  },
  data: () => ({
    value: 0,
    NombreRestaurante: localStorage.getItem('nombreRestaurante'),
    correoRestaurante: localStorage.getItem('correoRestaurante'),
    ListaRestaurante: [],
    theme: 'light'
  }),
  methods: {
    logout() {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('correoRestaurante');
      localStorage.removeItem('usuarioRestauranteID');
      localStorage.removeItem('nombreRestaurante');
      this.$router.push("/restaurante/login");
    },
    async GetRestaurantes() {
      const access = localStorage.getItem('access');
      const headers = {
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'application/json',
      };
      const json = {
        "usuarioRestauranteID": localStorage.getItem('usuarioRestauranteID'),
      };
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/restaurantesMethods/api/listar/restaurantes/usuarioRestaurante/`, json, { headers });
        const respuesta = response.data.data;
        console.log(respuesta);
        if (respuesta) {
          const tabla = respuesta.map(item => {
            return {
              id: item.id,
              nombre: item.nombre,
              puntaje: item.puntaje,
              telefono: item.telefono,
              tipoCocina: item.tipoCocina,
              descripcion: item.descripcion,
              ubicacion: item.ubicacion,
            }
          });
          console.log(respuesta);
          this.ListaRestaurante = tabla
        } else {
          console.error(respuesta.error);
        }
      } catch (error) {
        console.log(error);
      }
    },
    onClick() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    }
  },
  async created() {
    await this.GetRestaurantes();
  },
  watch: {
    value() {
      if (this.value === 0) {
        this.GetRestaurantes();
      }
    }
  },
  computed: {
    color() {
      switch (this.value) {
        case 0: return 'red-lighten-1'
        case 1: return 'teal'
        case 2: return 'orange-darken-2'
        case 3: return 'indigo'
        default: return 'blue-grey'
      }
    },
    currentTitle() {
      switch (this.value) {
        case 0: return 'Mis Restaurantes'
        case 1: return 'Todos Mis Pedidos'
        case 2: return 'Crear Restaurantes'
        case 3: return 'Imagen'
        default: return 'Dashboard'
      }
    },
    currentComponent() {
      switch (this.value) {
        case 0: return 'ListaRestauranteComponent'
        case 1: return 'PedidosComponent'
        case 2: return 'CrearRestauranteComponent'
        case 3: return 'ImageComponent'
        default: return 'ListaRestauranteComponent'
      }
    }
  },
}
</script>



<style scoped></style>
