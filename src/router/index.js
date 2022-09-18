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
        component: Cart
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
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router