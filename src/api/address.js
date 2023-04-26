import { API, BASE_URL } from "./constant.api";

export const addressesApi = {
  getProvinces: () => API.get(`https://vapi.vnappmob.com/api/province`),
  getDistricts: (provinceId) =>
    API.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`),
  getWards: (districtId) =>
    API.get(
      `https://vapi.vnappmob.com/api/province/ward/district/${districtId}`
    ),

  //customerAddress
  createCustomerAddress: (data) =>
    API.post(`${BASE_URL}/customerAddress`, data),
  getCustomerAddress: (customerId) =>
    API.get(`${BASE_URL}/customerAddress?customerId=${customerId}`),
  updateCustomerAddress: (customerId, data) => (
    `${BASE_URL}/customerAddress`, customerId, data
  ),
  deleteCustomerAddress: (customerId) =>
    API.delete(`${BASE_URL}/customerAddress`, customerId),
};
