import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import "./header.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { Button, Dropdown, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../stores/slice/auth.slice";
import { fetchProductList } from "../../stores/action/product.action";
import {
  changeCategory,
  changeTextSearch,
} from "../../stores/slice/product.slice";
import { ROUTE } from "../../constants/routes.const";
import { getCustomerCart } from "../../stores/action/cartUser.action";

const Header = () => {
  const { Search } = Input;
  const user_info = useSelector((state) => state.authReducer.user);
  const totalCart = useSelector((state) => state.cartReducer.listCartCustomer);
  const [valueSearch, setValueSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items =
    user_info === null
      ? [
          {
            key: "1",
            label: (
              <NavLink to={`${user_info !== null ? "" : "/login"}`}>
                Đăng Nhập
              </NavLink>
            ),
          },
          {
            key: "2",
            label: <NavLink to="/register">Đăng Ký</NavLink>,
          },
        ]
      : [
          {
            key: "1",
            label: <NavLink to="/addresses">Thông Tin Tài Khoản</NavLink>,
          },
          {
            key: "2",
            label: <NavLink to="/">Lịch Sử Đơn Hàng</NavLink>,
          },
          {
            key: "3",
            label: <div onClick={() => handleLogOut()}>Đăng Xuất</div>,
          },
        ];
  const sumCart = totalCart.reduce(
    (total, currentValue) => total + currentValue.quantity,
    0
  );
  useEffect(
    () =>
      user_info === null ? "" : dispatch(getCustomerCart(user_info.user.id)),
    []
  );
  // useEffect(() => {
  //   dispatch(getCustomerCart(user_info.user.id));
  // }, []);
  const handleLogOut = () => {
    dispatch(logOut());
  };
  useEffect(() => {
    Aos.init();
  }, []);

  const handleSearch = (value) => {
    let textSearch = value.trim();
    if (textSearch) {
      dispatch(fetchProductList({ page: 1, limit: 9, textSearch }));
      dispatch(changeTextSearch(textSearch));
    }
    setValueSearch("");
    if (textSearch) navigate(ROUTE.ALLSANPHAM);
  };
  const handleChangeCategory = (category) => {
    let textSearch = category.trim();
    if (textSearch) {
      dispatch(fetchProductList({ page: 1, limit: 9, textSearch }));
      dispatch(changeTextSearch(textSearch));
    }
    setValueSearch("");
    if (textSearch) navigate(ROUTE.ALLSANPHAM);
    // if (category) {
    //   dispatch(fetchProductList({ page: 1, limit: 9, category }));
    //   dispatch(changeCategory(category));
    // }
    // if (category) navigate(ROUTE.ALLSANPHAM);
  };
  const handleClick = () => {
    dispatch(changeTextSearch(""));
    dispatch(fetchProductList({ page: 1, limit: 9 }));
  };
  return (
    <>
      <div
        className="container-fuild navbar"
        data-aos="fade-right"
        data-aos-easing="ease-in-sine"
        data-aos-duration="1000"
      >
        <div className="row navbar-menu">
          <div
            className="col-md-2 logo-item"
            data-aos="fade-right"
            data-aos-easing="ease-in-sine"
            data-aos-duration="2000"
          >
            <NavLink to="/" className="logo">
              QE-SHOP
            </NavLink>
          </div>
          <div className="col-md-10">
            <div className="menu">
              <ul
                className="main-menu"
                data-aos="fade-up"
                data-aos-easing="ease-in-sine"
                data-aos-duration="2000"
              >
                <li className="menu-item">
                  <NavLink
                    className="menu-item-a"
                    to="/products"
                    onClick={() => handleClick()}
                  >
                    SẢN PHẨM{" "}
                    <i
                      className="fa fa-chevron-circle-down"
                      aria-hidden="true"
                    ></i>
                  </NavLink>
                  <ul className="sub-menu">
                    <li>
                      <NavLink
                        to="/products"
                        className="sub-menu__item"
                        onClick={() => handleChangeCategory("Đầm")}
                      >
                        Đầm{""}
                        <i
                          className="fa fa-chevron-right chevron-right"
                          aria-hidden="true"
                        ></i>
                      </NavLink>
                      <ul className="sub-menu-3">
                        <li>
                          <NavLink
                            to="/products"
                            onClick={() => handleChangeCategory("Đầm-suông")}
                          >
                            Đầm suông
                          </NavLink>
                        </li>
                        <li>
                          <NavLink>Đầm dáng A </NavLink>
                        </li>
                        <li>
                          <NavLink>Đầm ôm </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <NavLink className="sub-menu__item">
                        Áo Sơ Mi{" "}
                        <i
                          className="fa fa-chevron-right chevron-right"
                          aria-hidden="true"
                        ></i>
                      </NavLink>
                      <ul className="sub-menu-4">
                        <li>
                          <NavLink>Đầm suông </NavLink>
                        </li>
                        <li>
                          <NavLink>Đầm dáng A </NavLink>
                        </li>
                        <li>
                          <NavLink>Đầm ôm </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <NavLink className="sub-menu__item">
                        Áo Dài{" "}
                        <i
                          className="fa fa-chevron-right chevron-right"
                          aria-hidden="true"
                        ></i>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="sub-menu__item">
                        Quần{" "}
                        <i
                          className="fa fa-chevron-right chevron-right"
                          aria-hidden="true"
                        ></i>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="sub-menu__item">
                        Chân Váy{" "}
                        <i
                          className="fa fa-chevron-right chevron-right"
                          aria-hidden="true"
                        ></i>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="sub-menu__item">
                        Áo Len{" "}
                        <i
                          className="fa fa-chevron-right chevron-right"
                          aria-hidden="true"
                        ></i>
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="menu-item">
                  <NavLink className="menu-item-a">SẢN PHẨM MỚI </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink className="menu-item-a">
                    BỘ SIÊU TẬP{" "}
                    <i
                      className="fa fa-chevron-circle-down"
                      aria-hidden="true"
                    ></i>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink className="menu-item-a">
                    SALE{" "}
                    <i
                      className="fa fa-chevron-circle-down"
                      aria-hidden="true"
                    ></i>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink className="menu-item-a">SẢN PHẨM NHẬP KHẨU </NavLink>
                </li>
              </ul>
              <div
                className="menu-right"
                data-aos="fade-down"
                data-aos-easing="ease-in-sine"
                data-aos-duration="2000"
              >
                <Search
                  className="search"
                  style={{ width: 300 }}
                  placeholder="Tìm kiếm"
                  onSearch={handleSearch}
                  enterButton
                  value={valueSearch}
                  onChange={(e) => setValueSearch(e.target.value)}
                />
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomLeft"
                  arrow
                >
                  {user_info !== null ? (
                    <Button>
                      <i className="fa fa-user-plus me-1"></i>
                      {user_info.user.email}
                    </Button>
                  ) : (
                    <Button>
                      <i className="fa fa-user-plus me-1"></i>
                      Tài Khoản
                    </Button>
                  )}
                </Dropdown>

                <NavLink to="/cart" className="btn btn-outline-dark cart ">
                  Cart<i className="fa fa-shopping-cart me-1"></i>
                  <div className="total-cart">
                    {user_info !== null ? sumCart : 0}
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
