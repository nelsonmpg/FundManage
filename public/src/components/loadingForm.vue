<template>
  <div id="loader-wrapper" v-show="this.execProcess">
    <div id="loader">
      <h4 class="text-center">
          <b-col cols="12" sm="5" md="4" lg="3">
            <i class="fa fa-refresh fa-spin"></i><br>
          </b-col>
      </h4>
      <h1 class="text-center">Loading...</h1>
    </div>
  </div>
</template>
<script>
import Loading from './loading.js'
export default {
  name: 'loading',
  data() {
    return {
      execProcess: false
    }
  },
  beforeMount() {
    Loading.event.$on('loadingShow', _ => {
      this.show();
    })
    Loading.event.$on('loadingHide', _ => {
      this.hide();
    })
  },
  methods: {
    show() {
      this.execProcess = true
    },
    hide() {
      this.execProcess = false
    }
  }
}
</script>
<style>
#loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1100;
  background-color: #000000;
  opacity: 0.5;
  filter: alpha(opacity=50); /* For IE8 and earlier */
}
#loader {
  display: block;
  position: relative;
  left: 45%;
  top: 55%;
  width: 30px;
  height: 30px;
  margin: -150px 0 0 0;
  z-index: 1110;
}
#loader > .text-center > div > i {
  font-size: 550%;
}
</style>
