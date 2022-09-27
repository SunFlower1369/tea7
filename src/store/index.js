import Vue from 'vue'
import Vuex from 'vuex'
import loginInfo from './modules/login'
import initUser from './modules/login'
import cartList from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        loginInfo,
        initUser,
        cartList
    }
})