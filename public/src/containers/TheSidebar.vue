<template>
  <CSidebar fixed :minimize="minimize" :show.sync="show">
    <CCard no-header class="m-0 p-0">
      <CCardBody class="m-0 p-0">
        <CRow class="m-0 p-0">
          <CCol col="12" class="m-0 p-0">
            <CButton color="dark" block disabled>
              <h2 class="text-center" v-show="!minimize">
                <b>&dollar;&nbsp;&pound;&nbsp;&euro;&nbsp;&yen;</b>
              </h2>
              <h5 class="text-center" v-show="minimize">
                <b>&dollar;&nbsp;&pound;&nbsp;&euro;&nbsp;&yen;</b>
              </h5>
            </CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    <!--
    <CSidebarBrand
      :imgFull="{
        width: 118,
        height: 46,
        alt: 'Logo',
        src: 'img/brand/coreui-base-white.svg'
      }"
      :imgMinimized="{
        width: 118,
        height: 46,
        alt: 'Logo',
        src: 'img/brand/coreui-signet-white.svg'
      }"
      :wrappedInLink="{ href: 'https://coreui.io/', target: '_blank' }"
    />-->
    <CRenderFunction flat :content-to-render="nav" />
    <CSidebarMinimizer class="d-md-down-none" @click.native="minimize = !minimize" />
  </CSidebar>
</template>

<script>
import nav from "./_nav";

export default {
  name: "TheSidebar",
  data() {
    return {
      minimize: false,
      nav,
      show: "responsive"
    };
  },
  mounted() {
    this.$root.$on("toggle-sidebar", () => {
      const sidebarOpened = this.show === true || this.show === "responsive";
      this.show = sidebarOpened ? false : "responsive";
    });
    this.$root.$on("toggle-sidebar-mobile", () => {
      const sidebarClosed = this.show === "responsive" || this.show === false;
      this.show = sidebarClosed ? true : "responsive";
    });
  }
};
</script>
