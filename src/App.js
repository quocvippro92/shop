import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ImgHome from "./components/img_home/ImgHome";
import { ROUTE } from "./constants/routes.const";
import Addresses from "./pages/addresses/Addresses";
import Product from "./pages/allProduct/product/Product";
import Products from "./pages/allProduct/products/Products";
import CartCustomer from "./pages/cart/CartCustomer";
import CheckOuts from "./pages/checkOuts/CheckOuts";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Order from "./pages/order/Order";
import Register from "./pages/register/Register";

function App() {
  const user_login = useSelector((state) => state.authReducer.user);
  return (
    <>
      <Routes>
        <Route path={ROUTE.HOME} element={<Home />}>
          <Route path={ROUTE.HOME} element={<ImgHome />} />
          <Route
            path={ROUTE.LOGIN}
            element={user_login !== null ? <ImgHome /> : <Login />}
          />
          <Route path={ROUTE.REGISTER} element={<Register />} />
          <Route path={ROUTE.SANPHAM} element={<Product />} />
          <Route path={ROUTE.ALLSANPHAM} element={<Products />} />
          <Route path={ROUTE.ADDRESSES} element={<Addresses />} />
          <Route path={ROUTE.ORDER} element={<Order />} />
          <Route path={ROUTE.CART} element={<CartCustomer />} />
          <Route
            path={ROUTE.CHECKOUTS}
            element={user_login === null ? <Login /> : <CheckOuts />}
          />
        </Route>

        <Route
          path={ROUTE.LOGIN}
          element={user_login !== null ? <Home /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default App;
