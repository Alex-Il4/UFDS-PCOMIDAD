<template>
    <v-responsive>
      <v-app :theme="theme">
        <menu-component :current-title="currentTitle" :theme="theme" @toggle-theme="onClick" @edit-profile="onEditProfile" />
        <v-main>
          <v-container>
            <v-row no-gutters>
              <v-col cols="12" v-for="(item, index) in restaurantList" :key="index">
                <v-sheet>
                  <v-card :disabled="loading" :loading="loading" class="mx-0 my-2">
                    <template v-slot:loader="{ isActive }">
                      <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
                    </template>
  
                    <v-row no-gutters flex-column>
                      <!-- Columna de la imagen (3 columnas) -->
                      <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
                        <v-img
                          height="300"
                          :src="item.image"
                          cover
                        ></v-img>
                      </v-col>
  
                      <!-- Columna de las descripciones (9 columnas) -->
                      <v-col cols="12" xs="12" sm="8" md="8" lg="8" xl="8">
                        <v-card-item>
                          <v-card-title>{{ item.title }}</v-card-title>
                          <v-card-subtitle>
                            <span class="me-1">Local Favorite</span>
                            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                          </v-card-subtitle>
                        </v-card-item>
  
                        <v-card-text>
                          <v-row align="center" class="mx-0">
                            <v-rating
                              :model-value="item.rating"
                              color="amber"
                              density="compact"
                              size="small"
                              half-increments
                              readonly
                            ></v-rating>
                            <div class="text-grey ms-4">{{ item.rating }} (413)</div>
                          </v-row>
  
                          <div class="my-4 text-subtitle-1">
                            $ • Italian, Cafe
                          </div>
  
                          <div>
                            Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.
                          </div>
                        </v-card-text>
  
                        <v-divider class="mx-4 mb-1"></v-divider>
                        <v-card-actions>
                          <v-btn color="deep-purple-lighten-2" text="Comprar" block border @click="reserve"></v-btn>
                        </v-card-actions>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-responsive>
  </template>
  
  <script>
  import MenuComponent from '@/components/restauranteComponents/MenuComponent/MenuRestauranteComponent.vue';
  
  export default {
    name: 'CarritoUserView',
    components: {
      MenuComponent,
    },
  
    data() {
      return {
        theme: 'light',
        loading: false,
        currentTitle: 'Mi Título',
        restaurantList: [
          {
            image: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
            title: 'Café Badilico',
            rating: 5.0,
          },
          {
            image: 'https://content.skyscnr.com/m/2dcd7d0e6f086057/original/GettyImages-186142785.jpg',
            title: 'Tacos al pastor',
            rating: 4.0,
          },
          {
            image: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/52bf/live/5bc2da50-f03a-11ee-93c8-19dcc8295613.jpg.webp',
            title: 'desayuno tradicional',
            rating: 3.5,
          },
        ],
      };
    },
  
    methods: {
      onClick() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
      },
      reserve() {
        console.log('Reserva realizada');
      },
    },
  };
  </script>
  