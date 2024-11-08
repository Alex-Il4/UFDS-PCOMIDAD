import { createStore } from 'vuex';

export default createStore({
  state: {
    carrito: []
  },
  getters: {
    obtenerCarrito: (state) => state.carrito
  },
  mutations: {
    agregarItemAlCarrito(state, menuData) {
      // Verifica si el item ya existe en el carrito
      const existingItem = state.carrito.find(item => item.id === menuData.id);
      if (existingItem) {
        existingItem.cantidad++; // Incrementa la cantidad si ya existe
      } else {
        // Agrega el nuevo item con cantidad 1 si no existe
        state.carrito.push({ ...menuData, cantidad: 1 });
      }
    },
    eliminarItemDelCarrito(state, id) {
      const item = state.carrito.find(item => item.id === id);
      if (item) {
        if (item.cantidad > 1) {
          item.cantidad--; // Reduce la cantidad si es mayor a 1
        } else {
          // Elimina el producto si la cantidad es 1
          state.carrito = state.carrito.filter(item => item.id !== id);
        }
      }
    }
  },
  actions: {
    setMenuID({ commit }, menuID) {
      commit('setMenuID', menuID);
    },
  },
});
