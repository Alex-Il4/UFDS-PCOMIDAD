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
      state.carrito.push(menuData); // Agrega el objeto del menú al carrito
    },
    eliminarItemDelCarrito(state, id) {
      // Elimina el ítem del carrito basado en su ID
      state.carrito = state.carrito.filter(item => item.id !== id);
    }
  },
  actions: {
    setMenuID({ commit }, menuID) {
      commit('setMenuID', menuID);
    },
  },
});
