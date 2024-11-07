<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in carrito" :key="index" cols="3">
        <v-card
        :disabled="loading"
        :loading="loading"
        class="mx-auto my-12"
        max-width="auto"
      >
        <template v-slot:loader="{ isActive }">
          <v-progress-linear
            :active="isActive"
            color="deep-purple"
            height="4"
            indeterminate
          ></v-progress-linear>
        </template>
    
        <v-img :src="item.imagen" height="200" contain></v-img>
    
        <v-card-item>
          <v-card-title>{{ item.titulo }}</v-card-title>
    
          <v-card-subtitle>
            <span class="me-1">Local Favorite</span>
    
            <v-icon
              color="error"
              icon="mdi-fire-circle"
              size="small"
            ></v-icon>
          </v-card-subtitle>
        </v-card-item>
    
        <v-card-text>
          <v-row
            align="center"
            class="mx-0"
          >
          <v-rating :value="item.puntaje" color="amber" dense readonly></v-rating>
    
            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>
        </v-card-text>
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
  </v-container>


  <div>
    <h2>Carrito de Compras</h2>
    <v-container>
      <SideBarComponent :theme="theme" @toggle-theme="onClick"></SideBarComponent>
      
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
import { mapGetters, mapMutations } from 'vuex';
import SideBarComponent from '@/components/ClienteComponents/SidebarComponent/SideBarComponent.vue';

export default {
  name: 'CarritoView',
  components: {
    SideBarComponent
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
