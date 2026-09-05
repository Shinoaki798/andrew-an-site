# andrew-an-site

Personal website for Andrew (Junlei) An — https://github.com/Shinoaki798

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
Replace `public/Andrew_An_Resume.pdf` to update the downloadable résumé.

## Deploy

- **GitHub Pages**: push to `main`; `.github/workflows/deploy.yml` builds and publishes. Enable Pages → Source: GitHub Actions in the repo settings. For a custom domain, add a `public/CNAME` file.
- **Vercel / Cloudflare Pages / Netlify**: import the repo, framework "Vite", build `pnpm build`, output `dist`.
