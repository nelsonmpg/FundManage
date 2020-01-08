<template>
  <CContainer class="min-vh-100 d-flex align-items-center">
    <CRow class="w-100 justify-content-center">
      <CCol md="8" sm="12">
        <CCard class="mx-4 mb-4">
          <CCardBody class="p-4">
            <CForm>
              <h1>Login</h1>
              <p class="text-muted">Sign In to your account</p>
              <CInput
                type="text"
                placeholder="Email"
                class="user-mail"
                autocomplete="username email"
                name="email"
              >
                <template #prepend>
                  <CButton color="dark" disabled
                    ><CIcon name="cil-at"
                  /></CButton>
                </template>
              </CInput>
              <CInput
                placeholder="Password"
                type="password"
                class="user-pass"
                @keyup.enter="login()"
                autocomplete="curent-password"
                name="password"
              >
                <template #prepend>
                  <CButton color="dark" disabled
                    ><CIcon name="cil-lock-locked"
                  /></CButton>
                </template>
              </CInput>
              <CRow>
                <CCol col="12">
                  <CButton
                    variant="outline"
                    color="success"
                    block
                    v-on:click="login()"
                    >Login</CButton
                  >
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
          <CCardFooter class="p-4">
            <CRow>
              <CCol col="12">
                <CButton
                  variant="outline"
                  color="primary"
                  block
                  v-on:click="register()"
                >
                  Register Now!</CButton
                >
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
  name: "Login",
  data: function() {
    return {
      utils
    };
  },
  methods: {
    login() {
      let data = {
        email: document.getElementsByName("email")[0].value,
        password: window.btoa(
          unescape(
            encodeURIComponent(document.getElementsByName("password")[0].value)
          )
        )
      };
      if (data.email.trim().length === 0 || data.password.trim().length === 0) {
        return this.$notify({
          group: "notification",
          title: "Error",
          text: "Insert valid email and password to login.",
          type: "danger",
          position: "top center"
        });
      }
      this.$http
        .post(utils.geturl() + "/api/login", data)
        .then(response => {
          let data = response.data;
          if (data.status === true) {
            console.log("Logged in");
            this.$notify({
              group: "notification",
              title: "Login Success",
              text: "Welcome " + data.data.name,
              type: "success",
              position: "top center"
            });
            localStorage.setItem("user", JSON.stringify(data));
            this.$router.push("/home");
          } else {
            console.log("Logged Error");
            this.$notify({
              group: "notification",
              title: "Login Error",
              text: data.data,
              type: "danger",
              position: "top center"
            });
          }
        })
        .catch(err => {
          console.log(err.toString());
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
              title: "Login error.",
              type: "danger",
              text: "Error " + err,
              position: "top center"
            });
          }
        });
    },
    register() {
      this.$router.push("/register");
    }
  }
};
</script>
