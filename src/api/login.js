import httpRequest from "@/utils/http";
export function login(data) {
  return httpRequest({
    url: "/api/user/login",
    method: "post",
    data,
  });
}
export function register(data) {
  return httpRequest({
    url: "/api/user/register",
    method: "post",
    data,
  });
}
export function currentUser(data) {
  return httpRequest({
    url: "/api/currentUser",
    method: "post",
    data,
  });
}
