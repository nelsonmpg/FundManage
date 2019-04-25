<template>
  <b-card no-header class="mb-0 clear-padding-next-div animated fadeIn" border-variant="primary" v-if="show">
    <b-row class="align-items-center h-100">
      <b-col cols="1" class="mx-auto text-center">
        <h3>
          <b-badge pill variant="dark">{{ posArr }}</b-badge>
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
            <b-col cols="6">
              <b-form-group class="mb-0">
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="fa fa-calendar-check-o"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="date" v-model="dateFund"></b-form-input>
                  <b-input-group-append>
                    <b-input-group-text>
                      <i class="fa" :class="classdateFund"></i>
                    </b-input-group-text>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group class="mb-0">
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Nº Ups</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" v-model="nUpsFund" placeholder="123"></b-form-input>
                  <b-input-group-append>
                    <b-input-group-text>
                      <i class="fa" :class="classnUpsFund"></i>
                    </b-input-group-text>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <!-- <b-col cols="4">
              <b-form-group class="mb-0">
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="fa fa-euro"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="number" v-model="valInvestFund" placeholder="ex. €1000,00"></b-form-input>
                  <b-input-group-append>
                    <b-input-group-text>
                      <i class="fa" :class="classvalInvestFund"></i>
                    </b-input-group-text>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>-->
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-card>
</template>
</template>
<script>
import utils from "./../../shared/utilsLib.js";
export default {
  components: {},
  props: ["optsSelect", "dataObj", "posArr"],
  name: "AddFund",
  data: () => {
    return {
      selectedFund: "",
      selectedFundCheck: false,
      classselectedFund: "fa-close",
      dateFund: "",
      dateFundCheck: false,
      classdateFund: "fa-close",
      nUpsFund: "",
      nUpsFundCheck: false,
      classnUpsFund: "fa-close",
      valInvestFund: "",
      valInvestFundCheck: true,
      classvalInvestFund: "fa-close",
      show: true,
      utils
    };
  },
  computed: {},
  methods: {
    removePanel() {
      this.show = false;
      this.dataObj[this.posArr] = {};
    }
  },
  created() {},
  mounted() {
    this.$refs.selectFundFocus.$el.focus();
  },
  beforeCreate() {},
  beforeDestroy() {},
  watch: {
    selectedFund: function(val) {
      let classAdd = "";
      this.selectedFundCheck = false;
      if (val.trim() === "") {
        classAdd = "close";
        this.dataObj[this.posArr].isin = "";
        this.dataObj[this.posArr].name = "";
      } else {
        classAdd = "check";
        this.selectedFundCheck = true;
        let datafund = this.selectedFund.split("-");
        this.dataObj[this.posArr].isin = datafund[0].trim();
        this.dataObj[this.posArr].name = datafund[1].trim();
      }
      this.classselectedFund = "fa-" + classAdd;
    },
    dateFund: function(val) {
      let classAdd = "";
      let dat1 = new Date();
      let dat2 = new Date(val);
      let weekEnd = this.utils.dateIsWeekend(val);
      this.dateFundCheck = false;
      if (val.trim() === "") {
        classAdd = "close";
        this.dataObj[this.posArr].dateInvest = "";
      } else if (Date.parse(dat1) < Date.parse(dat2)) {
        this.$notify({
          group: "notification",
          title: "Attention.",
          type: "warn",
          text: "You selected a day after Today.",
          position: "top center"
        });
        classAdd = "close";
        this.dataObj[this.posArr].dateInvest = "";
      } else if (weekEnd) {
        this.$notify({
          group: "notification",
          title: "Attention.",
          type: "warn",
          text: "You selected a day of weekend.",
          position: "top center"
        });
        classAdd = "close";
        this.dataObj[this.posArr].dateInvest = "";
      } else {
        classAdd = "check";
        this.dateFundCheck = true;
        this.dataObj[this.posArr].dateInvest = this.dateFund;
        this.dataObj[this.posArr].dateCheck = new Date( this.dateFund).getTime();
      }
      this.classdateFund = "fa-" + classAdd;
    },
    nUpsFund: function(val) {
      let classAdd = "";
      this.nUpsFundCheck = false;
      if (val.trim() === "" || val.trim() * 1 <= 0) {
        classAdd = "close";
        this.dataObj[this.posArr].nUps = "";
      } else {
        classAdd = "check";
        this.nUpsFundCheck = true;
        this.dataObj[this.posArr].nUps = this.nUpsFund;
      }
      this.classnUpsFund = "fa-" + classAdd;
    },
    valInvestFund: function(val) {
      let classAdd = "";
      this.valInvestFundCheck = false;
      if (val.trim() === "" || val.trim() * 1 <= 0) {
        classAdd = "close";
        this.dataObj[this.posArr].valInvest = "";
      } else {
        classAdd = "check";
        this.valInvestFundCheck = true;
        this.dataObj[this.posArr].valInvest = this.valInvestFund;
      }
      this.classvalInvestFund = "fa-" + classAdd;
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
