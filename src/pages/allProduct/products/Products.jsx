import { Pagination } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { fetchProductList } from "../../../stores/action/product.action";
import { changePagination } from "../../../stores/slice/product.slice";
import "./products.scss";
const Products = () => {
  const pagination = useSelector((state) => state.productReducer.pagination);
  const textSearch = useSelector((state) => state.productReducer.textSearch);
  const category = useSelector((state) => state.productReducer.category);
  const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();
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
  return (
    <>
      <div className="container-fluid products">
        <div className="row">
          <div className="col-md-3 col-ms-12 products-left">
            <h3>Danh Mục</h3>
            <h4>Tất cả Sản Phẩm</h4>
            <ul className="products-left_ul">
              <li className="products-left_li">
                <NavLink>
                  <strong> Đầm</strong>
                </NavLink>
              </li>
              <li className="products-left_li">
                <NavLink>Đầm suông </NavLink>
              </li>
              <li className="products-left_li">
                <NavLink> Đầm ôm</NavLink>
              </li>
            </ul>
            <ul className="products-left_ul">
              <li className="products-left_li">
                <NavLink>
                  <strong> Áo sơ mi</strong>
                </NavLink>
              </li>
              <li className="products-left_li">
                <NavLink>Dài tay </NavLink>
              </li>
              <li className="products-left_li">
                <NavLink> Ngắn tay</NavLink>
              </li>
            </ul>
            <ul className="products-left_ul">
              <li className="products-left_li">
                <NavLink>
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
