import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiProduct } from "../../api/product.api";

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (payload, thunkApi) => {
    const responese = await apiProduct.getAllProducts();
    return responese.data;
  }
);

export const fetchProductsDetail = createAsyncThunk(
  "product/fetchProductsDetail",
  async (payload, thunkApi) => {
    const productId = payload;
    const responese = await apiProduct.getProductDetail(productId.id);
    return responese.data;
  }
);

export const fetchProductList = createAsyncThunk(
  "product/fetchProductList",
  async (payload, thunkApi) => {
    const { page, limit, category, textSearch } = payload;
    const response = await apiProduct.getProductList(
      page,
      limit,
      category,
      textSearch
    );

    return { total: response.headers["x-total-count"], product: response.data };
  }
);
