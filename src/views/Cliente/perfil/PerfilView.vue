<template>
  <v-container class="perfil">
    <v-btn icon @click="$router.push('/home')" class="btnHome">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-row class="namepic" justify="center">
      <v-col cols="12" class="text-center">
        <h1>{{ user.name }}</h1>
      </v-col>
    </v-row>

    <v-container class="container">
      <v-row class="section" justify="center">
        <v-col cols="12" class="text-center">
          <h2>Información de Perfil</h2><br>
          <v-list class="info mx-auto">
            <v-list-item class="infoPerfil" style="text-align: left;">
              <strong>Nombre:</strong> {{ user.name }} <br>
              <strong>Email:</strong> {{ user.email }} <br>

              <!-- Solo aparece cuando se presiona el boton para editar-->
              <template v-if="isEditing">
                <strong>Nombre:</strong>
                <v-text-field v-model="editUser.name" label="Nombre" />
                <strong>Contraseña:</strong>
                <v-text-field v-model="editUser.password" label="Contraseña" type="password" />

                <v-btn @click="saveProfile" class="btnGuardar">Guardar</v-btn>
                <v-btn @click="cancelEdit" class="btnCancelar">Cancelar</v-btn>
              </template>
              <template v-else>
                <strong>Teléfono:</strong> {{ user.tel }} <br>
                <strong>Dirección:</strong> {{ user.address }} <br>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-row class="section" justify="center">
        <v-col cols="12" class="text-center">
          <h2>Historial de Pedidos</h2><br>
          <v-list class="Listaorden">
            <tabla-informacion-component :items="pedidos" :headers="headers" :color="'warning'" :textEliminar="'Eliminar'" :textEditar="'Ver'" :textFunciones="'Funciones'" @edit-item="verPedido" @delete-item="deletePedido"/>
          </v-list>
        </v-col>
      </v-row>

      <v-row class="section actions" justify="space-between">
        <v-btn @click="editProfile" v-if="!isEditing" class="btnEditar">Editar Perfil</v-btn>
        <v-btn @click="salir" class="btnSalir">Cerrar Sesión</v-btn>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios';
import TablaInformacionComponent from '@/components/restauranteComponents/ViewDataComponent/TablaInformacionComponent.vue';
export default {
  name: 'PerfilView',
  components: {
    TablaInformacionComponent,
  },
  data: () => ({
    user: {},
      editUser: {
        name: '',
        password: '',
      },
      headers: [
        {
          title: 'ID',
          align: 'center',
          sortable: false,
          value: 'id',
        },
        { title: 'restaurante', value: 'restaurante', align: 'center', },
        { title: 'Correo', value: 'correo', align: 'center', },
        { title: 'Estado', value: 'status', align: 'center', },
        { title: 'Acciones', value: 'actions',align: 'center', sortable: false },
      ],
      pedidos: [],
      isEditing: false,
      snackbar: {
        show: false,
        message: '',
        color: 'success',
      },
      id: localStorage.getItem('ClienteID'),
  }),
  methods: {
    cancelEdit() {
      this.isEditing = false;
    },
    salir() {
      localStorage.removeItem('authToken');
      this.user = {};
      this.$router.push('/login');
    },
    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
    async loadPedidos() {
      const access = localStorage.getItem('access');
      const headers = {
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/pedidosMethods/api/listar/ByUsuario/${this.id}`, { headers });
        const respuesta = response.data.data;
        if (respuesta) {
          console.log(JSON.stringify(respuesta, null, 2));
          const pedido = respuesta.pedidos;
          const tabla = pedido.map(item => {
            return {
              id: item.id,
              restaurante: item.restaurante,
              correo: item.cliente.correo,
              status: item.status,
            }
          });
          this.pedidos = tabla
          this.showSnackbar('Pedidos cargados exitosamente', 'success');
        } else {
          console.error(respuesta.error);
          this.showSnackbar('Error al cargar los pedidos', 'error');
        }
      } catch (error) {
        this.showSnackbar('Error al conectar con el servidor', 'error');
      }
    },
    verPedido(pedidoId) {
      this.$router.push(`/restaurante/pedidos/ver/${pedidoId}`);
    },
    async deletePedido(pedidoId) {
      const access = localStorage.getItem('access');
      const headers = {
        'Authorization': `Bearer ${access}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axios.delete(`${process.env.VUE_APP_API_URL}/pedidosMethods/api/eliminar/pedido/cliente/${pedidoId}`, { headers });
        const respuesta = response.data.data;
        if (respuesta) {
          console.log(JSON.stringify(respuesta, null, 2));
          this.loadPedidos();
        } else {
          console.error(respuesta.error);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.loadPedidos();
  },
};
</script>
