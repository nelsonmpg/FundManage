<template>
  <CRow class="animated fadeIn">
    <CCol col="12">
      <CCard no-header>
        <CCardHeader>
          <CRow>
            <CCol col="6">
              <h3 class="card-title">Portfolio Details</h3>
            </CCol>
            <CCol col="6" class="d-none d-md-block">
              <CButton
                @click="deleteWallet"
                class="float-right mb-2"
                color="danger"
                variant="outline"
              >
                <CIcon name="cil-trash" />&nbsp;&nbsp;Delete
              </CButton>
              <CButton
                @click="openWalletEdit"
                class="float-right mb-2"
                color="info"
                variant="outline"
              >
                <CIcon name="cil-pen-alt" />&nbsp;&nbsp;Edit
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CRow>
              <CCol col="12" class="mb-2">
                <CInput class="mb-0" :value="walletName" type="text" disabled>
                  <template #prepend>
                    <CButton color="dark" disabled>Portfolio Name</CButton>
                  </template>
                </CInput>
              </CCol>
            </CRow>
            <CRow>
              <CCol xl="3" lg="3" md="12" sm="12" xs="12" class="mb-2">
                <CInput
                  class="mb-0"
                  :value="utils.formatCurrency(totalInvest)"
                  type="text"
                  disabled
                >
                  <template #prepend>
                    <CButton color="dark" disabled>Total Invest</CButton>
                  </template>
                </CInput>
              </CCol>
              <CCol xl="3" lg="3" md="12" sm="12" xs="12" class="mb-2">
                <CInput class="mb-0" :value="utils.formatCurrency(totalEnd)" type="text" disabled>
                  <template #prepend>
                    <CButton color="dark" disabled>€ Total</CButton>
                  </template>
                </CInput>
              </CCol>
              <CCol xl="3" lg="3" md="12" sm="12" xs="12" class="mb-2">
                <CInput
                  class="mb-0"
                  :value="utils.formatCurrency(totalEnd - totalInvest)"
                  type="text"
                  disabled
                >
                  <template #prepend>
                    <CButton color="dark" disabled>€ Total Gain</CButton>
                  </template>
                </CInput>
              </CCol>
              <CCol xl="3" lg="3" md="12" sm="12" xs="12" class="mb-2">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <button type="button" disabled="disabled" class="btn btn-dark disabled">Status</button>
                  </div>
                  <div class="form-control" style="background-color: hsla(0,0%,100%,.12);">
                    <CIcon
                      v-if="valArrow >= 0"
                      :name="(valArrow > 0) ? 'cil-hand-point-up' : 'cil-hand-point-down'"
                      :height="20"
                      :class="(valArrow > 0) ? 'bg-success' : 'bg-danger'"
                    />
                  </div>
                </div>
              </CCol>
            </CRow>
          </CForm>
          <CRow>
            <CCol col="12" class="mb-0 pb-0">
              <CCard no-body>
                <CCardBody>
                  <CTableWrapper
                    :items="items"
                    :fields="fields"
                    hover
                    striped
                    bordered
                    small
                    fixed
                    sorter
                    responsive
                    :caption="'List Funds in Portfolio'"
                    :place="'funds'"
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol col="12" v-if="showChart">
              <resize-chart-line :lineChartId="'lineChart-1'" :dataChartVals="walletMoney"></resize-chart-line>
            </CCol>
            <!-- <CCol
              xl="6"
              lg="6"
              md="12"
              sm="12"
              xs="12"
              v-for="(fund, index) in charFundsData"
              :key="index"
            >
              <resize-chart-line :lineChartId="'lineChartFund-' + index" :dataChartVals="fund"></resize-chart-line>
            </CCol>-->
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol col="12">
              <CButton block variant="outline" color="primary" @click="goBack">
                <CIcon name="cil-account-logout" />&nbsp;&nbsp;Back
              </CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </CCol>
    <CModal
      :show.sync="deleteWalletModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Attention"
      color="danger"
    >
      Are you sure you want to delete the Portfolio?
      <br />
      "{{ walletName }}"
      <template #header>
        <h6 class="modal-title">Attention</h6>
        <CButtonClose @click="deleteWalletModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton @click="deleteWalletModal = false" variant="outline" color="info">Cancel</CButton>
        <CButton @click="deleteWalletModal()" variant="outline" color="danger">Ok</CButton>
      </template>
    </CModal>
  </CRow>
