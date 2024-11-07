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
      state.carrito = state.carrito.filter(item => item.id !== id);
    }
  },
  actions: {
    setMenuID({ commit }, menuID) {
      commit('setMenuID', menuID);
    },
  },
});
