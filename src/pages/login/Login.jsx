import { Button, Checkbox, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./login.scss";
import { NavLink } from "react-router-dom";
import Aos from "aos";
import { useDispatch } from "react-redux";
import { loginAction } from "../../stores/action/auth.action";
const Login = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(loginAction(values));
  };
  return (
    <>
      <div className="container-fluid login">
        <div
          className="form_login"
          data-aos="fade-right"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1000"
        >
          <div
            className="header_login"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="2000"
          >
            QE_SHOP
          </div>
          <div
            className="main_login"
            data-aos="fade-left"
            data-aos-easing="ease-in-sine"
            data-aos-duration="2000"
          >
            <div className="header-main_login">Đăng Nhập</div>
            <Form name="basic" onFinish={onFinish} autoComplete="off">
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "Email không hợp lệ!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="email"
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 0,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 10,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
              <Row justify="center">
                <span>
                  Bạn đã có tài khoản?{" "}
                  <NavLink to="/register"> Đăng Ký ngay!</NavLink>
                </span>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
