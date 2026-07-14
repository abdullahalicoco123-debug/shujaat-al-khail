import { FiAward, FiTruck, FiDollarSign, FiHeadphones } from "react-icons/fi";
import whyImage from "../../assets/images/hero-image.jpg";
import "./WhyChooseUs.css";

const reasons = [
  {
    icon: <FiAward />,
    title: "Premium Quality",
    description:
      "Every piece is crafted from high-grade materials built to last for years.",
  },
  {
    icon: <FiTruck />,
    title: "Fast Delivery",
    description:
      "Quick and reliable delivery across the Kingdom, right to your door.",
  },
  {
    icon: <FiDollarSign />,
    title: "Competitive Pricing",
    description:
      "Factory-direct prices that give you premium furniture for less.",
  },
  {
    icon: <FiHeadphones />,
    title: "Dedicated Support",
    description:
      "Our team is here to help you before, during and after your purchase.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why">
      <div className="container why-container">
        <div className="why-image-side">
          <img src={whyImage} alt="Premium office furniture" className="why-image" />
          <div className="why-image-badge">
            <span className="why-badge-number">10+</span>
            <span className="why-badge-text">Years of Excellence</span>
          </div>
        </div>

        <div className="why-content-side">
          <div className="why-label">
            <span className="why-label-line"></span>
            <span className="why-label-text">Why Choose Us</span>
          </div>

          <h2 className="why-title">
            Furniture That Combines
            <span className="why-title-gold"> Style &amp; Function</span>
          </h2>

          <p className="why-intro">
            We deliver premium office and home furniture designed for comfort,
            durability and elegance — trusted by businesses and families across
            the Kingdom.
          </p>

          <div className="why-reasons">
            {reasons.map((reason, index) => (
              <div className="why-reason" key={index}>
                <div className="why-reason-icon">{reason.icon}</div>
                <div className="why-reason-text">
                  <h3 className="why-reason-title">{reason.title}</h3>
                  <p className="why-reason-desc">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;