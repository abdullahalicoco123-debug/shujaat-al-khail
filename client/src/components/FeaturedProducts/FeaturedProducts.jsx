import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import "./FeaturedProducts.css";

const FeaturedProducts = () => {
  const { i18n } = useTranslation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
   fetch("http://localhost:5000/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log("Error fetching products:", error));
  }, []);

  const formatPrice = (value) => `SAR ${value.toLocaleString("en-US")}`;

  return (
    <section className="featured">
      <div className="container featured-container">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <span className="section-divider"></span>
        </div>

        <div className="featured-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
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

                <button className="product-wishlist" aria-label="Add to wishlist">
                  <FiHeart />
                </button>

                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : "https://via.placeholder.com/400x400?text=Product"
                  }
                  alt={i18n.language === "ar" ? product.nameAr : product.nameEn}
                  className="product-image"
                />
              </div>

              <div className="product-info">
                <span className="product-category">
                  {product.category
                    ? i18n.language === "ar"
                      ? product.category.nameAr
                      : product.category.nameEn
                    : ""}
                </span>
                <h3 className="product-name">
                  {i18n.language === "ar" ? product.nameAr : product.nameEn}
                </h3>

                <div className="product-price">
                  <span className="product-price-current">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="product-price-old">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                <button className="product-cart-btn">
                  <FiShoppingCart className="product-cart-icon" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;