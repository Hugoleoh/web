import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./templates/HomePage.vue";

const router = createRouter({
  history: createWebHistory(),
  base: "localhost:8000",
  routes: [
    { path: "/", name: "HomePage", component: HomePage },
    {
      path: "/register",
      name: "Register",
      component: () =>
        import(/* webpackChunkName: "about" */ "./templates/RegisterPage.vue"),
      meta: { noAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: () =>
        import(/* webpackChunkName: "about" */ "./templates/LoginPage.vue"),
      meta: { noAuth: true },
    },
  ],
});

export default router;
