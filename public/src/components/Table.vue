<template>
  <CCard>
    <CCardHeader v-if="caption.trim() != ''">
      <slot name="header">
        <CIcon name="cil-grid" />
        {{caption}}
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        :sorter="sorter"
        :items-per-page="perPage"
        :current-page="currentPage"
        @row-clicked="rowClicked"
        :dark="dark"
        :pagination="pagination"
        size="sm"
      >
        <template #lastUpdate="{item}">
          <td class="text-center">{{utils.dateFormat(item.lastUpdate)}}</td>
        </template>
        <template #lastHistoryDate="{item}">
          <td class="text-center">
            {{
            utils.onlyDateFormat(item.lastHistoryDate)
            }}
          </td>
        </template>
        <template #fundStart="{item}">
          <td class="text-center">
            {{
            utils.onlyDateFormat(item.fundStart)
            }}
          </td>
        </template>
        <template #lastValue="{item}">
          <td class="text-center">
            {{
            utils.formatCurrency(item.lastValue)
            }}
          </td>
        </template>

        <template #nameWallet="{item}">
          <td class="text-center">
            <strong>{{item.nameWallet}}</strong>
          </td>
        </template>
        <template #startWalletMoney="{item}">
          <td class="text-center">{{utils.formatCurrency(item.startWalletMoney)}}</td>
        </template>
        <template #lastWalletMoney="{item}">
          <td class="text-center">{{utils.formatCurrency(item.lastWalletMoney)}}</td>
        </template>
        <template #dateLastUpdateWallet="{item}">
          <td class="text-center">{{utils.dateFormat(item.dateLastUpdateWallet)}}</td>
        </template>
        <template #rendLiquido="{item}">
          <td class="text-center">{{utils.formatPercentage(item.rendLiquido, 3)}}</td>
        </template>
        <template #rendBruto="{item}">
          <td class="text-center">{{utils.formatPercentage(item.rendBruto, 3)}}</td>
        </template>
        <template #status="{item}">
          <td class="text-center">
            <CCard
              :no-body="true"
              class="mt-0 mb-0 pt-0 pb-0"
              :class="(item.status > 0 ? 'bg-success' : (item.status = 0 ? 'bg-info' :'bg-danger'))"
            >
              <CIcon
                :name="(item.status > 0) ? 'cil-hand-point-up' : 'cil-hand-point-down'"
                :height="30"
                class="pt-2 pb-2"
              />
            </CCard>
          </td>
        </template>
        <template #gain="{item}">
          <td class="text-center">
            <CCard
              :no-body="true"
              class="mt-0 mb-0 pt-0 pb-0"
              :class="item.gain > 0 ? 'bg-success' : 'bg-danger'"
            >
              <b>{{utils.formatCurrency(item.gain)}}</b>
            </CCard>
          </td>
        </template>

        <template #dateInvest="{item}">
          <td class="text-center">{{utils.onlyDateFormat(item.dateInvest)}}</td>
        </template>
        <template #cotacaoUp="{item}">
          <td class="text-center">{{utils.formatCurrency(item.cotacaoUp)}}</td>
        </template>
        <template #valInvest="{item}">
          <td class="text-center">{{utils.formatCurrency(item.valInvest)}}</td>
        </template>
        <template #active="{item}">
          <td class="text-center">
            <input type="checkbox" :checked="item.active" disabled />
          </td>
        </template>
        <template #dateInative="{item}">
          <td class="text-center">
            <n v-if="!item.active">{{utils.onlyDateFormat(item.dateInative)}}</n>
            <n v-else>- - -</n>
          </td>
        </template>
        <template #lastvalUp="{item}">
          <td class="text-center">{{utils.formatCurrency(item.lastvalUp)}}</td>
        </template>
        <template #lastDate="{item}">
          <td class="text-center">{{utils.onlyDateFormat(item.lastDate)}}</td>
        </template>
        <template #lastVal="{item}">
          <td class="text-center">{{utils.formatCurrency(item.lastVal)}}</td>
        </template>
        <template #gainValue="{item}">
          <td class="text-center">
            <CCard
              :no-body="true"
              class="mt-0 mb-0 pt-0 pb-0"
              :class="item.gainValue > 0 ? 'bg-success' : 'bg-danger'"
            >
              <b v-if="item.active">{{utils.formatCurrency(item.gainValue)}}</b>
              <b v-else>0,00</b>
            </CCard>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import utils from "./../shared/utilsLib.js";
export default {
  name: "Table",
  data: () => {
    return {
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      utils
    };
  },
  props: {
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
      default: true
    },
    small: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: true
    },
    dark: {
      type: Boolean,
      default: false
    },
    sorter: {
      type: Boolean,
      default: true
    },
    responsive: {
      type: Boolean,
      default: true
    },
    caption: {
      type: String,
      default: "Table"
    },
    place: {
      type: String,
      default: ""
    },
    items: Array,
    fields: Array
  },

  methods: {
    getRowCount(items) {
      return items.length;
    },
    walletLink(_id) {
      return `/Portfoliofunds/PortfolioView/${_id.toString()}`;
    },
    userLink(isin) {
      return `/funds/fundView/${isin.toString()}`;
    },
    rowClicked(item) {
      let linkUrl = null;
      if (this.place == "funds") {
        linkUrl = this.userLink(item.isin);
      } else if (this.place == "portfolios") {
        linkUrl = this.walletLink(item._id);
      } else {
        return;
      }
      this.$router.push({ path: linkUrl });
    }
  },
  created() {},
  mounted() {
    setTimeout(() => {
      let elem = document.getElementsByClassName("pagination")[0];
      elem.classList.remove("justify-content-start");
      elem.classList.add("justify-content-center");
      elem.classList.add("pagination-sm");
      elem.firstElementChild.getElementsByTagName("a")[0].innerHTML = "First";
      elem.lastElementChild.getElementsByTagName("a")[0].innerHTML = "Last";
      elem.firstElementChild.nextElementSibling.getElementsByTagName(
        "a"
      )[0].innerHTML = "Prev";
      elem.lastElementChild.previousElementSibling.getElementsByTagName(
        "a"
      )[0].innerHTML = "Next";
    }, 100);
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
