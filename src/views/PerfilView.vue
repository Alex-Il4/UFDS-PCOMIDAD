<template>
  <v-container class="perfil">
    <v-btn icon @click="$router.push('/')" class="btnHome">
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
              <strong>Teléfono:</strong> {{ user.tel }} <br>
              <strong>Dirección:</strong> {{ user.address }} <br>
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
                <p><strong>Pedido #{{ order.id }}</strong></p>
                <p>Fecha: {{ order.date }}</p>
                <p>Total: ${{ order.total.toFixed(2) }}</p>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <p v-else class="noOrders" style="text-align: left;">Aun no tienes pedidos</p>
        </v-col>
      </v-row>

      <v-row class="section actions" justify="space-between">
        <v-btn @click="editProfile" class="btnEditar">Editar Perfil</v-btn>
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
    orders: [
      { id: 1, date: '2024-10-01', total: 25.5 },
      { id: 2, date: '2024-10-05', total: 40.0 },
    ],
  };
},
methods: {
  editProfile() {
    //editar perfil
  },
  salir() {
    // cerrar Sesion
  },
}
};
</script>

<style scoped>
/* Botón de regreso al inicio */
.btnHome {
position: absolute;
top: 15px;
left: 15px;
color: #444;
}

.perfil {
display: flex;
flex-direction: column;
align-items: center;
padding: 30px;
background-color: #f9f9fb;
font-family: 'Arial', sans-serif;
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
    background: #fff;
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
    width: 100%; /* Hacer que los botones ocupen el 100% del contenedor */
    max-width: 200px; /* Establece un ancho máximo para los botones */
    margin: 5px; /* Espaciado entre los botones */
  }

  .actions {
    display: flex;
    flex-direction: column; /* Cambia a columna en pantallas más pequeñas */
    align-items: center; /* Centra los botones */
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
  