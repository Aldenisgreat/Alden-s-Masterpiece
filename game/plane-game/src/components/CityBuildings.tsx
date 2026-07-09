import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

// ============================================================
// AIRPORT BUILDINGS (simple geometry - no FBX loading)
// ============================================================

function Terminal({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 6, 30]} />
        <meshStandardMaterial color="#8a9aaa" />
      </mesh>
      <mesh position={[6.05, 3, 0]}>
        <boxGeometry args={[0.2, 5, 28]} />
        <meshStandardMaterial color="#a0d4f0" transparent opacity={0.5} metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[0, 6.2, 0]} castShadow>
        <boxGeometry args={[14, 0.4, 32]} />
        <meshStandardMaterial color="#6a7a8a" />
      </mesh>
      <mesh position={[6, 1.5, -8]} castShadow>
        <boxGeometry args={[4, 3, 3]} />
        <meshStandardMaterial color="#7a8a9a" />
      </mesh>
      <mesh position={[6, 1.5, 4]} castShadow>
        <boxGeometry args={[4, 3, 3]} />
        <meshStandardMaterial color="#7a8a9a" />
      </mesh>
    </group>
  )
}

function ControlTower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 2, 16, 8]} />
        <meshStandardMaterial color="#7a8a9a" />
      </mesh>
      <mesh position={[0, 17, 0]} castShadow>
        <cylinderGeometry args={[3, 2.5, 3, 8]} />
        <meshStandardMaterial color="#a0d4f0" transparent opacity={0.6} metalness={0.7} roughness={0.1} />
      </mesh>
      <mesh position={[0, 18.8, 0]} castShadow>
        <cylinderGeometry args={[3.2, 3.2, 0.5, 8]} />
        <meshStandardMaterial color="#506070" />
      </mesh>
      <mesh position={[0, 20.5, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 3, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, 22.2, 0]}>
        <sphereGeometry args={[0.15, 6, 6]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

function Hangar({ position, width = 20, height = 8 }: { position: [number, number, number]; width?: number; height?: number }) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, 15]} />
        <meshStandardMaterial color="#6a7a8a" />
      </mesh>
      <mesh position={[0, height, 0]} castShadow>
        <boxGeometry args={[width + 1, 1, 16]} />
        <meshStandardMaterial color="#506070" />
      </mesh>
      <mesh position={[width / 2 + 0.05, height / 2, 0]}>
        <boxGeometry args={[0.2, height - 1, 12]} />
        <meshStandardMaterial color="#4a5a6a" />
      </mesh>
    </group>
  )
}

function FuelTank({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 3, 0]} castShadow>
        <cylinderGeometry args={[2.5, 2.5, 6, 12]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 2, 1, Math.sin(angle) * 2]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 2, 4]} />
            <meshStandardMaterial color="#555" />
          </mesh>
        )
      })}
    </group>
  )
}

