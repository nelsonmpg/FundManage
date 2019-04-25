import Loading from './loadingForm.vue'
var LoadingPlugin = {
  install(Vue) {
    this.event = new Vue()
    Vue.prototype.$loading = {
      show() {
        LoadingPlugin.event.$emit('loadingShow')
      },
      hide() {
        LoadingPlugin.event.$emit('loadingHide')
      }
    }
    Vue.component('v-loading', Loading)
  }
}
export default LoadingPlugin
