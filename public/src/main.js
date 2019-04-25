// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'
// import vSelect from 'vue-select'
import App from './App'
import resource from 'vue-resource'
import VLoading from './components/loading.js'
import router from './router'

// todo
cssVars()

Vue.use(BootstrapVue)
Vue.use(resource)
Vue.use(Notifications)
Vue.use(VLoading)
// Vue.component('v-select', vSelect)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
