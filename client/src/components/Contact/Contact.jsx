import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim())
      newErrors.message = "Message is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Contact Form Submitted:", formData);

    setIsSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="contact">
      <div className="container contact-container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <span className="section-divider"></span>
        </div>

        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info">
            <h3 className="contact-info-title">
              Contact Information
            </h3>

            <p className="contact-info-text">
              Have a question or need a quote? Reach out to us and our team
              will get back to you as soon as possible.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <FiMapPin />
                </div>

                <div>
                  <span className="contact-info-label">
                    Address
                  </span>

                  <span className="contact-info-value">
                    Riyadh, Saudi Arabia
                  </span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <FiPhone />
                </div>

                <div>
                  <span className="contact-info-label">
                    Phone
                  </span>

                  <a
                    href="tel:+966565657191"
                    className="contact-info-value"
                  >
                    +966 56 565 7191
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <FiMail />
                </div>

                <div>
                  <span className="contact-info-label">
                    Email
                  </span>

                  <a
                    href="mailto:info@shujaatfurnituresa.com"
                    className="contact-info-value"
                  >
                    info@shujaatfurnituresa.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <FiClock />
                </div>

                <div>
                  <span className="contact-info-label">
                    Working Hours
                  </span>

                  <span className="contact-info-value">
                    Sun – Thu: 9AM – 6PM
                  </span>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <a
                href="#"
                className="contact-social"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="contact-social"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="contact-social"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrap">
            {isSubmitted && (
              <div className="contact-success">
                Thank you! Your message has been received. We'll get back to
                you soon.
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-field">
                <label
                  htmlFor="name"
                  className="contact-field-label"
                >
                  Full Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`contact-input ${
                    errors.name ? "contact-input-error" : ""
                  }`}
                  placeholder="Enter your name"
                />

                {errors.name && (
                  <span className="contact-error">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="contact-field-row">
                <div className="contact-field">
                  <label
                    htmlFor="email"
                    className="contact-field-label"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`contact-input ${
                      errors.email ? "contact-input-error" : ""
                    }`}
                    placeholder="Enter your email"
                  />

                  {errors.email && (
                    <span className="contact-error">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="contact-field">
                  <label
                    htmlFor="phone"
                    className="contact-field-label"
                  >
                    Phone{" "}
                    <span className="contact-optional">
                      (optional)
                    </span>
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="contact-input"
                    placeholder="Enter your phone"
                  />
                </div>
              </div>

              <div className="contact-field">
                <label
                  htmlFor="message"
                  className="contact-field-label"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`contact-textarea ${
                    errors.message
                      ? "contact-input-error"
                      : ""
                  }`}
                  placeholder="How can we help you?"
                />

                {errors.message && (
                  <span className="contact-error">
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="contact-submit"
              >
                <FiSend className="contact-submit-icon" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;