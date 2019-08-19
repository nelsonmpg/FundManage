<template>
  <b-card no-header v-if="showChart">
    <template slot="header">
      <b-row>
        <b-col cols="5">
          <h4 class="card-title">{{ dataChartVals.title }}</h4>
        </b-col>
        <b-col cols="7" class="d-md-block d-sm-block d-xs-block">
          <b-button-toolbar class="float-right" aria-label="Toolbar with buttons group">
            <b-form-radio-group
              class="mr-3"
              id="radiosBtn"
              buttons
              button-variant="outline-secondary"
              v-model="selected"
              name="radiosBtn"
            >
              <b-form-radio value="30">1M</b-form-radio>
              <b-form-radio v-if="dataChartVals.labels.length >= 90" value="90">3M</b-form-radio>
              <b-form-radio v-if="dataChartVals.labels.length >= 180" value="180">6M</b-form-radio>
              <b-form-radio v-if="dataChartVals.labels.length >= 365" value="365">1Y</b-form-radio>
              <b-form-radio v-if="dataChartVals.labels.length >= 730" value="730">2Y</b-form-radio>
              <b-form-radio v-if="dataChartVals.labels.length >= 1095" value="1095">3Y</b-form-radio>
              <b-form-radio v-if="dataChartVals.labels.length >= 1460" value="1460">4Y</b-form-radio>
              <b-form-radio v-if="dataChartVals.labels.length >= 1825" value="1825">5Y</b-form-radio>
              <b-form-radio :value="dataChartVals.labels.length">All</b-form-radio>
            </b-form-radio-group>
          </b-button-toolbar>
        </b-col>
      </b-row>
    </template>
    <b-row>
      <b-col cols="12">
        <chart-line
          :id="lineChartId"
          :lineChartId="lineChartId"
          :chartTitle="''"
          :dataChartLabel="chartDataVals.labels"
          :dataChartValues="chartDataVals.values"
        ></chart-line>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import ChartLine from "./chartLine.vue";
export default {
  components: {
    ChartLine
  },
  data() {
    return {
      selected: "30",
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
