import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import "./CategoryPage.css";

function CategoryPage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5000/api/products?category=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        if (data.length > 0 && data[0].category) {
          setCategory(data[0].category);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((cats) => {
        const found = cats.find((c) => c.slug === slug);
        if (found) setCategory(found);
      })
      .catch(() => {});
  }, [slug]);

  const formatPrice = (value) =>
    i18n.language === "ar"
      ? `${value.toLocaleString("ar-SA")} ر.س`
      : `SAR ${value.toLocaleString("en-US")}`;

  const categoryName = category
    ? i18n.language === "ar"
      ? category.nameAr
      : category.nameEn
    : "";

  return (
    <section className="category-page">
      <div className="category-page-banner">
        <h1 className="category-page-title">{categoryName || "Collection"}</h1>
        <span className="section-divider"></span>
      </div>

      <div className="container category-page-container">
        {loading ? (
          <p className="category-page-empty">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="category-page-empty">
            No products in this collection yet. Check back soon!
          </p>
        ) : (
          <div className="featured-grid category-page-grid">
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
                  <span className="product-category">{categoryName}</span>
                  <h3 className="product-name">
                    {i18n.language === "ar" ? product.nameAr : product.nameEn}
                  </h3>

                  {typeof product.price === "number" && (
                    <div className="product-price">
                      <span className="product-price-current">
                        {formatPrice(product.price)}
                      </span>
                      {typeof product.oldPrice === "number" && (
                        <span className="product-price-old">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>
                  )}

                  {typeof product.price === "number" && (
                    <button className="product-cart-btn">
                      <FiShoppingCart className="product-cart-icon" />
                      Add to Cart
                    </button>
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

export default CategoryPage;
