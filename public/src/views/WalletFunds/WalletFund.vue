<template>
  <CRow class="animated fadeIn">
    <CCol col="12">
      <CCard no-header>
        <CCardHeader>
          <CRow>
            <CCol sm="12">
              <h3 class="card-title mb-0">New Portfolio of Funds</h3>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody class="mb-0 mt-0 pb-0 pt-0">
          <CForm>
            <CCard no-header class="mb-0 pt-2 pb-2">
              <CCardHeader>
                <CRow>
                  <CCol col="12">
                    <CInput
                      class="mb-0"
                      v-model="walletName"
                      type="text"
                      ref="walletNameFocus"
                      placeholder="Please enter Portfolio Name."
                      required
                    >
                      <template #prepend>
                        <CButton color="dark" disabled>Portfolio Name</CButton>
                      </template>
                      <template #append>
                        <CButton color="dark" disabled>
                          <CIcon
                            v-c-tooltip.hover.html="'<strong>Insert a prefered Portfolio name.</strong>'"
                            :name="classwalletName"
                          />
                        </CButton>
                      </template>
                    </CInput>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody class="mb-0 mt-0 pb-0 pt-0">
                <CRow>
                  <CCol col="12" class="mt-3">
                    <add-fund
                      :posArr="index"
                      :fund="fund"
                      :optsSelect="options"
                      ref="checkFund"
                      v-for="(fund, index) in fundsList"
                      :key="index"
                    ></add-fund>
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter class="mt-0 mb-0 pt-0 pb-0">
                <CRow>
                  <CCol col="12" class="mt-3 mb-3">
                    <CButton
                      @click="addFund"
                      ref="addFundFocus"
                      block
                      variant="outline"
                      color="info"
                    >
                      <CIcon name="cil-plus" />&nbsp;&nbsp;Add Fund to Portfolio
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol col="6">
              <CButton block variant="outline" color="primary" @click="goBack">
                <CIcon name="cil-account-logout" />&nbsp;&nbsp;Back
              </CButton>
            </CCol>
            <CCol col="6">
              <CButton @click="saveWallet" block variant="outline" color="success">
                <CIcon name="cil-save" />&nbsp;&nbsp;Save Portfolio
              </CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import AddFund from "./AddFund.vue";
import utils from "./../../shared/utilsLib.js";
export default {
  components: {
    AddFund
  },
  name: "New Portfolio",
  data: () => {
    return {
      walletName: "",
      walletNameCheck: false,
      classwalletName: "cil-x",
      fundsList: [],
      fundCount: 0,
      options: [],
      utils
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      this.$router.replace({ path: "/Portfoliofunds" });
    },
    addFund() {
      this.fundCount++;
      this.fundsList.push({
        isin: "",
        name: "",
        investList: []
      });
    },
    deleteFund(index) {
      this.fundsList[index] = null;
      this.fundCount--;
    },
    saveWallet() {
      // console.log("SaveWallet", this.fundsList);

      if (!this.walletNameCheck) {
        this.$refs.walletNameFocus.$el.focus();
        return this.$notify({
          group: "notification",
          title: "Error",
          text: "Check field 'Portfolio Name'.",
          type: "danger",
          position: "top center"
        });
      }
      if (this.fundsList.length === 0 || this.fundCount <= 0) {
        this.$refs.addFundFocus.focus();
        return this.$notify({
          group: "notification",
          title: "Error",
          text: "Add one or more funds to Portfolio.",
          type: "danger",
          position: "top center"
        });
      }
      let controlDuplicates = [];
      for (let f = 0; f < this.$refs.checkFund.length; f++) {
        if (this.fundsList[f]) {
          controlDuplicates.push(this.fundsList[f].isin);
          if (!this.$refs.checkFund[f].checkFund()) {
            return console.log("Problems with validations.");
          }
        }
      }
      let checkResult = utils.checkDuplicatesV2(controlDuplicates);
      if (!checkResult.status) {
        for (let x = 0; x < this.fundsList.length; x++) {
          if (this.fundsList[this.fundsList.length - 1 - x]) {
            if (
              this.fundsList[this.fundsList.length - 1 - x].isin ===
              checkResult.duplicate[0]
            ) {
              this.$refs.checkFund[
                this.fundsList.length - 1 - x
              ].focusFundDuplicate();
              x = this.fundsList.length;
            }
          }
        }
        return this.$notify({
          group: "notification",
          title: "Error",
          text:
            "The list of fund of Portfolio contains duplicate funds, check this.",
          type: "danger",
          position: "top center"
        });
      }
      let self = this,
        dataSave = {
          owner: JSON.parse(localStorage.getItem("user")).data._id,
          walletName: this.walletName.trim(),
          walletFunds: (function() {
            let fundList = [];
            for (let x = 0; x < self.fundsList.length; x++) {
              if (self.fundsList[x]) {
                for (let y = 0; y < self.fundsList[x].investList.length; y++) {
                  fundList.push({
                    codefund:
                      self.fundsList[x].isin +
                      "-" +
                      self.fundsList[x].investList[y].dateCheck,
                    isin: self.fundsList[x].isin,
                    name: self.fundsList[x].name,
                    dateInvest: self.fundsList[x].investList[y].dateInvest,
                    dateCheck: self.fundsList[x].investList[y].dateCheck,
                    nUps: self.fundsList[x].investList[y].nUps
                  });
                }
              }
            }
            return fundList;
          })()
        };
      // console.log("data save", dataSave);
      this.$loading.show();

      this.$http
        .post(utils.geturl() + "/api/portfoliofunds", dataSave)
        .then(function(response) {
          let data = response.data;
          // console.log("saveWallet", data);
          if (data.status === true) {
            this.$notify({
              group: "notification",
              title: "New Portfolio of funds created.",
              text: "Portfolio '" + data.data.nameWallet + "' created.",
              type: "success",
              position: "top center"
            });
            this.$router.push("/Portfoliofunds");
          } else {
            this.$notify({
              group: "notification",
              title: "Save Portfolio Funds.",
              type: "warning",
              text:
                "The name of Portfolio '" +
                data.data.nameWallet +
                "' exists in database.",
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
              title: "Error save portfolio.",
              type: "danger",
              text: "Error " + err,
              position: "top center"
            });
          }
          this.$loading.hide();
        });
    },
    getAllFunds() {
      this.$http
        .get(utils.geturl() + "/api/funds")
        .then(function(response) {
          let data = response.data;
          // console.log("AllFunds", data);
          if (data.status === true) {
            let funds = data.data;
            funds = funds.sort(utils.dynamicSort("name"));
            this.options = [];
            for (let index = 0; index < funds.length; index++) {
              this.options.push(funds[index].isin + " - " + funds[index].name);
            }
          } else {
            this.$notify({
              group: "notification",
              title: "Find Funds.",
              type: "danger",
              text: "Find all funds in database.",
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
              title: "Errro get funds list.",
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
    this.getAllFunds();
  },
  mounted() {
    this.$loading.show();
    this.$refs.walletNameFocus.$el.focus();
  },
  beforeCreate() {},
  beforeDestroy() {},
  watch: {
    walletName: function(val) {
      let addClass = "";
      this.walletNameCheck = false;
      if (val.trim().length > 4) {
        addClass = "check-alt";
        this.walletNameCheck = true;
      } else {
        addClass = "x";
      }
      this.classwalletName = "cil-" + addClass;
    }
  }
};
</script>
