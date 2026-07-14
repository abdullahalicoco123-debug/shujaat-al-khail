import { FiStar } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Ahmed Al-Rashid",
    role: "Office Manager, Riyadh",
    rating: 5,
    text: "The quality of the executive desks we ordered exceeded our expectations. Delivery was fast and the team was professional throughout.",
    initials: "AR",
  },
  {
    name: "Sarah Al-Mutairi",
    role: "Interior Designer, Jeddah",
    rating: 5,
    text: "Beautiful furniture with excellent craftsmanship. My clients are always impressed with the pieces I source from Shuja'at Al-Khail.",
    initials: "SM",
  },
  {
    name: "Khalid Al-Otaibi",
    role: "Business Owner, Dammam",
    rating: 5,
    text: "We furnished our entire office and couldn't be happier. Great prices, premium quality, and reliable service. Highly recommended.",
    initials: "KO",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container testimonials-container">
        <div className="section-header">
          <h2 className="section-title">What Our Clients Say</h2>
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