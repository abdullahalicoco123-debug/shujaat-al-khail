import { FiCheck } from "react-icons/fi";
import aboutImage from "../../assets/images/hero-home.jpg";
import "./About.css";

const highlights = [
  "Premium quality craftsmanship",
  "Wide range of office & home furniture",
  "Trusted by businesses across the Kingdom",
  "Custom solutions for every space",
];

const About = () => {
  return (
    <section className="about">
      <div className="container about-container">
        <div className="about-content-side">
          <div className="about-label">
            <span className="about-label-line"></span>
            <span className="about-label-text">About Us</span>
          </div>

          <h2 className="about-title">
            Crafting Comfort &amp; Elegance for
            <span className="about-title-gold"> Every Space</span>
          </h2>

          <p className="about-text">
            Shuja'at Al-Khail is a leading provider of premium office and home
            furniture in Saudi Arabia. We believe great furniture is where
            comfort meets design — helping businesses and families create spaces
            that inspire productivity and relaxation.
          </p>

          <p className="about-text">
            From executive offices to modern homes, schools and secure storage,
            our carefully curated collections blend quality materials, timeless
            style and lasting durability.
          </p>

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

          <a href="#" className="about-btn">
            Learn More About Us
          </a>
        </div>

        <div className="about-image-side">
          <img src={aboutImage} alt="About Shuja'at Al-Khail" className="about-image" />
          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-number">500+</span>
              <span className="about-stat-label">Happy Clients</span>
            </div>
            <div className="about-stat-divider"></div>
            <div className="about-stat">
              <span className="about-stat-number">1000+</span>
              <span className="about-stat-label">Products</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;