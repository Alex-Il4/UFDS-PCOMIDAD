<template>
  <div>
    <h2>Carrito de Compras</h2>
    <v-container>
      <SideBarComponent :theme="theme" @toggle-theme="onClick"></SideBarComponent>
      <v-row>
        <v-col v-for="(item, index) in carrito" :key="index">
          <v-card>
            <v-img :src="item.imagen" height="200" contain></v-img>
            <v-card-title>{{ item.titulo }}</v-card-title>
            <v-card-subtitle>
              <v-rating :value="item.puntaje" color="amber" dense readonly></v-rating>
            </v-card-subtitle>
            <v-card-text>
              <div>{{ item.descripcion }}</div>
              <div><strong>Precio: ${{ item.precio }}</strong></div>
              <div><strong>Cantidad: {{ item.cantidad }}</strong></div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="red" @click="eliminarDelCarrito(item.id)">Eliminar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h3>Total: ${{ total }}</h3>
        </v-col>
      </v-row>
      
      <!-- Muestra el mapa para usuario -->
      <div ref="mapdiv" style="width: 80%; height: 400px"></div>
      
      <v-row>
        <v-col>
          <v-btn color="green" @click="hacerPedido">Pedir</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
