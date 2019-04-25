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
                      <b-input-group-text>Slect Fund</b-input-group-text>
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
                        <i class="fa" :class="classselectedFund"></i>
                      </b-input-group-text>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col cols="1">
                <div class="card-header-actions">
                  <b-link href="#" class="card-header-action btn-close" v-on:click="removePanel">
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
                v-for="(invest, index) in fund.investList"
                :key="index"
              ></add-invest>
            </b-col>
            <b-col sm="12" class="mt-3 mb-3">
              <b-button @click="addInvest" block size="sm" variant="outline-secondary">
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
  props: ["optsSelect", "dataObj", "posArr", "fund"],
  name: "AddFund",
  data: () => {
    return {
      selectedFund: "",
      selectedFundCheck: false,
      classselectedFund: "fa-close",
      show: true,
      utils
    };
  },
  computed: {},
  methods: {
    addInvest() {
      this.fund.investList.push({
        dateInvest: "",
        nUps: ""
      });
    },
    removePanel() {
      this.show = false;
      this.$parent.deleteFund(this.posArr);
    },
    deleteInvest(index) {
      console.log("Teste remove", index);
      this.fund.investList[index] = null;
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
