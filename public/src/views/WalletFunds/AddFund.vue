<template>
  <CCard
    no-header
    class="mb-0 mt-0 pb-0 pt-0 clear-padding-next-div animated fadeIn"
    border-color="primary"
    v-if="show"
  >
    <CCardBody>
      <CRow class="align-items-center h-100">
        <CCol col="1" class="mx-auto text-center">
          <h3>
            <CBadge pill color="dark">{{ (posArr + 1) }}</CBadge>
          </h3>
        </CCol>
        <CCol col="11">
          <CCard class="mb-0" border-color="primary">
            <CCardHeader>
              <CRow>
                <CCol col="11">
                  <CSelect
                    :value.sync="selectedFund"
                    class="mb-0"
                    ref="selectFundFocus"
                    :options="optsSelect"
                    placeholder="Please select"
                  >
                    <template #prepend>
                      <CButton color="dark" disabled>Select Fund</CButton>
                    </template>
                    <template #append>
                      <CButton color="dark" disabled>
                        <CIcon
                          v-c-tooltip.hover.html="'<strong>Select a Fund to add to this portfolio.</strong>'"
                          :name="classselectedFund"
                        />
                      </CButton>
                    </template>
                  </CSelect>
                </CCol>
                <CCol col="1">
                  <div class="card-header-actions">
                    <CLink
                      href="#"
                      class="card-header-action btn-close"
                      v-on:click="removePanel"
                      v-c-tooltip.hover.html="'<strong>Delete this fund.</strong>'"
                    >
                      <CIcon name="cil-x-circle" />
                    </CLink>
                  </div>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody class="mb-2 mt-2 pb-0 pt-0 pl-0 pr-0" v-show="selectedFund != ''">
              <CRow>
                <CCol col="12">
                  <add-invest
                    :invest="invest"
                    :posArr="index"
                    ref="checkInvest"
                    v-for="(invest, index) in fund.investList"
                    :key="index"
                  ></add-invest>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter v-show="selectedFund != ''">
              <CRow>
                <CCol col="12">
                  <CButton
                    @click="addInvest"
                    ref="addInvestFocus"
                    block
                    size="sm"
                    color="info"
                    variant="outline"
                  >
                    <CIcon name="cil-plus" />&nbsp;&nbsp;Add new Invest to Fund
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
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
      classselectedFund: "cil-x",
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
      // console.log("checkFund function");
      if (!this.selectedFundCheck) {
        this.$notify({
          group: "notification",
          title: "Error",
          text: "Check the Select Fund field.",
          type: "danger",
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
          type: "danger",
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
          type: "danger",
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
        classAdd = "x";
        this.fund.isin = "";
        this.fund.name = "";
      } else {
        classAdd = "check-alt";
        this.selectedFundCheck = true;
        let datafund = this.selectedFund.split("-");
        this.fund.isin = datafund[0].trim();
        this.fund.name = datafund[1].trim();
      }
      this.classselectedFund = "cil-" + classAdd;
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
