import "../component/ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();

  const showDetail = () => {
    navigate(`/product/${item.id}`);
  };

  return (
    <div className="product-card">
      <div className="image-container" onClick={showDetail}>
        <img src={item?.img} alt={item?.title} className="product-image" />
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
