import { message } from "ant-design-vue";
// import user from "../store/modules/user";
// 检查响应体的状态 并弹出对应错误
export function errDealer(status, errMessage) {
  let currentMessage = "";
  console.log("baocuo1", status);
  switch (status) {
    case 401:
      currentMessage = errMessage;
      message.error(currentMessage);
      // logout();
      break;
    case 403:
      currentMessage = "拒绝访问";
      message.error(currentMessage);
      break;
    case 404:
      currentMessage = "请求错误,未找到该资源";
      message.error(currentMessage);
      break;
    case 500:
      currentMessage = "服务器端出错";
      message.error(currentMessage);
      break;
    default:
      currentMessage = errMessage;
      if (status > 300) {
        message.error(currentMessage);
      }
      break;
  }
}

export function getToken() {
  localStorage.getItem("token");
}
export function setToken(token) {
  localStorage.setItem("token", token);
}
