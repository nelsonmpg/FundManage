<template>
  <CRow class="animated fadeIn">
    <CCol cols="12">
      <CCard no-header>
        <CCardHeader>
          <h3 class="card-title">New Fund</h3>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CRow>
              <CCol xl="5" lg="12" md="12" sm="12" xs="12">
                <CInput
                  class="mb-0"
                  v-model="isinCode"
                  type="text"
                  placeholder="Enter Fund ISIN.."
                  required
                >
                  <template #prepend>
                    <CButton color="dark" disabled>Fund ISIN</CButton>
                  </template>
                  <template #append>
                    <CButton color="dark" disabled>
                      <CIcon
                        v-c-tooltip.hover.html="
                          '<strong>Insert a valid ISIN of Fund.</strong>'
                        "
                        :name="classisinCode"
                      />
                    </CButton>
                  </template>
                </CInput>
              </CCol>
              <CCol xl="7" lg="12" md="12" sm="12" xs="12">
                <CInput
                  class="mb-0"
                  v-model="isinName"
                  type="text"
                  placeholder="Enter Fund Name.."
                  required
                >
                  <template #prepend>
                    <CButton color="dark" disabled>Fund Name</CButton>
                  </template>
                  <template #append>
                    <CButton color="dark" disabled>
                      <CIcon
                        v-c-tooltip.hover.html="
                          '<strong>Insert a valid fund name.</strong>'
                        "
                        :name="classisinName"
                      />
                    </CButton>
                  </template>
                </CInput>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CRow>
            <CCol cols="6">
              <CButton block variant="outline" color="primary" @click="goBack">
                <CIcon name="cil-account-logout" />&nbsp;&nbsp;Back
              </CButton>
            </CCol>
            <CCol cols="6">
              <CButton @click="saveFund" block class="mb-3" color="success" variant="outline">
                <CIcon name="cil-save" />&nbsp;&nbsp;Save Fund
              </CButton>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import utils from "./../../shared/utilsLib.js";
export default {
  name: "Fund",
  data: () => {
    return {
      isin: "New Fund",
      isinCode: "",
      isinCodeCheck: false,
      classisinCode: "cil-x",
      isinName: "",
      isinNameCheck: false,
      classisinName: "cil-x",
      utils
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      this.$router.replace({ path: "/funds" });
    },
    saveFund() {
      if (!this.isinCodeCheck || !this.isinNameCheck) {
        return this.$notify({
          group: "notification",
          title: "Error",
          text: "Check all fields.",
          type: "danger",
          position: "top center"
        });
      }
      let data = {
        isin: this.isinCode,
        name: this.isinName,
        idFundmorningstar: ""
      };
      this.$loading.show();
      this.$http
        .post(utils.geturl() + "/api/funds/fund", data)
        .then(function(response) {
          let data = response.data;
          console.log("save", data);
          if (data.status === true) {
            this.$notify({
              group: "notification",
              title: "New fund created.",
              text: data.data,
              type: "info",
              position: "top center"
            });
            this.$router.push("/funds");
          } else {
            this.$notify({
              group: "notification",
              title: "New fund existes.",
              type: "warning",
              text: "The fund '" + data.data.name + "' exists in database.",
              position: "top center"
            });
          }
          this.$loading.hide();
        })
        .catch(function(err) {
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
              title: "Post fund error.",
              type: "danger",
              text: "Error " + err,
              position: "top center"
            });
          }
          this.$loading.hide();
        });
    }
  },
  watch: {
    isinCode: function(val) {
      let addClass = "";
      this.isinCodeCheck = false;
      if (val.trim().length > 9) {
        addClass = "check-alt";
        this.isinCodeCheck = true;
      } else {
        addClass = "x";
      }
      this.classisinCode = "cil-" + addClass;
    },
    isinName: function(val) {
      let addClass = "";
      this.isinNameCheck = false;
      if (val.trim().length > 4) {
        addClass = "check-alt";
        this.isinNameCheck = true;
      } else {
        addClass = "x";
      }
      this.classisinName = "cil-" + addClass;
    }
  }
};
</script>
