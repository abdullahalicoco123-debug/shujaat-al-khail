import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

const phoneNumber = "966565657191";
const message = "Hello, I would like to know more about your furniture.";

function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      className="whatsapp-button"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}

export default WhatsAppButton;
