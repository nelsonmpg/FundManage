<template>
  <b-row class="animated fadeIn">
    <b-col cols="12">
      <b-card no-header>
        <template slot="header">
          <b-row>
            <b-col sm="8">
              <b-form-group class="mb-0">
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Portfolio Name</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :value="walletName" type="text" disabled></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-button-toolbar class="float-right" aria-label="Toolbar with buttons group">
                <b-button-group>
                  <b-button @click="openWalletEdit" variant="outline-primary">
                    <i class="cui-note icons"></i> Edit
                  </b-button>
                  <b-button @click="deleteWallet" variant="outline-danger">
                    <i class="cui-trash icons"></i> Delete
                  </b-button>
                </b-button-group>
              </b-button-toolbar>
            </b-col>
          </b-row>
        </template>
        <b-row>
          <b-col sm="12">
            <h3>{{caption}}</h3>
            <b-table
              stripe
              bordered
              small
              responsive="sm"
              :items="items"
              :fields="fields"
              :current-page="currentPage"
              :per-page="perPage"
              @row-clicked="rowClicked"
            >
              <template
                slot="dateInvest"
                slot-scope="data"
              >{{utils.onlyDateFormat(data.item.dateInvest)}}</template>
              <template
                slot="cotacaoUp"
                slot-scope="data"
              >{{utils.formatCurrency(data.item.cotacaoUp)}}</template>
              <template
                slot="valInvest"
                slot-scope="data"
              >{{utils.formatCurrency(data.item.valInvest)}}</template>
              <template slot="active" slot-scope="data">
                <input type="checkbox" :checked="data.item.active" disabled>
              </template>
              <template slot="dateInative" slot-scope="data">
                <n v-if="!data.item.active">{{utils.onlyDateFormat(data.item.dateInative)}}</n>
                <n v-else>- - -</n>
              </template>
              <template
                slot="lastvalUp"
                slot-scope="data"
              >{{utils.formatCurrency(data.item.lastvalUp)}}</template>
              <template
                slot="lastDate"
                slot-scope="data"
              >{{utils.onlyDateFormat(data.item.lastDate)}}</template>
              <template slot="lastVal" slot-scope="data">{{utils.formatCurrency(data.item.lastVal)}}</template>
              <template slot="gainValue" slot-scope="data">
                <b-card
                  :no-body="true"
                  class="mt-0 mb-0 pt-0 pb-0"
                  :class="data.item.gainValue > 0 ? 'bg-success' : 'bg-danger'"
                >
                  <b v-if="data.item.active">{{utils.formatCurrency(data.item.gainValue)}}</b>
                  <b v-else>0,00</b>
                </b-card>
              </template>
            </b-table>
            <nav>
              <b-pagination
                size="sm"
                :total-rows="getRowCount(items)"
                :per-page="perPage"
                v-model="currentPage"
                prev-text="Prev"
                next-text="Next"
                hide-goto-end-buttons
              />
            </nav>
          </b-col>
          <b-col sm="12">
            <b-row>
              <b-col sm="4">
                <h4 class="card-title mb-0">Portfolio History</h4>
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
                    <b-form-radio
                      class="mx-0"
                      v-if="walletMoney.labels.length >= 66"
                      value="66"
                    >Last 3 Months</b-form-radio>
                    <b-form-radio
                      class="mx-0"
                      v-if="walletMoney.labels.length >= 130"
                      value="130"
                    >Last 6 Months</b-form-radio>
                    <b-form-radio
                      class="mx-0"
                      v-if="walletMoney.labels.length >= 260"
                      value="260"
                    >Last 1 Year</b-form-radio>
                    <b-form-radio class="mx-0" :value="walletMoney.labels.length">All</b-form-radio>
                  </b-form-radio-group>
                </b-button-toolbar>
              </b-col>
            </b-row>
            <b-card class="mt-3 mb-0 pb-0">
              <b-row>
                <b-col sm="12" v-if="showChart">
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
    <b-modal
      title="Attention"
      class="modal-danger"
      v-model="deleteWalletModal"
      @ok="closeModalAccept"
      ok-variant="danger"
    >
      Are you sure you want to delete the Portfolio?
      <br>
      "{{ walletName }}"
    </b-modal>
  </b-row>
