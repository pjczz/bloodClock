import { currentUser } from "@/api/login";
import { clearUserInfo, setUserInfo } from '@/utils/tools'
const state = () => ({
  userInfo: {},
  bluffs: [],
});

const getters = {
  getUserInfo({ userInfo }) {
    return userInfo;
  },
};

const actions = {
  async handleUserInfo({ commit }) {
    const res = await currentUser().then(res => { setUserInfo(res); }).catch(err => {
      clearUserInfo()
      console.error(err)
    });

    commit("setUserInfo", res);
  },
};

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
