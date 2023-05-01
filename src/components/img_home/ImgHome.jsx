import React from "react";
import { useSelector } from "react-redux";
import ProductItem from "../../pages/allProduct/productItem/ProductItem";
import "./imgHome.scss";

const ImgHome = () => {
  return (
    <>
      <div
        className="img_home"
        data-aos="fade-left"
        data-aos-easing="ease-in-sine"
        data-aos-duration="2000"
      >
        <img
          src="img_home.jpg"
          alt=""
          width="100%"
          height="700px"
          className="img"
        />

        <div
          className="img_home-title"
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="2000"
        >
          <h1> QE_SHOP </h1>
          <h3>Mặc hàng luôn đa dạng và uy tín luôn hàng đầu</h3>
          <h4>Mặc hàng QE_SHOP cho ra toàn là dẫn đầu xu hướng</h4>
          <p>QE_SHOP----Sự lựa chọn hàng đầu</p>
        </div>
      </div>
      <ProductItem />
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
    </>
  );
};

export default ImgHome;
