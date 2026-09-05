import type { Project } from '../data/content'

/* Every diagram is a fixed-aspect SVG so the card height never depends on it. */
const box = 'h-full w-full'

export function Diagram({ kind }: { kind: Project['diagram'] }) {
  switch (kind) {
    case 'wego':
      return <Wego />
    case 'grid':
      return <Grid />
    case 'osm':
      return <Osm />
    case 'fpga':
      return <Fpga />
    case 'reversi':
      return <Reversi />
    case 'reader':
      return <Reader />
  }
}

const PHASES = ['DIPLOMACY', 'INTEL', 'STRIKE', 'MOVE', 'BATTLE', 'PRODUCE', 'RESOLVE']

function Wego() {
  return (
    <svg viewBox="0 0 640 260" className={box} aria-hidden>
      <defs>
        <clipPath id="wego-clip"><rect width="640" height="260" /></clipPath>
      </defs>
      <g clipPath="url(#wego-clip)" opacity="0.9">
        {/* ground track sine wave, like the orbit debug view */}
        <path d="M-20 150 C 80 60, 180 60, 280 150 S 480 240, 660 150" fill="none" stroke="var(--amber)" strokeWidth="2" className="dash" />
        <path d="M-20 150 C 80 60, 180 60, 280 150 S 480 240, 660 150" fill="none" stroke="var(--amber)" strokeWidth="22" opacity="0.08" />
        <line x1="0" y1="150" x2="640" y2="150" stroke="var(--line)" strokeDasharray="2 6" />
        <line x1="320" y1="0" x2="320" y2="260" stroke="var(--line)" strokeDasharray="2 6" />
      </g>
      <g fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1.5">
        {PHASES.map((p, i) => {
          const x = 24 + i * 86
          return (
            <g key={p}>
              <rect x={x} y="22" width="76" height="22" rx="3" fill="var(--ink-3)" stroke="var(--line)" />
              <text x={x + 38} y="37" textAnchor="middle" fill={i === 2 ? 'var(--amber)' : 'var(--bone-2)'}>{p}</text>
              {i < PHASES.length - 1 && <text x={x + 80} y="37" fill="var(--mute)" fontSize="10">›</text>}
            </g>
          )
        })}
        <text x="24" y="238" fill="var(--mute)">SIMULTANEOUS TURNS · STRIKE RESOLVES BEFORE MOVE</text>
        <text x="616" y="238" fill="var(--amber)" textAnchor="end">FIG. 01</text>
      </g>
    </svg>
  )
}

function Grid() {
  const cells: { x: number; y: number; k: number }[] = []
  for (let y = 0; y < 6; y++) for (let x = 0; x < 16; x++) cells.push({ x, y, k: (x * 7 + y * 13) % 11 })
  return (
    <svg viewBox="0 0 320 120" className={box} aria-hidden>
      {cells.map(({ x, y, k }) => (
        <rect key={`${x}-${y}`} x={x * 20 + 0.5} y={y * 20 + 0.5} width="19" height="19"
          fill={k === 0 ? 'var(--amber)' : k < 4 ? 'var(--teal)' : 'var(--ink-3)'}
          opacity={k === 0 ? 0.9 : k < 4 ? 0.35 : 1} stroke="var(--line)" />
      ))}
      <g stroke="var(--amber)" strokeWidth="1.5" fill="none">
        <rect x="140.5" y="40.5" width="19" height="19" />
        <path d="M150 34 v-6 M150 66 v6 M134 50 h-6 M166 50 h6" />
      </g>
      <text x="4" y="114" fontFamily="var(--font-mono)" fontSize="7" fill="var(--mute)" letterSpacing="1">320×240 · 20PX CELLS · PS/2</text>
    </svg>
  )
}

function Osm() {
  return (
    <svg viewBox="0 0 320 120" className={box} aria-hidden>
      <g stroke="var(--bone-2)" strokeWidth="1" fill="none" opacity="0.5">
        <path d="M0 30 H320 M0 70 H320 M0 100 H320 M40 0 V120 M110 0 V120 M180 0 V120 M260 0 V120" />
        <path d="M0 15 Q120 40 200 20 T320 45" />
        <path d="M60 120 Q90 60 150 80 T300 0" />
      </g>
      <path d="M0 55 C 60 50, 90 90, 150 85 S 240 60, 320 75" fill="none" stroke="var(--amber)" strokeWidth="2.5" className="dash" />
      <circle cx="40" cy="52" r="3.5" fill="var(--amber)" />
      <circle cx="280" cy="73" r="3.5" fill="var(--amber)" />
      <text x="4" y="114" fontFamily="var(--font-mono)" fontSize="7" fill="var(--mute)" letterSpacing="1">OSM NODES · WAYS · SHORTEST PATH</text>
    </svg>
  )
}

