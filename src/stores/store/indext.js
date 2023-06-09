import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "../slice/address.slice";
import { authReducer } from "../slice/auth.slice";
import { cartReducer } from "../slice/cartUser.slice";
import { orderCustomer } from "../slice/orderCustomer.slice";
import { productReducer } from "../slice/product.slice";
import { saleProductReducer } from "../slice/saleProduct.silce";
const rootReducer = {
  authReducer: authReducer,
  productReducer: productReducer,
  addressReducer: addressReducer,
  cartReducer: cartReducer,
  orderCustomer: orderCustomer,
  saleProductReducer: saleProductReducer,
};
export const store = configureStore({
  reducer: rootReducer,
});
