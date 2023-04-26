import { API, BASE_URL } from "./constant.api";

export const cartApi = {
  createCustomerCart: (data) => API.post(`${BASE_URL}/cart_user`, data),
  getCustomerCart: (customerId) =>
    API.get(`${BASE_URL}/cart_user?customer_id=${customerId}`),
  updateCart: (cardId, data) =>
    API.patch(`${BASE_URL}/cart_user`, cardId, data),
  deleteCart: (id) => API.delete(`${BASE_URL}/cart_user`, id),
};