function AirportBuilding({ position, size, color }: { position: [number, number, number]; size: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <mesh position={[0, size[1] / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
      {size[1] > 4 && (
        <mesh position={[size[0] / 2 + 0.01, size[1] * 0.6, 0]}>
          <boxGeometry args={[0.1, size[1] * 0.3, size[2] * 0.8]} />
          <meshStandardMaterial color="#2a3a4a" metalness={0.5} />
        </mesh>
      )}
    </group>
  )
}

function ParkingLot({ position, size }: { position: [number, number, number]; size: [number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={size} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      {useMemo(() => {
        const lines: [number, number, number][] = []
        const count = Math.floor(size[0] / 3)
        for (let i = 0; i < count; i++) {
          const x = -size[0] / 2 + 1.5 + i * 3
          lines.push([x, 0.04, 0])
        }
        return lines.map((pos, i) => (
          <mesh key={i} position={pos} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.1, size[1] * 0.8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        ))
      }, [size])}
    </group>
  )
}

function Fence({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const dx = end[0] - start[0]
  const dz = end[2] - start[2]
  const length = Math.sqrt(dx * dx + dz * dz)
  const angle = Math.atan2(dx, dz)
  const midX = (start[0] + end[0]) / 2
  const midZ = (start[2] + end[2]) / 2

  return (
    <group position={[midX, 1.5, midZ]} rotation={[0, angle, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.1, 3, length]} />
        <meshStandardMaterial color="#888" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

// ============================================================
// CITY BUILDINGS (GLTF models from Downtown City MegaKit)
// ============================================================

const MODEL_PATHS = [
  '/models/buildings/Building_Large_2.gltf',
  '/models/buildings/Building_Medium_2_001.gltf',
  '/models/buildings/Building_Small_1.gltf',
]

function CityBuildingInstances() {
  const gltf0 = useGLTF(MODEL_PATHS[0])
  const gltf1 = useGLTF(MODEL_PATHS[1])
  const gltf2 = useGLTF(MODEL_PATHS[2])
  const gltfs = [gltf0, gltf1, gltf2]

  const GRAY_COLORS = ['#7a8a9a', '#6a7a8a', '#8a9aaa', '#5a6a7a', '#9aaaba', '#6b7b8b', '#7888a0']

  // Generate city building placements - mix of GLTF models and gray boxes
  const placements = useMemo(() => {
    type BuildingConfig = {
      useModel: boolean
      modelIdx: number
      pos: [number, number, number]
      rotY: number
      scale: number
      // For box buildings
      boxSize?: [number, number, number]
      boxColor?: string
    }
    const configs: BuildingConfig[] = []

    // Dense downtown clusters
    const downtowns = [
      { cx: -160, cz: 170, rows: 7, cols: 5, spacing: 18, skyscraperChance: 0.3 },
      { cx: -200, cz: 210, rows: 5, cols: 4, spacing: 16, skyscraperChance: 0.2 },
      { cx: 210, cz: 190, rows: 7, cols: 5, spacing: 18, skyscraperChance: 0.3 },
      { cx: 240, cz: 230, rows: 5, cols: 4, spacing: 16, skyscraperChance: 0.2 },
      { cx: -240, cz: -190, rows: 5, cols: 4, spacing: 20, skyscraperChance: 0.15 },
      { cx: 290, cz: -140, rows: 5, cols: 4, spacing: 20, skyscraperChance: 0.15 },
      { cx: -110, cz: -290, rows: 4, cols: 4, spacing: 20, skyscraperChance: 0.05 },
      { cx: 160, cz: -340, rows: 4, cols: 4, spacing: 20, skyscraperChance: 0.05 },
    ]

    // Extra scatter buildings around each downtown cluster
    const scatterPerCluster = 10

    // Suburbs
    const suburbs = [
      { cx: -350, cz: 50, n: 10 }, { cx: -320, cz: -100, n: 8 },
      { cx: 350, cz: 50, n: 10 }, { cx: 380, cz: -80, n: 8 },
      { cx: -200, cz: -400, n: 8 }, { cx: 100, cz: -450, n: 6 },
      { cx: -150, cz: 350, n: 10 }, { cx: 250, cz: 380, n: 8 },
    ]

    let idx = 0

    // Dense downtown clusters + scattered filler
    for (const dt of downtowns) {
      for (let r = 0; r < dt.rows; r++) {
        for (let c = 0; c < dt.cols; c++) {
          // Scatter offset is large relative to spacing for a natural feel
          const scatter = dt.spacing * 0.55
          const x = dt.cx + (c - dt.cols / 2) * dt.spacing + (seededRandom(idx * 3) - 0.5) * scatter * 2
          const z = dt.cz + (r - dt.rows / 2) * dt.spacing + (seededRandom(idx * 5) - 0.5) * scatter * 2
          if (Math.abs(x) < 80 && Math.abs(z) < 200) { idx++; continue }

          const useModel = seededRandom(idx * 7) < 0.45
          const scale = 0.25 + seededRandom(idx * 11) * 0.25
          const rotY = seededRandom(idx * 13) * Math.PI * 2 // free rotation
          const isSkyscraper = seededRandom(idx * 19) < dt.skyscraperChance

          if (useModel) {
            const modelIdx = Math.floor(seededRandom(idx * 21) * 3)
            configs.push({ useModel: true, modelIdx, pos: [x, 0, z], rotY, scale })
          } else {
            const w = 6 + seededRandom(idx * 23) * 10
            const h = 5 + seededRandom(idx * 25) * 12
            const d = 6 + seededRandom(idx * 27) * 10
            const color = GRAY_COLORS[Math.floor(seededRandom(idx * 29) * GRAY_COLORS.length)]
            configs.push({ useModel: false, modelIdx: 0, pos: [x, 0, z], rotY, scale: 1, boxSize: [w, h, d], boxColor: color })
          }

          // Skyscraper stacking
          if (isSkyscraper) {
            const stackCount = 2 + Math.floor(seededRandom(idx * 31) * 2)
            for (let f = 1; f < stackCount; f++) {
              const floorH = configs[configs.length - 1].useModel
                ? 16 * configs[configs.length - 1].scale
                : configs[configs.length - 1].boxSize![1]
              const useModelStack = seededRandom(idx * 33 + f) < 0.4
              if (useModelStack) {
                const stackModel = Math.floor(seededRandom(idx * 35 + f) * 3)
                configs.push({
                  useModel: true,
                  modelIdx: stackModel,
                  pos: [x + (seededRandom(idx * 37 + f) - 0.5) * 1, floorH * f, z + (seededRandom(idx * 39 + f) - 0.5) * 1],
                  rotY: seededRandom(idx * 41 + f) * Math.PI * 2,
                  scale: scale * (0.85 + seededRandom(idx * 43 + f) * 0.2),
                })
              } else {
                const sw = 5 + seededRandom(idx * 45 + f) * 8
                const sh = 4 + seededRandom(idx * 47 + f) * 10
                const sd = 5 + seededRandom(idx * 49 + f) * 8
                const sc = GRAY_COLORS[Math.floor(seededRandom(idx * 51 + f) * GRAY_COLORS.length)]
                configs.push({
                  useModel: false,
                  modelIdx: 0,
                  pos: [x + (seededRandom(idx * 37 + f) - 0.5) * 1, floorH * f, z + (seededRandom(idx * 39 + f) - 0.5) * 1],
                  rotY: seededRandom(idx * 41 + f) * Math.PI * 2,
                  scale: 1,
                  boxSize: [sw, sh, sd],
                  boxColor: sc,
                })
              }
            }
          }
          idx++
        }
      }

      // Scatter extra buildings loosely around the cluster
      for (let s = 0; s < scatterPerCluster; s++) {
        const sx = dt.cx + (seededRandom(idx * 53) - 0.5) * dt.spacing * (dt.cols + 1)
        const sz = dt.cz + (seededRandom(idx * 57) - 0.5) * dt.spacing * (dt.rows + 1)
        if (Math.abs(sx) < 80 && Math.abs(sz) < 200) { idx++; continue }

        const useModel = seededRandom(idx * 59) < 0.4
        const rotY = seededRandom(idx * 61) * Math.PI * 2
        if (useModel) {
          const modelIdx = Math.floor(seededRandom(idx * 63) * 3)
          const sc = 0.2 + seededRandom(idx * 65) * 0.2
          configs.push({ useModel: true, modelIdx, pos: [sx, 0, sz], rotY, scale: sc })
        } else {
          const w = 5 + seededRandom(idx * 67) * 10
          const h = 4 + seededRandom(idx * 69) * 10
          const d = 5 + seededRandom(idx * 71) * 10
          const color = GRAY_COLORS[Math.floor(seededRandom(idx * 73) * GRAY_COLORS.length)]
          configs.push({ useModel: false, modelIdx: 0, pos: [sx, 0, sz], rotY, scale: 1, boxSize: [w, h, d], boxColor: color })
        }
        idx++
      }
    }

    // Sparse suburbs
    for (const sub of suburbs) {
      for (let i = 0; i < sub.n; i++) {
        const x = sub.cx + (seededRandom(idx * 3) - 0.5) * 100
        const z = sub.cz + (seededRandom(idx * 5) - 0.5) * 100
        if (Math.abs(x) < 80 && Math.abs(z) < 200) { idx++; continue }

        const useModel = seededRandom(idx * 7) < 0.4
        const rotY = seededRandom(idx * 13) * Math.PI * 2

        if (useModel) {
          const modelIdx = Math.floor(seededRandom(idx * 11) * 3)
          const scale = 0.2 + seededRandom(idx * 15) * 0.2
          configs.push({ useModel: true, modelIdx, pos: [x, 0, z], rotY, scale })
        } else {
          const w = 5 + seededRandom(idx * 17) * 8
          const h = 4 + seededRandom(idx * 19) * 8
          const d = 5 + seededRandom(idx * 21) * 8
          const color = GRAY_COLORS[Math.floor(seededRandom(idx * 23) * GRAY_COLORS.length)]
          configs.push({ useModel: false, modelIdx: 0, pos: [x, 0, z], rotY, scale: 1, boxSize: [w, h, d], boxColor: color })
        }
        idx++
      }
    }

    return configs
  }, [])

  // Pre-clone GLTF building instances
  const modelInstances = useMemo(() => {
    return placements
      .filter((p) => p.useModel)
      .map((p, i) => {
        const srcScene = gltfs[p.modelIdx].scene
        const cloned = srcScene.clone(true)
        cloned.traverse((child: THREE.Object3D) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh
            mesh.castShadow = true
            mesh.receiveShadow = true
          }
        })
        return { object: cloned, pos: p.pos, rotY: p.rotY, scale: p.scale, key: i }
      })
  }, [gltfs, placements])

  // Separate box buildings
  const boxBuildings = useMemo(() => {
    return placements
      .filter((p) => !p.useModel)
      .map((p, i) => ({
        pos: p.pos,
        size: p.boxSize!,
        color: p.boxColor!,
        key: i,
      }))
  }, [placements])

  return (
    <group>
      {/* GLTF model buildings */}
      {modelInstances.map((inst) => (
        <primitive
          key={`model-${inst.key}`}
          object={inst.object}
          position={inst.pos}
          rotation={[0, inst.rotY, 0]}
          scale={inst.scale}
        />
      ))}
      {/* Gray geometric buildings */}
      {boxBuildings.map((b) => (
        <mesh key={`box-${b.key}`} position={[b.pos[0], b.size[1] / 2, b.pos[2]]} rotation={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={b.size} />
          <meshStandardMaterial color={b.color} />
        </mesh>
      ))}
    </group>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CityBuildings() {
  return (
    <group>
      {/* === AIRPORT COMPLEX (left/west side of runway) === */}

      <Terminal position={[-40, 0, 0]} />
      <ControlTower position={[-55, 0, -20]} />
      <Hangar position={[-50, 0, 60]} width={20} height={9} />
      <Hangar position={[-50, 0, 100]} width={16} height={7} />
      <AirportBuilding position={[-55, 0, 140]} size={[15, 5, 10]} color="#6a7a8a" />
      <AirportBuilding position={[-40, 0, -80]} size={[10, 4, 8]} color="#7a8a9a" />
      <AirportBuilding position={[-40, 0, -120]} size={[12, 5, 8]} color="#9a4a4a" />
      <FuelTank position={[-65, 0, 160]} />
      <FuelTank position={[-72, 0, 155]} />
      <ParkingLot position={[-60, 0, 0]} size={[15, 20]} />
      <AirportBuilding position={[-70, 0, 30]} size={[12, 8, 10]} color="#6a7080" />
      <AirportBuilding position={[-70, 0, -50]} size={[10, 10, 8]} color="#7a8a9a" />
      <AirportBuilding position={[-45, 0, -50]} size={[8, 3, 6]} color="#8a7a6a" />
      <Hangar position={[-55, 0, 180]} width={18} height={7} />
      <AirportBuilding position={[-75, 0, 100]} size={[8, 6, 6]} color="#5a5a6a" />

      {/* === AIRPORT COMPLEX (right/east side) === */}

      <AirportBuilding position={[40, 0, 20]} size={[8, 4, 15]} color="#8a9aaa" />
      <Hangar position={[45, 0, -60]} width={14} height={6} />
      <AirportBuilding position={[40, 0, -100]} size={[10, 5, 8]} color="#6a7a8a" />
      <AirportBuilding position={[45, 0, 60]} size={[10, 4, 12]} color="#8a9aaa" />
      <AirportBuilding position={[50, 0, -130]} size={[8, 5, 10]} color="#7a8a9a" />
      <AirportBuilding position={[45, 0, 100]} size={[12, 4, 8]} color="#6a7a8a" />
      <Hangar position={[50, 0, 140]} width={12} height={5} />
      <ParkingLot position={[60, 0, 0]} size={[12, 16]} />
      <FuelTank position={[70, 0, -160]} />

      {/* Perimeter fences */}
      <Fence start={[-90, 0, -200]} end={[-90, 0, 200]} />
      <Fence start={[90, 0, -200]} end={[90, 0, 200]} />
      <Fence start={[-90, 0, -200]} end={[90, 0, -200]} />
      <Fence start={[-90, 0, 200]} end={[90, 0, 200]} />

      {/* Service roads */}
      <mesh position={[-35, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3, 400]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>
      <mesh position={[35, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3, 300]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>
      <mesh position={[0, 0.04, -150]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 3]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>
      <mesh position={[0, 0.04, 150]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 3]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>

      {/* City buildings using GLTF models */}
      <CityBuildingInstances />
    </group>
  )
}
