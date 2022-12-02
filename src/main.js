import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/assets/css/common.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
//导入路由拦截
import './router/loginToken';

Vue.use(Vant);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')