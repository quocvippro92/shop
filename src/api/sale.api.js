import { API, BASE_URL } from "./constant.api";

export const saleProductApi = {
  getAllSaleProducts: () => API.get(`${BASE_URL}/sale_products`),
  getSaleProductDetail: (id) => API.get(`${BASE_URL}/sale_products/${id}`),
  getSaleProductList: (page = 1, limit = 9, category, textSearch, sale) => {
    const paginationString = `_page=${page}&_limit=${limit}`;
    const textSearchString =
      textSearch && textSearch !== "" ? `&q=${textSearch}` : "";
    const saleProductString = sale && sale !== "" ? `&sale=${sale}` : "";
    const filterString = [...(category ? [`category=${category}`] : [])]
      .join("&")
      .trim();
    const queryString = [
      paginationString,
      ...(filterString !== "" ? [filterString] : []),
      ...(textSearchString !== "" ? [textSearchString] : []),
      ...(saleProductString !== "" ? [saleProductString] : []),
    ].join("&");
    return API.get(`${BASE_URL}/sale_products?${queryString}`);
  },
};
