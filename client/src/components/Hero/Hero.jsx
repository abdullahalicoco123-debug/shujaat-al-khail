import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight } from "react-icons/fi";
import heroOffice from "../../assets/images/hero-image.jpg";
import heroHome from "../../assets/images/hero-home.jpg";
import heroSchool from "../../assets/images/hero-school.jpg";
import "./Hero.css";

const slideImages = [heroOffice, heroHome, heroSchool];

const Hero = () => {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = useCallback((index) => {
    setActiveSlide(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeSlide]);

  const n = activeSlide + 1;

  return (
    <section className="hero">
      {slideImages.map((image, index) => (
        <div
          key={index}
          className={`hero-image-layer ${
            index === activeSlide ? "hero-image-active" : ""
          }`}
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        ></div>
      ))}

      <div className="hero-container">
        <div className="hero-content" key={activeSlide}>
          <div className="hero-label">
            <span className="hero-label-line"></span>
            <span className="hero-label-text">{t(`heroSlide${n}Label`)}</span>
          </div>

          <h1 className="hero-title">
            {t(`heroSlide${n}Title`)}{" "}
            <span className="hero-title-gold">{t(`heroSlide${n}Gold`)}</span>
          </h1>

          <p className="hero-description">{t(`heroSlide${n}Desc`)}</p>

          <div className="hero-actions">
            <Link to="/shop" className="hero-btn hero-btn-primary">
              {t("shopNow")}
              <FiArrowRight className="hero-btn-icon" />
            </Link>
            <a href="#categories" className="hero-btn hero-btn-outline">
              {t("exploreCategories")}
            </a>
          </div>

          <div className="hero-indicators">
            {slideImages.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`hero-indicator ${
                  index === activeSlide ? "hero-indicator-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Slide ${index + 1}`}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;