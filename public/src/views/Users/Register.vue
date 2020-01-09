<template>
  <CContainer class="min-vh-100 d-flex align-items-center">
    <CRow class="w-100 justify-content-center">
      <CCol md="8" sm="12">
        <CCard class="mx-4 mb-0">
          <CCardBody class="p-4">
            <CForm>
              <h1>Register</h1>
              <p class="text-muted">Create your account</p>
              <CAlert
                :show="showErrorName"
                color="danger"
                closeButton
                dismissible
                fade
              >
                <strong>Not valid name..</strong>
              </CAlert>
              <CInput
                placeholder="Username"
                autocomplete="username"
                v-model="nameUser"
              >
                <template #prepend>
                  <CButton color="dark" disabled
                    ><CIcon name="cil-user"
                  /></CButton>
                </template>
                <template #append>
                  <CButton color="dark" disabled
                    ><CIcon
                      v-c-tooltip.hover.html="
                        '<strong>Insert a valid name. Size larger than 4.</strong>'
                      "
                      :name="classusername"
                  /></CButton>
                </template>
              </CInput>

              <CAlert
                :show="showErrorEmail"
                color="danger"
                closeButton
                dismissible
                fade
              >
                <strong>Not valid email.</strong>
              </CAlert>
              <CInput
                placeholder="Email"
                v-model="emailUser"
                autocomplete="email"
              >
                <template #prepend>
                  <CButton color="dark" disabled
                    ><CIcon name="cil-at"
                  /></CButton>
                </template>
                <template #append>
                  <CButton color="dark" disabled
                    ><CIcon
                      v-c-tooltip.hover.html="
                        '<strong>Insert a valid email.</strong>'
                      "
                      :name="classemailUser"
                  /></CButton>
                </template>
              </CInput>

              <CAlert
                :show="showErrorPass"
                color="danger"
                closeButton
                dismissible
                fade
              >
                <strong>Not valid password.</strong>
              </CAlert>
              <CInput
                placeholder="Password"
                type="password"
                v-model="passUser"
                autocomplete="new-password"
              >
                <template #prepend>
                  <CButton color="dark" disabled
                    ><CIcon name="cil-lock-locked"
                  /></CButton>
                </template>
                <template #append>
                  <CButton color="dark" disabled
                    ><CIcon
                      v-c-tooltip.hover.html="
                        '<strong>Insert a valid password. Size larger than 6.</strong>'
                      "
                      :name="classpassUser"
                  /></CButton>
                </template>
              </CInput>

              <CAlert
                :show="showErrorPassRepeat"
                color="danger"
                closeButton
                dismissible
                fade
              >
                <strong>The password not equals.</strong>
              </CAlert>
              <CInput
                placeholder="Repeat password"
                type="password"
                v-model="passUserTest"
                autocomplete="new-password"
                class="mb-4"
              >
                <template #prepend>
                  <CButton color="dark" disabled
                    ><CIcon name="cil-lock-locked"
                  /></CButton>
                </template>
                <template #append>
                  <CButton color="dark" disabled
                    ><CIcon
                      v-c-tooltip.hover.html="
                        '<strong>Repeat password.</strong>'
                      "
                      :name="classpassUserTest"
                  /></CButton>
                </template>
              </CInput>
              <CButton
                variant="outline"
                color="success"
                v-on:click="registerUser()"
                block
              >
                Create Account
              </CButton>
            </CForm>
          </CCardBody>
          <CCardFooter class="p-4">
            <CRow>
              <CCol col="12">
                <CButton
                  variant="outline"
                  color="primary"
                  @click="backLogin()"
                  block
                >
                  Back
                </CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>
