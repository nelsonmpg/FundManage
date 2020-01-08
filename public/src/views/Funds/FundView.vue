<template>
  <CRow class="animated fadeIn">
    <CCol col="12">
      <CCard no-header>
        <CCardHeader>
          <CRow>
            <CCol sm="5">
              <h3 class="card-title mb-0">Fund Info</h3>
            </CCol>
            <CCol sm="7" class="d-none d-md-block">
              <CButton
                @click="deleteFund"
                class="float-right mb-2"
                color="danger"
                variant="outline"
              >
                <CIcon name="cil-trash" />&nbsp;&nbsp;Delete
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CRow>
              <CCol xl="9" lg="8" md="6" sm="12" xs="12" class="mb-2">
                <CRow>
                  <CCol xl="5" lg="6" md="12" sm="12" xs="12" class="mb-2">
                    <CInput class="mb-0" :value="isin" type="text" disabled>
                      <template #prepend>
                        <CButton color="dark" disabled>Fund ISIN</CButton>
                      </template>
                    </CInput>
                  </CCol>
                  <CCol xl="3" lg="6" md="12" sm="12" xs="12" class="mb-2">
                    <CInput
                      class="mb-0"
                      :value="
                        currency && currency.length > 0
                          ? getSymbolFromCurrency(currency.toUpperCase()) +
                            ' (' +
                            currency.toUpperCase() +
                            ')'
                          : ''
                      "
                      type="text"
                      disabled
                    >
                      <template #prepend>
                        <CButton color="dark" disabled>Currency</CButton>
                      </template>
                    </CInput>
                  </CCol>
                  <CCol xl="4" lg="12" md="12" sm="12" xs="12" class="mb-2">
                    <div class="input-group" v-if="ratingFund > 0">
                      <div class="input-group-prepend">
                        <button
                          type="button"
                          disabled="disabled"
                          class="btn btn-dark disabled"
                        >Fund Rating</button>
                      </div>
                      <div class="form-control p-0" style="background-color: hsla(0,0%,100%,.12);">
                        <h2 class="ml-2">
                          <b v-for="n in ratingFund" :key="n">&nbsp;&nbsp;&#128970;</b>
                        </h2>
                      </div>
                    </div>
                    <CInput v-else class="mb-0" value="No Rating" type="text" disabled>
                      <template #prepend>
                        <CButton color="dark" disabled>Fund Rating</CButton>
                      </template>
                    </CInput>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol col="12" class="mb-2">
                    <CInput class="mb-0" :value="fundName" type="text" disabled>
                      <template #prepend>
                        <CButton color="dark" disabled>Fund Name</CButton>
                      </template>
                    </CInput>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol col="12" class="mb-2">
                    <CInput class="mb-0" :value="fullFundName" type="text" disabled>
                      <template #prepend>
                        <CButton color="dark" disabled>Full Fund Name</CButton>
                      </template>
                    </CInput>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol col="12" class="mb-2">
                    <CInput class="mb-0" :value="fundCategory" type="text" disabled>
                      <template #prepend>
                        <CButton color="dark" disabled>Category</CButton>
                      </template>
                    </CInput>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol lg="6" md="12" sm="12" xs="12" class="mb-2">
                    <CInput
                      class="mb-0"
                      :value="utils.onlyDateFormat(fundStart)"
                      type="text"
                      disabled
                    >
                      <template #prepend>
                        <CButton color="dark" disabled>Fund Start Date</CButton>
                      </template>
                    </CInput>
                  </CCol>
                  <CCol lg="6" md="12" sm="12" xs="12" class="mb-2">
                    <CInput
                      class="mb-0"
                      :value="utils.formatCurrency(fundStartPrice)"
                      type="text"
                      disabled
                    >
                      <template #prepend>
                        <CButton color="dark" disabled>Start Price</CButton>
                      </template>
                    </CInput>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol lg="6" md="12" sm="12" xs="12" class="mb-2">
                    <CInput
                      class="mb-0"
                      :value="utils.onlyDateFormat(fundLastUpdate)"
                      type="text"
                      disabled
                    >
                      <template #prepend>
                        <CButton color="dark" disabled>Fund Last Date Update</CButton>
                      </template>
                    </CInput>
                  </CCol>
                  <CCol lg="6" md="12" sm="12" xs="12" class="mb-2">
                    <CInput
                      class="mb-0"
                      :value="utils.formatCurrency(fundLastPrice)"
                      type="text"
                      disabled
                    >
                      <template #prepend>
                        <CButton color="dark" disabled>Last Price</CButton>
                      </template>
                    </CInput>
                  </CCol>
                </CRow>
              </CCol>
              <CCol xl="3" lg="4" md="6" sm="12" xs="12" class="mb-2">
                <CCard class="mb-0 pb-0">
                  <CCardHeader>Domicile</CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol sm="12" class="text-center">
                        <img :src="domicileFlag" class="img-fluid" alt />
                        <h5 class="mt-2 mb-0">{{ domicile }}</h5>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CCard>
              <CCardHeader>Available Sale</CCardHeader>
              <CCardBody>
                <CRow>
                  <flag v-for="(country, index) in countiesList" :country="country" :key="index"></flag>
                </CRow>
              </CCardBody>
            </CCard>
          </CForm>
          <CRow>
            <CCol col="12" v-if="showChart">
              <resize-chart-line :lineChartId="'lineChart-1'" :dataChartVals="historyValues"></resize-chart-line>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol col="12">
              <CButton block variant="outline" color="primary" @click="goBack">
                <CIcon name="cil-account-logout" />Back
              </CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </CCol>
    <CModal
      :show.sync="deleteFundModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Attention"
      color="danger"
    >
      Are you sure you want to delete this Fund?
      <br />
      "{{ fundName }}"
      <template #header>
        <h6 class="modal-title">Attention</h6>
        <CButtonClose @click="deleteFundModal = false" class="text-white" />
      </template>
      <template #footer>
        <CButton @click="deleteFundModal = false" variant="outline" color="info">Cancel</CButton>
        <CButton @click="closeFundAccept()" variant="outline" color="danger">Ok</CButton>
      </template>
    </CModal>
  </CRow>
