export const profile = {
  name: 'Andrew An',
  legalName: 'Junlei An',
  handle: 'aa.',
  role: 'Computer Engineer & Systems Builder',
  location: 'Oakville · Toronto, Canada',
  coords: '43.45° N · 79.68° W',
  email: 'klein.an@mail.utoronto.ca',
  github: 'https://github.com/Shinoaki798',
  linkedin: 'https://www.linkedin.com/in/andrew-an-b8a937259/',
  resume: '/Andrew_An_Resume.pdf',
  school: 'University of Toronto',
  degree: 'BASc Computer Engineering · 2024–2029',
  tagline: ['I build strategy engines,', 'bare-metal games, and the', 'interfaces that make them legible.'],
  intro:
    'Computer Engineering at the University of Toronto. From Verilog and Nios V assembly up to deterministic TypeScript simulations and WebGL globes.',
}

export const stackMarquee = [
  'TypeScript', 'C / C++', 'Verilog', 'React', 'Three.js', 'Nios V asm', 'Python', 'Java', 'Node.js', 'Vitest',
]

export type Project = {
  index: string
  slug: string
  kicker: string
  year: string
  title: string
  blurb: string
  tags: string[]
  diagram: 'wego' | 'grid' | 'osm' | 'fpga' | 'reversi' | 'reader'
  stats?: { value: string; label: string }[]
  link?: string
  wide?: boolean
}

export const projects: Project[] = [
  {
    index: '01',
    slug: 'hegemony-2060',
    kicker: 'Strategy-game engine · WEGO multiplayer',
    year: '2026 —',
    title: 'Hegemony 2060',
    blurb:
      'A four-faction near-future strategy game where the real decision is whether to go to war at all. A deterministic pure-TypeScript engine with a seven-phase simultaneous-turn resolver, hidden information by type, and a WebGL globe client. Heading for Steam.',
    tags: ['TypeScript', 'React 19', 'WebGL / Three.js', 'Zustand', 'Vitest', 'Electron + Steam SDK'],
    diagram: 'wego',
    stats: [
      { value: '29', label: 'game systems' },
      { value: '1,300+', label: 'tests, all green' },
      { value: '82k', label: 'lines of TypeScript' },
      { value: '214', label: 'logged design decisions' },
    ],
    wide: true,
  },
  {
    index: '02',
    slug: 'de1-soc-4x',
    kicker: 'Bare-metal · C + Nios V assembly',
    year: '2025',
    title: 'DE1-SoC 4X Strategy Game',
    blurb:
      'A Civilization-style 4X game built from scratch on an FPGA dev board: a 320×240 grid world, PS/2 mouse and keyboard input, turn logic and combat, all rendered without a graphics library.',
    tags: ['C', 'Nios V assembly', 'DE1-SoC', 'VGA', 'PS/2'],
    diagram: 'grid',
    link: 'https://github.com/Shinoaki798/civilization',
  },
  {
    index: '03',
    slug: 'osm-map',
    kicker: 'Team lead · Geospatial software',
    year: '2026',
    title: 'Interactive Map on OpenStreetMap',
    blurb:
      'Led a team building a fully functional interactive map application from the ground up: parsing and rendering massive real-world OpenStreetMap data, designing the architecture and splitting the work so the codebase stayed clean.',
    tags: ['C++', 'OpenStreetMap API', 'Architecture', 'Team leadership'],
    diagram: 'osm',
  },
  {
    index: '04',
    slug: 'fpga-matching',
    kicker: 'Digital design · Verilog',
    year: '2025',
    title: 'FPGA Order-Matching Engine',
    blurb:
      'A hardware exchange in Verilog: LFSR price generators feed an eight-deep bid/ask window, combinational best-bid / best-ask logic fires a match FSM, and trades, spread and state light up the HEX displays and LEDs in real time.',
    tags: ['Verilog', 'FSM', 'ModelSim', 'DE1-SoC'],
    diagram: 'fpga',
  },
  {
    index: '05',
    slug: 'reversi-bot',
    kicker: 'Algorithms · 3rd of 400+',
    year: '2025',
    title: 'Reversi Bot in C',
    blurb:
      'A search-based Reversi engine written independently in C. Algorithmic optimisations pushed the win rate high enough for 3rd place overall across a cohort of more than 400 students.',
    tags: ['C', 'Game-tree search', 'Optimisation'],
    diagram: 'reversi',
  },
  {
    index: '06',
    slug: 'epub-reader',
    kicker: 'Everyday tool · Web',
    year: '2026',
    title: 'epubReader',
    blurb:
      'A clean EPUB and TXT reader for novels, with paginated and scrolled modes, typography controls, dark mode, and a tiny Node server so the same library opens on a phone across the LAN.',
    tags: ['JavaScript', 'Node.js', 'epub.js', 'Responsive'],
    diagram: 'reader',
    link: 'https://github.com/Shinoaki798/epubReader',
  },
]

