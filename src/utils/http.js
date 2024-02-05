import axios from "axios";
import { errDealer, getToken } from "./tools";

const http = axios.create({
  baseURL: import.meta.VUE_APP_PROXY_TARGET,
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
    if (token) config.headers.Authorization = `Bearer ${token}`;
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
      const { status, data, message } = rawData;
      if (status === 200) return data;
      errDealer(status, message);
      return Promise.reject(response);
    } catch (e) {
      console.error("Request error: ", e);
      return Promise.reject(e);
    }
  },
  (error) => {
    console.log(error);
    // 对响应错误做些什么
    errDealer(error.status, error.message);
    return Promise.reject(error);
  },
);

export default http;
