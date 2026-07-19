import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiCheck } from "react-icons/fi";
import aboutImage from "../../assets/images/hero-home.jpg";
import "./About.css";

const About = () => {
  const { t } = useTranslation();

  const highlights = [
    t("aboutHighlight1"),
    t("aboutHighlight2"),
    t("aboutHighlight3"),
    t("aboutHighlight4"),
  ];

  return (
    <section className="about">
      <div className="container about-container">
        <div className="about-content-side">
          <div className="about-label">
            <span className="about-label-line"></span>
            <span className="about-label-text">{t("about")}</span>
          </div>

          <h2 className="about-title">
            {t("aboutTitle")}
            <span className="about-title-gold"> {t("aboutTitleGold")}</span>
          </h2>

          <p className="about-text">{t("aboutText1")}</p>
          <p className="about-text">{t("aboutText2")}</p>

          <ul className="about-highlights">
            {highlights.map((item, index) => (
              <li className="about-highlight" key={index}>
                <span className="about-highlight-icon">
                  <FiCheck />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Link to="/about" className="about-btn">
            {t("aboutBtn")}
          </Link>
        </div>

        <div className="about-image-side">
          <img src={aboutImage} alt="About Shuja'at Al-Khail" className="about-image" />
          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-number">500+</span>
              <span className="about-stat-label">{t("aboutStat1Label")}</span>
            </div>
            <div className="about-stat-divider"></div>
            <div className="about-stat">
              <span className="about-stat-number">1000+</span>
              <span className="about-stat-label">{t("aboutStat2Label")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;