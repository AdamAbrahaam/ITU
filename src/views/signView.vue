<template>
  <v-container id="wrapper" class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <component v-bind:is="currentSign" @clicked="changeSign" class="animated fadeIn" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Register from "@/components/Register.vue";
import Login from "@/components/Login.vue";
export default {
  name: "signView",
  components: {
    Register,
    Login
  },
  data() {
    return {
      currentSign: "Login"
    };
  },
  methods: {
    changeSign(to) {
      this.currentSign = to;
    }
  }
};
</script>

<style lang="scss" scoped>
html {
  overflow: hidden !important;
}

#wrapper {
  background: url("../assets/code4.jpg") bottom;
  background-size: cover;
}
</style>
