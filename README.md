# Projeto Visser

Website profissional para **Visser** — Serviços de alvenaria, pintura e acabamento na Holanda.

## Tecnologias

- [TanStack Start](https://tanstack.com/start) & [TanStack Router](https://tanstack.com/router)
- [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [i18next](https://www.i18next.com/) (Suporte a Holandês e Inglês)
- [Embla Carousel](https://www.embla-carousel.com/)
- [Lucide Icons](https://lucide.dev/)

## Desenvolvimento Local

Requisitos: Node.js 18+ e npm.

```sh
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Pré-visualização do build
npm run preview
```

## SEO e domínio

O site publica automaticamente:

- `title`, `description`, `canonical`, Open Graph e Twitter Card em `src/routes/__root.tsx`
- JSON-LD `GeneralContractor` com telefone e e-mail reais (`src/seo/site.ts`)
- `sitemap.xml` e `robots.txt`, gerados a partir de `VITE_SITE_URL` no build

A URL canônica padrão é `https://visser-page-work.vercel.app`. Ao migrar para um
domínio próprio, defina `VITE_SITE_URL` (por exemplo `https://visserschilderwerk.nl`)
nas variáveis de ambiente do Vercel e no workflow do GitHub Pages. Canonical,
`og:url`, `sitemap.xml` e `robots.txt` passam a apontar para o novo endereço.

> Endereço, região de atendimento e redes sociais ainda **não** entram no JSON-LD
> porque dependem de dados reais do proprietário. Veja o `TODO` em `src/seo/site.ts`.

