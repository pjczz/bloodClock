const PMMSG = {
  type: "pm",
  message: "",
  subtxt: "",
  extra: "",
  user: "",
  mid: "",
};

const state = () => ({
  userId: "",
  stId: "",
  chatRecords: [],
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
  // Send Message
  sendMessage(state, payload) {
    console.log(payload);
  },
  // Set Chat Records
  setChatRecords(state, chatRecords) {
    state.chatRecords = chatRecords;
  },
};

const actions = {
  // handle send message
  handleSendMessage({ state, commit }, payload) {
    const { extra, message } = payload;
    const user = state.userId;
    let pm = {
      ...PMMSG,
      user,
      extra,
      message,
    };
    commit("sendMessage", pm);
  },
  // handle receive message
  handleReceiveMsg({ state, commit }, payload) {
    // 聊天记录添加时间戳
    const cr = {
      ...payload,
      timestamp: Date.now(),
    };
    if (cr.extra && cr.user && cr.type && cr.message) {
      let crs = state.chatRecords;
      crs.push(cr);
      commit("setChatRecords", crs);
    }
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
