import { Button, Form, Input, Row } from "antd";
import Aos from "aos";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { registerAction } from "../../stores/action/auth.action";
import "./register.scss";
const Register = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(registerAction(values));
  };

  return (
    <>
      <div className="container-fluid register">
        <div
          className="form_register"
          data-aos="fade-right"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1000"
        >
          <div
            className="header_register"
            data-aos="fade-right"
            data-aos-easing="ease-in-sine"
            data-aos-duration="2000"
          >
            QE_SHOP
          </div>
          <div
            className="main_register"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="2000"
          >
            <div className="header-main_register">Đăng Ký</div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
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
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email của bạn!",
                      },
                      {
                        type: "email",
                        message: "Email không hợp lệ!",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Email" prefix />
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
              </div>
              <div className="row">
                <div className="col-md-6 col-ms-12">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu!",
                      },
                    ]}
                  >
                    <Input.Password size="large" placeholder="Mật khẩu" />
                  </Form.Item>
                </div>
                <div className="col-md-6 col-ms-12">
                  <Form.Item
                    name="confirm"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập lại mật khẩu!",
                      },

                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            new Error("Xác nhận mật khẩu không đúng!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Xác nhận mật khẩu"
                    />
                  </Form.Item>
                </div>
              </div>

              <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Đăng Ký
                </Button>
              </Form.Item>
              <Row justify="center">
                <span>
                  Bạn đã có tài khoản?{" "}
                  <NavLink to="/login"> Đăng nhập ngay!</NavLink>
                </span>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
