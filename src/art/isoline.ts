/**
 * Isoline Drift — a living topographic plot.
 * Deterministic: same (seed, t, pointer) → same frame. No Math.random anywhere.
 */

export type Params = {
  seed: number
  cell: number        // grid spacing in CSS px
  scale: number       // noise scale (cycles per px)
  warp: number        // domain-warp strength
  levels: number      // number of contour levels
  indexEvery: number  // every Nth contour is an index contour (amber)
  drift: number       // time speed
  lift: number        // pointer lift height
  liftRadius: number  // pointer lift radius in px
  peaks: boolean      // draw spot heights
}

export const DEFAULTS: Params = {
  seed: 2060,
  cell: 7,
  scale: 0.0042,
  warp: 0.9,
  levels: 28,
  indexEvery: 7,
  drift: 0.045,
  lift: 0.55,
  liftRadius: 110,
  peaks: true,
}

export type Palette = { line: string; index: string; text: string; grid: string }

/* ---------- seeded RNG + 3-D gradient noise ---------- */
function mulberry32(a: number) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const GRAD: number[][] = [
  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
]
const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export class Noise {
  private p = new Uint8Array(512)
  constructor(seed: number) {
    const rnd = mulberry32(seed)
    const perm = Array.from({ length: 256 }, (_, i) => i)
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1))
      ;[perm[i], perm[j]] = [perm[j], perm[i]]
    }
    for (let i = 0; i < 512; i++) this.p[i] = perm[i & 255]
  }
  private g(h: number, x: number, y: number, z: number) {
    const v = GRAD[h % 12]
    return v[0] * x + v[1] * y + v[2] * z
  }
  /** classic 3-D Perlin, returns roughly [-1, 1] */
  at(x: number, y: number, z: number) {
    const p = this.p
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255
    x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z)
    const u = fade(x), v = fade(y), w = fade(z)
    const A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z
    const B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z
    return lerp(
      lerp(lerp(this.g(p[AA], x, y, z), this.g(p[BA], x - 1, y, z), u),
           lerp(this.g(p[AB], x, y - 1, z), this.g(p[BB], x - 1, y - 1, z), u), v),
      lerp(lerp(this.g(p[AA + 1], x, y, z - 1), this.g(p[BA + 1], x - 1, y, z - 1), u),
           lerp(this.g(p[AB + 1], x, y - 1, z - 1), this.g(p[BB + 1], x - 1, y - 1, z - 1), u), v),
      w,
    )
  }
  fbm(x: number, y: number, z: number, oct = 3) {
    let a = 0.5, f = 1, s = 0, n = 0
    for (let i = 0; i < oct; i++) {
      s += a * this.at(x * f, y * f, z)
      n += a; a *= 0.5; f *= 2.1
    }
    return s / n
  }
}

/* ---------- the field ---------- */
export class Field {
  noise: Noise
  cols = 0
  rows = 0
  h: Float32Array = new Float32Array(0)
  constructor(public params: Params) {
    this.noise = new Noise(params.seed)
  }
  resize(w: number, hgt: number) {
    this.cols = Math.ceil(w / this.params.cell) + 1
    this.rows = Math.ceil(hgt / this.params.cell) + 1
    this.h = new Float32Array(this.cols * this.rows)
  }
  /** pointer in px or null; t in seconds */
  sample(t: number, pointer: { x: number; y: number } | null) {
    const { cell, scale, warp, lift, liftRadius, drift } = this.params
    const n = this.noise
    const z = t * drift
    const r2 = liftRadius * liftRadius
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.cols; i++) {
        const px = i * cell, py = j * cell
        const x = px * scale, y = py * scale
        // domain warp: the terrain folds over itself
        const qx = n.fbm(x + 1.7, y + 9.2, z, 2)
        const qy = n.fbm(x + 8.3, y + 2.8, z, 2)
        let v = n.fbm(x + warp * qx, y + warp * qy, z * 0.7, 3)
        if (pointer) {
          const dx = px - pointer.x, dy = py - pointer.y
          const d2 = dx * dx + dy * dy
          if (d2 < r2 * 4) v += lift * Math.exp(-d2 / r2)
        }
        this.h[j * this.cols + i] = v
      }
    }
  }
}

/* ---------- marching squares ---------- */
type Seg = [number, number, number, number]

