import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  fetchAllProducts,
  fetchProductsDetail,
} from "../../../stores/action/product.action";
import { sliderProduct, sliderProductItem } from "../ProductConstant";
import "./product.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactImageMagnify from "react-image-magnify";
import { Button, Modal, notification, Radio } from "antd";
import { useRef } from "react";
import {
  createCart,
  deleteCart,
  getCustomerCart,
  updateCart,
} from "../../../stores/action/cartUser.action";
import { ROUTE } from "../../../constants/routes.const";
const Product = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productReducer.product);
  const user_info = useSelector((state) => state.authReducer.user);
  const cart = useSelector((state) => state.cartReducer.listCartCustomer);
  const allProduct = useSelector((state) => state.productReducer.allProduct);
  const [img, setImg] = useState("");
  const [size, setSize] = useState("size4");
  const navigate = useNavigate();
  const [sizeActive, setSizeActive] = useState(false);
  const [openAddcart, setOpenAddcart] = useState(false);
  const [confirmLoadingAddcart, setConfirmLoadingAddcart] = useState(false);
  useEffect(() => {
    dispatch(fetchProductsDetail(id));
  }, [id]);
  useEffect(() => {
    if (user_info === null) {
      dispatch(fetchAllProducts());
    } else {
      dispatch(getCustomerCart(user_info.user.id));
      dispatch(fetchAllProducts());
    }
  }, []);
  useEffect(() => {
    setImg(product.image);
  }, [product]);

  const listSimilarProduct = [...allProduct]
    .filter((item, index) => item.category === product.category)
    .splice(0, 12);

  const handleChangeImg = (src) => {
    setImg(src.image_url);
  };
  const handleChangeSize = (item, index) => {
    setSize(item.size);
    setSizeActive(index);
  };
  const showModalCart = (product) => {
    const a = cart.findIndex((e) => e.id === product.id) === 0;

    if (user_info === null) {
      alert(` bạn chưa nhập tài khoản vui lòng Đăng nhập giúp !`);
      navigate(ROUTE.LOGIN);
    } else if (a === true) {
      notification.error({
        message:
          "Bạn chỉ có thể thêm 1 ĐẦM CỔ VEST TAY BỒNG D19972 vào giỏ hàng!",
        style: { border: "2px solid #71be34" },
        duration: 3,
      });
    } else {
      dispatch(
        createCart({
          id: product.id,
          customer_id: user_info === null ? "" : user_info.user.id,
          name: product.name,
          image: product.image,
          size: size,
          color: product.color,
          price: product.price,
          trademark: product.trademark,
          quantity: 1,
        })
      );
      setOpenAddcart(true);
    }
  };
  const handleBuy = () => {
    dispatch(
      createCart({
        id: product.id,
        customer_id: user_info.user.id,
        name: product.name,
        image: product.image,
        size: size,
        color: product.color,
        price: product.price,
        trademark: product.trademark,
        quantity: 1,
      })
    );
  };

  const handleOkCart = () => {
    setConfirmLoadingAddcart(true);
    setTimeout(() => {
      setOpenAddcart(false);
      setConfirmLoadingAddcart(false);
    }, 2000);
  };

  const handleCancelCart = () => {
    console.log("Clicked cancel button");
    setOpenAddcart(false);
  };

  const handleDeleteCart = (item) => {
    dispatch(deleteCart(item.id));
    dispatch(getCustomerCart(user_info.user.id));
  };
  const handleDecrease = (item) => {
    if (item.quantity === 0) {
      dispatch(deleteCart(item.id));
      dispatch(getCustomerCart(user_info.user.id));
    } else {
      const productId = item.id;
      const productUpdate = { ...item };
      productUpdate.quantity = item.quantity - 1;
      dispatch(updateCart({ productId, productUpdate }));
      dispatch(getCustomerCart(user_info.user.id));
    }
  };
  const handleIncrease = (item) => {
    const productId = item.id;
    const productUpdate = { ...item };
    productUpdate.quantity = item.quantity + 1;
    dispatch(updateCart({ productId, productUpdate }));
    dispatch(getCustomerCart(user_info.user.id));
  };
  return (
    img && (
      <>
        <div className="container product">
          <div className="row">
            <div className="col-md-8 col-ms-12 product-left">
              <div className="product_img">
                <ReactImageMagnify
                  className="zoom_image"
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: img,
                      width: 300,
                      height: 300,
                    },
                    largeImage: {
                      src: img,
                      width: 2000,
                      height: 1800,
                    },
                  }}
                />
                {/* <img src={img} alt={product.name} className="imgDetail" /> */}
              </div>
              <Slider {...sliderProductItem} className="product_slider">
                {product.smallPhoto?.map((item, index) => (
                  <div
                    className="product_slider-img"
                    key={index}
                    onClick={() => handleChangeImg(item)}
                  >
                    <img
                      src={item.image_url}
                      alt={product.name}
                      width="100%"
                      height="250px"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="col-md-4 col-ms-12 product-right">
              <div className="product-right_name">{product.name}</div>
              <div className="product-right_trademark">
                Thương hiệu : <strong>{product.trademark}</strong>
              </div>
              <div className="product-right_id">
                Mã Sản Phẩm : <strong>{product.id}</strong>
              </div>
              <div className="product-right_price">
                Giá : {product.price}
                <strong className="VND"> VNĐ</strong>
              </div>
              <div className="product-right_size">
                <strong> Kích thước</strong>
                <div className="size_product">
                  {product.sizes?.map((item, index) => (
                    <div
                      key={index}
                      className={sizeActive === index ? "active" : "size"}
                      onClick={() => handleChangeSize(item, index)}
                    >
                      {item.size}
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-right_color">
                <strong>Màu</strong>
                <div
                  className="color_product"
                  style={{ backgroundColor: `${product.color}` }}
                ></div>
              </div>
              <div className="btn-add_cart">
                <Button
                  onClick={() => showModalCart(product)}
                  className="btnCart"
                >
                  Thềm Vào Giỏ Hàng
                </Button>
                <Modal
                  title={`GIỎ HÀNG CỦA BẠN (Đang Có Sản Phẩm)`}
                  open={openAddcart}
                  onOk={handleOkCart}
                  confirmLoading={confirmLoadingAddcart}
                  onCancel={handleCancelCart}
                  cancelButtonProps={{ style: { display: "none" } }}
                  okButtonProps={{ style: { display: "none" } }}
                  okText="Thanh Toán"
                >
                  <div className="row cart_table ">
                    <div className="col-md-6 col-ms-12 name ">
                      <p>Sản Phẩm</p>
                    </div>
                    <div className="col-md-2 col-ms-12 name ">
                      <p>Đơn Giá</p>
                    </div>
                    <div className="col-md-2 col-ms-12 name ">
                      <p>Số lượng</p>
                    </div>
                    <div className="col-md-2 col-ms-12 name ">
                      <p>Thành Tiền</p>
                    </div>
                  </div>
                  <div className="row cart ">
                    {cart?.map((item) => (
                      <>
                        <div className="col-md-6 col-ms-12 cart_img ">
                          <img src={item.image} alt={item.name} width="100px" />
                          <div className="cart_img-name">
                            <p>
                              <strong>{item && item.name}</strong>
                            </p>
                            <p>
                              Phiên Bản : <strong>{item && item.size}</strong>
                            </p>
                            <p>
                              Màu : <strong>{item && item.color}</strong>
                            </p>
                            <p>
                              thương hiêu :{" "}
                              <strong>{item && item.trademark}</strong>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-2 col-ms-12 cart_name ">
                          <strong>{item && item.price}đ</strong>
                        </div>
                        <div className="col-md-2 col-ms-12 cart_name ">
                          <button
                            className="btn btn-secondary reduce"
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </button>
                          <strong className="quantity">
                            {item && item.quantity}
                          </strong>
                          <button
                            className="btn btn-secondary increase"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </button>
                        </div>
                        <div className="col-md-2 col-ms-12 cart_name ">
                          <strong>{item && item.quantity * item.price}đ</strong>{" "}
                          <strong onClick={() => handleDeleteCart(item)}>
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </strong>
                        </div>
                      </>
                    ))}

                    <div className="footer_cart">
                      <button
                        className="btn btn-secondary btnLeft"
                        onClick={() => handleCancelCart()}
                      >
                        Tiếp tục mua hàng
                      </button>
                      <NavLink to="/checkouts" className="btn btn-dark">
                        Thanh Toán
                      </NavLink>
                    </div>
                  </div>
                </Modal>
              </div>
              <div className="btn-buy">
                <NavLink
                  to="/checkouts"
                  className="btn btn-dark ms-2 px-3 py-2"
                  style={{ width: "100%" }}
                  onClick={() => {
                    handleBuy(product);
                  }}
                >
                  Mua Ngay
                </NavLink>
              </div>
              <div className="product-right_description">
                {product.description}
              </div>
            </div>
            <div className="similar_product ">
              <h1>Sản Phẩm tương tự</h1>
              <Slider {...sliderProduct}>
                {listSimilarProduct?.map((item, index) => (
                  <div className="  similar_product-item">
                    <NavLink to={`/product/${item.id}`} key={index}>
                      <img
                        src={item.image}
                        alt={product.name}
                        width="100%"
                        height="500px"
                      />
                      <div className="productSimilar-name">
                        {item.name.substring(0, 20)}...
                      </div>
                      <div className="productSimilar-price">
                        {item.price} <strong className="VND">VNĐ</strong>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default Product;
