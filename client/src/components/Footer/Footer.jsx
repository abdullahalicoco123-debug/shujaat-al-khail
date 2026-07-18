import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiMapPin, FiPhone, FiMail, FiChevronRight } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../../assets/logo/logo.png";
import "./Footer.css";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

const Footer = () => {
  const { i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Company */}
          <div className="footer-col footer-about">
            <img src={logo} alt="Shuja'at Al-Khail" className="footer-logo" />
            <p className="footer-desc">
              Premium office and home furniture solutions in Saudi Arabia.
              Crafting comfort, style and durability for every space.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook" className="footer-social">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Instagram" className="footer-social">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn" className="footer-social">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    <FiChevronRight className="footer-link-icon" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories — now from the database */}
          <div className="footer-col">
            <h4 className="footer-title">Categories</h4>
            <ul className="footer-links">
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="footer-link"
                  >
                    <FiChevronRight className="footer-link-icon" />
                    {i18n.language === "ar" ? category.nameAr : category.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-contact">
              <li className="footer-contact-item">
                <FiMapPin className="footer-contact-icon" />
                 <span>Al Faisaliyyah, Riyadh, Saudi Arabia</span>
              </li>
              <li className="footer-contact-item">
                <FiPhone className="footer-contact-icon" />
                <a href="tel:+966565657191">+966 56 565 7191</a>
              </li>
              <li className="footer-contact-item">
                <FiMail className="footer-contact-icon" />
                <a href="mailto:info@shujaatfurnituresa.com">
                  info@shujaatfurnituresa.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="footer-copyright">
            © {currentYear} Shuja'at Al-Khail. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="footer-bottom-divider">|</span>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;