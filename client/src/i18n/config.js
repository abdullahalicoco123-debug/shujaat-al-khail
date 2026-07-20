import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translations } from "./translations";

// 1. A saved choice always wins
const saved = localStorage.getItem("language");

// 2. Otherwise, follow the browser's language
const browserLang = (navigator.language || "en").toLowerCase();
const detected = browserLang.startsWith("ar") ? "ar" : "en";

const startLang = saved || detected;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translations.en },
    ar: { translation: translations.ar },
  },
  lng: startLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// Keep <html> in sync and remember the visitor's choice
const applyDirection = (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
};

applyDirection(startLang);

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
  applyDirection(lng);
});

export default i18n;