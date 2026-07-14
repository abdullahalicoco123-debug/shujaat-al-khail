import { FiAward, FiTruck, FiHeadphones } from 'react-icons/fi';
import './Features.css';

const features = [
  {
    icon: <FiAward />,
    title: 'Premium Quality',
    description: 'High quality materials built to last',
  },
  {
    icon: <FiTruck />,
    title: 'Fast Delivery',
    description: 'Quick delivery across the Kingdom',
  },
  {
    icon: <FiHeadphones />,
    title: '24/7 Support',
    description: "We're here to help you anytime",
  },
];

const Features = () => {
  return (
    <section className="features">
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-item" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <div className="feature-text">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;