import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { useSearchParams } from "react-router-dom";
import { localStorageUlti } from "../../localstore/localStorage";
import { loginAction, registerAction } from "../action/auth.action";

const USER_INFO_KEY = "user_info";
const { get, set, remove } = localStorageUlti(USER_INFO_KEY, null);

const initialState = {
  user: get(),
  loading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, action) => {
      remove();
      state.user = null;
      set(state.user);
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      console.log(state.user);
      notification.success({
        message: "Đăng nhập thành công",
        style: { border: "3px solid #71be34" },
        duration: 2,
      });

      set(state.user);
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      notification.error({
        message: "Đăng nhập thất bại!",
        style: { border: "2px solid #71be34" },
        duration: 3,
      });
    });

    //register
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.loading = false;
      notification.success({
        message: "Đăng ký thành công",
        style: { border: "3px solid #71be34" },
        duration: 2,
      });
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      remove();
      state.loading = false;
      notification.error({
        message: "Đăng ký thất bại!",
        style: { border: "2px solid #71be34" },
        duration: 3,
      });
    });
  },
});
export const { logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
