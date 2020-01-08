<template>
  <CCard class="m-0 p-0" no-header border-color="primary" v-if="show">
    <CCardBody class="pl-2 pr-0 pt-0 pb-2">
      <CRow class="align-items-center h-100">
        <CCol col="1" class="mx-auto text-center">
          <h5>
            <CBadge pill color="dark">{{ (posArr + 1) }}</CBadge>
          </h5>
        </CCol>
        <CCol col="10">
          <CRow>
            <CCol class="mt-2" xl="6" lg="12" md="12" sm="12" xs="12">
              <CInput class="mb-0" type="date" ref="fundDate" v-model="dateFund">
                <template #prepend>
                  <CButton color="dark" disabled>
                    <CIcon name="cil-calendar" />
                  </CButton>
                </template>
                <template #append>
                  <CButton color="dark" disabled>
                    <CIcon
                      v-c-tooltip.hover.html="'<strong>Select a date to start this investiment.</strong>'"
                      :name="classdateFund"
                    />
                  </CButton>
                </template>
              </CInput>
            </CCol>
            <CCol class="mt-2" xl="6" lg="12" md="12" sm="12" xs="12">
              <CInput
                class="mb-0"
                type="number"
                ref="fundNups"
                v-model="nUpsFund"
                placeholder="ex. 123.45"
              >
                <template #prepend>
                  <CButton color="dark" disabled>Nº Ups</CButton>
                </template>
                <template #append>
                  <CButton color="dark" disabled>
                    <CIcon
                      v-c-tooltip.hover.html="'<strong>Insert the number of Nups to invest.</strong>'"
                      :name="classnUpsFund"
                    />
                  </CButton>
                </template>
              </CInput>
            </CCol>
          </CRow>
        </CCol>
        <CCol col="1">
          <div class="card-header-actions">
            <CLink
              href="#"
              class="card-header-action btn-close"
              v-on:click="removePanel"
              v-c-tooltip.hover.html="'<strong>Delete this investiment.</strong>'"
            >
              <CIcon name="cil-x-circle" />
            </CLink>
          </div>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>
</template>
<script>
import utils from "./../../shared/utilsLib.js";
export default {
  components: {},
  props: ["invest", "posArr"],
  name: "AddInvest",
  data: () => {
    return {
      dateFund: "",
      dateFundCheck: false,
      classdateFund: "cil-x",
      nUpsFund: "",
      nUpsFundCheck: false,
      classnUpsFund: "cil-x",
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
      return true;
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
        classAdd = "x";
        this.invest.dateInvest = "";
      } else if (Date.parse(dat1) < Date.parse(dat2)) {
        this.$notify({
          group: "notification",
          title: "Attention.",
          type: "warning",
          text: "You selected a day after Today.",
          position: "top center"
        });
        classAdd = "x";
        this.invest.dateInvest = "";
      } else if (weekEnd) {
        this.$notify({
          group: "notification",
          title: "Attention.",
          type: "warning",
          text: "You selected a day of weekend.",
          position: "top center"
        });
        classAdd = "x";
        this.invest.dateInvest = "";
      } else {
        classAdd = "check-alt";
        this.dateFundCheck = true;
        this.invest.dateInvest = this.dateFund;
        this.invest.dateCheck = new Date(this.dateFund).getTime();
      }
      this.classdateFund = "cil-" + classAdd;
    },
    nUpsFund: function(val) {
      let classAdd = "";
      this.nUpsFundCheck = false;
      if (val.trim() === "" || val.trim() * 1 <= 0) {
        classAdd = "x";
        this.invest.nUps = "";
      } else {
        classAdd = "check-alt";
        this.nUpsFundCheck = true;
        this.invest.nUps = this.nUpsFund;
      }
      this.classnUpsFund = "cil-" + classAdd;
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
