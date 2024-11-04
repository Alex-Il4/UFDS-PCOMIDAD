<template>
  <div>
    <h2>Carrito de Compras</h2>
    <v-container>
      <SideBarComponent :theme="theme" @toggle-theme="onClick"></SideBarComponent>
      <v-row>
        <v-col v-for="(item, index) in carrito" :key="index">
          <v-card>
            <v-card-title>ID del Menú: {{ item }}</v-card-title>
            <!-- Botón para eliminar el elemento -->
            <v-card-actions>
              <v-btn color="red" @click="eliminarDelCarrito(item)">
                Eliminar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import SideBarComponent from '@/components/ClienteComponents/SidebarComponent/SideBarComponent.vue'


export default {
  name: 'CarritoView',
  components: {
        SideBarComponent
    },
  computed: {
    ...mapGetters(['obtenerCarrito']),
    carrito() {
      return this.obtenerCarrito;
    }
  },
  methods: {
    ...mapMutations(['eliminarItemDelCarrito']),
    eliminarDelCarrito(id) {
      this.eliminarItemDelCarrito(id); // Llama a la mutación para eliminar el elemento
    }
  }
};
</script>
