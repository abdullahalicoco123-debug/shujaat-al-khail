import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

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

    if (!formData.name.trim()) {
      newErrors.name = t("nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("emailInvalid");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("messageRequired");
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({
          message: data.message || t("contactError"),
        });
      } else {
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
      }
    } catch {
      setErrors({
        message: t("serverError"),
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact">
      <div className="container contact-container">
        <div className="section-header">
          <h2 className="section-title">
            {t("getInTouch")}
          </h2>

          <span className="section-divider"></span>
        </div>

        <div className="contact-grid">
          {/* Contact Information */}

          <div className="contact-info">
            <h3 className="contact-info-title">
              {t("contactTitle")}
            </h3>

            <p className="contact-info-text">
              {t("contactText")}
            </p>

            <div className="contact-info-list">

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <FiMapPin />
                </div>

                <div>
                  <span className="contact-info-label">
                    {t("contactAddressLabel")}
                  </span>

                  <span className="contact-info-value">
                    {t("address")}
                  </span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <FiPhone />
                </div>

                <div>
                  <span className="contact-info-label">
                    {t("contactPhoneLabel")}
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
                    {t("contactEmailLabel")}
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
                    {t("contactHoursLabel")}
                  </span>

                  <span className="contact-info-value">
                    {t("contactHours")}
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
                href="https://www.instagram.com/shujaatalkhail/"
                target="_blank"
                rel="noopener noreferrer"
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
                {t("contactSuccess")}
              </div>
            )}

            {errors.message && (
              <div
                className="contact-error contact-form-error"
                role="alert"
              >
                {errors.message}
              </div>
            )}

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
                            <div className="contact-field">
                <label
                  htmlFor="name"
                  className="contact-field-label"
                >
                  {t("contactFullName")}
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
                  placeholder={t("contactNamePlaceholder")}
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
                    {t("contactEmail")}
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
                    placeholder={t("contactEmailPlaceholder")}
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
                    {t("contactPhone")}{" "}
                    <span className="contact-optional">
                      {t("contactOptional")}
                    </span>
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="contact-input"
                    placeholder={t("contactPhonePlaceholder")}
                  />
                </div>

              </div>

              <div className="contact-field">
                <label
                  htmlFor="message"
                  className="contact-field-label"
                >
                  {t("contactMessage")}
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
                  placeholder={t("contactMessagePlaceholder")}
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
                disabled={isSending}
              >
                <FiSend className="contact-submit-icon" />

                {isSending
                  ? t("contactSending")
                  : t("contactSend")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
            