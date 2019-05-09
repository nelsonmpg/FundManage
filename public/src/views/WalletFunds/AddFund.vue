<template>
  <b-card
    no-header
    class="mb-0 clear-padding-next-div animated fadeIn"
    border-variant="primary"
    v-if="show"
  >
    <b-row class="align-items-center h-100">
      <b-col cols="1" class="mx-auto text-center">
        <h3>
          <b-badge pill variant="dark">{{ (posArr + 1) }}</b-badge>
        </h3>
      </b-col>
      <b-col cols="11">
        <b-card class="mb-0">
          <template slot="header">
            <b-row>
              <b-col cols="11">
                <b-form-group class="mb-0">
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text>Select Fund</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select
                      ref="selectFundFocus"
                      v-model="selectedFund"
                      :plain="true"
                      :options="optsSelect"
                      value
                    ></b-form-select>
                    <b-input-group-append>
                      <b-input-group-text>
                        <i
                          class="fa"
                          v-b-tooltip.hover.html="'<strong>Select a Fund to add to this portfolio.</strong>'"
                          :class="classselectedFund"
                        ></i>
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="1">
                <div class="card-header-actions">
                  <b-link
                    href="#"
                    class="card-header-action btn-close"
                    v-b-tooltip.hover.html="'<strong>Delete this fund.</strong>'"
                    v-on:click="removePanel"
                  >
                    <i class="icon-close"></i>
                  </b-link>
                </div>
              </b-col>
            </b-row>
          </template>
          <b-row v-show="selectedFund != ''">
            <b-col cols="12">
              <add-invest
                :invest="invest"
                :posArr="index"
                ref="checkInvest"
                v-for="(invest, index) in fund.investList"
                :key="index"
              ></add-invest>
            </b-col>
            <b-col sm="12" class="mt-3 mb-3">
              <b-button
                @click="addInvest"
                ref="addInvestFocus"
                block
                size="sm"
                variant="outline-secondary"
              >
                <i class="fa fa-plus"></i> Add new Invest to Fund
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-card>
</template>
</template>
<script>
import utils from "./../../shared/utilsLib.js";
import AddInvest from "./AddFundInvest.vue";
export default {
  components: {
    AddInvest
  },
  props: ["optsSelect", "posArr", "fund"],
  name: "AddFund",
  data: () => {
    return {
      selectedFund: "",
      selectedFundCheck: false,
      classselectedFund: "fa-close",
      countInvest: 0,
      show: true,
      utils
    };
  },
  computed: {},
  methods: {
    addInvest() {
      this.countInvest++;
      this.fund.investList.push({
        dateInvest: "",
        nUps: ""
      });
    },
    deleteInvest(index) {
      this.countInvest--;
      this.fund.investList[index] = null;
    },
    focusFundDuplicate() {
      this.$refs.selectFundFocus.$el.focus();
    },
    removePanel() {
      this.show = false;
      this.$parent.deleteFund(this.posArr);
    },
    checkFund() {
      console.log("checkFund function");
      if (!this.selectedFundCheck) {
        this.$notify({
          group: "notification",
          title: "Error",
          text: "Check the Select Fund field.",
          type: "error",
          position: "top center"
        });
        this.$refs.selectFundFocus.$el.focus();
        return false;
      }
      if (this.fund.investList.length === 0 || this.countInvest <= 0) {
        this.$notify({
          group: "notification",
          title: "Error",
          text: "Add one or more investments in this fund.",
          type: "error",
          position: "top center"
        });
        this.$refs.addInvestFocus.focus();
        return false;
      }
      let chekDuplicateDates = [];
      for (let t = 0; t < this.$refs.checkInvest.length; t++) {
        if (this.fund.investList[t]) {
          chekDuplicateDates.push(this.fund.investList[t].dateCheck);
          if (!this.$refs.checkInvest[t].checkInvest()) {
            return false;
          }
        }
      }
      let checkResult = utils.checkDuplicatesV2(chekDuplicateDates);
      if (!checkResult.status) {
        for (let x = 0; x < this.fund.investList.length; x++) {
          if (this.fund.investList[this.fund.investList.length - 1 - x]) {
            if (
              this.fund.investList[this.fund.investList.length - 1 - x]
                .dateCheck *
                1 ===
              checkResult.duplicate[0] * 1
            ) {
              this.$refs.checkInvest[
                this.fund.investList.length - 1 - x
              ].focusInvestDuplicateDate();
              x = this.fund.investList.length;
            }
          }
        }
        this.$notify({
          group: "notification",
          title: "Error",
          text:
            "The list of investments of Fund contains duplicate dates, check this.",
          type: "error",
          position: "top center"
        });
        return false;
      }
      return true;
    }
  },
  created() {},
  mounted() {
    this.$refs.selectFundFocus.$el.focus();
  },
  beforeCreate() {},
  beforeDestroy() {},
  watch: {
    selectedFund: function(val, oldVal) {
      if (oldVal === "") {
        this.addInvest();
      }
      let classAdd = "";
      this.selectedFundCheck = false;
      if (val.trim() === "") {
        classAdd = "close";
        this.fund.isin = "";
        this.fund.name = "";
      } else {
        classAdd = "check";
        this.selectedFundCheck = true;
        let datafund = this.selectedFund.split("-");
        this.fund.isin = datafund[0].trim();
        this.fund.name = datafund[1].trim();
      }
      this.classselectedFund = "fa-" + classAdd;
    }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.clear-padding-next-div > div {
  padding: 0;
}
</style>
