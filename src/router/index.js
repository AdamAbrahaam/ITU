import Vue from "vue";
import VueRouter from "vue-router";
import signView from "../views/signView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirects: "/"
  },
  {
    path: "/",
    name: "home",
    component: signView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
