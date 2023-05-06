import "./order.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getOrderCustomer } from "../../stores/action/orderCustomer.action";
import { Button, Modal } from "antd";

const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderCustomer(userAddress.user.id));
  }, []);
  const userAddress = useSelector((state) => state.authReducer.user);
  const orderProduct = useSelector(
    (state) => state.orderCustomer.listOrderCustomer
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [check, setCheck] = useState("");

  const showModal = (id) => {
    setCheck(id);
    console.log(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(orderProduct);
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
          <h3>Hóa Đơn Bạn ĐÃ Order</h3>
          {orderProduct &&
            orderProduct?.map((item, index) => (
              <div className="product_order" key={index}>
                <p>
                  <strong>Mã thanh toán :</strong> {item.id}
                </p>
                <p>
                  <strong>Thành Tiền : </strong>
                  {new Intl.NumberFormat().format(item.totalOrderProduct)} VNĐ
                </p>
                <Button type="primary" onClick={() => showModal(item.id)}>
                  Xem Chi Tiết Hơn ...
                </Button>
              </div>
            ))}
        </div>
        <Modal
          title="SẢN PHẨM VỪA ĐẶT MUA"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {orderProduct &&
            orderProduct
              .filter((item) => item.id === check)
              ?.map((item, index) => (
                <div className="detail" key={index}>
                  {item.product?.map((productItem, index) => (
                    <div className="product_item" key={index}>
                      <div className="product_order-img">
                        <img src={productItem.image} alt={productItem.title} />
                      </div>
                      <div className="product_order-name">
                        <p>
                          <strong>Name :</strong>
                          {productItem.title}
                        </p>
                        <p>
                          <strong>Mã:</strong> {productItem.product_id}
                        </p>
                        <p>
                          Thương Hiệu:
                          <strong>{productItem.trademark}</strong>
                        </p>
                        <p>
                          <strong>size:</strong> {productItem.size}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
        </Modal>
      </div>
    </div>
  );
};

export default Order;
