import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "nl", label: "NL", nativeName: "Nederlands" },
  { code: "en", label: "EN", nativeName: "English" },
] as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.slice(0, 2) ?? "nl";

  return (
    <div
      className="lang-switcher"
      role="group"
      aria-label="Taal / Language"
    >
      {LANGUAGES.map(({ code, label, nativeName }) => (
        <button
          key={code}
          onClick={() => i18n.changeLanguage(code)}
          aria-pressed={currentLang === code}
          aria-label={nativeName}
          className={currentLang === code ? "lang-btn active" : "lang-btn"}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
