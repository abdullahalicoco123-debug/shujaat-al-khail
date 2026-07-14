import "./LegalPage.css";

function TermsPage() {
  return (
    <section className="legal-page">
      <div className="container legal-container">
        <h1 className="legal-title">Terms &amp; Conditions</h1>
        <p className="legal-updated">Last updated: [Date]</p>

        <div className="legal-content">
          <p className="legal-placeholder-note">
            [ This is placeholder content. Replace with your actual Terms &amp;
            Conditions provided by the client / legal advisor. ]
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound
            by these Terms &amp; Conditions.
          </p>

          <h2>2. Products &amp; Pricing</h2>
          <p>
            All prices are listed in Saudi Riyal (SAR) and are subject to change
            without notice. We strive to display accurate product information.
          </p>

          <h2>3. Orders</h2>
          <p>
            All orders are subject to acceptance and availability. We reserve the
            right to refuse or cancel any order.
          </p>

          <h2>4. Delivery</h2>
          <p>
            Delivery times are estimates. We are not liable for delays outside our
            control.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            For questions about these Terms, please contact us at
            info@shujaatfurnituresa.com.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TermsPage;