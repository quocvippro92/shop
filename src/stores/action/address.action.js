import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import { addressesApi } from "../../api/address";

export const fetchProvinces = createAsyncThunk(
  "address/fetchProvinces",
  async (payload, thunkApi) => {
    const response = await addressesApi.getProvinces();
    return response.data.results;
  }
);
export const fetchDistricts = createAsyncThunk(
  "address/fetchDistricts",
  async (payload, thunkApi) => {
    const response = await addressesApi.getDistricts(payload);
    return response.data.results;
  }
);

// thêm địa chỉ của khách hàng------------------------

export const createCustomerAddress = createAsyncThunk(
  "address/createCustomerAddress",
  async (payload, thunkApi) => {
    const response = await addressesApi.createCustomerAddress(payload);
    notification.success({
      message: "Khởi tạo thành Công!",
      style: { border: "2px solid #71be34" },
      duration: 3,
    });
    return response.data;
  }
);

export const getCustomerAddress = createAsyncThunk(
  "address/getCustomerAddress",
  async (payload, thunkApi) => {
    const customerId = payload;
    const response = await addressesApi.getCustomerAddress(customerId);
    return response.data;
  }
);

export const deleteCustomerAddress = createAsyncThunk(
  "address/deleteCustomerAddress",
  async (payload, thunkApi) => {
    const id = payload;
    const response = await addressesApi.deleteCustomerAddress(id);
    return response.data;
  }
);
