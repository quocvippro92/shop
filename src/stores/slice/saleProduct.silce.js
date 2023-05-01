import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllSaleProducts,
  fetchSaleProductDetail,
  fetchSaleProductList,
} from "../action/saleProduct.action";

const saleProductInitialState = {
  allSaleProduct: [],
  saleProduct: [],
  saleProducts: [],
  pagination: {
    page: 1,
    limit: 9,
    total: 0,
  },
  sale: "",
  category: "",
  textSearch: "",
  fetchingAllSaleProduct: false,
  fetchingSaleProductDetail: false,
};

const saleProductSlice = createSlice({
  name: "saleProduct",
  initialState: saleProductInitialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSaleProductList.pending, (state, action) => {
      state.fetchingAllSaleProduct = false;
    });
    builder.addCase(fetchSaleProductList.fulfilled, (state, action) => {
      state.fetchingAllSaleProduct = true;
      state.saleProducts = action.payload.product;
      state.pagination.total = action.payload.total;
    });
    builder.addCase(fetchSaleProductList.rejected, (state, action) => {
      state.fetchingAllSaleProduct = false;
    });

    builder.addCase(fetchAllSaleProducts.pending, (state, action) => {
      state.fetchingAllProduct = false;
    });
    builder.addCase(fetchAllSaleProducts.fulfilled, (state, action) => {
      state.fetchingAllProduct = false;
      state.allSaleProduct = action.payload;
    });
    builder.addCase(fetchAllSaleProducts.rejected, (state, action) => {
      state.fetchingAllProduct = false;
    });

    builder.addCase(fetchSaleProductDetail.pending, (state, action) => {
      state.fetchingProductDetail = true;
    });
    builder.addCase(fetchSaleProductDetail.fulfilled, (state, action) => {
      state.fetchingProductDetail = false;
      state.saleProduct = action.payload;
    });
    builder.addCase(fetchSaleProductDetail.rejected, (state, action) => {
      state.fetchingProductDetail = false;
    });
  },
  reducers: {
    changePagination: (state, action) => {
      state.pagination.page = action.payload.page;
      state.pagination.limit = action.payload.limit;
    },
    changeSale: (state, action) => {
      state.sale = action.payload;
    },
  },
});
export const { changePagination, changeSale } = saleProductSlice.actions;
export const saleProductReducer = saleProductSlice.reducer;
