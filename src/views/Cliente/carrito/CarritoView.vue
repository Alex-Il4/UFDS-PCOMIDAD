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
      // Calcula la suma total de los precios en el carrito
      return this.carrito.reduce((acc, item) => acc + item.precio, 0).toFixed(2);
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