</template>
<script>
import ChartLine from "./../../components/chartLine.vue";
import utils from "./../../shared/utilsLib.js";
export default {
  components: {
    ChartLine
  },
  props: {
    caption: {
      type: String,
      default: "List Funds in Portfolio"
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  name: "PortfolioView",
  data: () => {
    return {
      wallet: "",
      walletName: "",
      selected: "22",
      items: [],
      fields: [
        { key: "name", sortable: true, label: "Fund Name" },
        { key: "isin", sortable: true },
        { key: "dateInvest", label: "Invested Date" },
        { key: "nUps", label: "Nº Ups" },
        { key: "cotacaoUp", label: "Buy Price" },
        { key: "valInvest", label: "Invested Value" },
        { key: "lastvalUp", label: "Last Value Up" },
        { key: "lastDate", label: "Last Date Update" },
        { key: "lastVal", label: "Last Value" },
        { key: "gainValue", label: "Gain", sortable: true },
        { key: "active", label: "Active" },
        { key: "dateInative" }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      walletMoney: {
        labels: [],
        values: []
      },
      chartData: {
        labels: [],
        values: []
      },
      showChart: false,
      deleteWalletModal: false,
      utils
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      this.$router.replace({ path: "/Portfoliofunds" });
    },
    deleteWallet() {
      this.deleteWalletModal = true;
    },
    closeModalAccept() {
      this.deleteWalletModal = false;
      this.$http
        .delete(
          "/api/portfoliofunds/" +
            JSON.parse(localStorage.getItem("user")).data._id +
            "/" +
            this.wallet
        )
        .then(function(response) {
          let data = response.data;
          if (data.status === true) {
            this.$notify({
              group: "notification",
              title: "Find fund.",
              type: "info",
              text: data.data,
              position: "top center"
            });
            this.$router.push("/Portfoliofunds");
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
            text: err,
            position: "top center"
          });
          this.$loading.hide();
        });
    },
    openWalletEdit() {
      this.$router.push("/Portfoliofunds/PortfolioEdit/" + this.wallet);
    },
    getWalletFundList() {
      this.$http
        .get(
          "/api/portfoliofunds/" +
            JSON.parse(localStorage.getItem("user")).data._id +
            "/" +
            this.wallet
        )
        .then(function(response) {
          let data = response.data;
          // console.log("Wallet Funds List", data);
          if (data.status === true) {
            let walletData = data.data,
              fundWallet = walletData.listFunds,
              refactWallet = [];
            this.walletName = walletData.nameWallet;
            for (let x = 0; x < fundWallet.length; x++) {
              for (let y = 0; y < fundWallet[x].investList.length; y++) {
                if (fundWallet[x].investList[y]) {
                  refactWallet.push({
                    isin: fundWallet[x].isin,
                    name: fundWallet[x].name,
                    dateInvest: fundWallet[x].investList[y].dateInvest,
                    nUps: fundWallet[x].investList[y].nUps,
                    cotacaoUp: fundWallet[x].investList[y].cotacaoUp,
                    valInvest: fundWallet[x].investList[y].valInvest,
                    lastvalUp:
                      fundWallet[x].investList[y].moneyFund[
                        fundWallet[x].investList[y].moneyFund.length - 1
                      ].Value,
                    lastDate:
                      fundWallet[x].investList[y].moneyFund[
                        fundWallet[x].investList[y].moneyFund.length - 1
                      ].EndDate,
                    lastVal:
                      fundWallet[x].investList[y].moneyFund[
                        fundWallet[x].investList[y].moneyFund.length - 1
                      ].moneyCalc,
                    gainValue:
                      fundWallet[x].investList[y].moneyFund[
                        fundWallet[x].investList[y].moneyFund.length - 1
                      ].moneyCalc - fundWallet[x].investList[y].valInvest,
                    active: fundWallet[x].investList[y].active,
                    dateInative: fundWallet[x].investList[y].dateInative
                  });
                }
              }
            }
            this.items = refactWallet;
            let moneyAll = walletData.moneyWallet;
            for (let index = 0; index < moneyAll.length; index++) {
              this.walletMoney.labels.push(
                utils.onlyShortDateFormat(moneyAll[index].EndDate)
              );
              this.walletMoney.values.push(
                moneyAll[index].moneyWalletCalc.toFixed(2)
              );
            }
            let lArr = this.walletMoney.labels.slice(
              Math.max(this.walletMoney.labels.length - this.selected, 1)
            );
            let vArr = this.walletMoney.values.slice(
              Math.max(this.walletMoney.values.length - this.selected, 1)
            );
            this.createChartData(lArr, vArr);
            this.showChart = true;
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
            title: "Error Find fund.",
            type: "warn",
            text: err,
            position: "top center"
          });
          this.$loading.hide();
        });
    },
    getRowCount(items) {
      return items.length;
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
    this.wallet = this.$route.params.wallet;
    this.getWalletFundList();
  },
  mounted() {
    this.$loading.show();
  },
  beforeCreate() {},
  beforeDestroy() {},
  watch: {
    selected: function(value) {
      let lArrUp = this.walletMoney.labels.slice(
        Math.max(this.walletMoney.labels.length - value, 1)
      );
      let vArrUp = this.walletMoney.values.slice(
        Math.max(this.walletMoney.values.length - value, 1)
      );
      this.createChartData(lArrUp, vArrUp);
    }
  }
};
</script>
