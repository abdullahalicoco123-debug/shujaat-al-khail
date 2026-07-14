import { useState, useEffect, useCallback } from "react";
import { FiArrowRight } from "react-icons/fi";
import heroOffice from "../../assets/images/hero-image.jpg";
import heroHome from "../../assets/images/hero-home.jpg";
import heroSchool from "../../assets/images/hero-school.jpg";
import "./Hero.css";

const slides = [
  {
    image: heroOffice,
    label: "Office Furniture",
    titleLine1: "Where Productivity",
    titleMuted: "Meets ",
    titleGold: "Comfort",
    description:
      "Modern, stylish and ergonomic office furniture designed for focus and success.",
  },
  {
    image: heroHome,
    label: "Home Collection",
    titleLine1: "Comfort That",
    titleMuted: "Feels Like ",
    titleGold: "Home",
    description:
      "Elegant home furniture that brings warmth, style and function to every room.",
  },
  {
    image: heroSchool,
    label: "School Furniture",
    titleLine1: "Built for",
    titleMuted: "Learning ",
    titleGold: "Spaces",
    description:
      "Durable, comfortable school furniture designed for classrooms that inspire.",
  },
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = useCallback((index) => {
    setActiveSlide(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeSlide]);

  const current = slides[activeSlide];

  return (
    <section className="hero">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-image-layer ${
            index === activeSlide ? "hero-image-active" : ""
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden="true"
        ></div>
      ))}

      <div className="hero-container">
        <div className="hero-content" key={activeSlide}>
          <div className="hero-label">
            <span className="hero-label-line"></span>
            <span className="hero-label-text">{current.label}</span>
          </div>

          <h1 className="hero-title">
            {current.titleLine1}
            <br />
            <span className="hero-title-muted">{current.titleMuted}</span>
            <span className="hero-title-gold">{current.titleGold}</span>
          </h1>

          <p className="hero-description">{current.description}</p>

          <div className="hero-actions">
            <a href="#" className="hero-btn hero-btn-primary">
              Shop Now
              <FiArrowRight className="hero-btn-icon" />
            </a>
            <a href="#" className="hero-btn hero-btn-outline">
              Explore Categories
            </a>
          </div>

          <div className="hero-indicators">
            {slides.map((_, index) => (
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