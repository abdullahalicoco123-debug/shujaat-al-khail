import Contact from "../components/Contact/Contact";
import "./ContactPage.css";

function ContactPage() {
  return (
    <>
      <Contact />
      <section className="contact-map">
        <iframe
          title="Shuja'at Al-Khail Location"
        src="https://www.google.com/maps?q=24.6344528,46.7742259&z=17&output=embed"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </section>
    </>
  );
}

export default ContactPage;