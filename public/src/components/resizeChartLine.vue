<template>
  <CCard no-header v-if="showChart">
    <CCardHeader>
      <CRow>
        <CCol cols="5">
          <h5 class="card-title">{{ dataChartVals.title }}</h5>
        </CCol>
        <CCol cols="7" class="d-md-block d-sm-block d-xs-block">
          <CButtonGroup class="float-right mr-3">
            <CButton
              color="outline-secondary"
              v-model="selected"
              size="sm"
              name="radiosBtn"
              v-for="(value, key) in listChartFiltered"
              :key="key"
              class="mx-0"
              :pressed="value.v === selected ? true : false"
              @click="selected = value.v"
            >{{value.l}}</CButton>
          </CButtonGroup>
        </CCol>
      </CRow>
    </CCardHeader>
    <CCardBody>
      <CRow>
        <CCol cols="12">
          <chart-line
            :id="lineChartId"
            :lineChartId="lineChartId"
            :chartTitle="''"
            :dataChartLabel="chartDataVals.labels"
            :dataChartValues="chartDataVals.values"
          ></chart-line>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>
<script>
import ChartLine from "./chartLine.vue";
export default {
  components: {
    ChartLine
  },
  data() {
    return {
      listChartFiltered: [],
      listChartFilter: [
        { l: "1M", v: 30 },
        { l: "3M", v: 90 },
        { l: "6M", v: 180 },
        { l: "1Y", v: 365 },
        { l: "2Y", v: 730 },
        { l: "3Y", v: 1095 },
        { l: "4Y", v: 1460 },
        { l: "5Y", v: 1825 }
      ],
      selected: 30,
      chartDataVals: {
        labels: [],
        values: []
      },
      showChart: false
    };
  },
  props: ["lineChartId", "dataChartVals"],
  name: "ResizeChartLine",
  methods: {
    createChartData(arrL, arrV) {
      this.chartDataVals = {
        labels: arrL,
        values: arrV
      };
      this.showChart = true;
    },
    filterChartOpts: function(fullDataLength) {
      let arrRet = this.listChartFilter.filter(function(value) {
        return fullDataLength >= value.v;
      });
      arrRet.push({
        l: "All",
        v: fullDataLength
      });
      if (arrRet.length === 1) {
        this.selected = fullDataLength;
      }
      return arrRet;
    }
  },
  mounted() {
    if (this.dataChartVals) {
      let lArr = this.dataChartVals.labels.slice(
        Math.max(this.dataChartVals.labels.length - this.selected, 1)
      );
      let vArr = this.dataChartVals.values.slice(
        Math.max(this.dataChartVals.values.length - this.selected, 1)
      );
      this.listChartFiltered = this.filterChartOpts(
        this.dataChartVals.labels.length
      );
      this.createChartData(lArr, vArr);
      this.showChart = true;
    }
  },
  beforeCreate() {},
  beforeDestroy() {},
  watch: {
    selected: function(value) {
      let lArrUp = this.dataChartVals.labels.slice(
        Math.max(this.dataChartVals.labels.length - value, 1)
      );
      let vArrUp = this.dataChartVals.values.slice(
        Math.max(this.dataChartVals.values.length - value, 1)
      );
      this.createChartData(lArrUp, vArrUp);
    }
  }
};
</script>
