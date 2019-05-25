<template>
  <b-row class="mb-2" v-if="show">
    <b-col cols="1" class="mx-auto text-center">
      <h5>
        <b-badge pill variant="dark">{{ (posArr + 1) }}</b-badge>
      </h5>
    </b-col>
    <b-col cols="10">
      <b-row>
        <b-col xl="3" lg="6" md="12" sm="12" xs="12">
          <b-form-group class="mb-0">
            <b-input-group>
              <b-input-group-prepend>
                <b-input-group-text>Active</b-input-group-text>
              </b-input-group-prepend>
              <b-input-group-append>
                <b-input-group-text>
                  <i
                    class="fa"
                    v-b-tooltip.hover.html="'<strong>Investiment inative.</strong>'"
                    :class="classfundStateA"
                  ></i>
                  <c-switch
                    color="dark"
                    checked
                    v-model="fundState"
                    value="true"
                    uncheckedValue="false"
                    variant="pill"
                  />
                  <i
                    class="fa"
                    v-b-tooltip.hover.html="'<strong>Investiment ative.</strong>'"
                    :class="classfundStateB"
                  ></i>
                </b-input-group-text>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col class="col-xl-3 col-lg-6 col-md-12 col-sm-12 col-xs-12" v-show="!controlStatus">
          <b-form-group class="mb-0">
            <b-input-group>
              <b-input-group-prepend>
                <b-input-group-text>
                  <i class="fa fa-calendar-times-o"></i>
                </b-input-group-text>
              </b-input-group-prepend>
              <b-form-input type="date" ref="fundDateInative" v-model="dateFundInative"></b-form-input>
              <b-input-group-append>
                <b-input-group-text>
                  <i
                    class="fa"
                    v-b-tooltip.hover.html="'<strong>Select a date to stop this investiment.</strong>'"
                    :class="classdateFundInative"
                  ></i>
                </b-input-group-text>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col :class="classsDateShow">
          <b-form-group class="mb-0">
            <b-input-group>
              <b-input-group-prepend>
                <b-input-group-text>
                  <i class="fa fa-calendar-check-o"></i>
                </b-input-group-text>
              </b-input-group-prepend>
              <b-form-input
                type="date"
                ref="fundDate"
                v-model="dateFund"
                :disabled="!controlStatus"
              ></b-form-input>
              <b-input-group-append>
                <b-input-group-text>
                  <i
                    class="fa"
                    v-b-tooltip.hover.html="'<strong>Select a date to start this investiment.</strong>'"
                    :class="classdateFund"
                  ></i>
                </b-input-group-text>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col :class="classsNupsShow">
          <b-form-group class="mb-0">
            <b-input-group>
              <b-input-group-prepend>
                <b-input-group-text>Nº Ups</b-input-group-text>
              </b-input-group-prepend>
              <b-form-input
                type="number"
                ref="fundNups"
                v-model="nUpsFund"
                :disabled="!controlStatus"
                placeholder="ex. 123.45"
              ></b-form-input>
              <b-input-group-append>
                <b-input-group-text>
                  <i
                    class="fa"
                    v-b-tooltip.hover.html="'<strong>Inser the number of Nups to invest.</strong>'"
                    :class="classnUpsFund"
                  ></i>
                </b-input-group-text>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="1">
      <div class="card-header-actions">
        <b-link
          href="#"
          class="card-header-action btn-close"
          v-b-tooltip.hover.html="'<strong>Delete this investiment.</strong>'"
          v-on:click="removePanel"
        >
          <i class="icon-close"></i>
        </b-link>
      </div>
    </b-col>
  </b-row>
