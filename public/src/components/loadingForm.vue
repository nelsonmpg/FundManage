<template>
  <div class="modal-success fade show bg-gray-900" no-header v-show="execProcess">
    <div style="position: absolute; z-index: 1040;">
      <div class="modal fade show d-block">
        <div class="modal-dialog">
          <div role="document" class="modal-content">
            <div class="modal-body">
              <h1 class="text-center">
                <br>
                <p>
                  <i class="fa fa-refresh fa-spin fa-lg"></i>
                </p>
                <p v-if="showProgressBar">Wait...</p>
                <p v-else>Loading...</p>
                <br>
              </h1>
              <div class="progress" v-show="showProgressBar">
                <div
                  class="progress-bar progress-bar-striped bg-success"
                  role="progressbar"
                  :style="pbStyle"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >{{pbarVal}}%</div>
              </div>
              <b-row v-show="showProgressBar">
                <b-col cols="10">{{text}}</b-col>
                <b-col cols="2" class="text-right">{{pbarVal}}%</b-col>
              </b-row>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show"></div>
    </div>
  </div>
</template>
<script>
import Loading from "./loading.js";
import { clearInterval } from "timers";
export default {
  name: "loading",
  data() {
    return {
      execProcess: false,
      showProgressBar: false,
      pbarVal: 0,
      pbStyle: "width: 0%",
      text: ""
    };
  },
  beforeMount() {
    Loading.event.$on("loadingShow", _ => {
      this.show();
    });
    Loading.event.$on("loadingHide", _ => {
      this.hide();
    });
    Loading.event.$on("loadingProgressBarShow", _ => {
      this.showProgessBar();
    });
  },
  methods: {
    show() {
      this.execProcess = true;
      this.showProgressBar = false;
    },
    hide() {
      this.execProcess = false;
      this.showProgressBar = false;
      this.pbarVal = 0;
    },
    showProgessBar() {
      this.execProcess = true;
      this.showProgressBar = true;
      this.pbarVal = 0;
    }
  },
  beforeDestroy() {},
  watch: {
    pbarVal: function(val) {
      this.pbStyle = "width: " + val + "%";
    }
  }
};
</script>
<style>
</style>
