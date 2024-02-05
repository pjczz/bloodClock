import httpRequest from "@/utils/http";
export function login(data) {
  return httpRequest({
    url: "/api/user/login",
    method: "post",
    data,
  });
}
