import React, { useState } from "react";
import "../component/ProductCard.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from "../context/FavoritesContext.js"; // 즐겨찾기 컨텍스트 사용

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites(); // 즐겨찾기 관련 함수와 상태 가져오기
  const [liked, setLiked] = useState(isFavorite(item.id)); // 초기 liked 상태 설정

  const showDetail = () => {
    navigate(`/product/${item.id}`);
  };

  const toggleLike = (e) => {
    e.stopPropagation(); // 하트 클릭 시 부모의 클릭 이벤트로 인해 상세 페이지로 이동하는 것을 방지
    if (liked) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
    setLiked(!liked); // liked 상태 토글
  };

  return (
    <div className="product-card">
      <div className="image-container" onClick={showDetail}>
        <img src={item?.img} alt={item?.title} className="product-image" />

        <div
          className="like-icon"
          onClick={toggleLike}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            fontSize: "24px",
            color: liked ? "red" : "black",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={liked ? faHeartSolid : faHeart} />
        </div>
      </div>
      <div className="list-product-info">
        <div className="product-label">
          {item?.choice === true ? "Conscious Choice" : ""}
        </div>
        <div className="product-title">{item?.title}</div>
        <div className="product-price">￦{item?.price.toLocaleString()}</div>
        <div className="product-new">{item?.new === true ? "신제품" : ""}</div>
      </div>
    </div>
  );
};

export default ProductCard;
