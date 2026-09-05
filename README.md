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

## Deploy (Cloudflare Pages)

**Option A — Git integration (recommended, auto-deploys on push)**
Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick `Shinoaki798/andrew-an-site`:

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION` = `22` |

Then Custom domains → add `anjunlei.com` (and `www.anjunlei.com`). If the domain is on Cloudflare, DNS is created automatically.

**Option B — direct upload from this machine**

```bash
npx wrangler login      # one-time, opens the browser
pnpm deploy
```