function Fpga() {
  const boxes = ['LFSR', 'Q0…Q7', 'MAX/MIN', 'FSM', 'HEX/LED']
  return (
    <svg viewBox="0 0 320 120" className={box} aria-hidden>
      <g fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1">
        {boxes.map((b, i) => (
          <g key={b}>
            <rect x={8 + i * 62} y="40" width="50" height="28" rx="2" fill="var(--ink-3)" stroke={i === 3 ? 'var(--amber)' : 'var(--line)'} />
            <text x={33 + i * 62} y="58" textAnchor="middle" fill="var(--bone-2)">{b}</text>
            {i < boxes.length - 1 && <line x1={58 + i * 62} y1="54" x2={70 + i * 62} y2="54" stroke="var(--amber)" className="dash" />}
          </g>
        ))}
      </g>
      <path d="M8 90 h20 v-10 h20 v10 h20 v-10 h20 v10 h20 v-10 h20 v10 h20 v-10 h20 v10 h20 v-10 h20 v10 h20 v-10 h20 v10 h20 v-10 h20 v10 h20" fill="none" stroke="var(--teal)" strokeWidth="1.2" />
      <text x="4" y="114" fontFamily="var(--font-mono)" fontSize="7" fill="var(--mute)" letterSpacing="1">CLOCK_50 · BEST_BID ≥ BEST_ASK → MATCH</text>
    </svg>
  )
}

function Reversi() {
  const b = [
    '........', '..x.....', '..xo....', '..xxo...', '..oxxo..', '...ox...', '........', '........',
  ]
  return (
    <svg viewBox="0 0 320 120" className={box} aria-hidden>
      <g transform="translate(120 2)">
        {b.map((row, y) => row.split('').map((c, x) => (
          <g key={`${x}${y}`}>
            <rect x={x * 14} y={y * 14} width="14" height="14" fill="var(--ink-3)" stroke="var(--line)" />
            {c !== '.' && <circle cx={x * 14 + 7} cy={y * 14 + 7} r="5" fill={c === 'x' ? 'var(--amber)' : 'var(--bone)'} />}
          </g>
        )))}
        <rect x="70" y="14" width="14" height="14" fill="none" stroke="var(--amber)" strokeWidth="1.5" className="dash" />
      </g>
      <g fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--mute)" letterSpacing="1">
        <text x="6" y="30">DEPTH 8</text>
        <text x="6" y="44">αβ PRUNE</text>
        <text x="6" y="58">MOBILITY</text>
        <text x="6" y="72">CORNERS</text>
        <text x="240" y="30" fill="var(--amber)">#3 / 400+</text>
        <text x="4" y="114">GAME-TREE SEARCH IN C</text>
      </g>
    </svg>
  )
}

function Reader() {
  return (
    <svg viewBox="0 0 320 120" className={box} aria-hidden>
      <rect x="20" y="14" width="150" height="92" rx="4" fill="var(--ink-3)" stroke="var(--line)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="32" y={28 + i * 12} width={i === 5 ? 60 : 126} height="4" rx="2" fill="var(--bone-2)" opacity="0.5" />
      ))}
      <rect x="220" y="10" width="52" height="100" rx="8" fill="var(--ink-3)" stroke="var(--line)" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x="228" y={24 + i * 11} width={i === 6 ? 20 : 36} height="3" rx="1.5" fill="var(--bone-2)" opacity="0.5" />
      ))}
      <path d="M172 60 H218" stroke="var(--amber)" strokeWidth="1.5" className="dash" />
      <text x="4" y="114" fontFamily="var(--font-mono)" fontSize="7" fill="var(--mute)" letterSpacing="1">LAN SERVER · EPUB + TXT · PROGRESS SAVED</text>
    </svg>
  )
}
