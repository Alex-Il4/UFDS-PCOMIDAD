<template>
  <div>
    <h2>Carrito de Compras</h2>
    <v-container>
      <SideBarComponent :theme="theme" @toggle-theme="onClick"></SideBarComponent>
      <v-row>
        <v-col v-for="(item, index) in carrito" :key="index">
          <v-card>
            <v-img :src="item.imagen" height="200" contain></v-img> <!-- Añadido: Imagen del menú -->
            <v-card-title>{{ item.titulo }}</v-card-title>
            <v-card-subtitle>
              <v-rating :value="item.puntaje" color="amber" dense readonly></v-rating>
            </v-card-subtitle>
            <v-card-text>
              <div>{{ item.descripcion }}</div>
              <div><strong>Precio: ${{ item.precio }}</strong></div> <!-- Añadido: Precio del menú -->
              <div><strong>Cantidad: {{ item.cantidad }}</strong></div> <!-- Añadido: Cantidad del menú -->
            </v-card-text>
            <!-- Botón para eliminar el elemento -->
            <v-card-actions>
              <v-btn color="red" @click="eliminarDelCarrito(item.id)">
                Eliminar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Muestra el total -->
      <v-row>
        <v-col>
          <h3>Total: ${{ total }}</h3>
        </v-col>
      </v-row>
      <!-- Muestra la posición actual del usuario -->

      <div ref="mapdiv" style="width: 80%; height: 400px"/>
      
      <!-- Botón para hacer un pedido -->
      <v-row>
        <v-col>
          <v-btn color="green" @click="hacerPedido">
            Pedir
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { mapGetters, mapMutations } from 'vuex';
import SideBarComponent from '@/components/ClienteComponents/SidebarComponent/SideBarComponent.vue';
import { computed, onMounted, ref } from 'vue';
import { useLocationMap } from '@/components/Location/LocationMap.js';
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_MAPS_API_KEY = 'AIzaSyCZuDDfQThAulzTnrjDVTOeFpkTTaeFtQE';

export default {
  name: 'CarritoView',
  components: {
    SideBarComponent
  },

  setup() {
    const { Coordenates } = useLocationMap();
    const CurPos = computed(() => ({
      lat: Coordenates.value.latitude,
      lng: Coordenates.value.longitude
    }))
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places']
    });

    const mapdiv = ref(null);
    const defaultCoordinates = { lat: 13.67371411848531, lng: -89.27905661071419 }; // Coordenadas por defecto
    
    onMounted(async () => {
      await loader.load();
      new google.maps.Map(mapdiv.value, {center: defaultCoordinates, zoom: 15}); // Utiliza las coordenadas por defecto
    });

    return {CurPos, mapdiv};
  },
  computed: {
    ...mapGetters(['obtenerCarrito']),
    carrito() {
      return this.obtenerCarrito; // Obtiene el carrito desde el store
    },
    total() {
      // Calcula la suma total de los precios en el carrito, multiplicando por la cantidad
      return this.carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toFixed(2);
    }
  },
  methods: {
    ...mapMutations(['eliminarItemDelCarrito']),
    eliminarDelCarrito(id) {
      this.eliminarItemDelCarrito(id); // Llama a la mutación para eliminar el elemento
    },
    hacerPedido() {
      // Función para el botón "Pedir" (sin funcionalidad por el momento)
      console.log("Pedir clicked!"); // Puedes agregar lógica más adelante
    }
  }
};
</script>
