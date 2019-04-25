<template>
  <b-row class="animated fadeIn">
    <b-col cols="12">
      <b-card no-header>
        <template slot="header">
          <b-row>
            <b-col sm="4">
              <b-form-group class="mb-0">
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Fund ISIN</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :value="isin" type="text" disabled></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group class="mb-0">
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Fund Rating</b-input-group-text>
                  </b-input-group-prepend>
                  <b-input-group-text v-if="ratingFund > 0">
                    <i class="fa fa-star" v-for="n in ratingFund" :key="n">&nbsp;&nbsp;</i>
                  </b-input-group-text>
                  <b-input-group-text v-else>No Rating</b-input-group-text>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-button-toolbar class="float-right" aria-label="Toolbar with buttons group">
                <b-button-group>
                  <!-- <b-button variant="outline-primary">Edit</b-button> -->
                  <b-button variant="outline-danger"><i class="cui-trash icons"></i> Delete</b-button>
                </b-button-group>
              </b-button-toolbar>
            </b-col>
          </b-row>
        </template>
        <b-form>
          <b-row>
            <b-col sm="4">
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Fund Name</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :value="fundName" type="text" disabled></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col sm="8">
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Full Fund Name</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :value="fullFundName" type="text" disabled></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Category</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :value="fundCategory" type="text" disabled></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Fund Indice</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :value="fundIndice" type="text" disabled></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <div slot="footer"></div>
        </b-form>
        <b-row>
          <b-col sm="4">
            <h4 class="card-title mb-0">Fund History</h4>
          </b-col>
          <b-col sm="8" class="d-none d-md-block">
            <b-button-toolbar class="float-right" aria-label="Toolbar with buttons group">
              <b-form-radio-group
                class="mr-3"
                id="radiosBtn"
                buttons
                button-variant="outline-secondary"
                v-model="selected"
                name="radiosBtn"
              >
                <b-form-radio class="mx-0" value="22">Last 1 Month</b-form-radio>
                <b-form-radio class="mx-0" value="66">Last 3 Months</b-form-radio>
                <b-form-radio class="mx-0" value="130">Last 6 Months</b-form-radio>
                <b-form-radio class="mx-0" value="260">Last 1 Year</b-form-radio>
                <b-form-radio class="mx-0" value="520">Last 2 Years</b-form-radio>
                <b-form-radio class="mx-0" value="780">Last 3 Years</b-form-radio>
                <b-form-radio class="mx-0" value="1300">Last 5 Years</b-form-radio>
                <b-form-radio class="mx-0" value="1820">Last 7 Years</b-form-radio>
              </b-form-radio-group>
            </b-button-toolbar>
          </b-col>
        </b-row>
        <b-card class="mt-3 mb-0 pb-0">
          <b-row>
            <b-col cols="12" v-if="showChart">
              <chart-line
                :id="'lineChart-1'"
                :lineChartId="'lineChart-1'"
                :chartTitle="''"
                :dataChartLabel="chartData.labels"
                :dataChartValues="chartData.values"
              ></chart-line>
            </b-col>
          </b-row>
        </b-card>
        <template slot="footer">
          <b-row>
            <b-col cols="12">
              <b-button block variant="outline-primary" @click="goBack">
                <i class="cui-account-logout icons active mt-3"></i> Back
              </b-button>
            </b-col>
          </b-row>
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import ChartLine from "./../../components/chartLine.vue";
import utils from "./../../shared/utilsLib.js";
export default {
  components: {
    ChartLine
  },
  name: "Fund",
  data: () => {
    return {
      historyValues: {
        labels: [],
        values: []
      },
      chartData: {
        labels: [],
        values: []
      },
      selected: "22",
      isin: "",
      fundName: "",
      fullFundName: "",
      fundCategory: "",
      fundIndice: "",
      ratingFund: 0,
      showChart: false,
      utils
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      this.$router.replace({ path: "/funds" });
    },
    getFundData() {
      this.$http
        .get("/api/fund/" + this.isin + "/2000")
        .then(function(response) {
          let data = response.data;
          if (data.status === true) {
            console.log("fund data", data.data);

            this.fundName = data.data.name;
            this.fullFundName = this.utils.decodeString(data.data.nameFull);
            this.fundCategory = this.utils.decodeString(data.data.category);
            this.fundIndice = this.utils.decodeString(data.data.indice);
            this.ratingFund = data.data.rating;
            let hist = data.data.HistoryDetail;
            for (let index = 0; index < hist.length; index++) {
              this.historyValues.labels.push(utils.onlyShortDateFormat(hist[index].EndDate));
              this.historyValues.values.push(hist[index].Value);
            }
            let lArr = this.historyValues.labels.slice(Math.max(this.historyValues.labels.length - this.selected, 1));
            let vArr = this.historyValues.values.slice(Math.max(this.historyValues.values.length - this.selected, 1));

            this.createChartData(lArr, vArr);
          } else {
            this.$notify({
              group: "notification",
              title: "Find fund.",
              type: "warn",
              text: data.data,
              position: "top center"
            });
          }
          this.$loading.hide();
        })
        .catch(function(err) {
          console.log("Error", err);
          this.$notify({
            group: "notification",
            title: "Find fund.",
            type: "warn",
            text: err.body.data,
            position: "top center"
          });
          this.$loading.hide();
        });
    },
    createChartData(arrL, arrV) {
      this.chartData = {
        labels: arrL,
        values: arrV
      };
      this.showChart = true;
    }
  },
  created() {
    this.isin = this.$route.params.isin;
    this.getFundData();
  },
  mounted() {
    this.$loading.show();
  },
  beforeCreate() {},
  beforeDestroy() {},
  watch: {
    selected: function(value) {
      let lArrUp = this.historyValues.labels.slice(
        Math.max(this.historyValues.labels.length - value, 1)
      );
      let vArrUp = this.historyValues.values.slice(
        Math.max(this.historyValues.values.length - value, 1)
      );
      this.createChartData(lArrUp, vArrUp);
    }
  }
};
</script>
