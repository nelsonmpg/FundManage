<template>
  <CRow v-show="fundupdate.status">
    <CCol col="12">
      <h5>{{ fundupdate.name }}</h5>
    </CCol>
    <CCol col="12">
      <CProgress>
        <CProgressBar
          color="info"
          striped
          animated
          :value="pbStyle"
          :max="max"
        ></CProgressBar>
      </CProgress>
    </CCol>
    <CCol>{{ text }}</CCol>
    <CCol class="ml-auto">{{ pbarVal }}%</CCol>
  </CRow>
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
      pbStyle: this.pbarVal,
      text: this.fundupdate.step,
      striped: true,
      animate: true,
      max: 100
    };
  },
  beforeDestroy() {},
  watch: {
    fundstep: function(val) {
      this.text = val;
    },
    fundval: function(val) {
      this.pbarVal = val;
      this.pbStyle = this.pbarVal;
    }
  }
};
</script>
