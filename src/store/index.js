import { createStore } from 'vuex';

export default createStore({
  state: {
    carrito: [],
    menuID: null // Agregar una propiedad para el ID del restaurante
  },
  getters: {
    obtenerCarrito: (state) => state.carrito,
    obtenerMenuID: (state) => state.menuID // Getter para obtener el ID del restaurante
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
    },
    setMenuID(state, menuID) {
      state.menuID = menuID; // Establece el ID del restaurante
    },
    vaciarCarrito(state) {  // <--- Agrega esta mutación
      state.carrito = [];
    },
  },
  actions: {
    setMenuID({ commit }, menuID) {
      commit('setMenuID', menuID);
    },
  },
});
