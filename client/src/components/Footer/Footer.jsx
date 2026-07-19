import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiMapPin, FiPhone, FiMail, FiChevronRight } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../../assets/logo/logo.png";
import "./Footer.css";

const quickLinks = [
  { key: "home", path: "/" },
  { key: "shop", path: "/shop" },
  { key: "gallery", path: "/gallery" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
];

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const currentYear = new Date().getFullYear();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-col footer-about">
            <img src={logo} alt="Shuja'at Al-Khail" className="footer-logo" />
            <p className="footer-desc">{t("footerDesc")}</p>
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

          <div className="footer-col">
            <h4 className="footer-title">{t("quickLinks")}</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link to={link.path} className="footer-link">
                    <FiChevronRight className="footer-link-icon" />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">{t("categories")}</h4>
            <ul className="footer-links">
              {categories.map((category) => (
                <li key={category._id}>
                  <Link to={`/category/${category.slug}`} className="footer-link">
                    <FiChevronRight className="footer-link-icon" />
                    {isArabic ? category.nameAr : category.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">{t("contact")}</h4>
            <ul className="footer-contact">
              <li className="footer-contact-item">
                <FiMapPin className="footer-contact-icon" />
                <span>{t("address")}</span>
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
            © {currentYear} Shuja'at Al-Khail. {t("rightsReserved")}
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy">{t("privacyPolicy")}</Link>
            <span className="footer-bottom-divider">|</span>
            <Link to="/terms">{t("termsConditions")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;