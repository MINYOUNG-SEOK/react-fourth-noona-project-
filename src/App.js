import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductAll from "./page/ProductAll";
import Login from "./page/Login";
import Favorites from "./page/Favorites";
import Cart from "./page/Cart";
import Navbar from "./component/Navbar";
import PrivateRoute from "./route/PrivateRoute";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";
import { Container } from "react-bootstrap";

// 1. 전체 상품 페이지, 로그인, 상품 상세 페이지
// 1-1. 네비게이션바
// 2. 전체 상품 페이지에서는 전체 상품을 볼 수 있다
// 3. 로그인 버튼을 누르면 로그인 페이지가 나온다
// 4. 상품 디테일을 눌렀으나, 로그인이 안되어 있을 경우에는 로그인 페이지가 먼저 나온다
// 5. 로그인이 되어있을 경우에는 상품 디테일 페이지를 볼 수 있다
// 6. 로그아웃 버튼을 클릭하면 로그아웃이 된다
// 7. 로그아웃이 되면 상품 디테일 페이지를 볼 수 없다. 다시 로그인 페이지가 보인다
// 8. 로그인을 하면 로그아웃이 보이고 로그아웃을 하면 로그인이 보인다
// 9. 상품을 검색할 수 있다

function App() {
  const [authenticate, setAuthenticate] = useState(false); // true 이면 로그인이 되고 아니면 로그인 안됨

  useEffect(() => {
    console.log("로그인 상태 변경", authenticate);
  }, [authenticate]);

  return (
    <Container>
      <FavoritesProvider>
        <CartProvider>
          <div className="div">
            <Navbar
              authenticate={authenticate}
              setAuthenticate={setAuthenticate}
            />
            <Routes>
              <Route path="/" element={<ProductAll />} />
              <Route
                path="/login"
                element={<Login setAuthenticate={setAuthenticate} />}
              />
              <Route
                path="/product/:id"
                element={<PrivateRoute authenticate={authenticate} component={ProductDetail} />}
              />
              <Route
                path="/favorites"
                element={<PrivateRoute authenticate={authenticate} component={Favorites} />}
              />
              <Route
                path="/cart"
                element={<PrivateRoute authenticate={authenticate} component={Cart} />}
              />
            </Routes>
          </div>
        </CartProvider>
      </FavoritesProvider>
    </Container>
  );
}

export default App;