</template>
<script>
import ResizeChartLine from "./../../components/resizeChartLine.vue";
import Flag from "./../../components/flag.vue";
import utils from "./../../shared/utilsLib.js";
import getSymbolFromCurrency from "currency-symbol-map";
export default {
  components: {
    ResizeChartLine,
    Flag
  },
  name: "Fund",
  data: () => {
    return {
      historyValues: {
        labels: [],
        values: [],
        title: "Fund History"
      },
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
      deleteFundModal: false,
      utils,
      getSymbolFromCurrency
    };
  },
  computed: {},
  methods: {
    goBack() {
      this.$router.go(-1);
      this.$router.replace({ path: "/funds" });
    },
    deleteFund() {
      this.deleteFundModal = true;
    },
    closeFundAccept() {
      this.deleteFundModal = false;
      this.$loading.show();
      this.$http
        .delete(utils.geturl() + "/api/funds/" + this.isin)
        .then(function(response) {
          let data = response.data;
          if (data.status === true) {
            this.$notify({
              group: "notification",
              title: "Delete fund.",
              type: "success",
              text: data.data,
              position: "top center"
            });
            this.$router.push("/funds");
          } else {
            this.$notify({
              group: "notification",
              title: "Delete fund.",
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
              title: "Delete fund error.",
              type: "danger",
              text: "Error " + err,
              position: "top center"
            });
          }
          this.$loading.hide();
        });
    },
    getFundData() {
      this.$http
        .get(utils.geturl() + "/api/fund/" + this.isin + "/2000")
        .then(function(response) {
          let data = response.data;
          if (data.status === true) {
            // console.log("fund data", data);
            this.fundName = data.data.name;
            try {
              this.fullFundName = this.utils.decodeString(data.data.nameFull);
              this.fundCategory = this.utils.decodeString(data.data.category);
            } catch (e) {
              console.log("Error", data.data.nameFull, data.data.category, e);
              this.fullFundName = data.data.nameFull;
              this.fundCategory = data.data.category;
            }
            this.ratingFund = data.data.rating;
            if (data.list) {
              this.countiesList = data.list;
            }
            if (data.country) {
              this.domicileFlag = data.country.flag;
            }
            if (data.data) {
              this.domicile = data.data.domicile;
              this.currency = data.data.currency;

              this.fundStart = data.data.fundStart;
              this.fundLastUpdate = data.data.lastUpdate;
              this.fundLastPrice = data.data.lastValue;

              let hist = data.data.HistoryDetail;
              if (hist.length > 0) {
                this.fundStartPrice = hist[0].Value;
              }
              for (let index = 0; index < hist.length; index++) {
                this.historyValues.labels.push(
                  utils.onlyShortDateFormat(hist[index].EndDate)
                );
                this.historyValues.values.push(hist[index].Value);
              }
              this.showChart = true;
            }
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
              title: "Get fund history error.",
              type: "danger",
              text: "Error " + err,
              position: "top center"
            });
          }
          this.$loading.hide();
        });
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
  watch: {}
};
</script>
