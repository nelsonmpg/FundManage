<template>
  <b-row v-show="fundupdate.status">
    <b-col cols="12">
      <h3>{{ fundupdate.name }}</h3>
    </b-col>
    <b-col cols="12">
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped bg-info"
          role="progressbar"
          :style="pbStyle"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </b-col>
    <b-col cols="8">{{text}}</b-col>
    <b-col cols="4" class="text-right">{{pbarVal}}%</b-col>
  </b-row>
</template>
<script>
export default {
  props: ["fundupdate", "fundstep", "fundval"],
  name: "Progress Bar Update Fund Info",
  data() {
    return {
      execProcess: false,
      showProgressBar: false,
      pbarVal: this.fundupdate.val,
      pbStyle: "width: " + this.pbarVal + "%",
      text: this.fundupdate.step
    };
  },
  beforeDestroy() {},
  watch: {
    fundstep: function(val) {
      this.text = val;
    },
    fundval: function(val) {
      this.pbarVal = val;
      this.pbStyle = "width: " + this.pbarVal + "%";
    }
  }
};
</script>
