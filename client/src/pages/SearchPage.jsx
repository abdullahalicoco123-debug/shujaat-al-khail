import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "./ShopPage.css";
import "./SearchPage.css";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { i18n } = useTranslation();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState(query);

  useEffect(() => {
    setInput(query);
    if (!query) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = input.trim();
    if (!term) return;
    setSearchParams({ q: term });
  };

  const isArabic = i18n.language === "ar";
  const hasPrice = (p) => p.price !== null && p.price !== undefined;
  const formatPrice = (value) =>
    `SAR ${Number(value || 0).toLocaleString("en-US")}`;
  const priceOnRequest = isArabic ? "السعر عند الطلب" : "Price on Request";
  const contactForPrice = isArabic ? "تواصل معنا للسعر" : "Contact for Price";

  const waNumber = "966565657191";
  const waPriceLink = (product) => {
    const msg = isArabic
      ? `مرحباً! أود الاستفسار عن سعر: ${product.nameAr}`
      : `Hello! I would like to ask about the price of: ${product.nameEn}`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="shop-page">
      <div className="shop-banner">
        <h1 className="shop-title">{isArabic ? "البحث" : "Search"}</h1>
        <span className="section-divider"></span>
      </div>

      <div className="container shop-container">
        <form className="search-bar" onSubmit={handleSubmit}>
          <FiSearch className="search-bar-icon" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isArabic ? "ابحث عن الأثاث..." : "Search for furniture..."}
          />
          <button type="submit">{isArabic ? "بحث" : "Search"}</button>
        </form>

        {query && !loading && (
          <p className="search-count">
            {products.length}{" "}
            {isArabic
              ? `نتيجة للبحث عن "${query}"`
              : `result${products.length === 1 ? "" : "s"} for "${query}"`}
          </p>
        )}

        {loading ? (
          <p className="shop-empty">{isArabic ? "جاري البحث..." : "Searching..."}</p>
        ) : !query ? (
          <p className="shop-empty">
            {isArabic
              ? "اكتب كلمة للبحث عن المنتجات."
              : "Type something above to search our products."}
          </p>
        ) : products.length === 0 ? (
          <div className="search-none">
            <p className="shop-empty">
              {isArabic
                ? `لم نجد أي منتج يطابق "${query}".`
                : `No products matched "${query}".`}
            </p>
            <Link to="/shop" className="search-browse-btn">
              {isArabic ? "تصفح كل المنتجات" : "Browse All Products"}
            </Link>
          </div>
        ) : (
          <div className="featured-grid shop-grid">
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
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={
                        product.images && product.images.length > 0
                          ? product.images[0]
                          : "https://via.placeholder.com/400x400?text=Product"
                      }
                      alt={isArabic ? product.nameAr : product.nameEn}
                      className="product-image"
                    />
                  </Link>
                </div>

                <div className="product-info">
                  <span className="product-category">
                    {product.category
                      ? isArabic
                        ? product.category.nameAr
                        : product.category.nameEn
                      : ""}
                  </span>
                  <Link to={`/product/${product._id}`} className="product-name-link">
                    <h3 className="product-name">
                      {isArabic ? product.nameAr : product.nameEn}
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
                      <span className="product-price-request">{priceOnRequest}</span>
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

export default SearchPage;