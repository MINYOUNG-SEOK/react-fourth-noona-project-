import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../component/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
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
    navigate("/favorites");
  };

  const search = (event) => {
    if (event.key === "Enter") {
      let keyword = event.target.value;
      console.log("검색어:", keyword);
      navigate(`/?q=${keyword}`);
      setSearchTerm(""); // 검색 후 검색어 상태 초기화
    }
  };

  return (
    <div className="navbar">
      <div className="header-icons">
        <div className="search-area">
          <FontAwesomeIcon icon={faSearch} />
          <input
            className="search-input"
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={search}
          />
        </div>
        <div className="login-button" onClick={goToLogin}>
          <img src="/img/login-icon.png" alt="login" className="header-icon" />
          <div className="icon-label">로그인</div>
        </div>
        <div className="favorites-button" onClick={goToFavorites}>
          <img src="/img/like-icon.png" alt="like" className="header-icon" />
          <div className="icon-label">즐겨찾기</div>
        </div>
        <div className="cart-button">
          <img
            src="/img/shoppingbag-icon.png"
            alt="shoppingbag"
            className="header-icon"
          />
          <div className="icon-label">쇼핑백</div>
        </div>
      </div>

      <div className="logo-area" onClick={goToHome}>
        <img src="/img/logo-icon.png" alt="logo" className="logo-icon" />
      </div>

      <div className="menu-area">
        <ul className={`menu-list ${menuOpen ? "open" : ""}`}>
          {menuList.map((menu, index) => (
            <li key={index}>{menu}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
