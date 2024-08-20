import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../component/Navbar.css";

const Navbar = () => {
  const menuList = [
    "Women",
    "Men",
    "Baby",
    "H&M HOME",
    "Sport",
    "Sale",
    "지속가능성",
  ];

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToFavorites = () => {
    navigate("/favorites"); // 즐겨찾기 페이지로 이동
  };

  const search = (event) => {
    if (event.key === "Enter") {
      let keyword = event.target.value;
      navigate(`/?q=${keyword}`);
    }
  };

  return (
    <div>
      <div className="header-icons">
        <div className="login-button" onClick={goToLogin}>
          <FontAwesomeIcon icon={faUser} className="header-icon" />
          <div className="icon-label">로그인</div>
        </div>
        <div className="favorites-button" onClick={goToFavorites}>
          <FontAwesomeIcon icon={faHeart} className="header-icon" />
          <div className="icon-label">즐겨찾기</div>
        </div>
        <div className="cart-button">
          <FontAwesomeIcon icon={faCartShopping} className="header-icon" />
          <div className="icon-label">쇼핑백</div>
        </div>
      </div>

      <div className="logo-area" onClick={goToHome}>
        <img
          width={120}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMAaKiaRYNTRewPvMiE3pTI6o9LoTX1gpOtw&s"
          alt="Logo"
        />
      </div>

      <div className="menu-area">
        <ul className="menu-list">
          {menuList.map((menu, index) => (
            <li key={index}>{menu}</li>
          ))}
        </ul>
        <div className="search-area">
          <FontAwesomeIcon icon={faSearch} />
          <input
            className="search-input"
            type="text"
            placeholder="검색"
            onKeyDown={search} // 코드 정리, 확인 필요
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
