// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
import "@/assets/css/weather-icons.min.css"
import "@/assets/css/weather-icons-wind.min.css"
import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'
import App from './App'
import resource from 'vue-resource'
import VLoading from './components/loading.js'
import router from './router'
import VueSocketio from 'vue-socket.io'
import utils from "./shared/utilsLib.js"

// todo
cssVars()

Vue.use(BootstrapVue);
Vue.use(resource);
Vue.use(Notifications);
Vue.use(VLoading);
Vue.config.productionTip = false;
Vue.use(new VueSocketio({
  debug: false,
  transports: ['websocket'],
  upgrade: false,
  // connection: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : ''),
  // connection: 'https://fundsmanagement.ddns.net:9090',
  connection: utils.geturl(),
  query: {
    token: window.localStorage.getItem('auth')
  }
}));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  sockets: {
    connect() {
      console.log("socket connected...");
    },
    disconnected() {
      console.log("socket disconnected...");
    },
    socketId(sktId) {
      console.log("SoketId", sktId);
      localStorage.setItem("SoketId", sktId);
    }
  }
})
