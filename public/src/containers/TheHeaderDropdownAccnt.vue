<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <!-- <img src="img/avatars/6.jpg" class="c-avatar-img " /> -->
          <CIcon name="cil-user" />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
      <br />
      <b>({{ username }})</b>
    </CDropdownHeader>
    <CDropdownItem @click="logout()">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import utils from "./../shared/utilsLib.js";
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      username: "",
      utils
    };
  },
  methods: {
    logout() {
      this.$http
        .post(utils.geturl() + "/api/logout")
        .then(response => {
          let data = response.data;
          if (data.status === true) {
            this.$router.push("/login");
            localStorage.removeItem("user");
            this.$notify({
              group: "notification",
              title: "Logout Success.",
              type: "warning",
              text: data.data,
              position: "top center"
            });
          } else {
            console.log("Logged Error");
            this.$notify({
              group: "notification",
              title: "Logout Error",
              type: "danger",
              text: "Logout error.",
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
    this.username = JSON.parse(localStorage.getItem("user")).data.name;
  },
  beforeCreate() {},
  beforeDestroy() {}
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>
