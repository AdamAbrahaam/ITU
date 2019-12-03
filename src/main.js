import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";

Vue.config.productionTip = false;

const config = {
  apiKey: " AIzaSyCzuOUX0IWwPmzYC1SK38sc4HQBiAuciic ",
  authDomain: "itu-project-bcfc3.firebaseapp.com",
  databaseURL: "https://itu-project-bcfc3.firebaseio.com",
  projectId: "itu-project-bcfc3",
  storageBucket: "itu-project-bcfc3.appspot.com",
  messagingSenderId: "259581059732"
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
