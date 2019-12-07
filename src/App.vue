<template>
  <v-app>
    <v-content id="wrap">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("users/logout");
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" >
body {
  background-color: #e7e6e3 !important;
}
#wrap {
  background-color: #e7e6e3;
}

.v-application .v-data-table th {
  text-align: center !important;
  font-size: 15px !important;
}

.v-application .v-data-table td {
  text-align: center !important;
}
</style>>