export function contours(f: Field, level: number, out: Seg[]) {
  const { cols, rows, h } = f
  const c = f.params.cell
  const ix = (a: number, b: number) => (level - a) / (b - a)
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const a = h[j * cols + i], b = h[j * cols + i + 1]
      const d = h[(j + 1) * cols + i], cc = h[(j + 1) * cols + i + 1]
      const idx = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (cc > level ? 2 : 0) | (d > level ? 1 : 0)
      if (idx === 0 || idx === 15) continue
      const x0 = i * c, y0 = j * c
      // edge points: top, right, bottom, left
      const T = () => [x0 + ix(a, b) * c, y0] as const
      const R = () => [x0 + c, y0 + ix(b, cc) * c] as const
      const Bt = () => [x0 + ix(d, cc) * c, y0 + c] as const
      const L = () => [x0, y0 + ix(a, d) * c] as const
      const push = (p: readonly [number, number], q: readonly [number, number]) => out.push([p[0], p[1], q[0], q[1]])
      switch (idx) {
        case 1: case 14: push(L(), Bt()); break
        case 2: case 13: push(Bt(), R()); break
        case 3: case 12: push(L(), R()); break
        case 4: case 11: push(T(), R()); break
        case 5: { const m = (a + b + cc + d) / 4 > level; if (m) { push(T(), R()); push(L(), Bt()) } else { push(T(), L()); push(R(), Bt()) } break }
        case 6: case 9: push(T(), Bt()); break
        case 7: case 8: push(T(), L()); break
        case 10: { const m = (a + b + cc + d) / 4 > level; if (m) { push(T(), L()); push(R(), Bt()) } else { push(T(), R()); push(L(), Bt()) } break }
      }
    }
  }
}

/* ---------- peaks (spot heights) ---------- */
export function peaks(f: Field, minH: number) {
  const { cols, rows, h } = f
  const c = f.params.cell
  const out: { x: number; y: number; v: number }[] = []
  for (let j = 2; j < rows - 2; j++) {
    for (let i = 2; i < cols - 2; i++) {
      const v = h[j * cols + i]
      if (v < minH) continue
      let top = true
      for (let dj = -2; dj <= 2 && top; dj++)
        for (let di = -2; di <= 2; di++) {
          if (!di && !dj) continue
          if (h[(j + dj) * cols + i + di] >= v) { top = false; break }
        }
      if (top) out.push({ x: i * c, y: j * c, v })
    }
  }
  return out
}

/* ---------- render one frame to a 2-D context (CSS px space) ---------- */
export function render(
  ctx: CanvasRenderingContext2D,
  f: Field,
  w: number,
  hgt: number,
  t: number,
  pointer: { x: number; y: number } | null,
  pal: Palette,
) {
  const P = f.params
  f.sample(t, pointer)
  ctx.clearRect(0, 0, w, hgt)

  // faint survey grid
  ctx.strokeStyle = pal.grid
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let x = 0; x <= w; x += 64) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, hgt) }
  for (let y = 0; y <= hgt; y += 64) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5) }
  ctx.stroke()

  const segs: Seg[] = []
  const lo = -0.75, hi = 0.95
  for (let k = 0; k < P.levels; k++) {
    const level = lo + ((hi - lo) * k) / (P.levels - 1)
    const isIndex = k % P.indexEvery === 0
    segs.length = 0
    contours(f, level, segs)
    if (!segs.length) continue
    ctx.beginPath()
    for (const s of segs) { ctx.moveTo(s[0], s[1]); ctx.lineTo(s[2], s[3]) }
    if (isIndex) {
      ctx.strokeStyle = pal.index
      ctx.lineWidth = 1.5
      ctx.globalAlpha = 0.95
    } else {
      ctx.strokeStyle = pal.line
      ctx.lineWidth = 1
      // higher ground reads brighter — the map has relief
      ctx.globalAlpha = 0.28 + 0.5 * (k / P.levels)
    }
    ctx.stroke()
  }
  ctx.globalAlpha = 1

  if (P.peaks) {
    ctx.font = '500 10px "IBM Plex Mono", ui-monospace, monospace'
    ctx.textBaseline = 'middle'
    for (const p of peaks(f, 0.42)) {
      const a = Math.min(1, (p.v - 0.42) / 0.25)
      ctx.globalAlpha = a
      ctx.fillStyle = pal.index
      ctx.beginPath(); ctx.moveTo(p.x, p.y - 4); ctx.lineTo(p.x + 4, p.y + 3); ctx.lineTo(p.x - 4, p.y + 3); ctx.closePath(); ctx.fill()
      ctx.fillStyle = pal.text
      ctx.fillText(String(Math.round(1200 + p.v * 900)), p.x + 8, p.y)
    }
    ctx.globalAlpha = 1
  }
}
