<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-layout>
        <SideBarComponent :theme="theme" @toggle-theme="onClick"></SideBarComponent> 
        <v-main>
          <v-container>
            <h2 class="text-h4 font-weight-bold mb-4">Carrito de Compras</h2>
            <v-row>
              <v-col v-for="(item, index) in carrito" :key="index" cols="12" md="4" lg="3">
                <v-card :disabled="loading" :loading="loading" class="my-3 elevation-10" max-width="355">
                  <template v-slot:loader="{ isActive }">
                    <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
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
                    <div class="mt-1 text-body-2">menus: {{ item.id }}</div>
                    <div class="mt-1 text-body-2">RestauranteID: {{ item.restauranteID }}</div>
                    <div class="mt-1 text-body-2">cliente: {{ clienteID }}</div>
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <v-btn color="red darken-2" @click="eliminarDelCarrito(item.id)" text>
                      <v-icon left>mdi-delete</v-icon> Eliminar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <!-- Muestra el mapa para usuario -->
            <v-banner class="my-4" color="error" icon="mdi-weather-hurricane" lines="two">
              <v-banner-text> tus coordenadas. </v-banner-text>
            </v-banner>
            <div ref="mapdiv" style="width: 100%; height: 400px"></div>
          </v-container>
          <v-container>
            <!-- Total del carrito en tiempo real -->
            <v-row class="mt-4 justify-center">
              <v-col cols="12" md="6" class="text-center">
                <v-card class="pa-4" elevation="3">
                  <h3 class="text-h5 font-weight-bold">Total: <span class="text-success">$ {{ total }}</span></h3>
                </v-card>
              </v-col>
            </v-row>
            <v-row class="mt-4 justify-center">
              <v-col cols="12" md="6" class="text-center">
                <v-btn 
                  :disabled="!coords"
                  color="green darken-1" 
                  @click="hacerPedido" 
                  large
                >
                  <v-icon left>mdi-cart-arrow-down</v-icon> Pedir
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-layout>
    </v-app>
  </v-responsive>
  
  <v-card class="pa-4" elevation="3">
    <v-card-title class="text-h6 font-weight-bold">
      Cliente ID: {{ clienteID || 'No disponible' }}
    </v-card-title>
  </v-card>
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
      coords: null,
      clienteID: null,
    };
  },
  mounted() {
    this.initMap();
    this.clienteID = localStorage.getItem('ClienteID'); // Captura el clienteID del localStorage
    console.log(this.clienteID); // Verifica que el clienteID se ha recuperado correctamente
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
        // Estas coordenadas se deben enviar al momento de hacer el pedido
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
    },

    async hacerPedido() {
  // Verificar si las coordenadas están seleccionadas
  if (!this.coords) {
    alert("Por favor, selecciona una ubicación en el mapa.");
    return;  // Detener el envío del pedido si las coordenadas no están seleccionadas
  }

  // Coloca el token manualmente aquí
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNzEzMTE1LCJpYXQiOjE3MzExMjExMTUsImp0aSI6IjliOGVlM2IzOGVlODRkNDU5MDc2ZTc2ZjUxYmJhODRkIiwidXNlcl9pZCI6NX0.tzS1ZyB9vbWzI4g_yeqe0Z700scnV2to0DZ-4si5nco';

  if (!token) {
    console.error('Token no disponible.');
    return;
  }

  // Genera el array de menus con los ID de los productos en el carrito
  const menus = this.carrito.map(item => item.id);

  // Datos del pedido
  const pedidoData = {
    restaurante: this.carrito[0].restauranteID,  // Asumimos que todos los items son del mismo restaurante
    cliente: this.clienteID,  // ClienteID desde el almacenamiento local
    menus: menus,            // Lista de IDs de los menús en el carrito
    status: 'pendiente',     // El estado del pedido
    ubicacionEntrega: `${this.coords.lat}, ${this.coords.lng}`  // Ubicación de entrega (coordenadas)
  };

  try {
    const response = await fetch('http://127.0.0.1:8000/pedidosMethods/api/crear/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Incluye el token manualmente
      },
      body: JSON.stringify(pedidoData) // Enviar los datos como JSON
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al hacer el pedido: ${errorData.detail || errorData.messages}`);
    }

    const data = await response.json();
    console.log('Pedido realizado con éxito:', data);
    // Aquí puedes hacer lo que necesites con la respuesta, como redirigir al usuario o mostrar un mensaje
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error.message);
    // Aquí puedes manejar el error, mostrando un mensaje al usuario o haciendo un redireccionamiento
  }
}
  }
};
</script>

