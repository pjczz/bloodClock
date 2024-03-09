import { currentUser, logout, login } from "@/api/login";
import { clearUserInfo, setUserInfo, clearToken } from "@/utils/tools";
import { setToken } from "../../utils/tools";
const state = () => ({
  userInfo: {},
  bluffs: [],
  token: "",
});

const getters = {
  getUserInfo({ userInfo }) {
    return userInfo;
  },
  getToken({ token }) {
    return token;
  },
};

const actions = {
  async handleUserInfo({ commit }) {
    await currentUser()
      .then((res) => {
        console.log("handleUserInfo", res);
        setUserInfo(res);
        commit("setUserInfo", res);
      })
      .catch((err) => {
        clearUserInfo();
        console.error(err);
        commit("setUserInfo", {});
      });
  },
  // 退出登录
  async logout({ commit }) {
    return new Promise((resolve, reject) => {
      clearUserInfo();
      clearToken();
      logout()
        .then(() => {
          commit("setUserInfo", {});
          commit("setToken", "");
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 登录
  async login({ commit }, data) {
    return new Promise((resolve) => {
      login(data)
        .then((res) => {
          setToken(res);
          commit("setToken", res);
          resolve();
        })
        .catch((err) => {
          clearUserInfo();
          clearToken();
          commit("setToken", "");
          commit("setUserInfo", {});
          resolve();
          console.error(err);
        });
    });
  },
};

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  setToken(state, token) {
    state.token = token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
