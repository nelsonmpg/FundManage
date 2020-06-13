<template>
  <div>
    <router-view></router-view>
    <!-- <notifications group="notification" position="top center"/> -->
    <notifications group="notification" position="top center">
      <template slot="body" slot-scope="props">
        <CCard no-body :border-color="props.item.type">
          <CCardHeader class="ajust-notifications" :class="'bg-' + props.item.type">
            <h5>{{ props.item.title }}</h5>
          </CCardHeader>
          <CCardBody color="dark">
            <div class="ajust-notifications">
              <div v-html="props.item.text"></div>
            </div>
          </CCardBody>
        </CCard>
      </template>
    </notifications>
    <v-loading />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "assets/scss/style";
// @import "assets/css/weather-icons.min.css";
// @import "assets/css/weather-icons-wind.min.css"

@import "assets/css/styles.css";
</style>
