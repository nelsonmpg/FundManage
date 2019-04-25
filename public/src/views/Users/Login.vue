<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="form-control user-mail"
                      placeholder="Email"
                      autocomplete="username email"
                      name="email"
                    />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="password"
                      class="form-control user-pass"
                      placeholder="Password"
                      autocomplete="current-password"
                      name="password"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="12">
                      <b-button
                        block
                        variant="outline-success"
                        v-on:click="login()"
                        class="px-4"
                        value="Login"
                      >Login</b-button>
                      <b-button
                        block
                        variant="outline-primary"
                        v-on:click="register()"
                        class="px-4"
                      >Register Now!</b-button>
                    </b-col>
                    <!-- <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>-->
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <!-- <b-card no-body class="text-white bg-primary py-5 d-md-down-none">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button
                  block
                    variant="primary"
                    v-on:click="register()"
                    class="active mt-3"
                  >Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card> -->
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  methods: {
    login() {
      // function utf8_to_b64( str ) {
      //   return window.btoa(unescape(encodeURIComponent( str )));
      // }

      // function b64_to_utf8( str ) {
      //   return decodeURIComponent(escape(window.atob( str )));
      // }
      let data = {
        email: document.getElementsByClassName("user-mail")[0].value,
        password: window.btoa(unescape(encodeURIComponent(document.getElementsByClassName("user-pass")[0].value)))
      };
      if (data.email.trim().length === 0 || data.password.trim().length === 0) {
        return this.$notify({
          group: "notification",
          title: "Error",
          text: "Insert valid email and password to login.",
          type: "error",
          position: "top center"
        });
      }
      this.$http
        .post("/api/login", data)
        .then(response => {
          let data = response.data;
          if (data.status === true) {
            console.log("Logged in");
            this.$notify({
              group: "notification",
              title: "Login Success",
              text: "Welcome " + data.data.name,
              position: "top center"
            });
            localStorage.setItem("user", JSON.stringify(data));
            this.$router.push("/dashboard");
          } else {
            console.log("Logged Error");
            this.$notify({
              group: "notification",
              title: "Login Error",
              text: data.data,
              type: "error",
              position: "top center"
            });
          }
        })
        .catch(err => {
          console.log(err.toString());
        });
    },
    register() {
      this.$router.push("/register");
    }
  }
};
</script>
