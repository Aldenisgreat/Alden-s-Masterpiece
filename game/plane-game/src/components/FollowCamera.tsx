import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../stores/gameStore'

const CAMERA_OFFSET = new THREE.Vector3(0, 5, -25)
const LOOK_AHEAD = new THREE.Vector3(0, 2, 20)
const LERP_SPEED = 3

export default function FollowCamera() {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())

  useFrame((_, delta) => {
    const state = useGameStore.getState()
    if (state.gamePhase !== 'playing' && state.gamePhase !== 'landed') return

    const pos = state.position
    const rot = state.rotation

    // Compute desired camera position (behind and above the plane)
    const offset = CAMERA_OFFSET.clone().applyEuler(rot)
    const desiredPos = pos.clone().add(offset)
    desiredPos.y = Math.max(desiredPos.y, 5)

    // Compute look-at point (ahead of the plane)
    const lookOffset = LOOK_AHEAD.clone().applyEuler(rot)
    const desiredLookAt = pos.clone().add(lookOffset)

    // Smooth interpolation
    const t = 1 - Math.exp(-LERP_SPEED * delta)
    targetPos.current.lerp(desiredPos, t)
    targetLookAt.current.lerp(desiredLookAt, t)

    camera.position.copy(targetPos.current)
    camera.lookAt(targetLookAt.current)
  })

  return null
}
