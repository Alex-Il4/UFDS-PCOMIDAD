import { createStore } from 'vuex';

// Módulo del carrito de compras
const cartModule = {
  state: () => ({
    cart: []
  }),
  getters: {
    cartItems: state => state.cart,
  },
  mutations: {
    addToCart(state, menu) {
      state.cart.push(menu);
    },
    removeFromCart(state, menuID) {
      state.cart = state.cart.filter(menu => menu.id !== menuID);
    }
  },
  actions: {
    addMenuToCart({ commit }, menu) {
      commit('addToCart', menu);
    },
    removeMenuFromCart({ commit }, menuID) {
      commit('removeFromCart', menuID);
    }
  }
};

export default createStore({
  state: {
    menuID: null,
  },
  getters: {
    menuID: state => state.menuID,
  },
  mutations: {
    setMenuID(state, menuID) {
      state.menuID = menuID;
    },
  },
  actions: {
    setMenuID({ commit }, menuID) {
      commit('setMenuID', menuID);
    },
  },
  modules: {
    cart: cartModule
  }
});