<script>
import utils from "./../../shared/utilsLib.js";
export default {
  name: "Register",
  data() {
    return {
      showErrorPassRepeat: false,
      showErrorPass: false,
      showErrorEmail: false,
      showErrorName: false,
      nameUser: "",
      nameUserCheck: false,
      classusername: "cil-asterisk",
      emailUser: "",
      emailUserCheck: false,
      classemailUser: "cil-asterisk",
      passUser: "",
      passTUsr: "",
      passTUsrCheck: false,
      classpassUser: "cil-asterisk",
      passUserTest: "",
      passTUsrTest: "",
      passTUsrTestCheck: false,
      classpassUserTest: "cil-asterisk",
      check: true,
      utils
    };
  },
  methods: {
    registerUser() {
      this.showErrorPassRepeat = false;
      this.showErrorPass = false;
      this.showErrorEmail = false;
      this.showErrorName = false;

      this.showErrorName = !this.nameUserCheck ? true : false;
      this.showErrorEmail = !this.emailUserCheck ? true : false;
      this.showErrorPass = !this.passTUsrCheck ? true : false;
      this.showErrorPassRepeat = !this.passTUsrTestCheck ? true : false;

      if (
        !this.nameUserCheck ||
        !this.emailUserCheck ||
        !this.passTUsrCheck ||
        !this.passTUsrTestCheck
      ) {
        return this.$notify({
          group: "notification",
          title: "Error",
          text: "Check all fields.",
          type: "danger",
          position: "top center"
        });
      }

      let data = {
        name: this.nameUser,
        email: this.emailUser,
        password: this.passTUsr
      };
      this.$http
        .post(utils.geturl() + "/api/register", data)
        .then(function(response) {
          let data = response.data;
          // console.log(response);
          if (data.status === true) {
            this.$notify({
              group: "notification",
              title: "New User created.",
              text: "User created.",
              typr: "success",
              position: "top center"
            });
            this.$router.push("/login");
          } else {
            console.log("Logged Error");
            return this.$notify({
              group: "notification",
              title: "Error create user",
              text: data.data,
              type: "danger",
              position: "top center"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
          this.$notify({
            group: "notification",
            title: "Register user error.",
            type: "danger",
            text: "Error " + err,
            position: "top center"
          });
        });
    },
    backLogin() {
      this.$router.push("/login");
    }
  },
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeDestroy() {},
  watch: {
    nameUser: function(val) {
      let classAdd = "";
      let color = "";
      this.nameUserCheck = false;
      if (val.trim().length === 0) {
        classAdd = "asterisk";
      } else if (val.trim().length <= 3) {
        classAdd = "x";
      } else {
        classAdd = "check-alt";
        this.nameUserCheck = true;
      }
      this.classusername = "cil-" + classAdd;
    },
    emailUser: function(val) {
      let regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let classAdd = "";
      let color = "";
      this.emailUserCheck = false;
      if (val.toLowerCase().trim().length === 0) {
        classAdd = "asterisk";
      } else if (!regexMail.test(String(val.toLowerCase()).toLowerCase())) {
        classAdd = "x";
      } else {
        classAdd = "check-alt";
        this.emailUserCheck = true;
      }
      this.classemailUser = "cil-" + classAdd;
    },
    passUser: function(val) {
      let classAdd = "";
      let color = "";
      this.passTUsr = window.btoa(unescape(encodeURIComponent(val)));
      this.passTUsrCheck = false;
      if (this.passTUsr.trim().length === 0) {
        classAdd = "asterisk";
      } else if (val.trim().length < 6) {
        classAdd = "x";
      } else {
        classAdd = "check-alt";
        this.passTUsrCheck = true;
      }
      this.classpassUser = "cil-" + classAdd;
    },
    passUserTest: function(val) {
      let classAdd = "";
      let color = "";
      this.passTUsrTest = window.btoa(unescape(encodeURIComponent(val)));
      this.passTUsrTestCheck = false;
      if (this.passTUsrTest.trim().length === 0) {
        classAdd = "asterisk";
      } else if (this.passTUsr.trim() !== this.passTUsrTest.trim()) {
        classAdd = "x";
      } else {
        classAdd = "check-alt";
        this.passTUsrTestCheck = true;
      }
      this.classpassUserTest = "cil-" + classAdd;
    }
  }
};
</script>
<style></style>
