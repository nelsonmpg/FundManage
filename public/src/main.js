import Notifications from 'vue-notification'
import Vue from 'vue'
import App from './App'
import resource from 'vue-resource'
import VLoading from './components/loading.js'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import VueSocketio from 'vue-socket.io'
import utils from "./shared/utilsLib.js"

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(resource);
Vue.use(Notifications);
Vue.use(VLoading);
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

new Vue({
  el: '#app',
  router,
  icons,
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
