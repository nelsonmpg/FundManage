<template>
  <CRow class="animated fadeIn">
    <CCol col="12">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol col="12">
              <h3 class="card-title">Funds</h3>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol col="12">
              <CButton class="mb-2" @click="createNewFund" block variant="outline" color="success">
                <CIcon name="cil-pencil" />Create New Fund
              </CButton>
            </CCol>
          </CRow>
          <CRow>
            <CCol col="12" id="findsList">
              <CTableWrapper
                :items="items"
                :fields="fields"
                hover
                striped
                bordered
                small
                fixed
                sorter
                responsive
                :caption="'Funds list'"
                :place="'funds'"
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import CTableWrapper from "./../../components/Table.vue";
import utils from "./../../shared/utilsLib.js";
export default {
  components: { CTableWrapper },
  name: "Funds",
  data: () => {
    return {
      items: [],
      fields: [
        { key: "isin", _classes: "text-center" },
        { key: "name", _classes: "text-center" },
        {
          key: "fundStart",
          label: "Fund Created",
          _classes: "text-center"
        },
        { key: "lastUpdate", label: "Date Updated", _classes: "text-center" },
        {
          key: "lastHistoryDate",
          label: "Last Date Record",
          _classes: "text-center"
        },
        { key: "lastValue", _classes: "text-center" }
      ],
      utils
    };
  },
  computed: {},
  methods: {
    createNewFund() {
      this.$router.push("/funds/fund");
    },
    getAllFunds() {
      this.$http
        .get(utils.geturl() + "/api/funds")
        .then(function(response) {
          let data = response.data;
          console.log("AllFunds", data);
          if (data.status === true) {
            this.items = data.data;
            this.items = this.items.sort(utils.dynamicSort("name"));
          } else {
            this.$notify({
              group: "notification",
              title: "New fund existes.",
              type: "danger",
              text: "The fund '" + data.data + "' exists in database.",
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
              title: "Get funds error.",
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
  },
  beforeCreate() {},
  beforeDestroy() {
    document.getElementById("findsList").outerHTML = "";
  }
};
</script>

