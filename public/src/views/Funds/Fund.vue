<template>
  <b-row class="animated fadeIn">
    <b-col cols="12">
      <b-card no-header>
        <template slot="header">ISIN: {{ isin }}</template>
        <b-form>
          <b-row>
            <b-col sm="4">
              <b-form-group class="mb-0">
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Fund ISIN</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="isinCode"
                    type="text"
                    placeholder="Enter Fund ISIN.."
                    required
                  ></b-form-input>
                  <b-input-group-append>
                    <b-input-group-text>
                      <i
                        class="fa"
                        v-b-tooltip.hover.html="'<strong>Insert a valid ISIN of Fund.</strong>'"
                        :class="classisinCode"
                      ></i>
                    </b-input-group-text>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col sm="8">
              <b-form-group class="mb-0">
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text>Fund Name</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                    v-model="isinName"
                    type="text"
                    placeholder="Enter Fund Name.."
                    required
                  ></b-form-input>
                  <b-input-group-append>
                    <b-input-group-text>
                      <i
                        class="fa"
                        v-b-tooltip.hover.html="'<strong>Insert a valid fund name.</strong>'"
                        :class="classisinName"
                      ></i>
                    </b-input-group-text>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- <div slot="footer">
          </div>-->
        </b-form>
        <template slot="footer">
          <b-row>
            <b-col cols="6">
              <b-button block variant="outline-primary" @click="goBack">
                <i class="cui-account-logout icons active mt-3"></i> Back
              </b-button>
            </b-col>
            <b-col cols="6">
              <b-button @click="saveFund" block class="mb-3" variant="outline-success">
                <i class="fa fa-save"></i> Save Fund
              </b-button>
            </b-col>
          </b-row>
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: "Fund",
  data: () => {
    return {
      isin: "New Fund",
      isinCode: "",
      isinCodeCheck: false,
      classisinCode: "fa-close",
      isinName: "",
      isinNameCheck: false,
      classisinName: "fa-close"
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
          type: "error",
          position: "top center"
        });
      }
      let data = {
        isin: this.isinCode,
        name: this.isinName
      };

      this.$http
        .post("/api/funds/fund", data)
        .then(function(response) {
          let data = response.data;
          // console.log("save", data);
          if (data.status === true) {
            this.$notify({
              group: "notification",
              title: "New fund created.",
              text: "Fund '" + data.data.name + "' created.",
              position: "top center"
            });
            this.$router.push("/funds");
          } else {
            this.$notify({
              group: "notification",
              title: "New fund existes.",
              type: "warn",
              text: "The fund '" + data.data.name + "' exists in database.",
              position: "top center"
            });
          }
        })
        .catch(function(err) {
          console.log("Error", err);
        });
    }
  },
  watch: {
    isinCode: function(val) {
      let addClass = "";
      this.isinCodeCheck = false;
      if (val.trim().length > 9) {
        addClass = "check";
        this.isinCodeCheck = true;
      } else {
        addClass = "close";
      }
      this.classisinCode = "fa-" + addClass;
    },
    isinName: function(val) {
      let addClass = "";
      this.isinNameCheck = false;
      if (val.trim().length > 4) {
        addClass = "check";
        this.isinNameCheck = true;
      } else {
        addClass = "close";
      }
      this.classisinName = "fa-" + addClass;
    }
  }
};
</script>
