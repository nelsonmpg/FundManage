<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <b-row>
                  <h1>Register</h1>
                </b-row>
                <p class="text-muted">Create your account</p>
                <b-alert :show="showErrorName" variant="danger" dismissible fade>
                  <strong>Not valid name..</strong>
                </b-alert>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-user"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    type="text"
                    v-model="nameUser"
                    placeholder="Username"
                    v-b-tooltip.hover.html="'<strong>Insert a valid name. Size larger than 4.</strong>'"
                  />
                  <b-input-group-append>
                    <b-input-group-text>
                      <i class="fa" :class="classusername"></i>
                    </b-input-group-text>
                  </b-input-group-append>
                </b-input-group>

                <b-alert :show="showErrorEmail" variant="danger" dismissible fade>
                  <strong>Not valid email.</strong>
                </b-alert>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    type="text"
                    v-model="emailUser"
                    placeholder="Email"
                    v-b-tooltip.hover.html="'<strong>Insert a valid email.</strong>'"
                  />
                  <b-input-group-append>
                    <b-input-group-text>
                      <i class="fa" :class="classemailUser"></i>
                    </b-input-group-text>
                  </b-input-group-append>
                </b-input-group>

                <b-alert :show="showErrorPass" variant="danger" dismissible fade>
                  <strong>Not valid password.</strong>
                </b-alert>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    type="password"
                    v-model="passUser"
                    placeholder="Password"
                    v-b-tooltip.hover.html="'<strong>Insert a valid password. Size larger than 6.</strong>'"
                  />
                  <b-input-group-append>
                    <b-input-group-text>
                      <i class="fa" :class="classpassUser"></i>
                    </b-input-group-text>
                  </b-input-group-append>
                </b-input-group>

                <b-alert :show="showErrorPassRepeat" variant="danger" dismissible fade>
                  <strong>The password not equals.</strong>
                </b-alert>
                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    type="password"
                    v-model="passUserTest"
                    placeholder="Repeat password"
                    v-b-tooltip.hover.html="'<strong>Repeat password.</strong>'"
                  />
                  <b-input-group-append>
                    <b-input-group-text>
                      <i class="fa" :class="classpassUserTest"></i>
                    </b-input-group-text>
                  </b-input-group-append>
                </b-input-group>
                <b-button variant="outline-success" v-on:click="registerUser()" block>Create Account</b-button>
              </b-form>
            </b-card-body>
            <template slot="footer">
              <b-row>
                <b-col cols="12">
                  <b-button block variant="outline-primary" @click="backLogin()">
                    <i class="cui-account-logout icons active mt-3"></i> Back
                  </b-button>
                </b-col>
              </b-row>
            </template>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
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
      classusername: "fa-asterisk",
      emailUser: "",
      emailUserCheck: false,
      classemailUser: "fa-asterisk",
      passUser: "",
      passTUsr: "",
      passTUsrCheck: false,
      classpassUser: "fa-asterisk",
      passUserTest: "",
      passTUsrTest: "",
      passTUsrTestCheck: false,
      classpassUserTest: "fa-asterisk",
      check: true
    };
  },
  methods: {
    registerUser() {
      this.showErrorPassRepeat = false;
      this.showErrorPass = false;
      this.showErrorEmail = false;
      this.showErrorName = false;

      this.showErrorName = (!this.nameUserCheck) ? true : false;
      this.showErrorEmail = (!this.emailUserCheck) ? true : false;
      this.showErrorPass = (!this.passTUsrCheck) ? true : false;
      this.showErrorPassRepeat = (!this.passTUsrTestCheck) ? true : false;

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
          type: "error",
          position: "top center"
        });
      }

      let data = {
        name: this.nameUser,
        email: this.emailUser,
        password: this.passTUsr
      };
      this.$http
        .post("/api/register", data)
        .then(function(response) {
          let data = response.data;
          // console.log(response);
          if (data.status === true) {
            this.$notify({
              group: "notification",
              title: "New User created.",
              text: "User created.",
              position: "top center"
            });
            this.$router.push("/login");
          } else {
            return this.$notify({
              group: "notification",
              title: "Error",
              text: data.data,
              type: "error",
              position: "top center"
            });
            console.log("Logged Error");
          }
        })
        .catch(function(err) {
          console.log(err);
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
        classAdd = "close";
      } else {
        classAdd = "check";
      this.nameUserCheck = true;
      }
      this.classusername = "fa-" + classAdd;
    },
    emailUser: function(val) {
      let regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let classAdd = "";
      let color = "";
      this.emailUserCheck = false;
      if (val.toLowerCase().trim().length === 0) {
        classAdd = "asterisk";
      } else if (!regexMail.test(String(val.toLowerCase()).toLowerCase())) {
        classAdd = "close";
      } else {
        classAdd = "check";
      this.emailUserCheck = true;
      }
      this.classemailUser = "fa-" + classAdd;
    },
    passUser: function(val) {
      let classAdd = "";
      let color = "";
      this.passTUsr = window.btoa(unescape(encodeURIComponent(val)));
      this.passTUsrCheck = false;
      if (this.passTUsr.trim().length === 0) {
        classAdd = "asterisk";
      } else if (val.trim().length < 6) {
        classAdd = "close";
      } else {
        classAdd = "check";
      this.passTUsrCheck = true;
      }
      this.classpassUser = "fa-" + classAdd;
    },
    passUserTest: function(val) {
      let classAdd = "";
      let color = "";
      this.passTUsrTest = window.btoa(unescape(encodeURIComponent(val)));
      this.passTUsrTestCheck = false;
      if (this.passTUsrTest.trim().length === 0) {
        classAdd = "asterisk";
      } else if (this.passTUsr.trim() !== this.passTUsrTest.trim()) {
        classAdd = "close";
      } else {
        classAdd = "check";
      this.passTUsrTestCheck = true;
      }
      this.classpassUserTest = "fa-" + classAdd;
    }
  }
};
</script>
<style>
</style>

