import Contact from "../components/Contact/Contact";
import "./ContactPage.css";

function ContactPage() {
  return (
    <>
      <Contact />
      <section className="contact-map">
        <iframe
          title="Shuja'at Al-Khail Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.963185114452!2d46.769354978279765!3d24.634457597760658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f075ccd0b5ac7%3A0x8c973ec64c0761d3!2z2LTYsdmD2Kkg2LTYrNin2LnYqSDYp9mE2K7ZitmE!5e1!3m2!1sen!2s!4v1784533825101!5m2!1sen!2s"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </section>
    </>
  );
}

export default ContactPage;