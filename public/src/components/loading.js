import Loading from './loadingForm.vue'
var LoadingPlugin = {
  install(Vue) {
    this.event = new Vue()
    Vue.prototype.$loading = {
      show() {
        LoadingPlugin.event.$emit('loadingShow')
      },
      showProgressBar() {
        LoadingPlugin.event.$emit('loadingProgressBarShow')
      },
      hideProgressBar() {
        LoadingPlugin.event.$emit('loadingHide')
      },
      hide() {
        LoadingPlugin.event.$emit('loadingHide')
      }
    }
    Vue.component('v-loading', Loading)
  }
}
export default LoadingPlugin
