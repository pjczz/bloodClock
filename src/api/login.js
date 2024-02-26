import httpRequest from "@/utils/http";
export function login(data) {
  return httpRequest({
    url: "/user/login",
    method: "post",
    data,
  });
}
export function register(data) {
  return httpRequest({
    url: "/user/register",
    method: "post",
    data,
  });
}
export function currentUser(data) {
  return httpRequest({
    url: "/currentUser",
    method: "post",
    data,
  });
}
