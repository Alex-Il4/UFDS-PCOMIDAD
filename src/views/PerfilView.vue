<template>
  <v-container class="perfil">
    <v-btn icon @click="$router.push('/home')" class="btnHome">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-row class="namepic" justify="center">
      <v-col cols="12" class="text-center">
        <v-img class="imagen mx-auto" src="../assets/logo.png" alt="Imagen" />
      </v-col>
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

              <!-- form condicional de edicion -->
              <template v-if="isEditing">
                <strong>Teléfono:</strong>
                <v-text-field v-model="editUser.tel" label="Teléfono" />
                <strong>Dirección:</strong>
                <v-text-field v-model="editUser.address" label="Dirección" />
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
          <v-list class="Listaorden" v-if="orders.length">
            <v-list-item-group>
              <v-list-item v-for="order in orders" :key="order.id" class="order" style="text-align: left;">
                <div class="order-content">
                  <div class="order-info">
                    <p><strong>Pedido #{{ order.id }}</strong></p>
                    <p>Fecha: {{ order.date }}</p>
                    <p>Total: ${{ order.total.toFixed(2) }}</p>
                  </div>
                  <v-btn @click="deleteOrder(order.id)" class="btnDeleteOrder" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <p v-else class="noOrders" style="text-align: center;">Aun no tienes pedidos</p>
        </v-col>
      </v-row>

      <v-row class="section actions" justify="space-between">
        <v-btn @click="editProfile" v-if="!isEditing" class="btnEditar">Editar Perfil</v-btn>
        <v-btn @click="salir" class="btnSalir">Cerrar Sesión</v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'PerfilView',
  data() {
    return {
      user: {
        name: 'Alguien Cualquiera',
        email: 'alguien@example.com',
        tel: '8888-8888',
        address: 'Calle Cualquiera',
      },
      editUser: {
        tel: '',
        address: '',
      },
      orders: [
        { id: 1, date: '2024-10-01', total: 25.5 },
        { id: 2, date: '2024-10-05', total: 40.0 },
      ],
      isEditing: false,
    };
  },
  methods: {
    editProfile() {
      this.editUser.tel = this.user.tel;
      this.editUser.address = this.user.address;
      this.isEditing = true;
    },
    saveProfile() {
      this.user.tel = this.editUser.tel;
      this.user.address = this.editUser.address;
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    salir() {
      localStorage.removeItem('authToken');
      this.user = {};
      this.$router.push('/login');
    },
    deleteOrder(orderId) {
      this.orders = this.orders.filter(order => order.id !== orderId);
    },
  },
};
</script>

<style scoped>

  .btnGuardar {
    background-color: #4CAF50;
    color: white;
    margin-right: 10px;
  }
  .btnGuardar:hover {
    background-color: #388E3C;
  }

  .btnCancelar {
    background-color: #f44336;
    color: white;
  }
  .btnCancelar:hover {
    background-color: #d32f2f;
  }

  .btnHome {
    position: absolute;
    top: 15px;
    left: 15px;
    color: #444;
  }

  .order-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btnDeleteOrder {
    background-color: transparent;
    color: #ff6b6b;
    padding: 0;
  }
  .btnDeleteOrder:hover {
    color: #ff5252;
  }

  .perfil {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    background-color: white; 
    font-family: 'Arial', sans-serif;
    min-height: 100vh; 
  }
  
  .namepic {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .imagen {
    border-radius: 50%;
    width: 135px; 
    height: 135px; 
    margin-bottom: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
  }
  
  .imagen:hover {
    transform: scale(1.05);
  }
  
  .container {
    width: 100%;
    max-width: 600px;
    background: #f9f9fb;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }
  
  .container:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  .section {
    margin-bottom: 25px;
  }
  
  .section h2 {
    font-size: 1.3em;
    color: #444;
    margin-bottom: 10px;
    border-bottom: 2px solid #e59336;
    display: inline-block;
  }
  
  .info,
  .Listaorden {
    list-style: none;
    padding: 0;
  }
  
  .infoPerfil,
  .Listaorden .order {
    background-color: #f7f7f7;
    padding: 10px 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    transition: background-color 0.3s ease;
  }
  
  .infoPerfil:hover,
  .Listaorden .order:hover {
    background-color: #e1f5fe;
  }
  
  .noOrders {
    text-align: center;
    font-size: 1em;
    color: #888;
  }
  
  .btnEditar, .btnSalir {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%; 
    max-width: 200px; 
    margin: 5px;
  }

  .actions {
    display: flex;
    flex-direction: column; 
    align-items: center; 
  }

  .btnEditar {
    background-color: #e59336;
    color: white;
  }
  
  .btnEditar:hover {
    background-color: #e59336;
  }
  
  .btnSalir {
    background-color: #e74c3c;
    color: white;
  }
  
  .btnSalir:hover {
    background-color: #c0392b;
  }


  @media (min-width: 600px) {
      .actions {
          flex-direction: row; /* Mantiene el diseño en fila en pantallas más grandes */
      }
  }

</style>
  