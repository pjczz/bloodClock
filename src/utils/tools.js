import { message } from "ant-design-vue";
// import user from "../store/modules/user";
// 检查响应体的状态 并弹出对应错误
export function errDealer(status, errMessage) {
  let currentMessage = "";
  switch (status) {
    case 401:
      currentMessage = "";
      // logout();
      break;
    case 403:
      currentMessage = "拒绝访问";
      break;
    case 404:
      currentMessage = "请求错误,未找到该资源";
      break;
    case 500:
      currentMessage = "服务器端出错";
      break;
    default:
      currentMessage = errMessage;
      break;
  }
  if (status === 400 && currentMessage) {
    console.error(currentMessage);
    message.error(message);
  }
}

export function getToken() {
  localStorage.getItem("token");
}
export function setToken(token) {
  localStorage.setItem("token", token);
}
