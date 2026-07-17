import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCatOpen, setIsMobileCatOpen] = useState(false);

  const categories = [
    "Office Furniture",
    "Lockers",
    "Dining Table",
    "Home Furniture",
    "Garden Furniture",
    "School Furniture",
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileCatOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src={logo} alt="Shuja'at Al-Khail" />
        </div>

        {/* Desktop Menu */}
        <nav className="navbar-menu">
          <Link className="active" to="/">
            {t("home")}
          </Link>

          <Link to="/shop">{t("shop")}</Link>

          <div
            className="navbar-dropdown"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <button type="button" className="navbar-dropdown-trigger">
              {t("categories")}
              <FaChevronDown className="dropdown-icon" />
            </button>

            {isCategoriesOpen && (
              <div className="navbar-dropdown-menu">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/category/${category.toLowerCase().replaceAll(" ", "-")}`}
                    className="navbar-dropdown-item"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/about">{t("about")}</Link>

          <Link to="/contact">{t("contact")}</Link>
        </nav>

        {/* Right Side */}
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

          <button className="icon-btn badge">
            <FaShoppingCart />
            <span>0</span>
          </button>

          <button className="quote-btn">{t("getQuote")}</button>

          <button
            className="hamburger-btn"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="navbar-search">
          <div className="container navbar-search-container">
            <form
              className="navbar-search-form"
              onSubmit={handleSearchSubmit}
            >
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

      {/* Mobile Menu */}
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
            type="button"
            className="mobile-menu-link mobile-cat-trigger"
            onClick={() => setIsMobileCatOpen((prev) => !prev)}
          >
            {t("categories")}
            <FaChevronDown
              className={`mobile-cat-icon ${
                isMobileCatOpen ? "rotated" : ""
              }`}
            />
          </button>

          {isMobileCatOpen && (
            <div className="mobile-cat-list">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${category.toLowerCase().replaceAll(" ", "-")}`}
                  className="mobile-cat-item"
                  onClick={closeMobileMenu}
                >
                  {category}
                </Link>
              ))}
            </div>
          )}

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

          <button
            className="mobile-quote-btn"
            onClick={closeMobileMenu}
          >
            {t("getQuote")}
          </button>
        </nav>
      )}
    </header>
  );
}

export default Navbar;