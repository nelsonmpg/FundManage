<template>
  <b-row class="animated fadeIn">
    <b-col cols="12">
      <b-card no-header>
        <template slot="header">Name: {{ title }}</template>
        <b-form>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Portfolio Name</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="walletName"
                    type="text"
                    ref="walletNameFocus"
                    placeholder="Please enter Portfolio Name."
                    disabled
                  ></b-form-input>
                  <b-input-group-append>
                    <b-input-group-text>
                      <i
                        class="fa"
                        v-b-tooltip.hover.html="'<strong>A prefered Portfolio name.</strong>'"
                        :class="classwalletName"
                      ></i>
                    </b-input-group-text>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <add-fund-edit
                :posArr="index"
                :fund="fund"
                :optsSelect="options"
                ref="checkFund"
                v-for="(fund, index) in fundsList"
                :key="index"
              ></add-fund-edit>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" class="mt-3 mb-3">
              <b-button @click="addFund" ref="addFundFocus" block variant="outline-info">
                <i class="fa fa-plus"></i> Add Fund to Portfolio
              </b-button>
            </b-col>
          </b-row>
          <!--<div slot="footer">
          </div>-->
        </b-form>
        <template slot="footer">
          <b-row>
            <b-col cols="6">
              <b-button block variant="outline-primary" @click="goBack">
                <i class="cui-account-logout icons active mt-3"></i> Back
              </b-button>
            </b-col>
            <b-col cols="6">
              <b-button @click="saveWallet" block variant="outline-success">
                <i class="fa fa-save"></i> Save Portfolio
              </b-button>
            </b-col>
          </b-row>
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import AddFundEdit from "./AddFundEdit.vue";
import utils from "./../../shared/utilsLib.js";
export default {
  components: {
    AddFundEdit
  },
  name: "Portfolio Edit",
  data: () => {
    return {
      title: "",
      walletName: "",
      walletNameCheck: false,
      classwalletName: "fa-close",
      fundsList: [],
      fundslistDelete: [],
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
      this.fundslistDelete.push(this.fundsList[index].isin);
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
      let dataSave = {
        _idWallet: this.wallet,
        owner: JSON.parse(localStorage.getItem("user")).data._id,
        walletName: this.walletName.trim(),
        walletFunds: this.fundsList
      };
      // console.log("data save Portfolio Edit", dataSave);
      this.$loading.show();

      this.$http
        .put(utils.geturl() + "/api/portfoliofunds", dataSave)
        .then(function(response) {
          let data = response.data;
          if (data.status === true) {
            this.$notify({
              group: "notification",
              title: "The Portfolio of funds updated.",
              text: "Portfolio '" + data.data.nameWallet + "' updated.",
              type: "success",
              position: "top center"
            });
            this.$router.push("/Portfoliofunds");
          } else {
            this.$notify({
              group: "notification",
              title: "Save Portfolio Funds.",
              type: "warning",
              text: "Error to update Portfolio.",
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
            this.getWalletFundList();
          } else {
            this.$notify({
              group: "notification",
              title: "Find Funds.",
              type: "danger",
              text: "Find all funds in database.",
              position: "top center"
            });
            this.$loading.hide();
          }
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
              title: "Error get funds list.",
              type: "danger",
              text: "Error " + err,
              position: "top center"
            });
          }
          this.$loading.hide();
        });
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
          // console.log("Portfolio Funds List", data);
          if (data.status === true) {
            let walletData = data.data,
              fundWallet = walletData.listFunds;
            this.walletName = walletData.nameWallet;
            this.selectedFundCheck = true;
            this.classselectedFund = "fa-check";
            this.fundsList = fundWallet;
            this.fundCount = fundWallet.length;
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
              title: "Error get user protfolios.",
              type: "warning",
              text: "Error " + err,
              position: "top center"
            });
          }
          this.$loading.hide();
        });
    }
  },
  created() {
    this.wallet = this.$route.params.wallet;
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
        addClass = "check";
        this.walletNameCheck = true;
      } else {
        addClass = "close";
      }
      this.classwalletName = "fa-" + addClass;
    }
  }
};
</script>
