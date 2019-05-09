<template>
  <b-row class="animated fadeIn">
    <b-col cols="12">
      <transition name="slide">
        <b-card :header="caption">
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
            >{{utils.onlyDateFormat(data.item.dateLastUpdateWallet)}}</template>

            <template
              slot="rendLiquido"
              slot-scope="data"
            >{{utils.formatPercentage(data.item.rendLiquido, 3)}}</template>
            <template
              slot="rendBruto"
              slot-scope="data"
            >{{utils.formatPercentage(data.item.rendBruto, 3)}}</template>
          </b-table>
          <nav>
            <b-pagination
              size="sm"
              :total-rows="getRowCount(items)"
              :per-page="perPage"
              v-model="currentPage"
              prev-text="Prev"
              next-text="Next"
              hide-goto-end-buttons
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
        { key: "rendLiquido", label: "Net income" },
        { key: "rendBruto", label: "Gross income" }
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
                //listFunds: [],
                rendLiquido: a,
                rendBruto: a * 0.72
              });
            }
            this.items = refactWallet;
          } else {
            this.$notify({
              group: "notification",
              title: "New fund existes.",
              type: "eror",
              text: "The Portfolio find database.",
              position: "top center"
            });
          }
          this.$loading.hide();
        })
        .catch(function(err) {
          this.$loading.hide();
          console.log("Error", err);
        });
    },
    getRowCount(items) {
      return items.length;
    },
    userLink(_id) {
      return `/Portfoliofunds/PortfolioView/${_id.toString()}`;
    },
    rowClicked(item) {
      const userLink = this.userLink(item._id);
      this.$router.push({ path: userLink });
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
