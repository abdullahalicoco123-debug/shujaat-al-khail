import "./TopBar.css";
import { useTranslation } from "react-i18next";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function TopBar() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
  };

  return (
    <div className="topbar">
      <div className="container topbar-container">

        <div className="topbar-left">
          <p>{t("welcome")}</p>
        </div>

        <div className="topbar-right">

          <a href="tel:+966565657191">
            <FaPhoneAlt />
            <span>+966 56 565 7191</span>
          </a>

          <a href="mailto:ali@shujaatfurnituresa.com">
            <FaEnvelope />
            <span>ali@shujaatfurnituresa.com</span>
          </a>

          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>

          <button className="lang-switch" onClick={toggleLanguage}>
            {i18n.language === "en" ? "العربية" : "English"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default TopBar;