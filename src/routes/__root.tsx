import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { Analytics } from "@vercel/analytics/react";

import appCss from "../styles.css?url";
import i18nInstance, { applyStoredLanguage } from "../i18n";
import nlTranslation from "../i18n/locales/nl/translation.json";
import { absoluteUrl, buildOrganizationSchema } from "../seo/site";

// Metadados de SEO em holandês — o idioma do HTML pré-renderizado e o padrão
// do site. Usamos o JSON direto (em vez de i18n.t) para garantir o texto certo
// no HTML do servidor mesmo antes da inicialização do i18next.
const SEO_TITLE = nlTranslation.meta.title;
const SEO_DESCRIPTION = nlTranslation.meta.description;

// BASE_URL respeita o subpath do GitHub Pages (/visser-page-work/), enquanto
// canonical, og:url e sitemap usam sempre a URL canônica absoluta.
const BASE_PATH = import.meta.env.BASE_URL ?? "/";
const assetPath = (file: string) => `${BASE_PATH}${file}`;

const organizationSchema = buildOrganizationSchema(SEO_DESCRIPTION);

function NotFoundComponent() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          {t("notFound.title")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("notFound.description")}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("notFound.cta")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("error.title")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("error.description")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("error.retry")}
          </button>
          <a
            href={BASE_PATH}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("error.home")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: SEO_TITLE },
        { name: "description", content: SEO_DESCRIPTION },
        {
          name: "robots",
          content: "index, follow, max-image-preview:large, max-snippet:-1",
        },
        { name: "theme-color", content: "#f0c419" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Visser" },
        { property: "og:locale", content: "nl_NL" },
        { property: "og:title", content: SEO_TITLE },
        { property: "og:description", content: SEO_DESCRIPTION },
        { property: "og:url", content: absoluteUrl("/") },
        { property: "og:image", content: absoluteUrl("/og-image.jpg") },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content: "Visser — metselaar, schilder en stukadoor",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: SEO_TITLE },
        { name: "twitter:description", content: SEO_DESCRIPTION },
        { name: "twitter:image", content: absoluteUrl("/og-image.jpg") },
      ],
      links: [
        { rel: "canonical", href: absoluteUrl("/") },
        {
          rel: "stylesheet",
          href: appCss,
        },
        { rel: "icon", href: assetPath("favicon.png"), type: "image/png" },
        { rel: "apple-touch-icon", href: assetPath("apple-touch-icon.png") },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(organizationSchema),
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    // O lang começa em "nl" (padrão); é atualizado dinamicamente por RootComponent
    <html lang="nl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { i18n } = useTranslation();

  // Aplica o idioma salvo pelo visitante depois que a hidratação do HTML
  // estático (sempre em NL) termina.
  useEffect(() => {
    applyStoredLanguage();
  }, []);

  // Sincroniza o atributo lang do <html> com o idioma atual (importante para SEO e a11y)
  useEffect(() => {
    const lang = i18n.language?.slice(0, 2) ?? "nl";
    document.documentElement.lang = lang;
  }, [i18n.language]);

  // Mantém título e descrição coerentes com o idioma escolhido pelo visitante.
  // Na carga inicial o HTML já vem do servidor em holandês.
  useEffect(() => {
    const title = i18n.t("meta.title");
    const description = i18n.t("meta.description");
    if (title) document.title = title;
    if (description) {
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", description);
    }
  }, [i18n.language, i18n]);

  // O Vercel Analytics só funciona no domínio do Vercel: o endpoint
  // /_vercel/insights não existe no GitHub Pages e geraria 404 à toa.
  // O estado começa desligado para não divergir do HTML do servidor.
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  useEffect(() => {
    setAnalyticsEnabled(
      import.meta.env.PROD && !window.location.hostname.endsWith("github.io"),
    );
  }, []);

  return (
    <I18nextProvider i18n={i18nInstance}>
      <QueryClientProvider client={queryClient}>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        {analyticsEnabled && <Analytics />}
      </QueryClientProvider>
    </I18nextProvider>
  );
}
