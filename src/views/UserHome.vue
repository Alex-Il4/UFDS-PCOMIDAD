<template>
  <v-container fluid class="pa-0 ma-0 bg-grey-lighten-4" style="min-height: 100vh;">
    <!-- Menu items -->
    <div class="container">
      <v-row class="mt-8">
        <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
          <v-card class="mx-auto" max-width="344" height="200">
            <v-card-title> {{ n }}</v-card-title>
            <v-card-subtitle>Category</v-card-subtitle>
            <v-card-text>
              Este es mi menu de prueba
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" variant="text">Order Now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>

<script>
//import MenuRestauranteComponent from '@/components/restauranteComponents/MenuComponent/MenuRestauranteComponent.vue';
import axios from 'axios';
export default {
  name: 'UserHome',
  data: () => ({
    nombre: '',
    ubicacion: '',
    descripcion: '',
    telefono: '',
    tipoCocina: '',
    puntaje: '',
    imagen: '',
  }),
  methods:{
    async ListarRestaurant (){
      try {
        const response = await axios.get('http://127.0.0.1:8000/restaurantesMethods/api/listar/');
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease-in-out;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.container {
  width: 100%;
  max-width: 1200px;
  /* Ajusta este valor según sea necesario */
  margin: 0 auto;
  /* Centra el contenedor horizontalmente */
  padding: 0 15px;
  /* Espaciado horizontal */
  display: flex;
  /* Asegura que el contenido se centre */
  justify-content: center;
  /* Centra el contenido dentro del contenedor */
}
</style>