import { useTranslation } from "react-i18next";
import { FiAward, FiTruck, FiDollarSign, FiHeadphones } from "react-icons/fi";
import whyImage from "../../assets/images/hero-image.jpg";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const reasons = [
    { icon: <FiAward />, title: t("whyReason1Title"), description: t("whyReason1Desc") },
    { icon: <FiTruck />, title: t("whyReason2Title"), description: t("whyReason2Desc") },
    { icon: <FiDollarSign />, title: t("whyReason3Title"), description: t("whyReason3Desc") },
    { icon: <FiHeadphones />, title: t("whyReason4Title"), description: t("whyReason4Desc") },
  ];

  return (
    <section className="why">
      <div className="container why-container">
        <div className="why-image-side">
          <img src={whyImage} alt="Premium office furniture" className="why-image" />
          <div className="why-image-badge">
            <span className="why-badge-number">10+</span>
            <span className="why-badge-text">{t("whyBadgeText")}</span>
          </div>
        </div>

        <div className="why-content-side">
          <div className="why-label">
            <span className="why-label-line"></span>
            <span className="why-label-text">{t("whyChooseUs")}</span>
          </div>

          <h2 className="why-title">
            {t("whyTitle")}
            <span className="why-title-gold"> {t("whyTitleGold")}</span>
          </h2>

          <p className="why-intro">{t("whyIntro")}</p>

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