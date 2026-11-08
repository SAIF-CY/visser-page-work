// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// A Vercel define VERCEL=1 durante o build.
const isVercel = Boolean(process.env["VERCEL"]);

/**
 * URL canônica do site. A mesma variável é lida em `src/seo/site.ts` via
 * `import.meta.env.VITE_SITE_URL`, então canonical, sitemap e robots apontam
 * sempre para o mesmo lugar. Ao migrar para um domínio próprio, basta definir
 * `VITE_SITE_URL` no Vercel (e no GitHub Actions, se quiser o sitemap lá).
 */
const SITE_URL = (
  process.env["VITE_SITE_URL"]?.trim() ||
    "https://visser-page-work.vercel.app"
).replace(/\/+$/, "");

/**
 * Escreve `robots.txt` e `sitemap.xml` em `public/` antes do build. O Vite
 * copia `public/` para a saída nos dois alvos (Vercel e GitHub Pages), então
 * os dois deploys ficam com os arquivos corretos sem passos extras de CI.
 */
function writeSeoFiles() {
  const publicDir = resolve(process.cwd(), "public");
  mkdirSync(publicDir, { recursive: true });

  writeFileSync(
    resolve(publicDir, "sitemap.xml"),
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      "  <url>",
      `    <loc>${SITE_URL}/</loc>`,
      "    <changefreq>monthly</changefreq>",
      "    <priority>1.0</priority>",
      "  </url>",
      "</urlset>",
      "",
    ].join("\n"),
  );

  writeFileSync(
    resolve(publicDir, "robots.txt"),
    [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${SITE_URL}/sitemap.xml`,
      "",
    ].join("\n"),
  );
}

writeSeoFiles();

export default defineConfig({
  // No Vercel o Nitro precisa gerar a Build Output API (preset `vercel`).
  // Nos outros alvos o preset fica no padrão (cloudflare-module), usado pelo
  // workflow do GitHub Pages.
  ...(isVercel ? { nitro: { preset: "vercel" } } : {}),

  // GitHub Pages serves the project under /<repo>/, so assets must be prefixed
  // with that subpath. VITE_BASE_PATH is set by .github/workflows/deploy.yml.
  vite: {
    base: process.env["VITE_BASE_PATH"] ?? "/",
  },

  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    prerender: {
      // O prerender é necessário no GitHub Pages, que só serve arquivos estáticos.
      //
      // No Vercel ele precisa ficar desligado: o hook de prerender do
      // @lovable.dev/vite-tanstack-config sobrescreve o hook `compiled` do
      // preset Vercel do Nitro, e o `.vercel/output/config.json` (exigido pela
      // Build Output API) deixa de ser gerado — o que faz o deploy responder
      // 404 em todas as rotas. No Vercel a página é servida por SSR.
      enabled: !isVercel,
      routes: ["/"],
    },
  },
});
