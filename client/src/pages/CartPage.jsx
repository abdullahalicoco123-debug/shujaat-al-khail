import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const formatPrice = (value) => `SAR ${value.toLocaleString("en-US")}`;

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <div className="container cart-container">
          <h1 className="cart-title">Your Cart</h1>
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link to="/" className="cart-continue-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="container cart-container">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img
                  src={item.image || "https://via.placeholder.com/100?text=Item"}
                  alt={i18n.language === "ar" ? item.nameAr : item.nameEn}
                  className="cart-item-image"
                />

                <div className="cart-item-info">
                  <h3 className="cart-item-name">
                    {i18n.language === "ar" ? item.nameAr : item.nameEn}
                  </h3>
                  <span className="cart-item-price">{formatPrice(item.price)}</span>
                </div>

                <div className="cart-item-qty">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                    <FiMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                    <FiPlus />
                  </button>
                </div>

                <span className="cart-item-subtotal">
                  {formatPrice(item.price * item.quantity)}
                </span>

                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item._id)}
                  aria-label="Remove"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Delivery</span>
              <span>Calculated at delivery</span>
            </div>
            <div className="cart-summary-total">
              <span>Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <button
              className="cart-checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
            <p className="cart-cod-note">Payment method: Cash on Delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;