export default {
    state: {
        cartList: [], //这里是购物车的数据
        selectList: [] //这里是选中的数据 
    },
    getters: {
        isCheckAll(state) {
            return state.cartList.length == state.selectList.length
        }
    },
    mutations: {
        cartList(state, listArr) {
            state.cartList = listArr
                // console.log(' 这里是store');
                // console.log(state.cartList);
            state.selectList = state.cartList.map(v => {
                return v.id;
            })
        },
        //全选
        checkAll(state) {
            state.selectList = state.cartList.map(v => {
                v.checked = true
                return v.id
            })
        },
        //全不选
        unCheckAll(state) {
            state.cartList.forEach(v => {
                v.checked = false
            })
            state.selectList = []
        }

    },
    actions: {
        checkAllFun({ commit, getters }) {
            getters.isCheckAll ? commit('unCheckAll') : commit('checkAll')
        }
    },
}