import { createRouter, createWebHistory } from "vue-router";
import store from "./store";
import HomePage from "./templates/HomePage.vue";

const router = createRouter({
  history: createWebHistory(),
  base: "localhost:8000",
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
      meta: { noAuth: true },
    },
    {
      path: "/404",
      name: "404",
      component: () =>
        import(/* webpackChunkName: "about" */ "./templates/404.vue"),
    },
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
    {
      path: "/dashboard",
      name: "AppDashboard",
      component: () =>
        import(/* webpackChunkName: "about" */ "./templates/AppDashboard.vue"),
      meta: { authRequired: true },
    },
    {
      path: "/poll",
      component: () =>
        import(/* webpackChunkName: "about" */ "./templates/PollDashboard.vue"),
      children: [
        {
          path: "create",
          name: "newPoll",
          component: () =>
            import(
              /* webpackChunkName: "about" */ "./components/organisms/NewPoll.vue"
            ),
        },
        {
          path: "overview/:pollId",
          name: "SelectedPoll",
          component: () =>
            import(
              /* webpackChunkName: "about" */ "./components/organisms/ViewPoll.vue"
            ),
        },
        {
          path: "ballots/:pollId",
          name: "pollBallots",
          component: () =>
            import(
              /* webpackChunkName: "about" */ "./components/organisms/BallotOverview.vue"
            ),
        },
        {
          path: "voters/:pollId",
          name: "pollVoters",
          component: () =>
            import(
              /* webpackChunkName: "about" */ "./components/organisms/PollVoters.vue"
            ),
        },
        {
          path: "launch/:pollId",
          name: "launchPoll",
          component: () =>
            import(
              /* webpackChunkName: "about" */ "./components/organisms/LaunchPoll.vue"
            ),
        },
      ],
      meta: { authRequired: true },
    },
    { path: "/:pathMatch(.*)*", redirect: "/404" },
  ],
});

router.beforeEach(function (to, from, next) {
  if (to.meta.authRequired && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.noAuth && store.getters.isAuthenticated) {
    next("/dashboard");
  } else if (to.fullPath === "/poll") {
    next("/poll/create");
  } else {
    next();
  }
});

export default router;
