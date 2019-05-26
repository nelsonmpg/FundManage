<template>
  <b-row class="animated fadeIn">
    <b-col cols="12">
      <b-card no-header>
        <template slot="header">
          <b-row>
            <b-col cols="6">
              <h3>Fund Info</h3>
            </b-col>
            <b-col cols="6">
              <div class="card-header-actions">
                <b-button-toolbar class="float-right" aria-label="Toolbar with buttons group">
                  <b-button-group>
                    <!-- <b-button variant="outline-primary">Edit</b-button> -->
                    <b-button variant="outline-danger">
                      <i class="cui-trash icons"></i> Delete
                    </b-button>
                  </b-button-group>
                </b-button-toolbar>
              </div>
            </b-col>
          </b-row>
        </template>
        <b-form>
          <b-row>
            <b-col xl="9" lg="8" md="6" sm="12" xs="12">
              <b-row>
                <b-col xl="5" lg="6" md="12" sm="12" xs="12" class="mb-3">
                  <b-form-group class="mb-0">
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>Fund ISIN</b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input :value="isin" type="text" disabled></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col xl="3" lg="6" md="12" sm="12" xs="12" class="mb-3">
                  <b-form-group class="mb-0">
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>Currency</b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input
                        :value="getSymbolFromCurrency(currency.toUpperCase()) + ' (' + currency.toUpperCase() + ')'"
                        type="text"
                        disabled
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col xl="4" lg="12" md="12" sm="12" xs="12" class="mb-3">
                  <b-form-group class="mb-0">
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>Fund Rating</b-input-group-text>
                      </b-input-group-prepend>
                      <b-input-group-text v-if="ratingFund > 0">
                        <i class="fa fa-star fa-lg" v-for="n in ratingFund" :key="n">&nbsp;&nbsp;</i>
                      </b-input-group-text>
                      <b-input-group-text v-else>No Rating</b-input-group-text>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>Fund Name</b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input :value="fundName" type="text" disabled></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>Full Fund Name</b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input :value="fullFundName" type="text" disabled></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>Category</b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input :value="fundCategory" type="text" disabled></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="6" md="12" sm="12" xs="12">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>Fund Start Date</b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input :value="utils.onlyDateFormat(fundStart)" type="text" disabled></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col lg="6" md="12" sm="12" xs="12">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>Start Price</b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input
                        :value="utils.formatCurrency(fundStartPrice)"
                        type="text"
                        disabled
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="6" md="12" sm="12" xs="12">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>Fund Last Date Update</b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input
                        :value="utils.onlyDateFormat(fundLastUpdate)"
                        type="text"
                        disabled
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col lg="6" md="12" sm="12" xs="12">
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text>Last Price</b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input
                        :value="utils.formatCurrency(fundLastPrice)"
                        type="text"
                        disabled
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col xl="3" lg="4" md="6" sm="12" xs="12">
              <b-card header="Domicile">
                <b-row>
                  <b-col sm="12" class="text-center">
                    <img :src="domicileFlag" class="img-fluid" alt>
                    <h5 class="mt-2 mb-0">{{domicile}}</h5>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
          <b-card header="Available Sale">
            <b-row>
              <flag v-for="(country, index) in countiesList" :country="country" :key="index"></flag>
            </b-row>
          </b-card>
          <div slot="footer"></div>
        </b-form>
        <b-row>
          <b-col cols="12">
            <b-card no-header>
              <template slot="header">
                <b-row>
                  <b-col lg="4" md="12" sm="12" xs="12">
                    <h4 class="card-title">Fund History</h4>
                  </b-col>
                  <b-col lg="8" md="12" sm="12" xs="12" class="d-md-block">
                    <b-button-toolbar class="float-right" aria-label="Toolbar with buttons group">
                      <b-form-radio-group
                        id="radiosBtn"
                        buttons
                        button-variant="outline-secondary"
                        v-model="selected"
                        name="radiosBtn"
                      >
                        <b-form-radio value="30">1M</b-form-radio>
                        <b-form-radio value="90">3M</b-form-radio>
                        <b-form-radio value="180">6M</b-form-radio>
                        <b-form-radio value="365">1Y</b-form-radio>
                        <b-form-radio value="730">2Y</b-form-radio>
                        <b-form-radio value="1095">3Y</b-form-radio>
                        <b-form-radio value="1460">4Y</b-form-radio>
                        <b-form-radio value="1825">5Y</b-form-radio>
                      </b-form-radio-group>
                    </b-button-toolbar>
                  </b-col>
                </b-row>
              </template>
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
            </b-card>
          </b-col>
        </b-row>
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
import Flag from "./../../components/flag.vue";
import utils from "./../../shared/utilsLib.js";
import getSymbolFromCurrency from "currency-symbol-map";
export default {
  components: {
    ChartLine,
    Flag
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
      selected: "30",
      isin: "",
      fundName: "",
      fullFundName: "",
      fundCategory: "",
      ratingFund: 0,
      showChart: false,
      countiesList: [],
      domicileFlag: "",
      domicile: "",
      currency: "",
      fundStart: "",
      fundStartPrice: 0,
      fundLastUpdate: "",
      fundLastPrice: 0,
      utils,
      getSymbolFromCurrency
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
            // console.log("fund data", data);
            this.fundName = data.data.name;
            this.fullFundName = this.utils.decodeString(data.data.nameFull);
            this.fundCategory = this.utils.decodeString(data.data.category);
            this.ratingFund = data.data.rating;
            if (data.list) {
              this.countiesList = data.list;
            }
            if (data.country) {
              this.domicileFlag = data.country.flag;
            }
            this.domicile = data.data.domicile;
            this.currency = data.data.currency;
            let hist = data.data.HistoryDetail;
            if (hist.length > 0) {
              this.fundStart = hist[0].EndDate;
              this.fundStartPrice = hist[0].Value;
              this.fundLastUpdate = hist[hist.length - 1].EndDate;
              this.fundLastPrice = hist[hist.length - 1].Value;
            }
            for (let index = 0; index < hist.length; index++) {
              this.historyValues.labels.push(
                utils.onlyShortDateFormat(hist[index].EndDate)
              );
              this.historyValues.values.push(hist[index].Value);
            }
            let lArr = this.historyValues.labels.slice(
              Math.max(this.historyValues.labels.length - this.selected, 1)
            );
            let vArr = this.historyValues.values.slice(
              Math.max(this.historyValues.values.length - this.selected, 1)
            );

            this.createChartData(lArr, vArr);
          } else {
            this.$notify({
              group: "notification",
              title: "Find fund.",
              type: "warning",
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
            title: "New fund existes.",
            type: "danger",
            text: "Error " + err,
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
