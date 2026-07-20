import "./LegalPage.css";

function PrivacyPage() {
  return (
    <section className="legal-page">
      <div className="legal-banner">
        <h1 className="legal-title">Privacy Policy</h1>
        <span className="section-divider"></span>
      </div>

      <div className="container legal-container">
        <p className="legal-updated">Last updated: July 2026</p>

        <p className="legal-intro">
          Shuja'at Al-Khail ("we", "us", "our") respects your privacy. This
          policy explains what information we collect when you use our website,
          why we collect it, and how we protect it.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We only collect information you provide directly to us:</p>
        <ul>
          <li>
            <strong>When you place an order:</strong> your name, phone number,
            delivery address, city, and optionally your email address and any
            order notes you add.
          </li>
          <li>
            <strong>When you contact us:</strong> your name, email address,
            phone number (optional), and the content of your message.
          </li>
          <li>
            <strong>When you contact us on WhatsApp:</strong> your WhatsApp
            number and the messages you send, handled according to WhatsApp's
            own privacy policy.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> collect or store any payment card or bank
          details. All orders are paid by cash on delivery.
        </p>
        <p>
          You do not need to create an account to shop with us, so we do not
          store customer passwords.
        </p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To process, confirm, and deliver your order</li>
          <li>To contact you about your order or delivery</li>
          <li>To answer your questions and quote requests</li>
          <li>To keep records of completed sales</li>
        </ul>
        <p>
          We do not use your information for automated marketing, and we do not
          sell or rent your data to anyone.
        </p>

        <h2>3. Sharing Your Information</h2>
        <p>
          We share your information only where necessary to run the business:
          with delivery personnel (name, address, and phone number, so your
          order can reach you), and with the service providers that operate our
          website, such as our hosting provider, database provider, image
          hosting service, and email service. These providers process data on
          our behalf and are not permitted to use it for their own purposes.
        </p>
        <p>
          We may also disclose information where required by the laws of the
          Kingdom of Saudi Arabia or by a lawful request from a competent
          authority.
        </p>

        <h2>4. Cookies and Local Storage</h2>
        <p>
          Our website does not use advertising or tracking cookies. We store a
          small amount of data in your browser to make the site work:
        </p>
        <ul>
          <li>The contents of your shopping cart</li>
          <li>Your language preference (English or Arabic)</li>
        </ul>
        <p>
          This information stays on your device, is never sent to third parties,
          and you can clear it at any time through your browser settings.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We take reasonable technical measures to protect your information,
          including encrypted connections and restricted, password-protected
          access to our order records. No method of transmission over the
          internet is completely secure, so we cannot guarantee absolute
          security, but we work to protect your data at all times.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We keep order records for as long as necessary to fulfil orders,
          handle any after-sales matters, and meet our legal and accounting
          obligations. Contact form messages are kept only as long as needed to
          respond to your enquiry.
        </p>

        <h2>7. Your Rights</h2>
        <p>
          You may ask us to confirm what personal information we hold about you,
          correct it if it is inaccurate, or delete it where we are not required
          to keep it. To make a request, contact us using the details below. We
          may need to verify your identity before acting on a request.
        </p>

        <h2>8. Children's Privacy</h2>
        <p>
          Our website is intended for adults. We do not knowingly collect
          personal information from children. If you believe a child has
          provided us with information, please contact us and we will remove it.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Any changes will be
          posted on this page with a revised "last updated" date.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          For any question about this policy or your personal information,
          contact us at:
        </p>
        <ul>
          <li>Email: info@shujaatfurnituresa.com</li>
          <li>Phone: +966 56 565 7191</li>
          <li>Address: Al Faisaliyyah, Riyadh, Saudi Arabia</li>
        </ul>
      </div>
    </section>
  );
}

export default PrivacyPage;