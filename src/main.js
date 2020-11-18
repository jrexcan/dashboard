import Vue from 'vue'
import App from './App.vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

//router
import router from './router.js'
import './axios'
import store from './vuex'

Vue.use(require('vue-moment'));

Vue.use(Vuetify)
const vuetify = new Vuetify()
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  router,
  store
}).$mount('#app')
