import { Button, Form, Input, Modal, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import SelectAddress from "../../components/SelectAddress";
import {
  createCustomerAddress,
  deleteCustomerAddress,
  fetchDistricts,
  fetchProvinces,
  getCustomerAddress,
} from "../../stores/action/address.action";
import "./addresses.scss";
const Addresses = () => {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const userAddress = useSelector((state) => state.authReducer.user);
  const [openAddress, setOpenAddress] = useState(false);
  const [confirmLoadingAddress, setConfirmLoadingAddress] = useState(false);
  const [form] = Form.useForm();
  const provinces = useSelector((state) => state.addressReducer.provinces);
  const districts = useSelector((state) => state.addressReducer.district);
  const customerAddress = useSelector(
    (state) => state.addressReducer.customerAddress
  );
  useEffect(() => {
    dispatch(fetchProvinces());
  }, []);
  useEffect(() => {
    dispatch(getCustomerAddress(userAddress.user.id));
  }, []);

  const showModalAddress = () => {
    setOpenAddress(true);
  };

  const test = (e, type) => {
    console.log(e);
    if (type === "province") dispatch(fetchDistricts(e));
    form.setFieldsValue({
      [type]: e,
    });
  };
  const handleOkAddress = () => {
    setConfirmLoadingAddress(true);
    setTimeout(() => {
      setOpenAddress(false);
      setConfirmLoadingAddress(false);
    }, 2000);
  };
  const onFinish = (values) => {
    let newData = {
      ...values,
      customerId: userAddress.user.id,
      province: provinces.find((ee) => ee.province_id === values.province)
        .province_name,
      district: districts.find((ee) => ee.district_id === values.district)
        .district_name,
    };
    dispatch(createCustomerAddress(newData));
    setOpenAddress(false);
  };
  const handleCancelAddress = () => {
    console.log("Clicked cancel button");
    setOpenAddress(false);
  };
  const handleDelete = (item) => {
    dispatch(deleteCustomerAddress(item.id));
    dispatch(getCustomerAddress());
  };
  //
  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-4 col-ms-12 addresses_left">
          <h3 className="addresses_left-header">Xin Chào</h3>
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
          <div className="addresses_right-name">
            <h3>
              {userAddress.user.firstName}
              <span> </span>
              {userAddress.user.lastName}
              <span> &#40; Địa chỉ mặc định &#41;</span>
            </h3>
            <h4>Đại chỉ : Việt Nam</h4>
            <h4>Điện thoại : {userAddress.user.phone}</h4>
          </div>
          {customerAddress &&
            customerAddress?.map((item) => (
              <div className="addresses_right-name">
                <div className="row">
                  <div className="col-md-10 col-ms-10">
                    <h3>
                      {item.firstName}
                      <span> </span>
                      {item.lastName}
                    </h3>
                    <h4>
                      Đại chỉ : {item.address}/{item.district}/{item.province}
                    </h4>
                    <h4>Điện thoại : {item.phone}</h4>
                  </div>
                  <div className="col-md-2 col-ms-2">
                    <span className="edit">sửa</span>|
                    <span className="delete" onClick={() => handleDelete(item)}>
                      Xóa
                    </span>
                  </div>
                </div>
              </div>
            ))}
          <div className="addresses_right-body">
            <Button type="primary" onClick={showModalAddress}>
              Thêm Mới Địa Chỉ
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="Address user info"
        open={openAddress}
        onOk={handleOkAddress}
        confirmLoading={confirmLoadingAddress}
        onCancel={handleCancelAddress}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <div className="row">
            <div className="col-md-6 col-ms-12">
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Họ của bạn là gì!" }]}
              >
                <Input placeholder="họ" size="large" />
              </Form.Item>
            </div>

            <div className="col-md-6 col-ms-12">
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: "Tên của bạn là gì!" }]}
              >
                <Input placeholder="Tên" size="large" />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-ms-12">
              <Form.Item
                name="address"
                rules={[
                  { required: true, message: "vui lòng nhập địa chỉ cụ thể!" },
                ]}
              >
                <Input placeholder="Địa chỉ cụ thể" size="large" />
              </Form.Item>
            </div>

            <div className="col-md-6 col-ms-12">
              <Form.Item
                name="phone"
                type="number"
                rules={[
                  {
                    required: true,
                    message: "Nhập số điện thoại của bạn!",
                  },
                  {
                    validator: (_, value) => {
                      if (
                        !value ||
                        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Số điện thoại không hợp lệ")
                      );
                    },
                  },
                ]}
              >
                <Input size="large" placeholder="SĐT" />
              </Form.Item>
            </div>
            <div className="col-md-6 col-ms-12">
              <Form.Item name="province">
                <SelectAddress
                  lable="Tỉnh/Thành phố"
                  options={provinces}
                  setValue={(e) => test(e, "province")}
                  type="province"
                />
              </Form.Item>
            </div>
            <div className="col-md-6 col-ms-12">
              <Form.Item name="district">
                <SelectAddress
                  lable="Quận/Huyện"
                  setValue={(e) => test(e, "district")}
                  options={districts}
                  type="district"
                />
              </Form.Item>
            </div>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Bạn chừa trống ô districtProvince!",
                },
              ]}
            ></Form.Item>
          </div>

          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Addresses;
