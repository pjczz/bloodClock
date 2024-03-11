import store from "@/store";

import { message } from "ant-design-vue";

export function setupPermissionGuard(router) {
  router.beforeEach((to, from, next) => {
    const isLogin =
      localStorage.getItem("token") && localStorage.getItem("token") != ""
        ? true
        : false;
    if (to.path == "/login" || to.path == "/register" || to.path == "/") {
      console.log(store.user);
      if (!isLogin) {
        next();
      } else {
        next("/game");
      }
    } else {
      if (!localStorage.getItem("token")) {
        message.warn("您还没有登录，请先登录");
        next("/login");
      } else {
        store.dispatch("user/handleUserInfo");
        next();
      }
    }
  });
}
