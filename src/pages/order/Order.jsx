import "./order.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getOrderCustomer } from "../../stores/action/orderCustomer.action";

const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderCustomer(userAddress.user.id));
  }, []);
  const userAddress = useSelector((state) => state.authReducer.user);
  const orderProduct = useSelector(
    (state) => state.orderCustomer.listOrderCustomer
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-4 col-ms-12 addresses_left">
          <h3 className="addresses_left-header">Xin Chào,</h3>
          <h1>
            {userAddress.user.firstName}
            <span> </span>
            {userAddress.user.lastName}
          </h1>
          <ul className="addresses_left-main">
            <li>
              <NavLink to="/order">Quản lý đơn hàng</NavLink>
            </li>
            <li>
              <NavLink to="/addresses">Thông tin giao hàng</NavLink>
            </li>
          </ul>
        </div>
        <div className=" col-md-6 col-ms-12 addresses_right">
          <h3>Sản phẩm Bạn đã Order</h3>
          {orderProduct &&
            orderProduct?.map((item, index) => (
              <div className="product_order" key={index}>
                {item.product?.map((productItem, index) => (
                  <div className="product_item" key={index}>
                    <div className="product_order-img">
                      <img src={productItem.image} alt={productItem.title} />
                    </div>
                    <div className="product_order-name">
                      <p>{productItem.title}</p>
                      <p>Mã : {productItem.product_id}</p>
                      <p>size: {productItem.size}</p>
                    </div>
                    <div className="check">
                      Vui lòng Đợi Shop Phản Hồi &#40; Email or Phone
                      &hearts;&#41;
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
