import "./TopBar.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-container">

        <div className="topbar-left">
          <p>
            Welcome to <span>Shuja'at Al-Khail</span> – Premium Office Furniture Solutions
          </p>
        </div>

        <div className="topbar-right">

          <a href="tel:+966565657191">
            <FaPhoneAlt />
            <span>+966 56 565 7191</span>
          </a>

          <a href="mailto:info@shujaatfurnituresa.com">
            <FaEnvelope />
            <span>@shujaatfurnituresa.com</span>
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

        </div>

      </div>
    </div>
  );
}

export default TopBar;