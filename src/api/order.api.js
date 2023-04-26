import { API, BASE_URL } from "./constant.api";

export const apiOrder = {
  createOrderCustomer: (data) => API.post(`${BASE_URL}/orderCustomer`, data),
  getOrderCustomer: (customer_id) =>
    API.get(`${BASE_URL}/orderCustomer?customer_id=${customer_id}`),
  updateOrderCustomer: (id, data) =>
    API.patch(`${BASE_URL}/orderCustomer`, id, data),
  deleteOrderCustomer: (id) => API.delete(`${BASE_URL}/orderCustomer`, id),
};
