import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTE } from "../../../constants/routes.const";

import { fetchProductList } from "../../../stores/action/product.action";
import {
  changePagination,
  changeTextSearch,
} from "../../../stores/slice/product.slice";
import "./products.scss";
const Products = () => {
  const pagination = useSelector((state) => state.productReducer.pagination);
  const textSearch = useSelector((state) => state.productReducer.textSearch);
  const category = useSelector((state) => state.productReducer.category);
  const products = useSelector((state) => state.productReducer.products);
  const [valueSearch, setValueSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      fetchProductList({
        page: `${pagination.page}`,
        limit: `${pagination.limit}`,
        category: `${category}`,
        textSearch: `${textSearch}`,
      })
    );
  }, [pagination]);
  console.log(products);
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
  return (
    <>
      <div className="container-fluid products">
        <div
          className="img_home"
          data-aos="fade-left"
          data-aos-easing="ease-in-sine"
          data-aos-duration="2000"
        >
          <img
            src="//theme.hstatic.net/200000182297/1000887316/14/ms_banner_img4.jpg?v=551"
            alt=""
            width="100%"
            height="700px"
            className="img"
          />
        </div>
        <div className="row">
          <div className="col-md-3 col-ms-12 products-left">
            <h3>Danh Mục</h3>
            <h4>Tất cả Sản Phẩm</h4>
            <ul className="products-left_ul">
              <li className="products-left_li">
                <NavLink onClick={() => handleSearch("Đầm")}>
                  <strong> Đầm</strong>
                </NavLink>
              </li>
              <li className="products-left_li">
                <NavLink onClick={() => handleChangeCategory("Đầm-suông")}>
                  Đầm suông{" "}
                </NavLink>
              </li>
              <li className="products-left_li">
                <NavLink onClick={() => handleChangeCategory("Đầm-dáng-A")}>
                  {" "}
                  Đầm dáng A
                </NavLink>
              </li>
            </ul>
            <ul className="products-left_ul">
              <li className="products-left_li">
                <NavLink onClick={() => handleSearch("sơ mi")}>
                  <strong> Áo sơ mi</strong>
                </NavLink>
              </li>
              <li className="products-left_li">
                <NavLink onClick={() => handleChangeCategory("Sơ-mi-dài-tay")}>
                  Dài tay{" "}
                </NavLink>
              </li>
              <li className="products-left_li">
                <NavLink onClick={() => handleChangeCategory("Sơ-mi-ngắn-tay")}>
                  {" "}
                  Ngắn tay
                </NavLink>
              </li>
            </ul>
            <ul className="products-left_ul">
              <li className="products-left_li">
                <NavLink onClick={() => handleSearch("quần")}>
                  <strong> Quần</strong>
                </NavLink>
              </li>
              <li className="products-left_li">
                <NavLink>Quần dài </NavLink>
              </li>
              <li className="products-left_li">
                <NavLink>Quần jean</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-md-9 col-ms-12 ">
            <div className="row products-right ">
              {products?.map((product, index) => (
                <>
                  <div className="col-md-4 col-ms-12 products-right_item">
                    <NavLink to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        width="100%"
                        height={500}
                      />
                      <h5>{product.name.substring(0, 20)}...</h5>
                      <h4>
                        {product.price} <strong className="VND">VNĐ</strong>
                      </h4>
                    </NavLink>
                  </div>
                </>
              ))}
              <Pagination
                onChange={(page, pageSize) => {
                  dispatch(changePagination({ page: page, limit: pageSize }));
                }}
                current={Number(pagination.page)}
                total={Number(pagination.total)}
                pageSize={Number(pagination.limit)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
