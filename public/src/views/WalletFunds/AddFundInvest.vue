<template>
  <b-row class="mb-3" v-if="show">
    <b-col cols="1" class="mx-auto text-center">
      <h5>
        <b-badge pill variant="dark">{{ (posArr + 1) }}</b-badge>
      </h5>
    </b-col>
    <b-col cols="5">
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
    <b-col cols="5">
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
    <b-col cols="1">
      <div class="card-header-actions">
        <b-link href="#" class="card-header-action btn-close" v-on:click="removePanel">
          <i class="icon-close"></i>
        </b-link>
      </div>
    </b-col>
  </b-row>
</template>
</template>
<script>
import utils from "./../../shared/utilsLib.js";
import AddFund from "./AddFundInvest.vue";
export default {
  components: {},
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
      this.$parent.deleteInvest(this.posArr);
    }
  },
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeDestroy() {},
  watch: {
    dateFund: function(val) {
      let classAdd = "";
      let dat1 = new Date();
      let dat2 = new Date(val);
      let weekEnd = this.utils.dateIsWeekend(val);
      this.dateFundCheck = false;
      if (val.trim() === "") {
        classAdd = "close";
        this.invest.dateInvest = "";
      } else if (Date.parse(dat1) < Date.parse(dat2)) {
        this.$notify({
          group: "notification",
          title: "Attention.",
          type: "warn",
          text: "You selected a day after Today.",
          position: "top center"
        });
        classAdd = "close";
        this.invest.dateInvest = "";
      } else if (weekEnd) {
        this.$notify({
          group: "notification",
          title: "Attention.",
          type: "warn",
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
      if (val.trim() === "" || val.trim() * 1 <= 0) {
        classAdd = "close";
        this.invest.nUps = "";
      } else {
        classAdd = "check";
        this.nUpsFundCheck = true;
        this.invest.nUps = this.nUpsFund;
      }
      this.classnUpsFund = "fa-" + classAdd;
    },
    valInvestFund: function(val) {
      let classAdd = "";
      this.valInvestFundCheck = false;
      if (val.trim() === "" || val.trim() * 1 <= 0) {
        classAdd = "close";
        this.invest.valInvest = "";
      } else {
        classAdd = "check";
        this.valInvestFundCheck = true;
        this.invest.valInvest = this.valInvestFund;
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
