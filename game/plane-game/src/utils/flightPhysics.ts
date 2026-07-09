import * as THREE from 'three'
import { FlightState } from '../types/game'

const GRAVITY = 9.8
const LIFT_FACTOR = 0.12
const THRUST_ACCEL = 28
const DRAG_COEFF = 0.0008
const PITCH_RATE = 4.0
const ROLL_RATE = 6.0
const YAW_RATE = 2.5
const ROLL_TO_YAW = 2.0
const MIN_SPEED = 0
const MAX_SPEED = 200
const MAX_PITCH = Math.PI / 3
const MAX_ROLL = Math.PI / 2.5
const ROLL_DAMPING = 0.92
const PITCH_DAMPING = 0.9

const _forward = new THREE.Vector3()
const _up = new THREE.Vector3()
const _right = new THREE.Vector3()

export function updateFlight(
  state: FlightState,
  delta: number,
  deltaX: number,
  deltaY: number,
  yawInput: number = 0
): { crashed: boolean; landed: boolean; onGround: boolean } {
  // Clamp delta to avoid huge jumps
  const dt = Math.min(delta, 0.05)

  // Apply mouse input to rotation
  state.rotation.x += deltaY * PITCH_RATE * dt
  state.rotation.z += deltaX * ROLL_RATE * dt

  // Apply keyboard yaw (A/D keys)
  state.rotation.y += yawInput * YAW_RATE * dt

  // Clamp roll angle
  state.rotation.z = THREE.MathUtils.clamp(state.rotation.z, -MAX_ROLL, MAX_ROLL)

  // Damping on pitch and roll
  if (Math.abs(deltaX) < 0.001) {
    state.rotation.z *= ROLL_DAMPING
  }
  if (Math.abs(deltaY) < 0.001) {
    state.rotation.x *= PITCH_DAMPING
  }

  // Clamp pitch
  state.rotation.x = THREE.MathUtils.clamp(state.rotation.x, -MAX_PITCH, MAX_PITCH)

  // Banking causes yaw (coordinated turn) - stronger effect
  state.rotation.y += Math.sin(state.rotation.z) * ROLL_TO_YAW * dt

  // Speed update: thrust vs drag
  const thrust = state.throttle * THRUST_ACCEL
  const drag = state.speed * state.speed * DRAG_COEFF
  state.speed += (thrust - drag) * dt
  state.speed = THREE.MathUtils.clamp(state.speed, MIN_SPEED, MAX_SPEED)

  // Compute forward direction from rotation
  _forward.set(0, 0, 1).applyEuler(state.rotation)
  _up.set(0, 1, 0).applyEuler(state.rotation)
  _right.set(1, 0, 0).applyEuler(state.rotation)

  // Lift based on speed
  const lift = state.speed * LIFT_FACTOR
  const netVertical = lift - GRAVITY

  // Move plane along forward direction scaled by speed
  state.position.addScaledVector(_forward, state.speed * dt)

  // Apply vertical force (lift vs gravity)
  state.position.y += netVertical * dt

  // Ground level at position (simplified flat ground)
  const groundY = getGroundHeight(state.position.x, state.position.z)

  let crashed = false
  let landed = false
  let onGround = false

  if (state.position.y <= groundY + 0.5) {
    onGround = true

    // Check landing/crash
    const verticalSpeed = netVertical
    const approachSpeed = state.speed
    const gearOk = state.gearDeployed

    if (Math.abs(state.position.x) < 20 && state.position.z > -200 && state.position.z < 200) {
      // On or near runway
      if (approachSpeed < 80 && Math.abs(verticalSpeed) < 8 && gearOk && Math.abs(state.rotation.z) < 0.3) {
        landed = true
        state.speed *= 0.95
      } else {
        crashed = true
      }
    } else {
      // Off runway - check if gentle enough
      if (approachSpeed < 50 && Math.abs(verticalSpeed) < 4 && gearOk) {
        landed = true
        state.speed *= 0.9
      } else if (Math.abs(verticalSpeed) > 5 || approachSpeed > 80) {
        crashed = true
      } else {
        landed = true
        state.speed *= 0.85
      }
    }

    state.position.y = groundY + 0.5
    if (state.speed < 5) {
      state.speed = 0
    }
  }

  // Update display values
  state.altitude = state.position.y
  state.verticalSpeed = netVertical
  state.heading = ((THREE.MathUtils.radToDeg(state.rotation.y) % 360) + 360) % 360

  return { crashed, landed, onGround }
}

export function getGroundHeight(x: number, z: number): number {
  // Simple terrain height: flat near runway, hills elsewhere
  const distFromOrigin = Math.sqrt(x * x + z * z)

  // Runway area is flat
  if (Math.abs(x) < 25 && Math.abs(z) < 250) {
    return 0
  }

  // Hills using simple sine-based noise
  let h = 0
  h += Math.sin(x * 0.005) * Math.cos(z * 0.005) * 15
  h += Math.sin(x * 0.012 + 1.5) * Math.cos(z * 0.008 + 0.7) * 8
  h += Math.sin(x * 0.025 + 3.2) * Math.cos(z * 0.018 + 2.1) * 4

  // Water areas (low spots)
  const waterLevel = -2
  if (h < waterLevel) h = waterLevel

  return Math.max(0, h)
}

export function knotsFromMps(mps: number): number {
  return mps * 1.94384
}
