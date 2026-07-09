import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../stores/gameStore'

interface PlaneProps {
  gearDeployed: boolean
  throttle: number
}

export default function Plane({ gearDeployed, throttle }: PlaneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const beaconRef = useRef<THREE.Mesh>(null)
  const engineGlow1Ref = useRef<THREE.Mesh>(null)
  const engineGlow2Ref = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const state = useGameStore.getState()
    groupRef.current.position.copy(state.position)
    groupRef.current.rotation.copy(state.rotation)

    timeRef.current += delta

    if (beaconRef.current) {
      const blink = Math.sin(timeRef.current * 4) > 0 ? 1.0 : 0.1
      const mat = beaconRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = blink
    }

    const showGlow = throttle > 0.5
    if (engineGlow1Ref.current) {
      engineGlow1Ref.current.visible = showGlow
      if (showGlow) {
        const mat = engineGlow1Ref.current.material as THREE.MeshStandardMaterial
        mat.emissiveIntensity = 0.5 + throttle * 1.5
      }
    }
    if (engineGlow2Ref.current) {
      engineGlow2Ref.current.visible = showGlow
      if (showGlow) {
        const mat = engineGlow2Ref.current.material as THREE.MeshStandardMaterial
        mat.emissiveIntensity = 0.5 + throttle * 1.5
      }
    }
  })

  return (
    <group ref={groupRef}>
      {/* Fuselage */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 1.5, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Nose cone */}
      <mesh position={[0, 0, 3.5]} castShadow>
        <coneGeometry args={[0.75, 2, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Wings */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[12, 0.15, 2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Wing tips */}
      <mesh position={[6.2, 0.1, 0]} rotation={[0, 0, -0.1]} castShadow>
        <boxGeometry args={[0.6, 0.1, 1.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-6.2, 0.1, 0]} rotation={[0, 0, 0.1]} castShadow>
        <boxGeometry args={[0.6, 0.1, 1.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Vertical stabilizer */}
      <mesh position={[0, 1.2, -2.8]} castShadow>
        <boxGeometry args={[0.1, 2.0, 1.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Horizontal stabilizers */}
      <mesh position={[0, 0, -3]} castShadow>
        <boxGeometry args={[4, 0.1, 1.2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Engine 1 (right wing) */}
      <mesh position={[3, -0.3, 0.5]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 1.5, 8]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh ref={engineGlow1Ref} position={[3, -0.3, 1.3]} visible={false}>
        <cylinderGeometry args={[0.25, 0.35, 0.3, 8]} />
        <meshStandardMaterial color="#ff6600" emissive="#ff4400" emissiveIntensity={1} />
      </mesh>

      {/* Engine 2 (left wing) */}
      <mesh position={[-3, -0.3, 0.5]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 1.5, 8]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh ref={engineGlow2Ref} position={[-3, -0.3, 1.3]} visible={false}>
        <cylinderGeometry args={[0.25, 0.35, 0.3, 8]} />
        <meshStandardMaterial color="#ff6600" emissive="#ff4400" emissiveIntensity={1} />
      </mesh>

      {/* Landing gear - Nose */}
      {gearDeployed && (
        <group position={[0, -1.2, 2.2]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.05, 0.8, 6]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          <mesh position={[0, -0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.15, 0.06, 8, 12]} />
            <meshStandardMaterial color="#222222" />
          </mesh>
        </group>
      )}

      {/* Landing gear - Right main */}
      {gearDeployed && (
        <group position={[1.5, -1.2, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.06, 0.06, 1.0, 6]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          <mesh position={[0, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.2, 0.07, 8, 12]} />
            <meshStandardMaterial color="#222222" />
          </mesh>
        </group>
      )}

      {/* Landing gear - Left main */}
      {gearDeployed && (
        <group position={[-1.5, -1.2, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.06, 0.06, 1.0, 6]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          <mesh position={[0, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.2, 0.07, 8, 12]} />
            <meshStandardMaterial color="#222222" />
          </mesh>
        </group>
      )}

      {/* Red beacon light */}
      <mesh ref={beaconRef} position={[0, 0.85, 0.5]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1} />
      </mesh>
    </group>
  )
}