import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import { API } from "../../api/constant.api";
import { apiOrder } from "../../api/order.api";

export const createOrderCustomer = createAsyncThunk(
  "order/createOrderCustomer",
  async (payload, thunkApi) => {
    const data = payload;
    const response = await apiOrder.createOrderCustomer(data);
    notification.success({
      message: "order thành công!",
      description: "vui lòng qua thông tin tài khoản để kiểm tra",
      style: { border: "2px solid #71be34" },
      duration: 3,
    });
    return response.data;
  }
);

export const getOrderCustomer = createAsyncThunk(
  "order/getOrderCustomer",
  async (payload, thunkApi) => {
    const response = await apiOrder.getOrderCustomer(payload);
    return response.data;
  }
);
