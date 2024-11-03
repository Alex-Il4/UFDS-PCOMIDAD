// store/cart.js
export const state = () => ({
    cart: []
});

export const mutations = {
    addToCart(state, menu) {
        state.cart.push(menu);
    },
    removeFromCart(state, menuId) {
        state.cart = state.cart.filter(menu => menu.id !== menuId);
    }
};

export const actions = {
    addMenuToCart({ commit }, menu) {
        commit('addToCart', menu);
    },
    removeMenuFromCart({ commit }, menuId) {
        commit('removeFromCart', menuId);
    }
};

export const getters = {
    cartItems: (state) => state.cart
};
