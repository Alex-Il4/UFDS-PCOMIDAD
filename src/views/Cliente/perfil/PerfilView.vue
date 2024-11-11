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
          <h2>Información de Perfil</h2>
          <br />
          <v-list class="info mx-auto">
            <v-list-item class="infoPerfil" style="text-align: left">
              <strong>Nombre:</strong> {{ user.name }} <br />
              <strong>Email:</strong> {{ user.email }} <br />
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-row class="section" justify="center">
        <v-col cols="10" class="text-center">
          <h2>Historial de Pedidos</h2>
          <br />
          <v-list class="Listaorden">
            <tabla-informacion-component :items="pedidos" :headers="headers" :color="'warning'"
              :textEliminar="'Eliminar'" :textEditar="'Ver'" :textFunciones="'Funciones'" @edit-item="verPedido"
              @delete-item="deletePedido" height="45vh" />
          </v-list>
        </v-col>
      </v-row>

      <v-row class="section actions" justify="space-between">
        <v-btn class="btnEditar">Editar Perfil</v-btn>
        <v-btn @click="salir" class="btnSalir">Cerrar Sesión</v-btn>
      </v-row>
    </v-container>
    <v-dialog v-model="isvisible" width="auto">
      <v-card :color="dialog.colorAlert" width="800" :prepend-icon="dialog.iconAlert">
        <template v-slot:title>
          <div class="text-capitalize">
            {{dialog.titleAlert}}
          </div>
        </template>
        <v-timeline direction="horizontal" :line-color="pedidoByID.status === 'pendiente' ? 'error' : 'success'">
          <v-timeline-item :dot-color="pedidoByID.status === 'pendiente'
              ? 'red-lighten-1'
              : 'green-lighten-1'
            " fill-dot :icon="pedidoByID.status === 'pendiente'
                ? 'mdi-clock-outline'
                : 'bi bi-bag-check-fill'
              " size="large">
            <template v-slot:default>
              <v-label class="text-capitalize">
                {{ pedidoByID.status }}
              </v-label>
            </template>
          </v-timeline-item>
        </v-timeline>
        <tabla-informacion-component class="mr-4 ml-4" :items="pedidoByID.menus" :headers="headersMenu"
          :color="pedidoByID.status === 'pendiente' ? 'error' : 'success'" isSearch icon="bi bi-bag-heart-fill"
          height="15vh" titleTable="Tu pedido" />
        <!--cargar el mapa aqui-->
        <div class="pa-4">
          <div ref="mapdiv" style="width: 100%; height: 380px" :class="pedidoByID.status === 'pendiente'
              ? 'bg-error border-error'
              : 'bg-success border-success'
            "></div>
        </div>

        <template v-slot:actions>
          <v-btn class="ms-auto" text="Ok" @click="isvisible = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
