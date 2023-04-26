import { createSlice } from "@reduxjs/toolkit";
import { localStorageUlti } from "../../localstore/localStorage";
import {
  createCart,
  getCustomerCart,
  updateCart,
} from "../action/cartUser.action";

const cartIntalState = {
  listCartCustomer: [],
  loadingCart: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: cartIntalState,
  extraReducers: (builder) => {
    builder.addCase(createCart.pending, (state, action) => {
      state.loadingCart = true;
    });
    builder.addCase(createCart.fulfilled, (state, action) => {
      state.loadingCart = false;
      state.listCartCustomer = [action.payload, ...state.listCartCustomer];
    });
    builder.addCase(createCart.rejected, (state, action) => {
      state.loadingCart = false;
    });

    // customerCart
    builder.addCase(getCustomerCart.pending, (state, action) => {
      state.loadingCart = true;
    });
    builder.addCase(getCustomerCart.fulfilled, (state, action) => {
      state.loadingCart = false;
      state.listCartCustomer = action.payload;
    });
    builder.addCase(getCustomerCart.rejected, (state, action) => {
      state.loadingCart = true;
    });
  },
});

export const cartReducer = cartSlice.reducer;
