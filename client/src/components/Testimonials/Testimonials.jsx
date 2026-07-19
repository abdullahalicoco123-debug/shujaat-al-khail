import { useTranslation } from "react-i18next";
import { FiStar } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import "./Testimonials.css";

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: t("testimonial1Name"),
      role: t("testimonial1Role"),
      text: t("testimonial1Text"),
      rating: 5,
      initials: "AR",
    },
    {
      name: t("testimonial2Name"),
      role: t("testimonial2Role"),
      text: t("testimonial2Text"),
      rating: 4,
      initials: "SM",
    },
    {
      name: t("testimonial3Name"),
      role: t("testimonial3Role"),
      text: t("testimonial3Text"),
      rating: 4,
      initials: "KO",
    },
  ];

  return (
    <section className="testimonials">
      <div className="container testimonials-container">
        <div className="section-header">
          <h2 className="section-title">{t("ourClients")}</h2>
          <span className="section-divider"></span>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <FaQuoteRight className="testimonial-quote-icon" />

              <div className="testimonial-stars">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FiStar key={i} className="testimonial-star" />
                ))}
              </div>

              <p className="testimonial-text">{testimonial.text}</p>

              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.initials}</div>
                <div className="testimonial-author-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <span className="testimonial-role">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;