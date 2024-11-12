<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-layout>
        <SideBarComponent :theme="theme" @toggle-theme="onClick"></SideBarComponent> 
        <v-main>
          <v-container>
            <v-card class="pa-4 mb-4 titulo-carrito">
              <v-card-title class="text-h4 font-weight-bold mb-0">
                <v-icon left color="purple darken-2" size="36">mdi-cart</v-icon> 
                Carrito de Compras
              </v-card-title>
            </v-card>
            <div class="carrito-scrollable">
               <!-- Condicional para mostrar los elementos del carrito o el mensaje de vacío -->
            <v-row v-if="carrito.length > 0">
              <v-col v-for="(item, index) in carrito" :key="index" cols="12" md="4" lg="3">
                <v-card :disabled="loading" :loading="loading" class="my-3 tarjeta-con-boton-fijo" max-width="355">
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
                      <v-rating :model-value="item.puntaje" color="amber" dense readonly></v-rating>
                      <span class="text-grey ms-4 caption">{{item.puntaje}}</span>
                    </v-row>
                    <div class="mt-2">{{ item.descripcion }}</div>
                    <div class="mt-2 text-subtitle-2"><strong>Precio: ${{ item.precio }}</strong></div>
                    <div class="mt-1 text-body-2">Cantidad: {{ item.cantidad }}</div>
                  </v-card-text>
                
                  <v-spacer></v-spacer> <!-- Espaciador para empujar el botón hacia abajo -->
                  
                  <v-card-actions class="justify-center boton-fijo">
                    <v-btn color="red darken-2" @click="eliminarDelCarrito(item.id)" text>
                      <v-icon left>mdi-delete</v-icon> Eliminar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12" class="text-center">
                <v-alert type="info" class="mt-4">No hay menús en el carrito</v-alert> <!-- Mensaje cuando el carrito está vacío -->
              </v-col>
            </v-row>

            </div>
            
           


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
          <v-snackbar
            v-model="snackbar"
            color="success"
            top
            timeout="3000"
            outlined
          >
            Pedido en camino, ¡gracias por tu compra!
            <template v-slot:action="{ attrs }">
              <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Cerrar
              </v-btn>
            </template>
          </v-snackbar>
          <v-snackbar
            v-model="snackbarError"
            color="red darken-1"
            top
            timeout="3000"
            outlined
          >
            {{ snackbarErrorMessage }}
            <template v-slot:action="{ attrs }">
              <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="snackbarError = false"
              >
                Cerrar
              </v-btn>
            </template>
            </v-snackbar>
            <v-snackbar
              v-model="snackbarUbicacion"
              color="blue darken-2"
              top
              timeout="1000"
              outlined
            >
              ¡Ubicación seleccionada con éxito!
              <template v-slot:action="{ attrs }">
                <v-btn color="white" text v-bind="attrs" @click="snackbarUbicacion = false">
                  Cerrar
                </v-btn>
              </template>
            </v-snackbar>
            

        </v-main>
      </v-layout>
    </v-app>
  </v-responsive>
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
      snackbar: false, // Para controlar la visibilidad del mensaje
      snackbarError: false, // Para el mensaje de error
      snackbarUbicacion: false, // Para el mensaje de selección de ubicación
      snackbarErrorMessage: "", // Mensaje de error dinámico
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
    ...mapMutations(['eliminarItemDelCarrito', 'vaciarCarrito']),
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
    this.coords = {
      lat: e.latlng.lat,
      lng: e.latlng.lng
    };

    // Activa el snackbar para confirmar la selección de ubicación
    this.snackbarUbicacion = true;

    // Si no hay un marcador, crea uno en la ubicación del clic
    if (!this.marker) {
      this.marker = L.marker([this.coords.lat, this.coords.lng]).addTo(this.map);
    } else {
      // Si ya hay un marcador, actualiza su ubicación
      this.marker.setLatLng([this.coords.lat, this.coords.lng]);
    }
    console.log('Coordenadas guardadas:', this.coords);
  } else {
    console.error("LatLng data not available");
  }
},

    async hacerPedido() {
  if (!this.coords) {
    alert("Por favor, selecciona una ubicación en el mapa.");
    return;
  }

  // Validar que todos los items del carrito tienen el mismo restauranteID
  const restauranteID = this.carrito[0]?.restauranteID;
  const mismoRestaurante = this.carrito.every(item => item.restauranteID === restauranteID);

  if (!mismoRestaurante) {
      this.snackbarErrorMessage = "Solo puedes pedir menús de un solo restaurante en este pedido.";
      this.snackbarError = true;
      return;
  }

  // Obtener el token desde el almacenamiento local
  const token = localStorage.getItem('access');

  if (!token) {
    console.error('Token no disponible.');
    return;
  }

  // Crear un solo pedido con todos los artículos del carrito
  const pedidoData = {
    restaurante: restauranteID, // Usar el restauranteID validado
    cliente: this.clienteID,
    menus: this.carrito.map(item => item.id), // Agrupa todos los ids de menús en un solo array
    status: 'pendiente',
    ubicacionEntrega: `${this.coords.lat}, ${this.coords.lng}`
  };

  try {
    const response = await fetch('http://127.0.0.1:8000/pedidosMethods/api/crear/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(pedidoData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al hacer el pedido: ${errorData.detail || errorData.messages}`);
    }

    const data = await response.json();
    console.log('Pedido realizado con éxito:', data);
    this.vaciarCarrito(); // Vacía el carrito después de hacer el pedido
    this.snackbar = true; // Muestra el snackbar al finalizar el pedido
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error.message);
  }
}


  }
};
</script>

<style scoped>
h2{
  text-align: center;

}
.carrito-scrollable {
  overflow-y: auto;
  height: calc(55vh); 
  width: 100%;
  padding-right: 10px;
}

.tarjeta-con-boton-fijo {
  display: flex;
  flex-direction: column;
  height: 100%; /* Hace que la tarjeta ocupe todo el alto disponible */
}

.boton-fijo {
  margin-top: auto; /* Empuja el botón hacia la parte inferior de la tarjeta */
}
.titulo-carrito {
  background-color: #f5f5f5; /* Color de fondo suave */
  color: #4a148c; /* Color de texto acorde con el tema */
  border-radius: 12px; /* Bordes redondeados */
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

