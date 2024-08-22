import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "../component/Navbar.css";

const Navbar = ({ authenticate, setAuthenticate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    if (authenticate) {
      const confirmed = window.confirm("로그아웃 하시겠습니까?");
      if (confirmed) {
        setAuthenticate(false);
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToFavorites = () => {
    navigate("/favorites");
  };

  const search = (event) => {
    if (event.key === "Enter") {
      let keyword = event.target.value.trim();
      if (keyword) {
        console.log("검색어:", keyword);
        navigate(`/?q=${keyword}`);
      } else {
      }
      setSearchTerm("");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="header-icons">
        <div className="hamburger-bar" onClick={toggleMenu}>
          <img
            src="/img/hamburger-icon.png"
            alt="menu"
            className="hamburger-image"
          />
        </div>
        <div className="search-area">
          <img
            src="/img/search-icon.png"
            alt="search"
            className="search-image"
          />
          <input
            className="search-input"
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={search}
          />
        </div>
        <div className="login-button" onClick={goToLogin}>
          <img src="/img/login-icon.png" alt="login" className="header-icon" />
          <div className="icon-label">
            {authenticate ? "로그아웃" : "로그인"}
          </div>
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

      <div className={`slide-menu ${menuOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faTimes} />
        </div>
        <ul className="menu-list">
          {menuList.map((menu, index) => (
            <li key={index}>{menu}</li>
          ))}
        </ul>
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
