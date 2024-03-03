// ws url
const url = process.env.VUE_APP_CHATURL;
// 创建websocket客户端对象
const cs = new WebSocket(url);
// 连接事件
cs.onopen = function () {
  console.log("连接成功");
  cs.send("Hello! This is customer");
};
// 关闭连接事件
cs.onclose = function () {
  console.log("关闭连接");
};
// 连接错误事件
cs.onerror = function (err) {
  console.log(err);
};
// 接受消息事件
cs.onmessage = function (event) {
  console.log(event);
  console.log(event.data);
};
// export
export default cs;
