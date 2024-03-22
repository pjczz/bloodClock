const state = () => ({
  userId: "",
  stId: "",
});

const mutations = {
  // set userId
  setUserId(state, userId) {
    state.userId = userId;
  },
  // 设置本房间的stId
  setStId(state, stId) {
    state.stId = stId;
  },
  // 用户请求stId
  reqStId() {
    console.log("reqStId");
  },
};

const actions = {};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
