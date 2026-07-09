import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../stores/gameStore'
import Sky from './Sky'
import Terrain from './Terrain'
import CityBuildings from './CityBuildings'
import Runway from './Runway'
import Plane from './Plane'
import FollowCamera from './FollowCamera'
import HUD from './HUD'
import MainMenu from './MainMenu'
import LandingResult from './LandingResult'

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} color="#b8d4e8" />
      <directionalLight
        position={[100, 200, 50]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={500}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
        shadow-bias={-0.001}
      />
      <directionalLight position={[-50, 100, -100]} intensity={0.3} color="#87CEEB" />
      <hemisphereLight args={['#87CEEB', '#4a7c3f', 0.4]} />
    </>
  )
}

function PhysicsLoop() {
  const updatePhysics = useGameStore((s) => s.updatePhysics)
  const gamePhase = useGameStore((s) => s.gamePhase)
  const setMouseInput = useGameStore((s) => s.setMouseInput)
  const pointerRef = useRef({ x: 0, y: 0 })
  const yawRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gamePhase !== 'playing') return
      pointerRef.current.x = e.movementX * 0.006
      pointerRef.current.y = e.movementY * 0.006
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const state = useGameStore.getState()
      switch (e.key.toLowerCase()) {
        case 'w':
        case ' ':
          e.preventDefault()
          state.setThrottle(Math.min(1, state.throttle + 0.05))
          break
        case 's':
          e.preventDefault()
          state.setThrottle(Math.max(0, state.throttle - 0.05))
          break
        case 'shift':
          e.preventDefault()
          state.setThrottle(Math.max(0, state.throttle - 0.05))
          break
        case 'g':
          state.toggleGear()
          break
        case 'r':
          state.resetFlight()
          break
        case 'a':
        case 'arrowleft':
          e.preventDefault()
          yawRef.current = -1
          break
        case 'd':
        case 'arrowright':
          e.preventDefault()
          yawRef.current = 1
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'a':
        case 'arrowleft':
          if (yawRef.current < 0) yawRef.current = 0
          break
        case 'd':
        case 'arrowright':
          if (yawRef.current > 0) yawRef.current = 0
          break
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gamePhase])

  useFrame((_, delta) => {
    if (gamePhase !== 'playing') return
    const px = pointerRef.current.x
    const py = pointerRef.current.y
    pointerRef.current.x = 0
    pointerRef.current.y = 0
    setMouseInput(px, py)
    useGameStore.getState().setYawInput(yawRef.current)
    updatePhysics(delta)
  })

  return null
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#666" />
    </mesh>
  )
}

export default function Game() {
  const gamePhase = useGameStore((s) => s.gamePhase)
  const gearDeployed = useGameStore((s) => s.gearDeployed)
  const throttle = useGameStore((s) => s.throttle)

  const handlePointerLock = () => {
    const canvas = document.querySelector('canvas')
    if (canvas && gamePhase === 'playing') {
      canvas.requestPointerLock()
    }
  }

  useEffect(() => {
    if (gamePhase === 'playing') {
      document.body.requestPointerLock?.()
    }
  }, [gamePhase])

  if (gamePhase === 'menu') return <MainMenu />
  if (gamePhase === 'landed') return <LandingResult />

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }} onClick={handlePointerLock}>
      <Canvas
        shadows
        camera={{ fov: 60, near: 0.1, far: 2000 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#87CEEB' }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <PhysicsLoop />
          <Lighting />
          <Sky />
          <Terrain />
          <CityBuildings />
          <Runway />
          <Plane gearDeployed={gearDeployed} throttle={throttle} />
          <FollowCamera />
        </Suspense>
      </Canvas>
      <HUD />
    </div>
  )
}