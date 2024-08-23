import React, { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { addToCart } = useCart(); 
  const navigate = useNavigate();
  const [selectedSizes, setSelectedSizes] = useState({});

  const showDetail = (id) => {
    if (id) {
      navigate(`/product/${id}`);
    } else {
      console.error("Invalid product ID");
    }
  };

  const handleRemove = (event, id) => {
    event.stopPropagation();
    removeFavorite(id);
  };

  const handleAddToCart = (item) => {
    const selectedSize = selectedSizes[item.id];
    if (!selectedSize) {
      alert("사이즈를 선택해주세요.");
      return;
    }

    const productToAdd = {
      ...item,
      selectedSize,
    };

    addToCart(productToAdd);
    alert("장바구니에 추가되었습니다.");
  };

  const handleSizeChange = (size, id) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [id]: size,
    }));
  };

  return (
    <div className="favorites-container">
      <h2>즐겨찾기</h2>
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p className="empty-favorites-message">즐겨찾기에 담은 상품이 없어요</p>
          <p className="empty-favorites-suggestion">상품을 추가해보세요</p>
        </div>
      ) : (
        <>
          <div className="item-count">{favorites.length} 아이템</div>
          <div className="favorites-list">
            {favorites.map((item) => (
              <div key={item.id} className="favorite-item">
                <div
                  className="image-container"
                  onClick={() => showDetail(item.id)}
                >
                  <img src={item.img} alt={item.title} className="favorite-image" />
                  <button
                    className="remove-button"
                    onClick={(event) => handleRemove(event, item.id)}
                  >
                    <img
                      src="/img/trash-icon.png"
                      alt="Remove"
                      className="trash-icon"
                    />
                  </button>
                </div>
                <div className="favorites-product-info">
                  <div className="product-title">{item.title}</div>
                  <div className="product-price">
                    ₩{item.price.toLocaleString()}
                  </div>
                  <div className="size-select-container">
                    <select
                      className="size-select"
                      value={selectedSizes[item.id] || ""}
                      onChange={(e) => handleSizeChange(e.target.value, item.id)}
                    >
                      <option value="">사이즈 선택</option>
                      {item.size.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="favorites-add-to-cart-button"
                    onClick={() => handleAddToCart(item)}
                  >
                    추가
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
