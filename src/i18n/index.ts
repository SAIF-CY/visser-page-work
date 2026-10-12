import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import nlTranslation from "./locales/nl/translation.json";
import enTranslation from "./locales/en/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      nl: { translation: nlTranslation },
      en: { translation: enTranslation },
    },
    // Holandês é o idioma padrão (mercado-alvo)
    fallbackLng: "nl",
    supportedLngs: ["nl", "en"],
    detection: {
      // 1. Verifica localStorage (escolha anterior do usuário)
      // 2. Verifica idioma do navegador
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      // React já escapa por padrão — desabilitar dupla-escapagem
      escapeValue: false,
    },
  });

export default i18n;
