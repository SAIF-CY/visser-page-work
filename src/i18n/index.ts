import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import nlTranslation from "./locales/nl/translation.json";
import enTranslation from "./locales/en/translation.json";

const STORAGE_KEY = "i18nextLng";
const SUPPORTED = ["nl", "en"] as const;

function isSupported(code: string | null | undefined): code is "nl" | "en" {
  return !!code && (SUPPORTED as readonly string[]).includes(code);
}

// Holandês é sempre o primeiro render, porque é o idioma do HTML
// pré-renderizado que o GitHub Pages serve. Se o cliente já começasse em
// outro idioma, a hidratação do React falharia (#418), já que o HTML do
// servidor está sempre em NL.
//
// O idioma salvo pelo visitante é aplicado depois, em applyStoredLanguage().
i18n.use(initReactI18next).init({
  resources: {
    nl: { translation: nlTranslation },
    en: { translation: enTranslation },
  },
  lng: "nl",
  fallbackLng: "nl",
  supportedLngs: SUPPORTED,
  interpolation: {
    // React já escapa por padrão — desabilitar dupla-escapagem
    escapeValue: false,
  },
});

// Persiste a escolha do visitante para as próximas visitas.
i18n.on("languageChanged", (lng) => {
  if (typeof window === "undefined") return;
  const base = lng.slice(0, 2);
  if (isSupported(base)) window.localStorage.setItem(STORAGE_KEY, base);
});

let scheduled = false;

/**
 * Aplica o idioma escolhido pelo visitante, depois que a página terminou de
 * carregar (e, portanto, depois que o React hidratou o HTML estático).
 *
 * Detectar idioma pelo navegador não é usado: `navigator.languages` inclui o
 * idioma do sistema como último recurso (ex.: pt-BR -> [..., "en"]), o que
 * fazia visitantes não holandeses verem inglês sem querer.
 */
export function applyStoredLanguage(): void {
  if (typeof window === "undefined" || scheduled) return;

  const stored = window.localStorage.getItem(STORAGE_KEY)?.slice(0, 2);
  if (!isSupported(stored) || stored === i18n.language) return;

  scheduled = true;

  // O evento `load` só dispara depois que todos os scripts rodaram, o que
  // garante que a hidratação do React já terminou.
  const switchTo = () => void i18n.changeLanguage(stored);
  if (document.readyState === "complete") {
    switchTo();
  } else {
    window.addEventListener("load", switchTo, { once: true });
  }
}

export default i18n;
