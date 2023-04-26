import { API, BASE_URL } from "./constant.api";

export const authApi = {
  login: (data) => API.post(`${BASE_URL}/auth/login/users`, data),
  register: (data) => API.post(`${BASE_URL}/auth/register/users`, data),
};