</template>
</template>
<script>
import utils from "./../../shared/utilsLib.js";
import { Switch as cSwitch } from "@coreui/vue";
export default {
  components: {
    cSwitch
  },
  props: ["invest", "posArr"],
  name: "AddInvest",
  data: () => {
    return {
      dateFund: "",
      dateFundCheck: false,
      classdateFund: "fa-close",
      nUpsFund: "",
      nUpsFundCheck: false,
      classnUpsFund: "fa-close",
      classfundStateA: "times-circle-o",
      classfundStateB: "",
      fundState: true,
      dateFundInative: "",
      classdateFundInative: "fa-close",
      dateFundInativeCheck: false,
      classsDateShow: "col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12",
      classsNupsShow: "col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12",
      controlStatus: false,
      show: true,
      utils
    };
  },
  computed: {},
  methods: {
    removePanel() {
      this.show = false;
      this.$parent.deleteInvest(this.posArr);
    },
    focusInvestDuplicateDate() {
      this.$refs.fundDate.$el.focus();
    },
    checkInvest() {
      if (!this.dateFundCheck) {
        this.$notify({
          group: "notification",
          title: "Error",
          text: "Check the date invest field.",
          type: "danger",
          position: "top center"
        });
        this.$refs.fundDate.$el.focus();
        return false;
      }

      if (!this.nUpsFundCheck) {
        this.$notify({
          group: "notification",
          title: "Error",
          text: "Check the nUps invest field.",
          type: "danger",
          position: "top center"
        });
        this.$refs.fundNups.$el.focus();
        return false;
      }
      if (!this.controlStatus) {
        if (!this.dateFundInativeCheck) {
          this.$notify({
            group: "notification",
            title: "Error",
            text: "Check the date to inative invest field.",
            type: "danger",
            position: "top center"
          });
          this.$refs.fundDateInative.$el.focus();
          return false;
        } else {
          this.invest.dateInative = this.dateFundInative;
        }
      } else {
        this.invest.dateInative = "";
      }
      this.invest.moneyFund = [];
      return true;
    }
  },
  created() {},
  mounted() {
    if (this.invest.dateInvest !== "") {
      this.dateFund = new Date(this.invest.dateInvest)
        .toISOString()
        .split("T")[0];
      this.dateFundCheck = true;
      this.classdateFund = "fa-check";
    }
    if (this.invest.nUps !== "") {
      this.nUpsFund = this.invest.nUps;
      this.nUpsFundCheck = true;
      this.classnUpsFund = "fa-check";
    }
    if (!this.invest.active) {
      this.fundState = this.invest.active.toString();
      this.controlStatus = this.fundState === "true" ? true : false;
      try {
        this.dateFundInative = new Date(this.invest.dateInative)
          .toISOString()
          .split("T")[0];
      } catch (e) {
        this.dateFundInative = new Date().toISOString().split("T")[0];
      }
      this.dateFundInativeCheck = true;
      this.classdateFundInative = "fa-check";
    }
  },
  beforeCreate() {},
  beforeDestroy() {},
  watch: {
    dateFund: function(val) {
      let classAdd = "";
      let datToday = new Date();
      let datNewSelec = new Date(val);
      let weekEnd = this.utils.dateIsWeekend(val);
      this.dateFundCheck = false;
      if (val.trim() === "") {
        classAdd = "close";
        this.invest.dateInvest = "";
      } else if (Date.parse(datToday) < Date.parse(datNewSelec)) {
        this.$notify({
          group: "notification",
          title: "Attention.",
          type: "warning",
          text: "You selected a day after Today.",
          position: "top center"
        });
        classAdd = "close";
        this.invest.dateInvest = "";
      } else if (weekEnd) {
        this.$notify({
          group: "notification",
          title: "Attention.",
          type: "warning",
          text: "You selected a day of weekend.",
          position: "top center"
        });
        classAdd = "close";
        this.invest.dateInvest = "";
      } else {
        classAdd = "check";
        this.dateFundCheck = true;
        this.invest.dateInvest = this.dateFund;
        this.invest.dateCheck = new Date(this.dateFund).getTime();
      }
      this.classdateFund = "fa-" + classAdd;
    },
    nUpsFund: function(val) {
      let classAdd = "";
      this.nUpsFundCheck = false;
      if (val.toString().trim() === "" || val.toString().trim() * 1 <= 0) {
        classAdd = "close";
        this.invest.nUps = "";
      } else {
        classAdd = "check";
        this.nUpsFundCheck = true;
        this.invest.nUps = this.nUpsFund;
      }
      this.classnUpsFund = "fa-" + classAdd;
    },
    fundState: function(val) {
      this.controlStatus = val === "true" ? true : false;
      if (this.controlStatus) {
        this.classfundStateA = "fa-circle-o";
        this.classfundStateB = "fa-check-circle-o";
        this.classsDateShow = "col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12";
        this.classsNupsShow = "col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12";
      } else {
        this.classfundStateA = "fa-times-circle-o";
        this.classfundStateB = "fa-circle-o";
        this.classsDateShow = "col-xl-3 col-lg-6 col-md-12 col-sm-12 col-xs-12";
        this.classsNupsShow = "col-xl-3 col-lg-6 col-md-12 col-sm-12 col-xs-12";
      }
      this.invest.active = this.controlStatus;
    },
    dateFundInative: function(val) {
      let classAdd = "",
        datToday = new Date(),
        datNewSelec = new Date(val),
        datStartInvest = new Date(this.invest.dateInvest),
        weekEnd = this.utils.dateIsWeekend(val);
      this.dateFundInativeCheck = false;

      if (val.trim() === "") {
        classAdd = "close";
        this.invest.dateInative = "";
      } else if (Date.parse(datToday) < Date.parse(datNewSelec)) {
        this.$notify({
          group: "notification",
          title: "Attention.",
          type: "warning",
          text: "You selected a day after Today.",
          position: "top center"
        });
        classAdd = "close";
        this.invest.dateInative = "";
      } else if (weekEnd) {
        this.$notify({
          group: "notification",
          title: "Attention.",
          type: "warning",
          text: "You selected a day of weekend.",
          position: "top center"
        });
        classAdd = "close";
        this.invest.dateInative = "";
      } else if (Date.parse(datNewSelec) <= Date.parse(datStartInvest)) {
        this.$notify({
          group: "notification",
          title: "Attention.",
          type: "warning",
          text: "You selected a day before investment is created.",
          position: "top center"
        });
        classAdd = "close";
        this.invest.dateInative = "";
      } else {
        classAdd = "check";
        this.dateFundInativeCheck = true;
        this.invest.dateInative = this.dateFundInative;
      }
      this.classdateFundInative = "fa-" + classAdd;
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
