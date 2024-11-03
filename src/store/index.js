import { createStore } from 'vuex'

export default createStore({
  state: {
    menuID : null,
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
  }
})
