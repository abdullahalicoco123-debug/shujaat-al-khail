import Contact from "../components/Contact/Contact";
import "./ContactPage.css";

function ContactPage() {
  return (
    <>
      <Contact />
      <section className="contact-map">
        <iframe
          title="Shuja'at Al-Khail Location"
          src="https://www.google.com/maps?output=embed&q=Al+Faisaliyyah%2C+Riyadh%2C+Saudi+Arabia&z=15"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a
          className="contact-map-link"
          href="https://www.google.com/maps/search/?api=1&query=Al+Faisaliyyah%2C+Riyadh%2C+Saudi+Arabia"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open location in Google Maps
        </a>
      </section>
    </>
  );
}

export default ContactPage;
