<template>
  <b-row class="animated fadeIn">
    <b-col cols="12">
      <transition name="slide">
        <b-card :header="caption">
          <b-button class="mb-2" @click="createNewFund" block variant="outline-success">
            <i class="cui-pencil icons"></i> Create New Fund
          </b-button>
          <b-table
            hover
            stripe
            bordered
            small
            fixed
            responsive="sm"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            @row-clicked="rowClicked"
          >
            <template slot="lastUpdate" slot-scope="data">{{utils.dateFormat(data.item.lastUpdate)}}</template>
            <template
              slot="lastHistoryDate"
              slot-scope="data"
            >{{utils.onlyDateFormat(data.item.lastHistoryDate)}}</template>
            <template
              slot="fundStart"
              slot-scope="data"
            >{{utils.onlyDateFormat(data.item.fundStart)}}</template>
            <template
              slot="lastValue"
              slot-scope="data"
            >{{utils.formatCurrency(data.item.lastValue)}}</template>
          </b-table>
          <nav>
            <b-pagination
              size="sm"
              align="center"
              :total-rows="getRowCount(items)"
              :per-page="perPage"
              v-model="currentPage"
              prev-text="Prev"
              next-text="Next"
            />
          </nav>
        </b-card>
      </transition>
    </b-col>
  </b-row>
</template>

<script>
import utils from "./../../shared/utilsLib.js";
export default {
  components: {},
  name: "Funds",
  props: {
    caption: {
      type: String,
      default: "Funds"
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      items: [],
      fields: [
        { key: "isin", sortable: true },
        { key: "name", sortable: true },
        { key: "fundStart", label: "Fund Created", sortable: true },
        { key: "lastUpdate", label: "Date Updated" },
        { key: "lastHistoryDate", label: "Last Date Record" },
        { key: "lastValue", sortable: true }
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
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
          // console.log("AllFunds", data);
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
    },
    getRowCount(items) {
      return items.length;
    },
    userLink(isin) {
      return `/funds/fundView/${isin.toString()}`;
    },
    rowClicked(item) {
      const userLink = this.userLink(item.isin);
      this.$router.push({ path: userLink });
    }
  },
  created() {
    this.getAllFunds();
  },
  mounted() {
    this.$loading.show();
  },
  beforeCreate() {},
  beforeDestroy() {}
};
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
  vertical-align: middle;
}
</style>
