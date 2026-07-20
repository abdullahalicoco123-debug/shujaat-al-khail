import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";
import logo from "../../assets/logo/logo.png";

import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaChevronDown,
  FaTimes,
  FaBars,
} from "react-icons/fa";

function Navbar() {
  const { t, i18n } = useTranslation();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCatOpen, setIsMobileCatOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const dropdownRef = useRef(null);

  const isArabic = i18n.language === "ar";
  const quoteMessage = isArabic
    ? "مرحباً! أود الحصول على عرض سعر لطلب كمية."
    : "Hello! I would like to request a quote for a bulk order.";
  const quoteLink = `https://wa.me/966565657191?text=${encodeURIComponent(quoteMessage)}`;

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const term = searchQuery.trim();
    if (!term) return;
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileCatOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Shuja'at Al-Khail" />
          </Link>
        </div>

        <nav className="navbar-menu">
          <Link className="active" to="/">
            {t("home")}
          </Link>

          <Link to="/shop">{t("shop")}</Link>

          <div className="navbar-dropdown" ref={dropdownRef}>
            <button
              type="button"
              className="navbar-dropdown-trigger"
              onClick={() => setIsCategoriesOpen((prev) => !prev)}
              aria-expanded={isCategoriesOpen}
            >
              {t("categories")}
              <FaChevronDown
                className={`dropdown-icon ${isCategoriesOpen ? "rotated" : ""}`}
              />
            </button>

            {isCategoriesOpen && (
              <div className="navbar-dropdown-menu">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    to={`/category/${cat.slug}`}
                    className="navbar-dropdown-item"
                    onClick={() => setIsCategoriesOpen(false)}
                  >
                    {isArabic ? cat.nameAr : cat.nameEn}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/gallery">{t("gallery")}</Link>

          <Link to="/about">{t("about")}</Link>

          <Link to="/contact">{t("contact")}</Link>
        </nav>

        <div className="navbar-right">
          <button
            className="icon-btn"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Search"
          >
            <FaSearch />
          </button>

          <button className="icon-btn badge">
            <FaHeart />
            <span>0</span>
          </button>

          <button className="icon-btn badge" onClick={() => navigate("/cart")}>
            <FaShoppingCart />
            <span>{cartCount}</span>
          </button>

          <a
            href={quoteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="quote-btn"
          >
            {t("getQuote")}
          </a>

          <button
            className="hamburger-btn"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <div className="navbar-search">
          <div className="container navbar-search-container">
            <form className="navbar-search-form" onSubmit={handleSearchSubmit}>
              <FaSearch className="navbar-search-icon" />
              <input
                type="text"
                className="navbar-search-input"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                className="navbar-search-close"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <FaTimes />
              </button>
            </form>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <nav className="mobile-menu">
          <Link
            to="/"
            className="mobile-menu-link active"
            onClick={closeMobileMenu}
          >
            {t("home")}
          </Link>

          <Link
            to="/shop"
            className="mobile-menu-link"
            onClick={closeMobileMenu}
          >
            {t("shop")}
          </Link>

          <button
            className="mobile-menu-link mobile-cat-trigger"
            onClick={() => setIsMobileCatOpen((prev) => !prev)}
          >
            {t("categories")}
            <FaChevronDown
              className={`mobile-cat-icon ${isMobileCatOpen ? "rotated" : ""}`}
            />
          </button>

          {isMobileCatOpen && (
            <div className="mobile-cat-list">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/category/${cat.slug}`}
                  className="mobile-cat-item"
                  onClick={closeMobileMenu}
                >
                  {isArabic ? cat.nameAr : cat.nameEn}
                </Link>
              ))}
            </div>
          )}

          <Link
            to="/gallery"
            className="mobile-menu-link"
            onClick={closeMobileMenu}
          >
            {t("gallery")}
          </Link>

          <Link
            to="/about"
            className="mobile-menu-link"
            onClick={closeMobileMenu}
          >
            {t("about")}
          </Link>

          <Link
            to="/contact"
            className="mobile-menu-link"
            onClick={closeMobileMenu}
          >
            {t("contact")}
          </Link>

          <a
            href={quoteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-quote-btn"
            onClick={closeMobileMenu}
          >
            {t("getQuote")}
          </a>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
