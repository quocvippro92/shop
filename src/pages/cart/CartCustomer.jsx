import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  deleteCart,
  getCustomerCart,
  updateCart,
} from "../../stores/action/cartUser.action";
import "./cartCustomer.scss";
const CartCustomer = () => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.authReducer.user);
  const listCart = useSelector((state) => state.cartReducer.listCartCustomer);
  console.log(user_info.user.id);
  useEffect(() => {
    if (user_info !== null) {
      dispatch(getCustomerCart(user_info.user.id));
    }
  }, []);
  const handleDelete = (item) => {
    dispatch(deleteCart(item.id));
    dispatch(getCustomerCart(user_info.user.id));
  };
  const handleDecrease = (item) => {
    if (item.quantity === 0) {
      dispatch(deleteCart(item.id));
      dispatch(getCustomerCart(user_info.user.id));
    } else {
      const productId = item.id;
      const productUpdate = { ...item };
      productUpdate.quantity = item.quantity - 1;
      dispatch(updateCart({ productId, productUpdate }));
      dispatch(getCustomerCart(user_info.user.id));
    }
  };
  const handleIncrease = (item) => {
    const productId = item.id;
    const productUpdate = { ...item };
    productUpdate.quantity = item.quantity + 1;
    dispatch(updateCart({ productId, productUpdate }));
    dispatch(getCustomerCart(user_info.user.id));
  };
  return (
    <>
      <div className="container">
        <h1>GIỎ HÀNG</h1>
        <div className="row cart_customer">
          <div className="col-md-6 col-ms-12 header ">
            <p>Sản Phẩm</p>
          </div>
          <div className="col-md-2 col-ms-12 header ">
            <p>Đơn Giá</p>
          </div>
          <div className="col-md-2 col-ms-12 header">
            <p>Số lượng</p>
          </div>
          <div className="col-md-2 col-ms-12 header ">
            <p>Thành Tiền</p>
          </div>
        </div>

        {listCart?.map((item, index) => (
          <div className="row cart_customer-body" key={index}>
            <div className="col-md-6 col-ms-12 cart_customer-item ">
              <img src={item.image} alt={item.name} width="200px" />
              <div className="cart_customer-title">
                <p>
                  <strong>{item && item.name}</strong>
                </p>
                <p>
                  Phiên Bản : <strong>{item && item.size}</strong>
                </p>
                <p>
                  Màu : <strong>{item && item.color}</strong>
                </p>
                <p>
                  thương hiêu : <strong>{item && item.trademark}</strong>
                </p>
              </div>
            </div>
            <div className="col-md-2 col-ms-12 cart_name ">
              <strong>{item && item.price}đ</strong>
            </div>
            <div className="col-md-2 col-ms-12 cart_name ">
              <button
                className="btn btn-secondary reduce"
                onClick={() => handleDecrease(item)}
              >
                -
              </button>
              <strong>{item && item.quantity}</strong>
              <button
                className="btn btn-secondary increase"
                onClick={() => handleIncrease(item)}
              >
                +
              </button>
            </div>
            <div className="col-md-2 col-ms-12 cart_name ">
              <strong>
                {new Intl.NumberFormat().format(
                  item && item.quantity * item.price
                )}{" "}
                VNĐ
              </strong>{" "}
              <strong onClick={() => handleDelete(item)}>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </strong>
            </div>
          </div>
        ))}
        <div className="footer_cart">
          <NavLink className="btn btn-secondary btnLeft" to="/products">
            Tiếp tục mua hàng
          </NavLink>
          <NavLink to="/checkouts" className="btn btn-dark">
            Thanh Toán
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default CartCustomer;