</template>
<script>
import CTableWrapper from "./../../components/Table.vue";
import ResizeChartLine from "./../../components/resizeChartLine.vue";
import utils from "./../../shared/utilsLib.js";
export default {
  components: {
    ResizeChartLine,
    CTableWrapper
  },
  name: "PortfolioView",
  data: () => {
    return {
      wallet: "",
      walletName: "",
      items: [],
      fields: [
        { key: "name", label: "Fund Name", _classes: "text-center" },
        { key: "isin", _classes: "text-center" },
        { key: "dateInvest", label: "Invested Date", _classes: "text-center" },
        { key: "nUps", label: "Nº Ups", _classes: "text-center" },
        { key: "cotacaoUp", label: "Buy Price", _classes: "text-center" },
        { key: "valInvest", label: "Invested Value", _classes: "text-center" },
        { key: "lastvalUp", label: "Last Value Up", _classes: "text-center" },
        { key: "lastDate", label: "Last Date Update", _classes: "text-center" },
        { key: "lastVal", label: "Last Value", _classes: "text-center" },
        { key: "gainValue", label: "Gain", _classes: "text-center" },
        { key: "active", label: "Active", _classes: "text-center" },
        { key: "dateInative", _classes: "text-center" }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      walletMoney: {
        labels: [],
        values: [],
        title: "Portfolio History"
      },
      charFundsData: [],
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
              if (fundWallet[x]) {
                refactWallet.push({
                  isin: fundWallet[x].isin,
                  name: fundWallet[x].name,
                  dateInvest: fundWallet[x].dateInvest,
                  nUps: fundWallet[x].nUps,
                  cotacaoUp: fundWallet[x].cotacaoUp,
                  valInvest: fundWallet[x].valInvest,
                  lastvalUp:
                    fundWallet[x].moneyFund[fundWallet[x].moneyFund.length - 1]
                      .Value,
                  lastDate:
                    fundWallet[x].moneyFund[fundWallet[x].moneyFund.length - 1]
                      .EndDate,
                  lastVal:
                    fundWallet[x].moneyFund[fundWallet[x].moneyFund.length - 1]
                      .moneyCalc,
                  gainValue:
                    fundWallet[x].moneyFund[fundWallet[x].moneyFund.length - 1]
                      .moneyCalc - fundWallet[x].valInvest,
                  active: fundWallet[x].active,
                  dateInative: fundWallet[x].dateInative
                });
                let lChart = [],
                  dChart = [];

                for (
                  let fData = 0;
                  fData < fundWallet[x].moneyFund.length;
                  fData++
                ) {
                  lChart.push(
                    utils.onlyShortDateFormat(
                      fundWallet[x].moneyFund[fData].EndDate
                    )
                  );
                  dChart.push(fundWallet[x].moneyFund[fData].moneyCalc);
                }

                this.charFundsData.push({
                  labels: lChart,
                  values: dChart,
                  title: fundWallet[x].name + " - " + fundWallet[x].isin
                });
              }
            }
            this.items = refactWallet;
            this.items = this.items.sort(utils.dynamicSort("name"));
            let moneyAll = walletData.moneyWallet;
            for (let index = 0; index < moneyAll.length; index++) {
              this.walletMoney.labels.push(
                utils.onlyShortDateFormat(moneyAll[index].EndDate)
              );
              this.walletMoney.values.push(
                moneyAll[index].moneyWalletCalc.toFixed(2)
              );
            }
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
  watch: {}
};
</script>
