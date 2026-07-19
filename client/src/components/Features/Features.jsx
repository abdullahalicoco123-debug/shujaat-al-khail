import { useTranslation } from "react-i18next";
import { FiAward, FiTruck, FiHeadphones } from "react-icons/fi";
import "./Features.css";

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FiAward />,
      title: t("featureQualityTitle"),
      description: t("featureQualityDesc"),
    },
    {
      icon: <FiTruck />,
      title: t("featureDeliveryTitle"),
      description: t("featureDeliveryDesc"),
    },
    {
      icon: <FiHeadphones />,
      title: t("featureSupportTitle"),
      description: t("featureSupportDesc"),
    },
  ];

  return (
    <section className="features">
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-item" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <div className="feature-text">
              <span className="feature-title">{feature.title}</span>
              <span className="feature-description">{feature.description}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;