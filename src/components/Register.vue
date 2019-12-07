<template>
  <v-card class="elevation-12">
    <v-toolbar color="blue" dark flat>
      <v-toolbar-title>Sign up!</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="regInfo.name"
          label="Display name"
          prepend-icon="mdi-square-edit-outline"
          type="text"
        />

        <v-text-field
          v-model="regInfo.email"
          label="E-mail"
          prepend-icon="mdi-account"
          type="text"
        />

        <v-text-field
          v-model="regInfo.password"
          id="password"
          label="Password"
          prepend-icon="mdi-lock"
          type="password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions class="mx-2">
      <a @click="changeRequest('Login')">Have an account? Login!</a>
      <v-spacer />
      <v-btn dark color="blue" @click="register">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      regInfo: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    changeRequest(to) {
      this.$emit("clicked", to);
    },
    async register() {
      let response = await this.$store.dispatch("users/register", this.regInfo);

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
