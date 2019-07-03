<template>
  <b-row class="animated fadeIn">
    <b-col cols="12">
      <b-card no-header>
        <template slot="header">
          <b-row>
            <b-col cols="6">
              <h3 class="card-title">Portfolio Details</h3>
            </b-col>
            <b-col cols="6">
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
        <b-form>
          <b-row>
            <b-col cols="12">
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Portfolio Name</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :value="walletName" type="text" disabled></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col xl="3" lg="3" md="12" sm="12" xs="12">
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>€ Total Invest</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :value="utils.formatCurrency(totalInvest)" type="text" disabled></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col xl="3" lg="3" md="12" sm="12" xs="12">
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>€ Total</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :value="utils.formatCurrency(totalEnd)" type="text" disabled></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col xl="3" lg="3" md="12" sm="12" xs="12">
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>€ Total Gain</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    :value="utils.formatCurrency(totalEnd - totalInvest)"
                    type="text"
                    disabled
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col xl="3" lg="3" md="12" sm="12" xs="12">
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Status</b-input-group-text>
                  </b-input-group-prepend>
                  <b-input-group-text
                    :class="'bg-' + (valArrow > 0 ? 'success' : (valArrow = 0 ? 'info' : 'danger'))"
                  >
                    <i class="fa" :class="'fa-thumbs-' + (valArrow >= 0 ? 'up' : 'down')"></i>
                  </b-input-group-text>
                </b-input-group>
              </b-form-group>
            </b-col>
            <!---->
          </b-row>
          <div slot="footer"></div>
        </b-form>
        <b-row>
          <b-col cols="12">
            <b-card no-body>
              <template slot="header">
                <b-row>
                  <b-col cols="12">
                    <h4 class="card-title">{{ caption }}</h4>
                  </b-col>
                </b-row>
              </template>
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
                  <input type="checkbox" :checked="data.item.active" disabled />
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
                <template
                  slot="lastVal"
                  slot-scope="data"
                >{{utils.formatCurrency(data.item.lastVal)}}</template>
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
                  align="center"
                  :total-rows="getRowCount(items)"
                  :per-page="perPage"
                  v-model="currentPage"
                  prev-text="Prev"
                  next-text="Next"
                />
              </nav>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-card no-header>
              <template slot="header">
                <b-row>
                  <b-col cols="5">
                    <h4 class="card-title">Portfolio History</h4>
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
                        <b-form-radio v-if="walletMoney.labels.length >= 90" value="90">3M</b-form-radio>
                        <b-form-radio v-if="walletMoney.labels.length >= 180" value="180">6M</b-form-radio>
                        <b-form-radio v-if="walletMoney.labels.length >= 365" value="365">1Y</b-form-radio>
                        <b-form-radio v-if="walletMoney.labels.length >= 730" value="730">2Y</b-form-radio>
                        <b-form-radio v-if="walletMoney.labels.length >= 1095" value="1095">3Y</b-form-radio>
                        <b-form-radio v-if="walletMoney.labels.length >= 1460" value="1460">4Y</b-form-radio>
                        <b-form-radio v-if="walletMoney.labels.length >= 1825" value="1825">5Y</b-form-radio>
                        <b-form-radio :value="walletMoney.labels.length">All</b-form-radio>
                      </b-form-radio-group>
                    </b-button-toolbar>
                  </b-col>
                </b-row>
              </template>
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
      <br />
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
      selected: "30",
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
      totalInvest: 0,
      totalEnd: 0,
      valArrow: 0,
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
      this.$loading.show();
      this.$http
        .delete(
          utils.geturl() +
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
              title: "Delete Portfolio.",
              type: "success",
              text: data.data,
              position: "top center"
            });
            this.$router.push("/Portfoliofunds");
          } else {
            this.$notify({
              group: "notification",
              title: "Delete Portfolio.",
              type: "warning",
              text: data.data,
              position: "top center"
            });
          }
          this.$loading.hide();
        })
        .catch(function(err) {
          console.log("Error", err);
          if (err && err.status === 401) {
            this.$router.push("/login");
            localStorage.removeItem("user");
            this.$notify({
              group: "notification",
              title: "Login Error.",
              type: "danger",
              text: err.body.data,
              position: "top center"
            });
          } else {
            this.$notify({
              group: "notification",
              title: "Error Delete Portfolio.",
              type: "danger",
              text: "Error " + err,
              position: "top center"
            });
          }
          this.$loading.hide();
        });
    },
    openWalletEdit() {
      this.$router.push("/Portfoliofunds/PortfolioEdit/" + this.wallet);
    },
    getWalletFundList() {
      this.$http
        .get(
          utils.geturl() +
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
            this.totalInvest = walletData.startWalletMoney;
            this.totalEnd = walletData.lastWalletMoney;
            this.valArrow = this.totalEnd - this.totalInvest;
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
              title: "Find portfolio.",
              type: "warning",
              text: data.data,
              position: "top center"
            });
          }
          this.$loading.hide();
        })
        .catch(function(err) {
          console.log("Error", err);
          if (err && err.status === 401) {
            this.$router.push("/login");
            localStorage.removeItem("user");
            this.$notify({
              group: "notification",
              title: "Login Error.",
              type: "danger",
              text: err.body.data,
              position: "top center"
            });
          } else {
            this.$notify({
              group: "notification",
              title: "Error get user portfolio.",
              type: "danger",
              text: "Error " + err,
              position: "top center"
            });
          }
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
