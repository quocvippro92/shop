import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import { fetchAllProducts } from "../../../stores/action/product.action";
import { sliderProduct } from "../ProductConstant";
import "./productItem.scss";
const ProductItem = () => {
  const allProduct = useSelector((state) => state.productReducer.allProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  const listProductSold = [...allProduct]
    .sort((a, b) => b.sold - a.sold)
    .splice(0, 15);

  const listProductDress = [...allProduct]
    .filter((item, index) => item.category === "Đầm-suông")
    .splice(0, 9);

  return (
    <>
      <div className="container-fluid product__item-lider ">
        <h1> Sản Phẩm Bán Chạy</h1>
        <Slider {...sliderProduct}>
          {listProductSold.map((item, index) => (
            <NavLink
              className="productSold"
              to={`/product/${item.id}`}
              key={index}
            >
              <div className="productSold-img">
                <img
                  src={item.image}
                  alt={item.name}
                  width="100%"
                  height="100%"
                />
                <div className="productSold-sold">
                  <strong>Đã bán :</strong> {item.sold} <span>Đơn</span>
                </div>
              </div>

              <div className="productSold-name">
                {item.name.substring(0, 20)}...
              </div>
              <div className="productSold-price">
                {item.price} <strong className="VND">VNĐ</strong>
              </div>
            </NavLink>
          ))}
        </Slider>
        <h1> Các Mẫu Đầm Suông Hot</h1>
        <Slider {...sliderProduct}>
          {listProductDress.map((item, index) => (
            <NavLink
              className="productSold"
              to={`/product/${item.id}`}
              key={index}
            >
              <div className="productSold-img">
                <img
                  src={item.image}
                  alt={item.name}
                  width="100%"
                  height="100%"
                />
              </div>

              <div className="productSold-name">
                {item.name.substring(0, 20)}...
              </div>
              <div className="productSold-price">
                {item.price} <strong className="VND">VNĐ</strong>
              </div>
            </NavLink>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ProductItem;
