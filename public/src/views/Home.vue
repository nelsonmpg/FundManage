<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col xl="6" lg="12" md="12" sm="12" xs="12">
        <b-card no-header>
          <b-row>
            <b-col cols="12" id="clock">
              <h1 class="date">{{ clock.date }}</h1>
              <h1 class="time">{{ clock.time }}</h1>
            </b-col>
          </b-row>
        </b-card>
        <b-card no-header v-show="continersArticles.length > 0">
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
            <b-carousel-slide img-blank v-for="(article, index) in continersArticles" :key="index">
              <b-card no-body border-variant="info">
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
              </b-card>
            </b-carousel-slide>
          </b-carousel>
        </b-card>
      </b-col>
      <b-col xl="6" lg="12" md="12" sm="12" xs="12">
        <b-row>
          <b-col cols="12">
            <b-card no-header>
              <template slot="header">Actions</template>
              <b-row>
                <b-col cols="12">
                  <b-button
                    @click="updateFundsAndPortfolio"
                    block
                    class="mb-3"
                    :disabled="uupdatefundsAll.status"
                    variant="outline-success"
                  >
                    <i class="fa fa-refresh"></i> Force update All Funds and Portfolio
                  </b-button>
                </b-col>
              </b-row>
              <fundupdateinfo
                :fundupdate="uupdatefundsAll"
                :fundstep="msgUpdateall"
                :fundval="valUpdateall"
              ></fundupdateinfo>
            </b-card>
          </b-col>

          <b-col cols="12">
            <b-card no-header>
              <template slot="header">List Fund Now Update in Data Base</template>
              <fundupdateinfo
                v-for="(fundupdate, index) in listFundsUpdate"
                :key="index"
                :fundupdate="fundupdate"
                :fundstep="fundupdate.step"
                :fundval="fundupdate.val"
              ></fundupdateinfo>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
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
      uupdatefundsAll: {
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
        .get("/api/updateallelements")
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
            this.uupdatefundsAll.status = true;
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
          this.$notify({
            group: "notification",
            title: "New fund existes.",
            type: "danger",
            text: "Error " + err,
            position: "top center"
          });
          this.$loading.hide();
        });
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    updateTime() {
      var cd = new Date();
      this.clock.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.clock.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        this.week[cd.getDay()];
    },
    getWeather() {
      this.continersArticles = [];
      this.$http
        .get("/api/WeatherList")
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
          this.$notify({
            group: "notification",
            title: "New fund existes.",
            type: "danger",
            text: "Error " + err,
            position: "top center"
          });
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
    this.timerID = setInterval(this.updateTime, 1000);
    this.updateTime();
    this.getWeather();
  },
  beforeDestroy() {
    // clearInterval(this.timerID);
  },
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
        this.uupdatefundsAll.status = true;
        this.msgUpdateall = data.msg;
        this.valUpdateall = data.val;
      } else {
        this.uupdatefundsAll.status = false;
        console.log("Status = False.");
      }
    }
  }
};
</script>

<style>
/* #clock p {
  margin: 0;
  padding: 0;
} */
#clock {
  font-family: "Share Tech Mono", monospace;
  color: #ffffff;
  text-align: center;
  /* position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  color: #daf6ff;
  text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);
}
.time {
  letter-spacing: 0.05em;
  font-size: 50px;
  padding: 5px 0;
}
.date {
  letter-spacing: 0.1em;
  font-size: 24px;
}
.text {
  letter-spacing: 0.1em;
  font-size: 12px;
  padding: 20px 0 0;
}
</style>
