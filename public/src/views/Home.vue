<template>
  <div class="animated fadeIn">
    <CRow>
      <CCol xl="6" lg="12" md="12" sm="12" xs="12">
        <CCard no-header>
          <CCardHeader>Actions</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol cols="12">
                <CButton
                  @click="updateFundsAndPortfolio"
                  block
                  class="mb-3"
                  :disabled="updatefundsAll.status"
                  variant="outline"
                  color="success"
                >
                  <CIcon name="cil-reload" />&nbsp;&nbsp;Force update All Funds and
                  Portfolio
                </CButton>
              </CCol>
            </CRow>
            <fundupdateinfo
              :fundupdate="updatefundsAll"
              :fundstep="msgUpdateall"
              :fundval="valUpdateall"
            ></fundupdateinfo>
            <!-- <CRow>
              <CCol cols="12">
                <CButton
                  @click="alert('Teste')"
                  block
                  class="mb-3"
                  :disabled="updatefundsAll.status"
                  variant="outline"
                  color="success"
                >
                  <CIcon name="cil-reload" />&nbsp;&nbsp;Insert Portfolio In File
                  Portfolio
                </CButton>
              </CCol>
            </CRow>-->
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xl="6" lg="12" md="12" sm="12" xs="12">
        <CRow>
          <CCol col="12">
            <CCard no-header>
              <CCardHeader>List Fund Now Update in Data Base</CCardHeader>
              <CCardBody>
                <fundupdateinfo
                  v-for="(fundupdate, index) in listFundsUpdate"
                  :key="index"
                  :fundupdate="fundupdate"
                  :fundstep="fundupdate.step"
                  :fundval="fundupdate.val"
                ></fundupdateinfo>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol col="12">
            <CCard no-header v-show="continersArticles.length > 0">
              <b-carousel
                id="carousel1"
                controls
                indicators
                img-width="1024"
                img-height="480"
                :interval="4000"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
              >
                <b-carousel-slide
                  img-blank
                  v-for="(article, index) in continersArticles"
                  :key="index"
                >
                  <CCard no-body border-variant="info">
                    <div class="brand-card-header bg-gray-900">
                      <i :class="article.classIcon"></i>
                    </div>
                    <div class="h4 mt-2" v-html="utils.decode_utf8(article.local)"></div>
                    <div class="h5" v-html="utils.decode_utf8(article.state)"></div>
                    <div class="brand-card-body p-0 m-0">
                      <div>
                        <div class="text-value" v-html="article.maxval"></div>
                        <div class="text-uppercase small">Max</div>
                      </div>
                      <div>
                        <div class="text-value" v-html="article.minval"></div>
                        <div class="text-uppercase small">Min</div>
                      </div>
                    </div>
                  </CCard>
                </b-carousel-slide>
              </b-carousel>
            </CCard>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import fundupdateinfo from "./../components/updateFundInfo.vue";
import utils from "./../shared/utilsLib.js";
export default {
  name: "Home",
  components: {
    fundupdateinfo
  },
  data: function() {
    return {
      slide: 0,
      sliding: null,
      continersArticles: "",
      listFundsUpdate: [],
      updatefundsAll: {
        status: false,
        name: "Update All Funds and Portfolios.",
        msg: "Step 1 / 2",
        val: 0
      },
      msgUpdateall: "",
      valUpdateall: 0,
      week: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      clock: {
        time: "",
        date: ""
      },
      timerID: null,
      utils
    };
  },
  methods: {
    updateFundsAndPortfolio() {
      this.$loading.show();
      this.$http
        .get(utils.geturl() + "/api/updateallelements")
        .then(function(response) {
          let data = response.data;
          if (data.status === true) {
            this.$notify({
              group: "notification",
              title: "New fund created.",
              text: data.data,
              type: "info",
              position: "top center"
            });
            this.updatefundsAll.status = true;
          } else {
            this.$notify({
              group: "notification",
              title: "Update database.",
              type: "warning",
              text: "Update all elements in data base.",
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
              title: "New fund existes.",
              type: "danger",
              text: "Error " + err,
              position: "top center"
            });
          }
          this.$loading.hide();
        });
    },
    getWeather() {
      this.continersArticles = [];
      this.$http
        .get(utils.geturl() + "/api/WeatherList")
        .then(function(response) {
          let data = response.data;
          if (data.status === true) {
            let WeatherData = data.data;
            this.continersArticles = WeatherData;
            // console.log(this.continersArticles);
          } else {
            this.$notify({
              group: "notification",
              title: "Find fund.",
              type: "warning",
              text: data.data,
              position: "top center"
            });
          }
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
              title: "Get Weather List.",
              type: "danger",
              text: "Error get Weather List.",
              position: "top center"
            });
          }
        });
    },
    onSlideStart(slide) {
      // console.log("onSlideStart", slide);
      this.sliding = true;
    },
    onSlideEnd(slide) {
      // console.log("onSlideEnd", slide);
      this.sliding = false;
      if (this.continersArticles.length - 1 == slide) {
        setTimeout(() => {
          this.getWeather();
          // console.log("-+ new call -+");
        }, 3500);
      }
    }
  },
  created() {
    this.getWeather();
  },
  beforeDestroy() {},
  sockets: {
    updateProgressBar(data) {
      let addData = false;
      if (data.status === true) {
        for (let x in this.listFundsUpdate) {
          if (this.listFundsUpdate[x]) {
            if (this.listFundsUpdate[x].isin === data.fund.isin) {
              this.listFundsUpdate[x].step = data.msg;
              this.listFundsUpdate[x].val = data.val;
              addData = true;
              if (data.proc === "savecomplete") {
                this.listFundsUpdate[x].status = false;
                this.listFundsUpdate.slice(x, 1);
              }
            }
          }
        }
        if (!addData) {
          this.listFundsUpdate.push({
            status: data.status,
            isin: data.fund.isin,
            name: data.fund.name,
            step: data.msg,
            val: data.val
          });
        }
      } else {
        for (let x in this.listFundsUpdate) {
          if (this.listFundsUpdate[x]) {
            if (this.listFundsUpdate[x].isin === data.fund.isin) {
              if (data.proc === "savecomplete") {
                this.listFundsUpdate[x].status = false;
                this.listFundsUpdate.slice(x, 1);
              }
            }
          }
        }
        console.log("Status = False.");
      }
    },
    updateFundsAndWallets(data) {
      // console.log("Receive upate", data);
      if (data.status === true) {
        this.updatefundsAll.status = true;
        this.msgUpdateall = data.msg;
        this.valUpdateall = data.val;
      } else {
        this.updatefundsAll.status = false;
        console.log("Status = False.");
      }
    }
  }
};
</script>

<style>
.text {
  letter-spacing: 0.1em;
  font-size: 12px;
  padding: 20px 0 0;
}
</style>
