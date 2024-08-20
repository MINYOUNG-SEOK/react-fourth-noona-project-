import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../page/ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useFavorites } from "../context/FavoritesContext";

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites(); // 즐겨찾기 관련 함수와 상태

  const getProductDetail = async () => {
    let url = `http://localhost:2000/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setProduct(data);
    setLiked(isFavorite(data.id)); // 이미 즐겨찾기에 있는지 확인
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const toggleLike = () => {
    if (liked) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
    setLiked(!liked);
  };

  if (!product) {
    return <div>잠시만 기다려주세요...</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-images">
        <img src={product.img} alt={product.title} />
      </div>
      <div className="product-info">
        <div className="product-header">
          <h2>{product.title}</h2>
          <div
            className="like-button"
            onClick={toggleLike}
            style={{
              color: liked ? "red" : "black",
              border: `${liked ? "red" : "black"}`,
              padding: "5px",
            }}
          >
            <FontAwesomeIcon icon={liked ? faHeartSolid : faHeart} />
          </div>
        </div>
        <p className="price">₩{product.price.toLocaleString()}</p>
        <p className="size-title">사이즈</p>
        <div className="size-options">
          {product.size.map((size, index) => (
            <button
              key={index}
              className={`size-button ${
                selectedSize === size ? "selected" : ""
              }`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <button className="add-to-cart-button">추가</button>
      </div>
    </div>
  );
};

export default ProductDetail;
