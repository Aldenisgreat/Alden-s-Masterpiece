import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

function Clouds() {
  const clouds = useMemo(() => {
    const result: { pos: [number, number, number]; scale: [number, number, number]; opacity: number }[] = []
    for (let i = 0; i < 8; i++) {
      const x = (Math.sin(i * 127.1) * 43758.5453 % 1 - 0.5) * 2000
      const z = (Math.sin(i * 311.7) * 43758.5453 % 1 - 0.5) * 2000
      const y = 150 + (Math.sin(i * 73.1) * 100)
      const scaleX = 20 + Math.abs(Math.sin(i * 43.7)) * 60
      const scaleY = 5 + Math.abs(Math.sin(i * 29.3)) * 10
      const scaleZ = 15 + Math.abs(Math.sin(i * 67.1)) * 40
      const opacity = 0.3 + Math.abs(Math.sin(i * 53.9)) * 0.4
      result.push({
        pos: [x, y, z],
        scale: [scaleX, scaleY, scaleZ],
        opacity,
      })
    }
    return result
  }, [])

  return (
    <group>
      {clouds.map((cloud, i) => (
        <mesh key={i} position={cloud.pos} scale={cloud.scale}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={cloud.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function SkyDome() {
  const meshRef = useRef<THREE.Mesh>(null)

  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 2
    canvas.height = 256
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createLinearGradient(0, 0, 0, 256)
    gradient.addColorStop(0, '#0a1628')
    gradient.addColorStop(0.2, '#1a3a6a')
    gradient.addColorStop(0.4, '#4a8ac0')
    gradient.addColorStop(0.6, '#7ab8e8')
    gradient.addColorStop(0.8, '#a0d4f0')
    gradient.addColorStop(1.0, '#c8e8f8')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 2, 256)
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[4000, 16, 16]} />
      <meshBasicMaterial map={gradientTexture} side={THREE.BackSide} />
    </mesh>
  )
}

function Sun() {
  return (
    <group position={[500, 400, 300]}>
      <mesh>
        <sphereGeometry args={[20, 16, 16]} />
        <meshBasicMaterial color="#fff5cc" />
      </mesh>
      <pointLight color="#fff5cc" intensity={2} distance={3000} />
    </group>
  )
}

export default function Sky() {
  return (
    <group>
      <SkyDome />
      <Clouds />
      <Sun />
      <fog attach="fog" args={['#a0d4f0', 300, 2000]} />
    </group>
  )
}
