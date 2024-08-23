import React from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (id, selectedSize, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 1) {
      updateQuantity(id, selectedSize, newQuantity);
    }
  };

  const handleDecreaseQuantity = (id, selectedSize, quantity) => {
    if (quantity > 1) {
      updateQuantity(id, selectedSize, quantity - 1);
    }
  };

  const handleIncreaseQuantity = (id, selectedSize, quantity) => {
    updateQuantity(id, selectedSize, quantity + 1);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>장바구니</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
           <p className="empty-cart-message">장바구니에 담은 상품이 없어요</p>
           <p className="empty-cart-suggestion">상품을 추가해보세요</p>
        </div>
      ) : (
        <div className="cart-page">
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-image-container">
                  <img src={item.img} alt={item.title} className="cart-image" />
                  <button
                    className="cart-remove-button"
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                  >
                    <img
                      src="/img/trash-icon.png"
                      alt="Remove"
                      className="cart-trash-icon"
                    />
                  </button>
                </div>
                <div className="cart-product-info">
                  <div className="product-title">{item.title}</div>
                  <div className="product-price">
                    ₩{item.price.toLocaleString()}
                  </div>
                  <div className="product-size">사이즈 : {item.selectedSize}</div>
                  <div className="product-quantity">
                    <label>
                      <div className="quantity-container">
                        <button
                          className="quantity-button"
                          onClick={() =>
                            handleDecreaseQuantity(
                              item.id,
                              item.selectedSize,
                              item.quantity
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.id, item.selectedSize, e)
                          }
                          className="quantity-input"
                        />
                        <button
                          className="quantity-button"
                          onClick={() =>
                            handleIncreaseQuantity(
                              item.id,
                              item.selectedSize,
                              item.quantity
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-box">
            <div className="checkout-summary">
              <div className="summary-item">
                <span>주문 가격</span>
                <span>₩{totalPrice.toLocaleString()}</span>
              </div>
              <div className="summary-item">
                <span>배송비</span>
                <span>무료</span>
              </div>
              <div className="summary-total">
                <span>합계</span>
                <span>₩{totalPrice.toLocaleString()}</span>
              </div>
              <button className="checkout-button">결제하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
