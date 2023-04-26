import { API, BASE_URL } from "./constant.api";

export const apiProduct = {
  getAllProducts: () => API.get(`${BASE_URL}/products`),
  getProductDetail: (id) => API.get(`${BASE_URL}/products/${id}`),
  getProductList: (page = 1, limit = 12, category, textSearch) => {
    const paginationString = `_page=${page}&_limit=${limit}`;
    const textSearchString =
      textSearch && textSearch !== "" ? `&q=${textSearch}` : "";
    const filterString = [...(category ? [`category=${category}`] : [])]
      .join("&")
      .trim();
    const queryString = [
      paginationString,
      ...(filterString !== "" ? [filterString] : []),
      ...(textSearchString !== "" ? [textSearchString] : []),
    ].join("&");
    return API.get(`${BASE_URL}/products?${queryString}`);
  },
};
