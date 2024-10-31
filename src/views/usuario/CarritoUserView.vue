<template>
    <v-responsive>
      <v-app :theme="theme">
        <menu-component
          :current-title="currentTitle"
          :theme="theme"
          @toggle-theme="onClick"
          @edit-profile="onEditProfile"
        />
        <v-main>
          <v-container>
            <component :is="currentComponent" :items="ListaRestaurante" v-if="value === 0"
              :title-table="'Mis Restaurantes'" :color="color" :icon="'bi bi-building-check'"
              @refreshListaRestaurantes="GetRestaurantes" />
            <component :is="currentComponent" v-if="value === 2"></component>
            <v-bottom-navigation v-model="value" :bg-color="color" mode="shift">
              <v-btn @click="value = 0">
                <v-icon icon="bi bi-credit-card-2-front-fill"></v-icon>
                <span>Mis Restaurantes</span>
              </v-btn>
              <v-btn @click="value = 2">
                <v-icon icon="bi bi-building-add"></v-icon>
                <span>Crear Restaurantes</span>
              </v-btn>
            </v-bottom-navigation>
          </v-container>
        </v-main>
      </v-app>
    </v-responsive>
  </template>
 
 
<script>
import MenuComponent from '@/components/restauranteComponents/MenuComponent/MenuRestauranteComponent.vue'

export default {
    name: "CarritoUserView",
    components: {
        MenuComponent,
    },

    data: () => ({
       
        theme: 'light'
    }),

    methods: {
        onClick() {
             this.theme = this.theme === 'light' ? 'dark' : 'light';
        }

    },

    computed: {
        color() {
      switch (this.value) {
        case 0: return 'red-lighten-1'
        case 2: return 'orange-darken-2'
        case 3: return 'teal'
        default: return 'blue-grey'
      }
    }

    }



}

</script>