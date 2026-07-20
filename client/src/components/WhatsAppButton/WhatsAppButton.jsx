import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

// Add more numbers here when the client provides them.
// Format: country code + number, no + and no spaces.
const contacts = [
  {
    label: "Shuja'at Al-Khail",
    number: "966565657191",
    message: "Hello! I'm interested in your furniture.",
  },
  // {
  //   label: "Support",
  //   number: "9665XXXXXXXX",
  //   message: "Hello!",
  // },
];

function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const buildLink = (contact) =>
    `https://wa.me/${contact.number}?text=${encodeURIComponent(
      contact.message
    )}`;

  // If there is only one contact, open WhatsApp directly.
  if (contacts.length === 1) {
    return (
      <a
        className="wa-float"
        href={buildLink(contacts[0])}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    );
  }

  return (
    <div className="wa-wrap">
      {open && (
        <div className="wa-panel">
          {contacts.map((contact) => (
            <a
              key={contact.number}
              href={buildLink(contact)}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-option"
              onClick={() => setOpen(false)}
            >
              <FaWhatsapp />
              <span>{contact.label}</span>
            </a>
          ))}
        </div>
      )}

      <button
        className="wa-float"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="WhatsApp contact options"
      >
        <FaWhatsapp />
      </button>
    </div>
  );
}

export default WhatsAppButton;