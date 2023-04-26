import { createSlice } from "@reduxjs/toolkit";
import {
  createCustomerAddress,
  fetchDistricts,
  fetchProvinces,
  getCustomerAddress,
} from "../action/address.action";

const listProvinces = {
  provinces: [],
  district: [],
  ward: [],
  loadingAddress: false,
  customerAddress: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState: listProvinces,
  extraReducers: (builder) => {
    builder.addCase(fetchProvinces.pending, (state, action) => {
      state.loadingAddress = true;
    });
    builder.addCase(fetchProvinces.fulfilled, (state, action) => {
      state.loadingAddress = false;
      state.provinces = action.payload;
    });
    builder.addCase(fetchProvinces.rejected, (state, action) => {
      state.loadingAddress = false;
    });
    // districts
    builder.addCase(fetchDistricts.pending, (state, action) => {
      state.loadingAddress = true;
    });
    builder.addCase(fetchDistricts.fulfilled, (state, action) => {
      state.loadingAddress = false;
      state.district = action.payload;
    });
    builder.addCase(fetchDistricts.rejected, (state, action) => {
      state.loadingAddress = false;
    });

    // khởi tạo địa chỉ mới cho khách hàng

    builder.addCase(createCustomerAddress.pending, (state, action) => {
      state.loadingAddress = true;
    });
    builder.addCase(createCustomerAddress.fulfilled, (state, action) => {
      state.loadingAddress = false;
      state.customerAddress = [action.payload, ...state.customerAddress];
    });
    builder.addCase(createCustomerAddress.rejected, (state, action) => {
      state.loadingAddress = false;
    });

    builder.addCase(getCustomerAddress.pending, (state, action) => {
      state.loadingAddress = true;
    });
    builder.addCase(getCustomerAddress.fulfilled, (state, action) => {
      state.loadingAddress = false;
      state.customerAddress = action.payload;
    });
    builder.addCase(getCustomerAddress.rejected, (state, action) => {
      state.loadingAddress = false;
    });
  },
});
export const addressReducer = addressSlice.reducer;
