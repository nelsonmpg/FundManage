<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <i class="fa fa-user fa-lg"></i>
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center">
        <strong>Account</strong><br>
        <b>({{username}})</b>
      </b-dropdown-header>
      <!-- <b-dropdown-item><i class="fa fa-bell-o" /> Updates
        <b-badge variant="info">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-envelope-o" /> Messages
        <b-badge variant="success">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-tasks" /> Tasks
        <b-badge variant="danger">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-comments" /> Comments
        <b-badge variant="warning">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user" /> Profile</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-wrench" /> Settings</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-usd" /> Payments
        <b-badge variant="secondary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-file" /> Projects
        <b-badge variant="primary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item><i class="fa fa-shield" /> Lock Account</b-dropdown-item>-->
      <b-dropdown-item @click="logout()">
        <i class="fa fa-lock"/> Logout
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
export default {
  name: "DefaultHeaderDropdownAccnt",
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return {
      username: ''
    };
  },
  methods: {
    logout() {
      this.$http
        .post("/api/logout")
        .then(response => {
          let data = response.data;
          if (data.status === true) {
            this.$router.push("/login");
            localStorage.removeItem("user");
            this.$notify({
              group: "notification",
              title: "Logout Success",
              text: data.data,
              position: "top center"
            });
          } else {
            console.log("Logged Error");
            this.$notify({
              group: "notification",
              title: "Logout Error",
              text: "Error",
              type: "error",
              position: "top center"
            });
          }
        })
        .catch(err => {
          console.log(err.toString());
        });
    }
  },
  created() {},
  mounted() {
    this.username = JSON.parse(localStorage.getItem('user')).data.name
  },
  beforeCreate() {},
  beforeDestroy() {}
};
</script>