import TablaInformacionComponent from "@/components/restauranteComponents/ViewDataComponent/TablaInformacionComponent.vue";
export default {
  name: "PerfilView",
  components: {
    TablaInformacionComponent,
  },
  data() {
    return {
      user: {},
      editUser: {
        name: "",
        password: "",
      },
      headers: [
        {
          title: "ID",
          align: "center",
          sortable: false,
          value: "id",
        },
        { title: "restaurante", value: "restaurante", align: "center" },
        { title: "Correo", value: "correo", align: "center" },
        { title: "Estado", value: "status", align: "center" },
        {
          title: "Acciones",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      pedidos: [],
      snackbar: {
        show: false,
        message: "",
        color: "success",
      },
      id: localStorage.getItem("ClienteID"),
      isvisible: false,
      pedidoID: null,
      dialog: {
        show: false,
        message: "",
        color: "success",
        colorAlert: "",
        iconAlert: "",
        titleAlert: "",
        textAlert: "",
      },
      access: localStorage.getItem("access"),
      pedidoByID: {
        restaurante: "",
        status: "",
        tiempoEstimado: "",
        cliente: "",
        menus: [],
      },
      headersMenu: [
        { title: "ID", value: "id", align: "center", key: "id" },
        { title: "titulo", value: "titulo", align: "center", key: "titulo" },
        { title: "Nombre", value: "nombre", align: "center", key: "nombre" },
      ],
      map: null,
      lat: null,
      lng: null,
    };
  },
  methods: {
    salir() {
      localStorage.clear();
      this.user = {};
      this.$router.push("/login");
    },
    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
    async loadPedidos() {
      const headers = {
        Authorization: `Bearer ${this.access}`,
        "Content-Type": "application/json",
      };
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/pedidosMethods/api/listar/ByUsuario/${this.id}`,
          { headers }
        );
        const respuesta = response.data.data;
        if (respuesta) {
          console.log(JSON.stringify(respuesta, null, 2));
          const pedido = respuesta.pedidos;
          const tabla = pedido.map((item) => {
            return {
              id: item.id,
              restaurante: item.restaurante,
              correo: item.cliente.correo,
              status: item.status,
            };
          });
          this.pedidos = tabla;
          this.showSnackbar("Pedidos cargados exitosamente", "success");
        } else {
          console.error(respuesta.error);
          this.showSnackbar("Error al cargar los pedidos", "error");
        }
      } catch (error) {
        this.showSnackbar("Error al conectar con el servidor", "error");
      }
    },
    async verPedido(pedidoId) {
      const ubicacion = await this.loadPedidoByID(pedidoId);
      this.isvisible = true;
      this.dialog.iconAlert = "mdi-check-circle-outline";
      this.dialog.titleAlert = this.pedidoByID.status;
      this.dialog.textAlert = "Se ha realizado el pedido con exito";
      this.dialog.show = true;
      console.log(pedidoId);
      this.$nextTick(() => {
        if (this.isvisible) {
          this.initMap(ubicacion[0], ubicacion[1]);
        }
      });
    },
    async loadPedidoByID(pedidoID) {
      const headers = {
        Authorization: `Bearer ${this.access}`,
        "Content-Type": "application/json",
      };
      const json = {
        pedidoID: pedidoID,
      };
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_URL}/pedidosMethods/api/informacion/pedido/`,
          json,
          { headers }
        );
        const respuesta = response.data.data;
        if (respuesta) {
          this.pedidoByID.cliente = respuesta.cliente.correo;
          this.pedidoByID.restaurante = respuesta.restaurante.nombre;
          this.pedidoByID.status = respuesta.status;
          this.pedidoByID.tiempoEstimado = respuesta.tiempoEstimado;
          this.pedidoByID.menus = respuesta.menus;
          const ubicacion = respuesta.ubicacionEntrega.split(",").map(coord => parseFloat(coord.trim()));
          this.showSnackbar("Pedidos cargados exitosamente", "success");
          return ubicacion;
        } else {
          console.error(respuesta.error);
          this.showSnackbar("Error al cargar los pedidos", "error");
        }
      } catch (error) {
        this.showSnackbar("Error al conectar con el servidor", "error");
      }
    },
    async deletePedido(pedidoId) {
      const headers = {
        Authorization: `Bearer ${this.access}`,
        "Content-Type": "application/json",
      };
      try {
        const response = await axios.delete(
          `${process.env.VUE_APP_API_URL}/pedidosMethods/api/eliminar/pedido/cliente/${pedidoId}`,
          { headers }
        );
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
    initMap(lat, lng) {
      // Si el mapa ya existe, desactívalo y elimínalo
      if (this.map) {
        this.map.off();
        this.map.remove();
      }

      const mapContainer = this.$refs.mapdiv;
      if (!mapContainer) {
        console.error("Contenedor del mapa no encontrado");
        return;
      }
      // Usa las coordenadas que pasaste o los valores predeterminados
      this.map = L.map(mapContainer,{zoomAnimation:true}).setView([lat, lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      //colorcar automaticamente el punto de entrega
      L.marker([lat, lng]).addTo(this.map)
        .bindPopup("La ubicación de entrega de tu pedido")
        .openPopup();
    }

  },
  created() {
    this.loadPedidos();
  },
};
</script>
