export default {
    state: {
        cartList: []
    },
    getters: {},
    mutations: {
        cartList(state, listArr) {
            state.cartList = listArr
                // console.log(' 这里是store');
                // console.log(state.cartList);
        }
    },
    actions: {},
}