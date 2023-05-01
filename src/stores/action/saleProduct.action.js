import { createAsyncThunk } from "@reduxjs/toolkit";
import { saleProductApi } from "../../api/sale.api";

export const fetchAllSaleProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (payload, thunkApi) => {
    const responese = await saleProductApi.getAllSaleProducts();
    return responese.data;
  }
);
export const fetchSaleProductDetail = createAsyncThunk(
  "sale/fetchSaleProductDetail",
  async (payload, thunkApi) => {
    const productId = payload;
    const responese = await saleProductApi.getSaleProductDetail(productId.id);
    return responese.data;
  }
);

export const fetchSaleProductList = createAsyncThunk(
  "sale/fetchSaleProductList",
  async (payload, thunkApi) => {
    const { page, limit, sale, textSearch, category } = payload;
    const responese = await saleProductApi.getSaleProductList(
      page,
      limit,
      category,
      textSearch,
      sale
    );
    return {
      total: responese.headers["x-total-count"],
      product: responese.data,
    };
  }
);
