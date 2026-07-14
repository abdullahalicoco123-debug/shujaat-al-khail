import "./LegalPage.css";

function PrivacyPage() {
  return (
    <section className="legal-page">
      <div className="container legal-container">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last updated: [Date]</p>

        <div className="legal-content">
          <p className="legal-placeholder-note">
            [ This is placeholder content. Replace with your actual Privacy
            Policy provided by the client / legal advisor. ]
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, place an order, or contact us.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to process orders, communicate with
            you, and improve our services.
          </p>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share it with
            service providers who help us operate our business.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at
            info@shujaatfurnituresa.com.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPage;