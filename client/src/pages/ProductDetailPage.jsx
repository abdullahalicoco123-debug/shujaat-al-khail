import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiShoppingCart, FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "./ProductDetailPage.css";

function ProductDetailPage() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data.images && data.images.length > 0) setMainImage(data.images[0]);
        if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
        if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const formatPrice = (value) =>
    `SAR ${Number(value || 0).toLocaleString("en-US")}`;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (loading) {
    return (
      <section className="pd-page">
        <div className="container pd-container">
          <p className="pd-loading">Loading product...</p>
        </div>
      </section>
    );
  }

  if (!product || product.message) {
    return (
      <section className="pd-page">
        <div className="container pd-container">
          <p className="pd-loading">Product not found.</p>
          <Link to="/shop" className="pd-back">← Back to Shop</Link>
        </div>
      </section>
    );
  }

  const name = i18n.language === "ar" ? product.nameAr : product.nameEn;
  const description =
    i18n.language === "ar" ? product.descriptionAr : product.descriptionEn;
  const categoryName = product.category
    ? i18n.language === "ar"
      ? product.category.nameAr
      : product.category.nameEn
    : "";

  const hasPrice = product.price !== null && product.price !== undefined;
  const priceOnRequest =
    i18n.language === "ar" ? "السعر عند الطلب" : "Price on Request";
 const contactForPrice =
    i18n.language === "ar" ? "تواصل معنا للسعر" : "Contact for Price";

  const waNumber = "966565657191";
  const waMsg =
    i18n.language === "ar"
      ? `مرحباً! أود الاستفسار عن سعر: ${product.nameAr}`
      : `Hello! I would like to ask about the price of: ${product.nameEn}`;
  const waPriceLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;

  return (
    <section className="pd-page">
      <div className="container pd-container">
        <div className="pd-breadcrumb">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{" "}
          <span>{name}</span>
        </div>

        <div className="pd-layout">
          {/* Images */}
          <div className="pd-images">
            <div className="pd-main-image">
              {product.badge && (
                <span
                  className={`product-badge ${
                    product.badge === "SALE"
                      ? "product-badge-sale"
                      : "product-badge-new"
                  }`}
                >
                  {product.badge}
                </span>
              )}
              <img
                src={mainImage || "https://via.placeholder.com/600x600?text=Product"}
                alt={name}
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="pd-thumbs">
                {product.images.map((img) => (
                  <button
                    key={img}
                    className={`pd-thumb ${mainImage === img ? "active" : ""}`}
                    onClick={() => setMainImage(img)}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            {categoryName && (
              <Link
                to={`/category/${product.category.slug}`}
                className="pd-category"
              >
                {categoryName}
              </Link>
            )}
            <h1 className="pd-name">{name}</h1>

            <div className="pd-price">
              {hasPrice ? (
                <>
                  <span className="pd-price-current">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="pd-price-old">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </>
              ) : (
                <span className="pd-price-request">{priceOnRequest}</span>
              )}
            </div>

            <p className={`pd-stock ${product.inStock ? "in" : "out"}`}>
              {product.inStock ? "✓ In Stock" : "✕ Out of Stock"}
            </p>

            {description && <p className="pd-description">{description}</p>}

            {product.colors && product.colors.length > 0 && (
              <div className="pd-options">
                <span className="pd-options-label">Color:</span>
                <div className="pd-chips">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`pd-chip ${selectedColor === color ? "active" : ""}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="pd-options">
                <span className="pd-options-label">Size:</span>
                <div className="pd-chips">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`pd-chip ${selectedSize === size ? "active" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasPrice ? (
              <div className="pd-actions">
                <div className="pd-qty">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                    <FiMinus />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)}>
                    <FiPlus />
                  </button>
                </div>

                <button
                  className="pd-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <FiShoppingCart />
                  {added ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            ) : (
  <div className="pd-actions">
    <a
      href={waPriceLink}
      target="_blank"
      rel="noopener noreferrer"
      className="pd-cart-btn pd-contact-btn"
    >
      {contactForPrice}
    </a>
  </div>
)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;