const state = () => ({
  userInfo: {},
  bluffs: [],
});

const getters = {
  getUserInfo({ userInfo }) {
    return userInfo;
  },
};

const actions = {};

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
