<template>
  <v-container>
    <h2 class="text-h4 font-weight-bold mb-4">Carrito de Compras</h2>
    <v-row>
      <v-col v-for="(item, index) in carrito" :key="index" cols="12" md="4" lg="3">
        <v-card :disabled="loading" :loading="loading" class="my-3 elevation-10" max-width="355">
          <template v-slot:loader="{ isActive }">
            <v-progress-linear
              :active="isActive"
              color="deep-purple"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>
 
          <v-img :src="item.imagen" height="200" cover></v-img>
 
          <v-card-item class="px-4 pt-3">
            <v-card-title class="text-h6 font-weight-bold">{{ item.titulo }}</v-card-title>
            <v-card-subtitle class="d-flex align-center">
              <span class="me-1 font-weight-light">Popular</span>
              <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
            </v-card-subtitle>
          </v-card-item>
 
          <v-card-text class="px-4">
            <v-row align="center">
              <v-rating :value="item.puntaje" color="amber" dense readonly></v-rating>
              <span class="text-grey ms-4 caption">4.5 (413)</span>
            </v-row>
            <div class="mt-2">{{ item.descripcion }}</div>
            <div class="mt-2 text-subtitle-2"><strong>Precio: ${{ item.precio }}</strong></div>
            <div class="mt-1 text-body-2">Cantidad: {{ item.cantidad }}</div>
          </v-card-text>
 
          <v-card-actions class="justify-center">
            <v-btn color="red darken-2" @click="eliminarDelCarrito(item.id)" text>
              <v-icon left>mdi-delete</v-icon> Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
 
    <!-- Total del carrito en tiempo real -->
    <v-row class="mt-4 justify-center">
      <v-col cols="12" md="6" class="text-center">
        <v-card class="pa-4" elevation="3">
          <h3 class="text-h5 font-weight-bold">Total: <span class="text-success">$ {{ total }}</span></h3>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- Muestra el mapa para usuario -->
  <div ref="mapdiv" style="width: 80%; height: 400px"></div>
  <v-container>
    <SideBarComponent :theme="theme" @toggle-theme="onClick"></SideBarComponent>
    <v-row class="mt-4 justify-center">
      <v-col cols="12" md="6" class="text-center">
        <v-btn color="green darken-1" @click="hacerPedido" large>
          <v-icon left>mdi-cart-arrow-down</v-icon> Pedir
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import { mapGetters, mapMutations } from 'vuex';
import SideBarComponent from '@/components/ClienteComponents/SidebarComponent/SideBarComponent.vue';

export default {
  name: 'CarritoView',
  components: {
    SideBarComponent
  },
  data() {
    return {
      map: null,
      marker: null,
      coords: null
    };
  },
  mounted() {
    this.initMap();
  },
  computed: {
    ...mapGetters(['obtenerCarrito']),
    carrito() {
      return this.obtenerCarrito;
    },
    total() {
      return this.carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toFixed(2);
    }
  },
  methods: {
    ...mapMutations(['eliminarItemDelCarrito']),
    eliminarDelCarrito(id) {
      this.eliminarItemDelCarrito(id);
    },
    hacerPedido() {
      console.log("Pedir clicked!");
    },
    initMap() {
  const mapContainer = this.$refs.mapdiv;
  if (!mapContainer) {
    console.error("Contenedor del mapa no encontrado");
    return;
  }

  this.map = L.map(mapContainer).setView([13.67371411848531, -89.27905661071419], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);

  // Añadir el control de búsqueda sin marcador automático
  if (L.Control && L.Control.geocoder) {
    // eslint-disable-next-line no-unused-vars
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false // Evita la colocación automática del marcador
    })
      .on('markgeocode', (e) => {
        // Centra el mapa en la ubicación buscada sin colocar un marcador
        this.map.setView(e.geocode.center, 18);
      })
      .addTo(this.map);
      
  } else {
    console.error("Leaflet Control Geocoder no está disponible");
  }

  // Vincula el evento de clic en el mapa a la función onMapClick
  this.map.on('click', this.onMapClick);
},
onMapClick(e) {
  if (e && e.latlng) {
    this.coords = {
      lat: e.latlng.lat,
      lng: e.latlng.lng
    };

    alert("You clicked the map at " + this.coords.lat + ", " + this.coords.lng);

    // Si no hay un marcador, crea uno en la ubicación del clic
    if (!this.marker) {
      this.marker = L.marker([this.coords.lat, this.coords.lng]).addTo(this.map);
    } else {
      // Si ya hay un marcador, actualiza su ubicación
      this.marker.setLatLng([this.coords.lat, this.coords.lng]);
    }

    // Aquí puedes usar las coordenadas como necesites
    console.log('Coordenadas guardadas:', this.coords);
  } else {
    console.error("LatLng data not available");
  }
}

  }
};
</script>

<style>
.controls {
  background-color: white;
  height: 30px;
  width: 30%;
  border-radius: 10px;
}
</style>
