import { Button, Form, Input, Radio, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import SelectAddress from "../../components/SelectAddress";
import { ROUTE } from "../../constants/routes.const";
import {
  fetchDistricts,
  fetchProvinces,
} from "../../stores/action/address.action";
import { deleteCart } from "../../stores/action/cartUser.action";
import { createOrderCustomer } from "../../stores/action/orderCustomer.action";
import "./checkOuts.scss";
const CheckOuts = () => {
  const user_info = useSelector((state) => state.authReducer.user);
  const listCart = useSelector((state) => state.cartReducer.listCartCustomer);
  const provinces = useSelector((state) => state.addressReducer.provinces);
  const districts = useSelector((state) => state.addressReducer.district);
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [cod, setCod] = useState(20000);
  const [form] = Form.useForm();
  const formRef = React.useRef(null);
  const customerAddress = useSelector(
    (state) => state.addressReducer.customerAddress
  );

  const dispatch = useDispatch();
  const sumPrice = listCart.reduce(
    (total, currentValue) => total + currentValue.quantity * currentValue.price,
    0
  );
  useEffect(() => {
    dispatch(fetchProvinces());
  }, []);
  const test = (e, type) => {
    if (type === "province") dispatch(fetchDistricts(e));
    form.setFieldsValue({
      [type]: e,
    });
  };
  const onFinish = (values) => {
    const listProductCustomer = listCart.map((product, index) => ({
      product_id: product.product_id,
      customer_id: product.customer_id,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      title: product.title,
      image: product.image,
      size: product.size,
      color: product.color,
    }));
    const customerOrderInformation = {
      email: user_info.user.email,
      name: values.hoten,
      phone: values.phone,
      address: `${values.address}/${values.district}/${values.province}`,
      product: listProductCustomer,
      totalPrice: sumPrice + cod,
    };
    dispatch(createOrderCustomer(customerOrderInformation));
    listCart.map((item) => dispatch(deleteCart(item.id)));
    navigate(ROUTE.ORDER);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleChangeOptione = (e) => {
    if (e === 0) {
      form.setFieldsValue({
        hoten: `${user_info.user.lastName} ${user_info.user.firstName}`,
        phone: "",
        address: "",
        district: "",
        province: "",
      });
    } else {
      const a = customerAddress.find((item) => item.id === Number(e));
      form.setFieldsValue({
        hoten: `${user_info.user.lastName} ${user_info.user.firstName}`,
        phone: a.phone,
        address: a.address,
        district: a.district,
        province: a.province,
      });
      setCheck(true);
    }
  };
  const handleCheckInput = (value) => {
    setCod(value.target.value);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-ms-12 address-information">
            <NavLink to="/" className="logoName">
              QE-SHOP
            </NavLink>
            <h5 className="billing-information"> Thông tin thanh toán</h5>
            <div className="account">
              <i className="fa fa-user-circle icone" aria-hidden="true"></i>
              <div className="email">
                <p>
                  {user_info.user.lastName} {user_info.user.firstName} (
                  {user_info.user.email})
                </p>
                <div className="logout">Đăng xuất</div>
              </div>
            </div>
            <Form
              name="basic"
              ref={formRef}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                name="allAddress"
                type="allAddress"
                setValue={(e) => test(e, "allAddress")}
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn địa chỉ từ sổ địa chỉ của bạn"
                  onChange={(value) => handleChangeOptione(value)}
                >
                  <Select.Option value={0}>chưa có</Select.Option>
                  {customerAddress?.map((item, index) => (
                    <Select.Option value={`${item.id}`} key={index}>
                      {item.phone}/{item.address}/{item.district}/
                      {item.province}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="hoten"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input placeholder="Họ và Tên" />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input placeholder="Điện Thoại" />
              </Form.Item>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input placeholder="Địa Chỉ" />
              </Form.Item>
              <div className="row">
                <div className="col-md-6 col-ms-12">
                  <Form.Item name="province">
                    {check === true ? (
                      <Select />
                    ) : (
                      <SelectAddress
                        lable="Tỉnh/Thành phố"
                        options={provinces}
                        setValue={(e) => test(e, "province")}
                        type="province"
                      />
                    )}
                  </Form.Item>
                </div>
                <div className="col-md-6 col-ms-12">
                  <Form.Item name="district">
                    {check === true ? (
                      <Select />
                    ) : (
                      <SelectAddress
                        lable="Quận/Huyện"
                        setValue={(e) => test(e, "district")}
                        options={districts}
                        type="district"
                      />
                    )}
                  </Form.Item>
                </div>
                <Form.Item wrapperCol={{ offset: 30, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Thanh Toán
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
          <div className="col-md-6 col-ms-12 check-cart">
            {listCart?.map((item, index) => (
              <div className="row check-cart-body" key={index}>
                <div className="col-md-8 col-ms-12 check-cart-item ">
                  <div className="image">
                    <img
                      src={item.image}
                      alt={item.name}
                      width="100px"
                      height={100}
                    />
                    <div className="quntity">{item && item.quantity}</div>
                  </div>

                  <div className="check-cart-title">
                    <p>
                      <strong>{item && item.name}</strong>
                    </p>
                    <p>
                      Phiên Bản : <strong>{item && item.size}</strong>/
                    </p>
                    <p>
                      Màu : <strong>{item && item.color}</strong>
                    </p>
                    <p>
                      thương hiêu : <strong>{item && item.trademark}</strong>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 col-ms-12 cart_name ">
                  {item && item.price * item.quantity}
                  <strong className="VND"> VNĐ</strong>
                </div>
              </div>
            ))}
            <Radio.Group onChange={handleCheckInput} value={cod}>
              <Space direction="vertical">
                <Radio value={20000}>Vận chuyển chậm COD: 20000 VND</Radio>
                <Radio value={30000}>Vận chuyển nhanh COD: 30000 VND</Radio>
              </Space>
            </Radio.Group>
            <div className="all-money">
              <div className="tam-tinh">Tạm Tính :</div>
              <div className="temp-number">
                {sumPrice + cod} <strong className="VND"> VNĐ</strong>{" "}
              </div>
            </div>
            <div className="all-money ">
              <div className="tam-tong">Tổng Tiền :</div>
              <div className="all-price">
                {sumPrice + cod} <strong className="VND"> VNĐ</strong>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOuts;
