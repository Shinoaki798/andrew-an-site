# andrew-an-site

Personal website for Junlei An — https://github.com/Shinoaki798

**Stack**: Vite 8 · React 19 · TypeScript · Tailwind CSS v4 · Motion · React Three Fiber (Three.js) · Lenis

## Run

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # static output in dist/
pnpm preview
```

## Edit content

Everything textual lives in one file: `src/data/content.ts` (profile, projects, toolkit, experience).
Project diagrams are hand-drawn SVGs in `src/components/Diagrams.tsx`.
Replace `public/Junlei_An_Resume.pdf` to update the downloadable résumé.

## Deploy (Cloudflare Workers static assets → anjunlei.com)

```bash
npx wrangler login   # one-time; pick the anjunlei20060606 account
pnpm deploy          # builds dist/ and runs `wrangler deploy`
```

`wrangler.toml` declares `anjunlei.com` and `www.anjunlei.com` as custom domains, so DNS and TLS are managed by Cloudflare automatically. `worker/index.js` only redirects `www` → apex and serves the assets. Preview URL: https://anjunlei-site.andrew-an-site.workers.dev
