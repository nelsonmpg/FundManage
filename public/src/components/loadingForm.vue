<template>
  <div class="modal-success fade show bg-gray-900" no-header v-show="execProcess">
    <div style="position: absolute; z-index: 1040;">
      <div class="modal fade show d-block">
        <div class="modal-dialog">
          <div role="document" class="modal-content">
            <div class="modal-body">
              <h1 class="text-center">
                <br />
                <p>
                  <CIcon class="rotate" :height="50" name="cib-anaconda" />
                </p>
                <p v-if="showProgressBar">Wait...</p>
                <p v-else>Loading...</p>
                <br />
              </h1>
              <CCol col="12" v-show="showProgressBar">
                <CProgress>
                  <CProgressBar color="info" striped animated :value="pbStyle" :max="max"></CProgressBar>
                </CProgress>
              </CCol>
              <CRom v-show="showProgressBar">
                <CCol>{{ text }}</CCol>
                <CCol class="ml-auto">{{ pbarVal }}%</CCol>
              </CRom>
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
      pbStyle: 0,
      text: "",
      striped: true,
      animate: true,
      max: 100
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
      this.pbStyle = val;
    }
  }
};
</script>
<style>
.rotate {
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
