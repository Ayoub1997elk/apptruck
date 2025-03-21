// src/utils/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translations
const resources = {
  en: {
    translation: {
      login: "Login",
      email: "Email",
      password: "Password",
      email_required: "Email is required",
      password_required: "Password is required",
    },
  },
  fr: {
    translation: {
      login: "Connexion",
      email: "E-mail",
      password: "Mot de passe",
      email_required: "L'e-mail est requis",
      password_required: "Le mot de passe est requis",
    },
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;