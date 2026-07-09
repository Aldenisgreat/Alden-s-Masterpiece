import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

// Simple seeded random
function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function Trees() {
  const trees = useMemo(() => {
    const result: { pos: [number, number, number]; scale: number; color: string }[] = []
    for (let i = 0; i < 500; i++) {
      const x = (seededRandom(i * 3) - 0.5) * 2000
      const z = (seededRandom(i * 3 + 1) - 0.5) * 2000
      // Skip trees on runway / airport area
      if (Math.abs(x) < 90 && Math.abs(z) < 220) continue
      // Skip trees near city clusters
      const nearCity = (
        (Math.abs(x + 165) < 80 && Math.abs(z - 175) < 80) ||
        (Math.abs(x - 215) < 80 && Math.abs(z - 225) < 80) ||
        (Math.abs(x + 260) < 80 && Math.abs(z + 210) < 80) ||
        (Math.abs(x - 310) < 80 && Math.abs(z + 165) < 80) ||
        (Math.abs(x + 110) < 70 && Math.abs(z + 315) < 70) ||
        (Math.abs(x - 165) < 70 && Math.abs(z + 365) < 70)
      )
      if (nearCity) continue
      // Skip trees in water
      const h = Math.sin(x * 0.005) * Math.cos(z * 0.005) * 15 +
        Math.sin(x * 0.012 + 1.5) * Math.cos(z * 0.008 + 0.7) * 8
      if (h < -1) continue

      const y = Math.max(0, h)
      const scale = 0.5 + seededRandom(i * 7) * 1.5
      const colors = ['#2d5a1e', '#1e4a14', '#3a7d2a', '#2e6b1e']
      const color = colors[Math.floor(seededRandom(i * 11) * colors.length)]
      result.push({ pos: [x, y, z], scale, color })
    }
    return result
  }, [])

  return (
    <group>
      {trees.map((tree, i) => (
        <group key={i} position={tree.pos} scale={tree.scale}>
          {/* Trunk */}
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.15, 0.25, 4, 6]} />
            <meshStandardMaterial color="#5a3a1a" />
          </mesh>
          {/* Foliage */}
          <mesh position={[0, 5.5, 0]}>
            <coneGeometry args={[2, 5, 6]} />
            <meshStandardMaterial color={tree.color} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function HayBales() {
  const bales = useMemo(() => {
    const result: [number, number, number][] = []
    for (let i = 0; i < 8; i++) {
      const x = (seededRandom(i * 13 + 500) - 0.5) * 1600
      const z = (seededRandom(i * 17 + 600) - 0.5) * 1600
      if (Math.abs(x) < 30 && Math.abs(z) < 260) continue
      const h = Math.sin(x * 0.005) * Math.cos(z * 0.005) * 15
      if (h < 0) continue
      result.push([x, Math.max(0, h) + 0.4, z])
    }
    return result
  }, [])

  return (
    <group>
      {bales.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0, seededRandom(i * 23) * Math.PI, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.8, 8]} />
          <meshStandardMaterial color="#c8a84e" />
        </mesh>
      ))}
    </group>
  )
}

function Fields() {
  const fields = useMemo(() => {
    const result: { pos: [number, number, number]; size: [number, number, number]; color: string }[] = []
    const fieldColors = ['#4a8c2a', '#5a9c3a', '#3a7c1a', '#6aac4a', '#c4a030']
    for (let i = 0; i < 8; i++) {
      const x = (seededRandom(i * 31 + 100) - 0.5) * 1800
      const z = (seededRandom(i * 37 + 200) - 0.5) * 1800
      if (Math.abs(x) < 40 && Math.abs(z) < 280) continue
      const w = 30 + seededRandom(i * 41) * 60
      const d = 30 + seededRandom(i * 43) * 60
      const color = fieldColors[Math.floor(seededRandom(i * 47) * fieldColors.length)]
      result.push({
        pos: [x, 0.05, z],
        size: [w, 0.1, d],
        color,
      })
    }
    return result
  }, [])

  return (
    <group>
      {fields.map((field, i) => (
        <mesh key={i} position={field.pos} receiveShadow>
          <boxGeometry args={field.size} />
          <meshStandardMaterial color={field.color} />
        </mesh>
      ))}
    </group>
  )
}

function Rivers() {
  const rivers = useMemo(() => {
    // Create a few river paths using connected segments
    const paths: [number, number, number][] = []
    // River 1: flowing from northwest
    let x = -500, z = -800
    for (let i = 0; i < 30; i++) {
      x += 15 + seededRandom(i * 53) * 10
      z += 12 + seededRandom(i * 59) * 8
      paths.push([x, -1.5, z])
    }
    return paths
  }, [])

  return (
    <group>
      {rivers.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 18]} />
          <meshStandardMaterial color="#2874a6" transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  )
}

export default function Terrain() {
  const waterRef = useRef<THREE.Mesh>(null)

  const roads = useMemo(() => {
    const r: { pos: [number, number, number]; size: [number, number] }[] = []
    // Runway parallel roads
    r.push({ pos: [-40, 0.05, 0], size: [8, 400] }, { pos: [40, 0.05, 0], size: [8, 400] })
    // Cross roads
    for (let z = -300; z <= 300; z += 100) r.push({ pos: [0, 0.05, z], size: [80, 6] })
    // City roads
    r.push(
      { pos: [-150, 0.05, 150], size: [60, 6] }, { pos: [200, 0.05, 200], size: [60, 6] },
      { pos: [-250, 0.05, -200], size: [60, 6] }, { pos: [300, 0.05, -150], size: [60, 6] },
    )
    return r
  }, [])

  useFrame((state) => {
    if (waterRef.current) {
      const mat = waterRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = 0.75 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group>
      {/* Main ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[3000, 3000, 32, 32]} />
        <meshStandardMaterial color="#4a8c2a" />
      </mesh>

      {/* Water */}
      <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[3000, 3000]} />
        <meshStandardMaterial color="#1a6da0" transparent opacity={0.75} metalness={0.3} roughness={0.1} />
      </mesh>

      {/* Hills */}
      {useMemo(() => {
        const hills: { pos: [number, number, number]; scale: [number, number, number] }[] = []
        for (let i = 0; i < 15; i++) {
          const x = (seededRandom(i * 61 + 300) - 0.5) * 2000
          const z = (seededRandom(i * 67 + 400) - 0.5) * 2000
          if (Math.abs(x) < 35 && Math.abs(z) < 270) continue
          const h = 3 + seededRandom(i * 71) * 12
          const w = 15 + seededRandom(i * 73) * 30
          hills.push({ pos: [x, h / 2 - 0.5, z], scale: [w, h, w] })
        }
        return hills.map((hill, i) => (
          <mesh key={`hill-${i}`} position={hill.pos} scale={hill.scale} castShadow receiveShadow>
            <sphereGeometry args={[1, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#3d7a24" />
          </mesh>
        ))
      }, [])}

      {/* Roads */}
      {roads.map((road, i) => (
        <mesh key={`road-${i}`} position={road.pos} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={road.size} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      ))}

      <Trees />
      <HayBales />
      <Fields />
      <Rivers />
    </group>
  )
}
