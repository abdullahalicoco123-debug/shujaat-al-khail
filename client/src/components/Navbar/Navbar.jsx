import { Link } from "react-router-dom";
import { useState } from "react";
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
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCatOpen, setIsMobileCatOpen] = useState(false);

  const categories = [
    "Office Furniture",
    "Dining Table",
    "Chairs",
    "Home Furniture",
    "School Furniture",
    "Lockers",
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

        {/* Desktop Navigation */}
        <nav className="navbar-menu">
          <Link className="active" to="/">
            HOME
          </Link>

          <Link to="/shop">SHOP</Link>

          <div
            className="navbar-dropdown"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <a href="#" className="navbar-dropdown-trigger">
              CATEGORIES
              <FaChevronDown className="dropdown-icon" />
            </a>

            {isCategoriesOpen && (
              <div className="navbar-dropdown-menu">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    href="#"
                    className="navbar-dropdown-item"
                  >
                    {category}
                  </a>
                ))}
              </div>
            )}
          </div>

          <Link to="/about">ABOUT US</Link>

          <Link to="/contact">CONTACT US</Link> 
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

          <button className="quote-btn">
            GET A QUOTE
          </button>

          {/* Hamburger (Mobile Only) */}
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
                placeholder="Search for furniture..."
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
          <Link to="/" className="mobile-menu-link active" onClick={closeMobileMenu}>
            HOME
          </Link>

          <Link to="/shop" className="mobile-menu-link" onClick={closeMobileMenu}>
            SHOP
          </Link>     

          <button
            className="mobile-menu-link mobile-cat-trigger"
            onClick={() => setIsMobileCatOpen((prev) => !prev)}
          >
            CATEGORIES

            <FaChevronDown
              className={`mobile-cat-icon ${
                isMobileCatOpen ? "rotated" : ""
              }`}
            />
          </button>

          {isMobileCatOpen && (
            <div className="mobile-cat-list">
              {categories.map((category, index) => (
                <a
                  key={index}
                  href="#"
                  className="mobile-cat-item"
                  onClick={closeMobileMenu}
                >
                  {category}
                </a>
              ))}
            </div>
          )}

          <Link to="/about" className="mobile-menu-link" onClick={closeMobileMenu}>
            ABOUT US
          </Link>
         <Link to="/contact" className="mobile-menu-link" onClick={closeMobileMenu}>
            CONTACT US
          </Link>

          <button
            className="mobile-quote-btn"
            onClick={closeMobileMenu}
          >
            GET A QUOTE
          </button>
        </nav>
      )}
    </header>
  );
}

export default Navbar;