/**
 * Configuração de SEO do site.
 *
 * Para trocar o domínio de produção (por exemplo, ao migrar para um `.nl`),
 * defina a variável de ambiente `VITE_SITE_URL` no Vercel e no GitHub Actions.
 * O `vite.config.ts` usa a mesma variável para gerar `robots.txt` e `sitemap.xml`.
 */

const FALLBACK_URL = "https://visser-page-work.vercel.app";

const configuredUrl = import.meta.env["VITE_SITE_URL"] as string | undefined;

/** URL canônica, sem barra no final. */
export const SITE_URL = (
  configuredUrl && configuredUrl.trim() ? configuredUrl.trim() : FALLBACK_URL
).replace(/\/+$/, "");

/** Monta uma URL absoluta a partir de um caminho. */
export function absoluteUrl(pathname = "/"): string {
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

/**
 * Dados reais da empresa, usados no JSON-LD.
 *
 * Só entram aqui informações confirmadas. Endereço, região de atendimento e
 * redes sociais ficam de fora enquanto o proprietário não informar — inventar
 * esses dados prejudica o SEO local e viola as regras do projeto.
 */
export const BUSINESS = {
  name: "Visser",
  telephone: "+31617668610",
  email: "johanvisser934@gmail.com",
  country: "NL",
  languages: ["nl", "en"],
} as const;

/** Gera o schema.org do tipo GeneralContractor. */
export function buildOrganizationSchema(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    url: SITE_URL,
    image: absoluteUrl("/og-image.jpg"),
    logo: absoluteUrl("/apple-touch-icon.png"),
    description,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: BUSINESS.country,
    },
    knowsLanguage: BUSINESS.languages,
    // TODO: adicionar `areaServed` e `address` completo assim que a região de
    // atendimento e o endereço reais forem informados.
  };
}
