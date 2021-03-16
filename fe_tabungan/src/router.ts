import { createWebHistory, createRouter } from "vue-router";

const history = createWebHistory();

const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      path: "/main",
      component: () => import("./pages/Home.vue"),
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: "",
          redirect: "/main/dashboard",
        },
        {
          path: "dashboard",
          name: "Dashboard",
          component: () => import("./pages/home/Dashboard.vue"),
        },
        {
          path: "history",
          name: "History",
          component: () => import("./pages/home/History.vue"),
        },
        {
          path: "profil",
          name: "Profil",
          component: () => import("./pages/home/Profil.vue"),
        },
      ],
    },
    {
      path: "/detail/:id",
      name: "Detail",
      component: () => import("./pages/DetailDeposit.vue"),
    },
    {
      path: "/deposit",
      name: "Deposit",
      component: () => import("./pages/Deposit.vue"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./pages/Login.vue"),
    },
  ],
});
export default router;
