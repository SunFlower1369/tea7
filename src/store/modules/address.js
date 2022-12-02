export default {
    state: {
        list: []
    },
    getters: {
        defaultAddress(state) {
            // console.log(state.list);
            return state.list.filter(v => {
                return v.isDefault == 1
            })
        }
    },
    mutations: {
        getAddress(state, list) {
            state.list = list
        }
    },
    actions: {},
}