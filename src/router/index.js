import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import List from '../views/List.vue'
import My from '../views/My.vue'
import Search from '../views/Search.vue'
import Index from '../views/search/Index.vue'
import SearchList from '../views/search/SearchList.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
        meta: {
            keepAlive: false, //代表b不需要缓存
        }
    },
    {
        path: '/list',
        name: 'list',
        component: List
    },
    {
        path: '/my',
        name: 'my',
        component: My
    },
    {
        path: '/search',
        name: 'search',
        component: Search,
        children: [{
                path: '/',
                name: 'index',
                component: Index,
            },
            {
                path: 'search-list',
                name: 'search-list',
                component: SearchList,
            },
        ]
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail,
        meta: {
            keepAlive: false, //代表b不需要缓存
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/login/Index.vue')
    },
    {
        path: '/passwordLogin',
        name: 'PasswordLogin',
        component: () =>
            import ('../views/login/PasswordLogin.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('../views/login/Register.vue')
    },
    {
        path: '/findPass',
        name: 'FindPass',
        component: () =>
            import ('@/views/login/FindPass.vue'),
        children: [{
                path: '/',
                name: 'FindPassIndex',
                component: () =>
                    import ('@/components/findPass/FindPassIndex.vue')
            },
            {
                path: '/findPassTwo',
                name: 'FindPassTwo',
                component: () =>
                    import ('@/components/findPass/FindPassTwo.vue')
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router