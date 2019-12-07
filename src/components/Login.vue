<template>
  <v-card class="elevation-12">
    <v-toolbar color="blue" dark flat>
      <v-toolbar-title>Sign in!</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="logInfo.email"
          label="E-mail"
          prepend-icon="mdi-account"
          type="text"
        />

        <v-text-field
          v-model="logInfo.password"
          id="password"
          label="Password"
          prepend-icon="mdi-lock"
          type="password"
        />
      </v-form>
      <div class="text-center red--text" v-if="errorMsg">{{ errorMsg }}</div>
    </v-card-text>
    <v-card-actions class="mx-2">
      <a @click="changeRequest('Register')">Dont't have an account? Sign up!</a>
      <v-spacer />
      <v-btn dark color="blue" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      errorMsg: "",
      logInfo: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    changeRequest(to) {
      this.$emit("clicked", to);
    },
    async login() {
      let response = await this.$store.dispatch("users/login", this.logInfo);

      if (response.message) {
        this.errorMsg = response.message;
      } else {
        this.$router.push("/home");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
