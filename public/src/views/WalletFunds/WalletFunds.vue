<template>
  <b-row class="animated fadeIn">
    <b-col cols="12">
      <transition name="slide">
        <b-card>
          <template slot="header">
            <b-row>
              <b-col cols="12">
                <h3 class="card-title">{{ caption }}</h3>
              </b-col>
            </b-row>
          </template>
          <b-button class="mb-3" @click="createNewFund" block variant="outline-success">
            <i class="cui-pencil icons"></i> Create New Portfolio Fund
          </b-button>
          <b-table
            :hover="hover"
            striped
            bordered
            responsive="sm"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            @row-clicked="rowClicked"
          >
            <template slot="nameWallet" slot-scope="data">
              <strong>{{data.item.nameWallet}}</strong>
            </template>
            <template
              slot="startWalletMoney"
              slot-scope="data"
            >{{utils.formatCurrency(data.item.startWalletMoney)}}</template>cotacaoUp
            <template
              slot="lastWalletMoney"
              slot-scope="data"
            >{{utils.formatCurrency(data.item.lastWalletMoney)}}</template>
            <template
              slot="dateLastUpdateWallet"
              slot-scope="data"
            >{{utils.dateFormat(data.item.dateLastUpdateWallet)}}</template>

            <template
              slot="rendLiquido"
              slot-scope="data"
            >{{utils.formatPercentage(data.item.rendLiquido, 3)}}</template>
            <template
              slot="rendBruto"
              slot-scope="data"
            >{{utils.formatPercentage(data.item.rendBruto, 3)}}</template>
            <template slot="status" slot-scope="data">
              <b-card
                :no-body="true"
                class="mt-0 mb-0 pt-0 pb-0"
                :class="'bg-' + (data.item.status > 0 ? 'success' : (data.item.status = 0 ? 'info' :'danger'))"
              >
                <i
                  class="fa pt-2 pb-2"
                  :class="'fa-thumbs-' + (data.item.status >= 0 ? 'up' : 'down')"
                ></i>
              </b-card>
            </template>
            <template slot="gain" slot-scope="data">
              <b-card
                :no-body="true"
                class="mt-0 mb-0 pt-0 pb-0"
                :class="data.item.gain > 0 ? 'bg-success' : 'bg-danger'"
              >
                <b>{{utils.formatCurrency(data.item.gain)}}</b>
              </b-card>
            </template>
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
  name: "Portfoliofunds",
  props: {
    caption: {
      type: String,
      default: "Portfolio of Funds"
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
        { key: "_id", thClass: "d-none", tdClass: "d-none" },
        { key: "nameWallet", label: "Portfolio Name", sortable: true },
        { key: "dateLastUpdateWallet", label: "Last Update" },
        { key: "startWalletMoney", label: "€ Invested" },
        { key: "lastWalletMoney", label: "€ Last Update" },
        { key: "gain" },
        { key: "rendLiquido", label: "Net income" }
        // { key: "rendBruto", label: "Gross income" },
        // { key: "status" }
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
      this.$router.push("/Portfoliofunds/Portfoliofund");
    },
    getAllOwnerWallets() {
      this.$http
        .get(
          utils.geturl() +
            "/api/portfoliofunds/" +
            JSON.parse(localStorage.getItem("user")).data._id
        )
        .then(function(response) {
          let data = response.data;
          if (data.status === true) {
            let allWallet = data.data,
              refactWallet = [];
            for (let i = 0; i < allWallet.length; i++) {
              let a =
                (allWallet[i].lastWalletMoney - allWallet[i].startWalletMoney) /
                allWallet[i].startWalletMoney;
              refactWallet.push({
                nameWallet: allWallet[i].nameWallet,
                startWalletMoney: allWallet[i].startWalletMoney,
                lastWalletMoney: allWallet[i].lastWalletMoney,
                dateLastUpdateWallet: allWallet[i].dateLastUpdateWallet,
                _id: allWallet[i]._id,
                rendLiquido: a,
                rendBruto: a * 0.72,
                gain:
                  allWallet[i].lastWalletMoney - allWallet[i].startWalletMoney,
                status:
                  allWallet[i].lastWalletMoney - allWallet[i].startWalletMoney
              });
            }
            this.items = refactWallet;
            this.items = this.items.sort(utils.dynamicSort("nameWallet"));
          } else {
            this.$notify({
              group: "notification",
              title: "Error get user portfolios.",
              type: "danger",
              text: "The Portfolio find database.",
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
              title: "Error get portfolios.",
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
    walletLink(_id) {
      return `/Portfoliofunds/PortfolioView/${_id.toString()}`;
    },
    rowClicked(item) {
      const walletLink = this.walletLink(item._id);
      this.$router.push({ path: walletLink });
    }
  },
  created() {
    this.getAllOwnerWallets();
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
