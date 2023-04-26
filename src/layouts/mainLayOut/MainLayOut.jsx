import Aos from "aos";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import ProductItem from "../../pages/allProduct/productItem/ProductItem";
import "./mainLayout.scss";
const MainLayOut = ({ children }) => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayOut;
