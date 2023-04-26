import React from "react";
import MainLayOut from "../../layouts/mainLayOut/MainLayOut";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ImgHome from "../../components/img_home/ImgHome";
const Home = () => {
  return (
    <>
      <MainLayOut>
        <Outlet />
      </MainLayOut>
    </>
  );
};

export default Home;
