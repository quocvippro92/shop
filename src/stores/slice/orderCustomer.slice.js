import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import {
  createOrderCustomer,
  getOrderCustomer,
} from "../action/orderCustomer.action";

const productInitialState = {
  listOrderCustomer: [],
  loadingOrderCustomer: false,
};

const orderSlice = createSlice({
  name: "listOrderCustomer",
  initialState: productInitialState,
  extraReducers: (builder) => {
    builder.addCase(createOrderCustomer.pending, (state, action) => {
      state.loadingOrderCustomer = true;
    });
    builder.addCase(createOrderCustomer.fulfilled, (state, action) => {
      state.loadingOrderCustomer = false;
      state.listOrderCustomer = [action.payload, state.listOrderCustomer];
    });
    builder.addCase(createOrderCustomer.rejected, (state, action) => {
      state.loadingOrderCustomer = false;
      notification.error({
        message: "order thất bại!",
        style: { border: "2px solid #71be34" },
        duration: 3,
      });
    });
    builder.addCase(getOrderCustomer.pending, (state, action) => {
      state.loadingOrderCustomer = true;
    });
    builder.addCase(getOrderCustomer.fulfilled, (state, action) => {
      state.loadingOrderCustomer = false;
      state.listOrderCustomer = action.payload;
    });
    builder.addCase(getOrderCustomer.rejected, (state, action) => {
      state.loadingOrderCustomer = false;
    });
  },
});

export const orderCustomer = orderSlice.reducer;
