import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "./ShopPage.css";

function ShopPage() {
  const { i18n } = useTranslation();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  const hasPrice = (product) =>
    product.price !== null && product.price !== undefined;

  const formatPrice = (value) =>
    `SAR ${Number(value).toLocaleString("en-US")}`;

  const priceOnRequest =
    i18n.language === "ar"
      ? "السعر عند الطلب"
      : "Price on Request";

  const contactForPrice =
    i18n.language === "ar"
      ? "تواصل معنا للسعر"
      : "Contact for Price";

  const waNumber = "966565657191";

  const waPriceLink = (product) => {
    const message =
      i18n.language === "ar"
        ? `مرحباً! أود الاستفسار عن سعر: ${product.nameAr}`
        : `Hello! I would like to ask about the price of: ${product.nameEn}`;

    return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  };

  const filteredProducts =
    activeCat === "all"
      ? products
      : products.filter(
          (product) =>
            product.category &&
            product.category.slug === activeCat
        );

  return (
    <section className="shop-page">
      <div className="shop-banner">
        <h1 className="shop-title">Shop</h1>
        <span className="section-divider"></span>
      </div>

      <div className="container shop-container">

        <div className="shop-filters">
          <button
            className={`shop-filter ${
              activeCat === "all" ? "active" : ""
            }`}
            onClick={() => setActiveCat("all")}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              className={`shop-filter ${
                activeCat === cat.slug ? "active" : ""
              }`}
              onClick={() => setActiveCat(cat.slug)}
            >
              {i18n.language === "ar"
                ? cat.nameAr
                : cat.nameEn}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="shop-empty">
            Loading products...
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="shop-empty">
            No products found in this category.
          </p>
        ) : (
          <div className="featured-grid shop-grid">
            {filteredProducts.map((product) => (
              <div
                className="product-card"
                key={product._id}
              >
                <div className="product-image-wrap">

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

                  <button
                    className="product-wishlist"
                    aria-label="Add to wishlist"
                  >
                    <FiHeart />
                  </button>

                  <Link to={`/product/${product._id}`}>
                    <img
                      src={
                        product.images &&
                        product.images.length > 0
                          ? product.images[0]
                          : "https://via.placeholder.com/400x400?text=Product"
                      }
                      alt={
                        i18n.language === "ar"
                          ? product.nameAr
                          : product.nameEn
                      }
                      className="product-image"
                    />
                  </Link>
                </div>

                <div className="product-info">

                  <span className="product-category">
                    {product.category
                      ? i18n.language === "ar"
                        ? product.category.nameAr
                        : product.category.nameEn
                      : ""}
                  </span>

                  <Link
                    to={`/product/${product._id}`}
                    className="product-name-link"
                  >
                    <h3 className="product-name">
                      {i18n.language === "ar"
                        ? product.nameAr
                        : product.nameEn}
                    </h3>
                  </Link>

                  <div className="product-price">
                    {hasPrice(product) ? (
                      <>
                        <span className="product-price-current">
                          {formatPrice(product.price)}
                        </span>

                        {product.oldPrice && (
                          <span className="product-price-old">
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="product-price-request">
                        {priceOnRequest}
                      </span>
                    )}
                  </div>

                  {hasPrice(product) ? (
                    <button
                      className="product-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      <FiShoppingCart className="product-cart-icon" />
                      Add to Cart
                    </button>
                  ) : (
                    <a
                      href={waPriceLink(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="product-cart-btn product-contact-btn"
                    >
                      {contactForPrice}
                    </a>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ShopPage;