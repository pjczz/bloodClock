import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/login/login.vue"), // 使用动态导入
  },
  {
    path: "/login",
    component: () => import("../views/login/login.vue"), // 使用动态导入
  },
  {
    path: "/game",
    component: () => import("../views/game/game.vue"), // 使用动态导入
  },
  {
    path: "/register",
    component: () => import("../views/register/register.vue"), // 使用动态导入
  },
];

const router = new VueRouter({
  routes,
});

export default router;
