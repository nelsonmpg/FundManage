<template>
  <CRow class="animated fadeIn">
    <CCol col="12">
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol col="12">
              <h3 class="card-title">Portfolios</h3>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol col="12">
              <CButton class="mb-2" @click="createNewFund" block variant="outline" color="success">
                <CIcon name="cil-pencil" />&nbsp;&nbsp;Create New Portfolio Fund
              </CButton>
            </CCol>
          </CRow>
          <CRow>
            <CCol col="12">
              <CTableWrapper
                :items="items"
                :fields="fields"
                hover
                striped
                bordered
                small
                fixed
                sorter
                responsive
                :caption="'Portfolios List'"
                :place="'portfolios'"
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import CTableWrapper from "./../../components/Table.vue";
import utils from "./../../shared/utilsLib.js";
export default {
  components: { CTableWrapper },
  name: "Portfoliofunds",
  data: () => {
    return {
      items: [],
      fields: [
        {
          key: "_id",
          _classes: "d-none"
        },
        { key: "nameWallet", label: "Portfolio Name", _classes: "text-center" },
        {
          key: "dateLastUpdateWallet",
          label: "Last Update",
          _classes: "text-center"
        },
        {
          key: "startWalletMoney",
          label: "€ Invested",
          _classes: "text-center"
        },
        {
          key: "lastWalletMoney",
          label: "€ Last Update",
          _classes: "text-center"
        },
        { key: "gain", _classes: "text-center" },
        { key: "rendLiquido", label: "Net income", _classes: "text-center" }
        // { key: "rendBruto", label: "Gross income", _classes: "text-center" },
        // { key: "status", _classes: "text-center" }
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
