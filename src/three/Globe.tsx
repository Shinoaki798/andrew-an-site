import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type Props = { paused: boolean; accent: string; dim: string }

const R = 1

function latLon(lat: number, lon: number, r = R) {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lon + 180) * Math.PI) / 180
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  )
}

const CITIES: [number, number][] = [
  [43.45, -79.68], // Oakville
  [32.06, 118.8], // Nanjing
  [51.5, -0.12], // London
  [35.68, 139.69], // Tokyo
  [-33.87, 151.21], // Sydney
  [37.77, -122.42], // SF
  [55.75, 37.62], // Moscow
  [48.85, 2.35], // Paris
]
const LINKS: [number, number][] = [
  [0, 1], [0, 2], [0, 5], [1, 3], [2, 6], [2, 7], [3, 4], [1, 4],
]

function Lattice({ accent, dim }: { accent: string; dim: string }) {
  const points = useMemo(() => {
    const n = 1400
    const arr = new Float32Array(n * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2
      const rad = Math.sqrt(1 - y * y)
      const t = golden * i
      arr[i * 3] = Math.cos(t) * rad * R
      arr[i * 3 + 1] = y * R
      arr[i * 3 + 2] = Math.sin(t) * rad * R
    }
    return arr
  }, [])

  const rings = useMemo(() => {
    const out: THREE.Vector3[][] = []
    for (const lat of [-60, -30, 0, 30, 60]) {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 128; i++) pts.push(latLon(lat, (i / 128) * 360 - 180, R * 1.002))
      out.push(pts)
    }
    return out
  }, [])

  const arcs = useMemo(() => {
    return LINKS.map(([a, b]) => {
      const p0 = latLon(CITIES[a][0], CITIES[a][1])
      const p1 = latLon(CITIES[b][0], CITIES[b][1])
      const mid = p0.clone().add(p1).normalize().multiplyScalar(R * (1 + p0.distanceTo(p1) * 0.35))
      const curve = new THREE.QuadraticBezierCurve3(p0, mid, p1)
      return curve.getPoints(64)
    })
  }, [])

  const cityPts = useMemo(() => CITIES.map(([la, lo]) => latLon(la, lo, R * 1.01)), [])

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial color={dim} size={0.016} sizeAttenuation transparent opacity={1} />
      </points>
      <mesh>
        <sphereGeometry args={[R * 0.985, 48, 48]} />
        <meshBasicMaterial color="#000" transparent opacity={0.55} />
      </mesh>
      {rings.map((pts, i) => (
        <Line key={i} points={pts} color={dim} opacity={0.35} />
      ))}
      {arcs.map((pts, i) => (
        <Line key={`a${i}`} points={pts} color={accent} opacity={0.85} />
      ))}
      {cityPts.map((p, i) => (
        <mesh key={`c${i}`} position={p}>
          <sphereGeometry args={[i === 0 ? 0.022 : 0.012, 12, 12]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      ))}
    </group>
  )
}

function Line({ points, color, opacity }: { points: THREE.Vector3[]; color: string; opacity: number }) {
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])
  return (
    <primitive object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color, transparent: true, opacity }))} />
  )
}

function Scene({ paused, accent, dim }: Props) {
  const g = useRef<THREE.Group>(null)
  const target = useRef({ x: 0, y: 0 })
  useFrame((state, dt) => {
    if (!g.current) return
    const { x, y } = state.pointer
    target.current.x += (y * 0.25 - target.current.x) * 0.05
    target.current.y += (x * 0.35 - target.current.y) * 0.05
    if (!paused) g.current.rotation.y += dt * 0.08
    g.current.rotation.x = target.current.x + 0.35
    g.current.position.x = target.current.y * 0.05
  })
  return (
    <group ref={g} rotation={[0.35, 0.8, 0]}>
      <Lattice accent={accent} dim={dim} />
    </group>
  )
}

export default function Globe(props: Props) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 3.15], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={props.paused ? 'demand' : 'always'}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene {...props} />
    </Canvas>
  )
}
