import Vue from "vue";
import VueRouter from "vue-router";
import signView from "../views/signView.vue";
import Home from "../views/Home.vue";
import Writer from "../views/Writer.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirects: "/"
  },
  {
    path: "/",
    name: "signView",
    component: signView
  },
  {
    path: "/writer",
    name: "writer",
    component: Writer,
    props: true
  },
  {
    path: "/home",
    name: "home",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
