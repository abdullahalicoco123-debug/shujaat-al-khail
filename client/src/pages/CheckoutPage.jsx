import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import "./CheckoutPage.css";

function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    address: "",
    city: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const formatPrice = (value) => `SAR ${value.toLocaleString("en-US")}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.customerName || !form.customerPhone || !form.address || !form.city) {
      setError("Please fill your name, phone, address and city.");
      return;
    }

    setPlacing(true);

    const orderData = {
      ...form,
      items: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Could not place the order.");
        setPlacing(false);
        return;
      }

      clearCart();
      setOrderPlaced(true);
    } catch {
      setError("Could not connect to the server.");
      setPlacing(false);
    }
  };

  if (orderPlaced) {
    return (
      <section className="checkout-page">
        <div className="container checkout-container">
          <div className="checkout-success">
            <div className="checkout-success-icon">✓</div>
            <h1>Order Placed Successfully!</h1>
            <p>
              Thank you for your order. We will contact you on your phone number
              to confirm delivery details. Payment is Cash on Delivery.
            </p>
            <Link to="/" className="checkout-home-btn">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="checkout-page">
        <div className="container checkout-container">
          <div className="checkout-success">
            <h1>Your cart is empty</h1>
            <p>Add some products before checking out.</p>
            <Link to="/" className="checkout-home-btn">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="container checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Delivery Information</h3>

            {error && <div className="checkout-error">{error}</div>}

            <div className="checkout-row">
              <div className="checkout-field">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </div>
              <div className="checkout-field">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={form.customerPhone}
                  onChange={handleChange}
                  placeholder="05xxxxxxxx"
                />
              </div>
            </div>

            <div className="checkout-field">
              <label>Email (optional)</label>
              <input
                type="email"
                name="customerEmail"
                value={form.customerEmail}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>

            <div className="checkout-row">
              <div className="checkout-field">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Riyadh"
                />
              </div>
              <div className="checkout-field">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street, district, building"
                />
              </div>
            </div>

            <div className="checkout-field">
              <label>Order Notes (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Any special instructions"
              ></textarea>
            </div>

            <div className="checkout-payment">
              <h4>Payment Method</h4>
              <div className="checkout-cod">
                <span className="checkout-cod-radio"></span>
                Cash on Delivery
              </div>
            </div>

            <button type="submit" className="checkout-place-btn" disabled={placing}>
              {placing ? "Placing Order..." : `Place Order — ${formatPrice(cartTotal)}`}
            </button>
          </form>

          <div className="checkout-summary">
            <h3>Your Order</h3>
            {cartItems.map((item) => (
              <div className="checkout-summary-item" key={item._id}>
                <img
                  src={item.image || "https://via.placeholder.com/60?text=Item"}
                  alt=""
                />
                <div className="checkout-summary-info">
                  <span className="checkout-summary-name">
                    {i18n.language === "ar" ? item.nameAr : item.nameEn}
                  </span>
                  <span className="checkout-summary-qty">
                    {item.quantity} × {formatPrice(item.price)}
                  </span>
                </div>
                <span className="checkout-summary-sub">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
            <div className="checkout-summary-total">
              <span>Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;