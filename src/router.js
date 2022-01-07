import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Search from './views/Search.vue'
import Search2 from './views/Search2.vue'
import Product from './views/Product.vue'
import Service from './views/Service.vue'
import Eletricista from './views/Eletricista.vue'
import Sherrer from './views/Sherrer.vue'
import Dashboard from './views/Dashboard.vue'
import Profile from './views/Profile.vue'
import Order from './views/Order.vue'
import Request from './views/Request.vue'
import Sale from './views/Sale.vue'
import VueMeta from 'vue-meta';

Vue.use(Router);
Vue.use(VueMeta);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/product/:product',
      name: 'product',
      component: Product,
      props: true
    },
    {
      path: '/service',
      name: 'service',
      component: Service,
      props: true
    },
    {
      path: '/eletricista',
      name: 'eletricista',
      component: Eletricista,
      props: true
    },
    {
      path: '/sherrer',
      name: 'sherrer',
      component: Sherrer,
      props: true
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      props: true
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      props: true
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      props: true
    },
    {
      path: '/request/:request',
      name: 'request',
      component: Request,
      props: true
    },
    {
      path: '/sale',
      name: 'sale',
      component: Sale,
      props: true
    },
    {
      path: '/search/:search',
      name: 'search',
      component: Search,
      props: true
    },
    {
      path: '/search2/:search',
      name: 'search2',
      component: Search2,
      props: true
    }
  ]
})
