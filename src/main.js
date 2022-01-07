import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { rtdbPlugin } from 'vuefire'
import VueMeta from 'vue-meta'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.use(rtdbPlugin)
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})
//Vue.use(VueFire)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
