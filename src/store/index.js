import { createStore } from 'vuex';

export default createStore({
  state: {
    carrito: []
  },
  getters: {
    obtenerCarrito: (state) => state.carrito
  },
  mutations: {
    agregarItemAlCarrito(state, id) {
      state.carrito.push(id);
    },
    eliminarItemDelCarrito(state, id) {
      state.carrito = state.carrito.filter(item => item !== id);
    }
  },
  actions: {
    setMenuID({ commit }, menuID) {
      commit('setMenuID', menuID);
    },
  },
});
