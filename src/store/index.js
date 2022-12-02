import Vue from 'vue'
import Vuex from 'vuex'
import loginInfo from './modules/login'
import initUser from './modules/login'
import Login from './modules/login'
import cart from './modules/cart'
import address from './modules/address'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        Login,
        loginInfo,
        initUser,
        cart,
        address
    }
})