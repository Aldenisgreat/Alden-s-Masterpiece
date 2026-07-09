import * as THREE from 'three'

export type GamePhase = 'menu' | 'playing' | 'landing' | 'landed'

export interface FlightState {
  position: THREE.Vector3
  rotation: THREE.Euler
  speed: number
  altitude: number
  heading: number
  verticalSpeed: number
  throttle: number
  gearDeployed: boolean
}

export interface LandingScore {
  speed: number
  verticalSpeed: number
  gearDeployed: boolean
  onRunway: boolean
  alignmentScore: number
  totalScore: number
}

export interface InputState {
  deltaX: number
  deltaY: number
}
