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
                    <b-input-group-text>Wallet Name</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="walletName"
                    type="text"
                    ref="walletNameFocus"
                    placeholder="Please enter Wallet Name."
                    required
                  ></b-form-input>
                  <b-input-group-append>
                    <b-input-group-text>
                      <i class="fa" :class="classwalletName"></i>
                    </b-input-group-text>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <add-fund
                :dataObj="dataObjToSave"
                :posArr="index"
                :fund="fund"
                :optsSelect="options"
                v-for="(fund, index) in fundsList"
                :key="index"
              ></add-fund>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12" class="mt-3 mb-3">
              <b-button @click="addFund" block variant="outline-info">
                <i class="fa fa-plus"></i> Add Fund to Wallet
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
                <i class="fa fa-save"></i> Save Wallet
              </b-button>
            </b-col>
          </b-row>
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import AddFund from "./AddFund.vue";
export default {
  components: {
    AddFund
  },
  name: "New Wallet",
  data: () => {
    return {
      title: "New Wallet of Fund",
      walletName: "",
      walletNameCheck: false,
      classwalletName: "fa-close",
      fundsList: [],
      options: [],
      dataObjToSave: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      this.$router.replace({ path: "/WalletFunds" });
    },
    addFund() {
      this.fundsList.push({
        isin: "",
        name: "",
        investList: []
      });
    },
    deleteFund(index) {
      console.log("Delete fundo", index);
      this.fundsList[index] = null;
    },
    saveWallet() {
      console.log("SaveWallet", this.fundsList);

      if (!this.walletNameCheck) {
        return this.$notify({
          group: "notification",
          title: "Error",
          text: "Check field 'Wallet Name'.",
          type: "error",
          position: "top center"
        });
      }
      if (this.fundsList.length === 0) {
        return this.$notify({
          group: "notification",
          title: "Error",
          text: "Add one or more funds to wallet.",
          type: "error",
          position: "top center"
        });
      }
      /*
      let fundArrSave = [];
      for (let index = 0; index < this.fundsList.length; index++) {
        if (!this.chekFieldsWalletFund(this.fundsList[index])) {
          return this.$notify({
            group: "notification",
            title: "Error",
            text: "Check fields in funds.",
            type: "error",
            position: "top center"
          });
        }
        if (this.fundsList[index]) {
          fundArrSave.push(this.fundsList[index]);
        }
      }
      let dataSave = {
        owner: JSON.parse(localStorage.getItem("user")).data._id,
        walletName: this.walletName.trim(),
        walletFunds: fundArrSave
      };
      this.$loading.show();
      console.log("data save", dataSave);

      this.$http
        .post("/api/walletfunds", dataSave)
        .then(function(response) {
          let data = response.data;
          // console.log("saveWallet", data);
          if (data.status === true) {
            this.$notify({
              group: "notification",
              title: "New wallet of funds created.",
              text: "Wallet '" + data.data.nameWallet + "' created.",
              position: "top center"
            });
            this.$router.push("/walletfunds");
          } else {
            this.$notify({
              group: "notification",
              title: "Save Wallet Funds.",
              type: "warn",
              text:
                "The Wallet '" + data.data.nameWallet + "' exists in database.",
              position: "top center"
            });
          }
          this.$loading.hide();
        })
        .catch(function(err) {
          this.$loading.hide();
          console.log("Error", err);
        });
        */
    },
    chekFieldsWalletFund(obj) {
      if (obj) {
        if (Object.keys(obj).length === 0) {
          return true;
        } else {
          let keys = Object.keys(obj);
          for (const key in keys) {
            if (obj[keys[key]] === "") {
              return false;
            }
          }
        }
      }
      return true;
    },
    getAllFunds() {
      this.$http
        .get("/api/funds")
        .then(function(response) {
          let data = response.data;
          // console.log("AllFunds", data);
          if (data.status === true) {
            let funds = data.data;
            this.options = [];
            for (let index = 0; index < funds.length; index++) {
              this.options.push(funds[index].isin + " - " + funds[index].name);
            }
          } else {
            this.$notify({
              group: "notification",
              title: "Find Funds.",
              type: "eror",
              text: "Find all funds in database.",
              position: "top center"
            });
          }
          this.$loading.hide();
        })
        .catch(function(err) {
          this.$loading.hide();
          console.log("Error", err);
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
