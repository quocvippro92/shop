import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import { cartApi } from "../../api/cart.api";

export const createCart = createAsyncThunk(
  "cartUser/createCart",
  async (payload, thunkApi) => {
    const data = payload;
    console.log("ádsadsa");
    // const CustomerCart = await cartApi.getCustomerCart(data.customer_id);
    // const listCustomerProduct = CustomerCart.data?.map((product) => product.id);
    // let response;
    // if (listCustomerProduct.includes(data.id)) {
    //   notification.error({
    //     message:
    //       "Bạn chỉ có thể thêm 1 ĐẦM CỔ VEST TAY BỒNG D19972 vào giỏ hàng!",
    //     style: { border: "2px solid #71be34" },
    //     duration: 3,
    //   });
    // const cart = CustomerCart.data.filter((item) => item.id === data.id)[0];
    // cart.quantity = cart.quantity + 1;
    // cart.size = cart.size + "/" + data.size;
    // cart.color = cart.color + "/" + data.color;
    // response = await cartApi.updateCart(cart.id, cart);
    // } else {
    const response = await cartApi.createCustomerCart(data);

    // }

    return response.data;
  }
);

export const getCustomerCart = createAsyncThunk(
  "cart/getCustomerCart",
  async (payload, thunkApi) => {
    const customer_id = payload;
    const response = await cartApi.getCustomerCart(customer_id);
    return response.data;
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (payload, thunkApi) => {
    const { productId, productUpdate } = payload;
    const response = await cartApi.updateCart(productId, productUpdate);
    return response.data;
  }
);
export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (payload, thunkApi) => {
    const response = await cartApi.deleteCart(payload);
    notification.success({
      message: "Xóa SP thành Công!",
      style: { border: "2px solid #71be34" },
      duration: 3,
    });
    return response.data;
  }
);
