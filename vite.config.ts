// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// A Vercel define VERCEL=1 durante o build.
const isVercel = Boolean(process.env.VERCEL);

export default defineConfig({
  // No Vercel o Nitro precisa gerar a Build Output API (preset `vercel`).
  // Nos outros alvos o preset fica no padrão (cloudflare-module), usado pelo
  // workflow do GitHub Pages.
  ...(isVercel ? { nitro: { preset: "vercel" } } : {}),

  // GitHub Pages serves the project under /<repo>/, so assets must be prefixed
  // with that subpath. VITE_BASE_PATH is set by .github/workflows/deploy.yml.
  vite: {
    base: process.env.VITE_BASE_PATH ?? "/",
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
