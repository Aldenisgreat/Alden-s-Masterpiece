import { useMemo } from 'react'
import * as THREE from 'three'

function CenterLine() {
  const dashes = useMemo(() => {
    const result: [number, number, number][] = []
    for (let i = -18; i <= 18; i++) {
      if (i % 2 === 0) {
        result.push([0, 0.02, i * 10])
      }
    }
    return result
  }, [])

  return (
    <group>
      {dashes.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[0.4, 6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  )
}

function EdgeLines() {
  return (
    <group>
      {/* Left edge */}
      <mesh position={[-10, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.3, 360]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Right edge */}
      <mesh position={[10, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.3, 360]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

function TouchdownZone() {
  const markings = useMemo(() => {
    const result: [number, number, number][] = []
    // Touchdown zone stripes near each end
    for (let i = 0; i < 4; i++) {
      const z = -160 + i * 8
      result.push([-4, 0.02, z])
      result.push([4, 0.02, z])
    }
    for (let i = 0; i < 4; i++) {
      const z = 160 - i * 8
      result.push([-4, 0.02, z])
      result.push([4, 0.02, z])
    }
    return result
  }, [])

  return (
    <group>
      {markings.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[1.5, 3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  )
}

function ThresholdMarkings() {
  const stripes = useMemo(() => {
    const result: [number, number, number][] = []
    for (let i = -4; i <= 4; i++) {
      result.push([i * 1.5, 0.02, -175])
      result.push([i * 1.5, 0.02, 175])
    }
    return result
  }, [])

  return (
    <group>
      {stripes.map((pos, i) => (
        <mesh key={i} position={pos} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[0.8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  )
}

function RunwayLights() {
  const lights = useMemo(() => {
    const result: [number, number, number][] = []
    // Edge lights along both sides
    for (let i = -17; i <= 17; i++) {
      result.push([-11, 0.3, i * 10])
      result.push([11, 0.3, i * 10])
    }
    // Approach lights at each end
    for (let i = -2; i <= 2; i++) {
      result.push([i * 3, 0.3, -185])
      result.push([i * 3, 0.3, 185])
    }
    return result
  }, [])

  return (
    <group>
      {lights.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.15, 6, 6]} />
          <meshStandardMaterial color="#ffffaa" emissive="#ffffaa" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  )
}

export default function Runway() {
  return (
    <group>
      {/* Runway surface */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 360]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.8} />
      </mesh>

      {/* Shoulder strips */}
      <mesh position={[-12, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4, 360]} />
        <meshStandardMaterial color="#5a5a4a" roughness={0.9} />
      </mesh>
      <mesh position={[12, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4, 360]} />
        <meshStandardMaterial color="#5a5a4a" roughness={0.9} />
      </mesh>

      {/* Taxiway */}
      <mesh position={[25, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 80]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.85} />
      </mesh>
      {/* Taxiway connector */}
      <mesh position={[17.5, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 20]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.85} />
      </mesh>

      <CenterLine />
      <EdgeLines />
      <TouchdownZone />
      <ThresholdMarkings />
      <RunwayLights />
    </group>
  )
}
