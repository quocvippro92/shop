import "./saleProducts.scss";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import {
  changePagination,
  changeTextSearch,
} from "../../stores/slice/product.slice";
import { fetchProductList } from "../../stores/action/product.action";
import { ROUTE } from "../../constants/routes.const";
import { useDispatch, useSelector } from "react-redux";
import { fetchSaleProductList } from "../../stores/action/saleProduct.action";

const SaleProducts = () => {
  const pagination = useSelector(
    (state) => state.saleProductReducer.pagination
  );
  const textSearch = useSelector(
    (state) => state.saleProductReducer.textSearch
  );
  const category = useSelector((state) => state.saleProductReducer.category);
  const sale = useSelector((state) => state.saleProductReducer.sale);
  const products = useSelector(
    (state) => state.saleProductReducer.saleProducts
  );

  const [valueSearch, setValueSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      fetchSaleProductList({
        page: `${pagination.page}`,
        limit: `${pagination.limit}`,
        category: `${category}`,
        textSearch: `${textSearch}`,
        sale: `${sale}`,
      })
    );
  }, [pagination]);

  const handleSearch = (value) => {
    let textSearch = value.trim();
    if (textSearch) {
      dispatch(fetchProductList({ page: 1, limit: 9, textSearch }));
      dispatch(changeTextSearch(textSearch));
    }
    setValueSearch("");
    if (textSearch) navigate(ROUTE.ALLSANPHAM);
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
            src="https://file.hstatic.net/200000182297/file/cover_web_18_04_e9c0749c60bb4948922117dab6ad9f3c.jpg"
            alt=""
            width="100%"
            height="700px"
            className="img"
          />
        </div>
        <div className="row">
          <div className="col-md-12 col-ms-12 ">
            <div className="sale_product-top">ádsadsa</div>
            <div className="row products-right ">
              {products?.map((product, index) => (
                <div
                  className="col-md-4 col-ms-12 saleProductSold-right_item"
                  key={index}
                >
                  <NavLink to={`/sale_products/${product.id}`}>
                    <div className="saleProductSold-img">
                      <img
                        src={product.image}
                        alt={product.name}
                        width="100%"
                      />
                      <div className="saleProductSold-sold">
                        <strong>Sale : {product.sale}%</strong>
                      </div>
                    </div>
                    <div className="saleProductSold-name">
                      {product.name.substring(0, 20)}...
                    </div>
                    <div className="saleProductSold-price">
                      <span className="strikethrough">
                        {product.price} <strong className="VND">VNĐ</strong>
                      </span>
                      <span className="sale_price">
                        {product.price - (product.price * product.sale) / 100}{" "}
                        VNĐ
                      </span>
                    </div>
                  </NavLink>
                </div>
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

export default SaleProducts;
