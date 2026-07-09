import { create } from 'zustand'
import * as THREE from 'three'
import { GamePhase, FlightState, LandingScore } from '../types/game'
import { updateFlight, getGroundHeight } from '../utils/flightPhysics'

interface GameStore {
  // Game state
  gamePhase: GamePhase
  setGamePhase: (phase: GamePhase) => void

  // Flight state
  position: THREE.Vector3
  rotation: THREE.Euler
  speed: number
  altitude: number
  heading: number
  verticalSpeed: number
  throttle: number
  gearDeployed: boolean
  brakes: boolean

  // Input
  mouseX: number
  mouseY: number
  yawInput: number
  setMouseInput: (x: number, y: number) => void
  setYawInput: (y: number) => void

  // Actions
  startGame: () => void
  resetFlight: () => void
  toggleGear: () => void
  setThrottle: (t: number) => void
  toggleBrakes: () => void

  // Landing
  landingScore: LandingScore | null
  setLandingScore: (score: LandingScore) => void

  // Physics update
  updatePhysics: (delta: number) => void
}

const INITIAL_POSITION = new THREE.Vector3(0, 200, -400)
const INITIAL_ROTATION = new THREE.Euler(0, 0, 0)

function createInitialFlightState() {
  return {
    position: INITIAL_POSITION.clone(),
    rotation: INITIAL_ROTATION.clone(),
    speed: 30,
    altitude: 250,
    heading: 0,
    verticalSpeed: 0,
    throttle: 0.5,
    gearDeployed: false,
    brakes: false,
  }
}

export const useGameStore = create<GameStore>((set, get) => ({
  gamePhase: 'menu',
  setGamePhase: (phase) => set({ gamePhase: phase }),

  ...createInitialFlightState(),

  mouseX: 0,
  mouseY: 0,
  yawInput: 0,
  setMouseInput: (x, y) => set({ mouseX: x, mouseY: y }),
  setYawInput: (y) => set({ yawInput: y }),

  startGame: () => {
    const init = createInitialFlightState()
    set({
      gamePhase: 'playing',
      position: init.position,
      rotation: init.rotation,
      speed: init.speed,
      altitude: init.altitude,
      heading: init.heading,
      verticalSpeed: init.verticalSpeed,
      throttle: init.throttle,
      gearDeployed: init.gearDeployed,
      brakes: init.brakes,
      landingScore: null,
    })
  },

  resetFlight: () => {
    const init = createInitialFlightState()
    set({
      position: init.position,
      rotation: init.rotation,
      speed: init.speed,
      altitude: init.altitude,
      heading: init.heading,
      verticalSpeed: init.verticalSpeed,
      throttle: init.throttle,
      gearDeployed: init.gearDeployed,
      brakes: init.brakes,
      landingScore: null,
      gamePhase: 'playing',
    })
  },

  toggleGear: () => set((s) => ({ gearDeployed: !s.gearDeployed })),

  setThrottle: (t) => set({ throttle: THREE.MathUtils.clamp(t, 0, 1) }),

  toggleBrakes: () => set((s) => ({ brakes: !s.brakes })),

  landingScore: null,
  setLandingScore: (score) => set({ landingScore: score }),

  updatePhysics: (delta: number) => {
    const state = get()
    if (state.gamePhase !== 'playing') return

    const flightState: FlightState = {
      position: state.position.clone(),
      rotation: state.rotation.clone(),
      speed: state.speed,
      altitude: state.altitude,
      heading: state.heading,
      verticalSpeed: state.verticalSpeed,
      throttle: state.throttle,
      gearDeployed: state.gearDeployed,
    }

    // Apply brakes
    if (state.brakes && flightState.speed > 0) {
      flightState.speed *= 0.98
    }

    const result = updateFlight(flightState, delta, state.mouseX, state.mouseY, state.yawInput)

    // Clear input after applying
    set({
      position: flightState.position,
      rotation: flightState.rotation,
      speed: flightState.speed,
      altitude: flightState.altitude,
      heading: flightState.heading,
      verticalSpeed: flightState.verticalSpeed,
      mouseX: 0,
      mouseY: 0,
      yawInput: 0,
    })

    if (result.landed || result.crashed) {
      // Calculate landing score
      const onRunway = Math.abs(flightState.position.x) < 20 &&
        flightState.position.z > -200 && flightState.position.z < 200

      const speedKnots = flightState.speed * 1.94384

      let alignmentScore = 100
      if (Math.abs(flightState.position.x) > 5) {
        alignmentScore = Math.max(0, 100 - Math.abs(flightState.position.x) * 5)
      }

      const speedScore = Math.max(0, 100 - Math.abs(speedKnots - 65) * 2)
      const vsScore = Math.max(0, 100 - Math.abs(flightState.verticalSpeed) * 15)
      const gearScore = flightState.gearDeployed ? 100 : 0

      const totalScore = result.crashed ? 0 : Math.round(
        (speedScore * 0.3 + vsScore * 0.3 + gearScore * 0.2 + alignmentScore * 0.2)
      )

      set({
        gamePhase: 'landed',
        landingScore: {
          speed: speedKnots,
          verticalSpeed: flightState.verticalSpeed,
          gearDeployed: flightState.gearDeployed,
          onRunway,
          alignmentScore,
          totalScore,
        },
      })
    }
  },
}))
