class ChatSocket {
  constructor(store) {
    this._store = store;
    this._url = process.env.VUE_APP_CHATURL;
    this._user = ""; // 用户的chatId
    this._socket = null;
    this._clients = [];
    this._ping = null;
  }

  // 定义连接服务器的方法
  _open() {
    this._socket = new WebSocket(this._url);

    this._socket.onopen = () => {
      // 发送自身id创建client
      this.updateInfo();
    };

    // 接受消息事件
    this._socket.addEventListener("message", this._handleMessage.bind(this));

    this._socket.onclose = () => {
      console.log("chatSocket关闭连接");
    };

    // 连接错误事件
    this._socket.onerror = function (err) {
      console.log("chatSocket错误：", err);
    };
  }

  // connect
  connect(userId) {
    // console.log(this._url, userId);
    this._user = userId;
    this._open();
  }

  // send
  _send(payload) {
    // json格式化
    this._socket.send(JSON.stringify(payload));
  }

  // handleMessage
  _handleMessage(e) {
    const data = JSON.parse(e.data);
    // console.log(data);
    switch (data.type) {
      case "pm":
        this._handleReceiveMsg(data);
    }
  }

  // update
  updateInfo() {
    this._send({
      user: this._user,
      type: "update",
    });
  }

  // Send Message
  sendMessage(payload) {
    this._send(payload);
    console.log("sendSocket");
  }

  // Receive Message
  _handleReceiveMsg(payload) {
    this._store.dispatch("chat/handleReceiveMsg", payload);
  }
}

export default (store) => {
  // setup
  const chatSocket = new ChatSocket(store);

  // listen to mutation
  store.subscribe(({ type, payload }, state) => {
    switch (type) {
      case "chat/setUserId":
        chatSocket.connect(state.chat.userId);
        break;
      case "chat/sendMessage":
        chatSocket.sendMessage(payload);
    }
  });
};
