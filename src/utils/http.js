import axios from "axios";
import { errDealer, getToken } from "./tools";

const http = axios.create({
  baseURL: process.env.VUE_APP_PROXY_API,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

function formatContentType(type) {
  switch (type) {
    case "form-urlencoded":
      return "application/x-www-form-urlencoded";
    default:
      return "application/json";
  }
}

// 请求拦截器
http.interceptors.request.use(
  (config) => {

    config.headers["Content-Type"] = formatContentType(config.contentType);
    const token = getToken();
    console.log(token, '获取token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    try {
      const { data: rawData } = response;
      const { code, data, message } = rawData;
      if (code === 200) return data;
      errDealer(message, code);
      return Promise.reject(response);
    } catch (e) {
      console.error("Request error: ", e);
      return Promise.reject(e);
    }
  },
  (error) => {
    console.log(error.response.data.code, error.response.data.message);
    // 对响应错误做些什么
    errDealer(error.response.data.code, error.response.data.message);
    return Promise.reject(error);
  },
);

export default http;
