import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/auth.api";

export const loginAction = createAsyncThunk(
  "auth/login",
  async (payload, thunkApi) => {
    const response = await authApi.login(payload);
    return response.data;
  }
);
export const registerAction = createAsyncThunk(
  "auth/register",
  async (payload, thunkApi) => {
    const response = await authApi.register(payload);
    console.log(response.data);
    return response.data;
  }
);
