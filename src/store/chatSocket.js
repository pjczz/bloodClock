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

    this._socket.onclose = () => {
      console.log("chatSocket关闭连接");
    };

    // 连接错误事件
    this._socket.onerror = function (err) {
      console.log("chatSocket错误：", err);
    };

    // 接受消息事件
    this._socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log("socket-onmessage", data);

      if (data.type == "pm") {
        console.log(data);
        return data.message;
      }

      if (data.type == "server") {
        switch (data.info) {
          case "connection":
            this._clients[data.user.id] = data.user;
            break;

          // disconnection
          case "disconnection":
            delete this._clients[data.user.id];
            // 通知组件disconnect
            break;

          case "clients":
            this._clients = data.clients;
            break;

          case "user":
            this._user = data.client.id;
            break;
        }
      }
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

  // update
  updateInfo() {
    this._send({
      user: this._user,
      type: "update",
    });
  }

  // 外部调用的方法
  // sendSocket(payload) {
  //   this._send(payload);
  //   console.log("sendSocket");
  // }
}

export default (store) => {
  // setup
  const chatSocket = new ChatSocket(store);

  // listen to mutation
  store.subscribe(({ type }, state) => {
    switch (type) {
      case "chat/setUserId":
        chatSocket.connect(state.chat.userId);
        break;
    }
  });
};
