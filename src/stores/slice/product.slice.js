import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductList,
  fetchProductsDetail,
} from "../action/product.action";

const productInitialState = {
  allProduct: [],
  product: [],
  products: [],
  pagination: {
    page: 1,
    limit: 9,
    total: 0,
  },
  category: "",
  textSearch: "",
  sale: "",
  fetchingAllProduct: false,
  fetchingProductDetail: false,
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,

  extraReducers: (builder) => {
    // allProducts
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      state.fetchingAllProduct = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.fetchingAllProduct = false;
      state.allProduct = action.payload;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.fetchingAllProduct = false;
    });
    // list products
    builder.addCase(fetchProductList.pending, (state, action) => {
      state.fetchingAllProduct = true;
    });
    builder.addCase(fetchProductList.fulfilled, (state, action) => {
      state.fetchingAllProduct = false;
      state.products = action.payload.product;
      state.pagination.total = action.payload.total;
    });
    // productDetail
    builder.addCase(fetchProductsDetail.pending, (state, action) => {
      state.fetchingProductDetail = true;
    });
    builder.addCase(fetchProductsDetail.fulfilled, (state, action) => {
      state.fetchingProductDetail = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductsDetail.rejected, (state, action) => {
      state.fetchingProductDetail = false;
    });
  },
  reducers: {
    changePagination: (state, action) => {
      state.pagination.page = action.payload.page;
      state.pagination.limit = action.payload.limit;
    },
    changeTextSearch: (state, action) => {
      state.textSearch = action.payload;
    },
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
export const { changePagination, changeTextSearch, changeCategory } =
  productSlice.actions;
export const productReducer = productSlice.reducer;