export const moreOnGithub = [
  { name: 'Tier', desc: '3-dimensional visualisation experiments', lang: 'HTML / WebGL', url: 'https://github.com/Shinoaki798/Tier' },
  { name: 'discord-bot', desc: 'Daily check-ins, music playback, π calculation and more', lang: 'Python', url: 'https://github.com/Shinoaki798/discord-bot' },
  { name: 'quant sandbox', desc: 'A-share quant research on Qlib, Kronos and KHunter', lang: 'Python', url: 'https://github.com/Shinoaki798?tab=repositories' },
  { name: '2048 AI', desc: 'Expectimax + bitboard solver, ~10M moves/s', lang: 'C++', url: 'https://github.com/Shinoaki798' },
]

export const toolkit = [
  {
    layer: 'Silicon',
    index: '01',
    line: 'Where the clock is the only truth.',
    items: ['Verilog', 'Nios V / RISC-V assembly', 'C', 'DE1-SoC', 'Quartus · ModelSim', 'VGA · PS/2'],
    applied: 'DE1-SoC 4X Game · FPGA Order-Matching Engine',
  },
  {
    layer: 'Systems',
    index: '02',
    line: 'Deterministic, testable, replayable.',
    items: ['TypeScript', 'C++', 'Java', 'Python', 'Node.js', 'Vitest · property tests'],
    applied: 'Hegemony 2060 engine · OpenStreetMap map · Reversi bot',
  },
  {
    layer: 'Surfaces',
    index: '03',
    line: 'Complex state, made legible.',
    items: ['React 19', 'Three.js · WebGL', 'Vite', 'Zustand', 'Blender', 'DaVinci Resolve'],
    applied: 'Hegemony 2060 globe client · epubReader · Camping-stove renders',
  },
]

export const experience = [
  {
    when: 'AUG 2026 — PRESENT',
    index: '01',
    title: 'Creator & Lead Engineer',
    org: 'Hegemony 2060 (制权 2060)',
    body:
      'Designing and building a near-future strategy game end to end: rules, engine, AI opponents, a 10,000-game balance simulator, an authoritative room server, and a WebGL globe client.',
    points: [
      'Deterministic engine with zero environment dependencies; same (state, orders, seed) always yields the same result.',
      'Runs a multi-agent AI development workflow with tool-enforced guardrails: lint rules, dependency-direction checks, decision-log collision detection.',
    ],
    tags: ['TypeScript', 'React', 'WebGL', 'Steam SDK'],
  },
  {
    when: 'JAN — APR 2026',
    index: '02',
    title: 'Team Leader',
    org: 'Interactive Map Software · University of Toronto',
    body: 'Owned architecture and task allocation for a from-scratch map application on OpenStreetMap data.',
    points: [
      'Parsed and visualised massive real-world geographic datasets.',
      'Kept a maintainable codebase across a multi-person team under tight course deadlines.',
    ],
    tags: ['C++', 'OpenStreetMap'],
  },
  {
    when: 'SEP — DEC 2025',
    index: '03',
    title: 'Core Developer',
    org: '4X Strategy Game on DE1-SoC',
    body: 'Two-person team building a complete 4X game in C and Nios V assembly on FPGA hardware.',
    points: [
      'Designed and implemented a dynamic interactive interface with no graphics library.',
      'Low-level assembly work for input, rendering and turn logic.',
    ],
    tags: ['C', 'Assembly', 'FPGA'],
  },
  {
    when: 'JAN — APR 2025',
    index: '04',
    title: 'Multimodality Coordinator',
    org: 'Portable Camping Stove · Engineering Design',
    body: 'Six-person design team, from concept to final prototype for a real client.',
    points: [
      'Orchestrated engineering documentation and presentation material for non-technical stakeholders.',
      'Independently produced 3D models and renders in Blender for the client pitch.',
    ],
    tags: ['Blender', 'Design cycle'],
  },
  {
    when: 'OCT 2022 — MAY 2024',
    index: '05',
    title: 'Co-founder & Student Tutor',
    org: 'Mathematics & Programming Competition Club · MacLachlan College',
    body: 'Co-founded and grew a student club for math and programming contests.',
    points: ['Hosted weekly algorithm workshops.', 'Compiled comprehensive problem sets independently.'],
    tags: ['Algorithms', 'Teaching'],
  },
]
