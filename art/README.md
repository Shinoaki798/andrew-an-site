# art/

- `ISOLINE-DRIFT.md` — the algorithmic philosophy behind the hero visual.
- `isoline-drift.html` — self-contained p5.js viewer (seed navigation, sliders, colour pickers, PNG export). Open it in a browser to explore variants.
- The site ships the same algorithm from `src/art/isoline.ts`, rendered by `src/components/Terrain.tsx` with seed 2060.

Rebuild the viewer's embedded core after editing `isoline.ts`:

```bash
npx esbuild src/art/isoline.ts --bundle --format=iife --global-name=Isoline --outfile=/tmp/isoline.iife.js
```

then paste the output between the CORE ALGORITHM markers in `isoline-drift.html`.
