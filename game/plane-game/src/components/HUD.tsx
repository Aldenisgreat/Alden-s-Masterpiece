import { useGameStore } from '../stores/gameStore'
import { knotsFromMps } from '../utils/flightPhysics'

export default function HUD() {
  const speed = useGameStore((s) => s.speed)
  const altitude = useGameStore((s) => s.altitude)
  const throttle = useGameStore((s) => s.throttle)
  const gearDeployed = useGameStore((s) => s.gearDeployed)
  const heading = useGameStore((s) => s.heading)
  const verticalSpeed = useGameStore((s) => s.verticalSpeed)
  const brakes = useGameStore((s) => s.brakes)

  const speedKnots = Math.round(knotsFromMps(speed))
  const altFeet = Math.round(altitude * 3.281)
  const vsFpm = Math.round(verticalSpeed * 196.85)

  const panelBg = 'rgba(0,0,0,0.6)'

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      {/* Heading */}
      <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', background: panelBg, color: '#fff', padding: '8px 16px', borderRadius: 8 }}>
        <div style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>HDG</div>
        <div style={{ fontSize: 22, fontFamily: 'monospace', fontWeight: 'bold', textAlign: 'center' }}>{Math.round(heading).toString().padStart(3, '0')}°</div>
      </div>

      {/* Left panel - Speed & Throttle */}
      <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: panelBg, color: '#fff', padding: 12, borderRadius: 8, width: 110 }}>
        <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>KIAS</div>
        <div style={{ fontSize: 32, fontFamily: 'monospace', fontWeight: 'bold' }}>{speedKnots}</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 8, marginBottom: 4 }}>THR</div>
        <div style={{ width: '100%', background: '#374151', borderRadius: 4, height: 8 }}>
          <div style={{ width: `${throttle * 100}%`, background: '#22c55e', height: 8, borderRadius: 4, transition: 'width 0.1s' }} />
        </div>
        <div style={{ fontSize: 11, textAlign: 'center', marginTop: 4 }}>{Math.round(throttle * 100)}%</div>
      </div>

      {/* Right panel - Altitude & VS */}
      <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: panelBg, color: '#fff', padding: 12, borderRadius: 8, width: 110 }}>
        <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>ALT ft</div>
        <div style={{ fontSize: 32, fontFamily: 'monospace', fontWeight: 'bold' }}>{altFeet}</div>
        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 8, marginBottom: 4 }}>VS fpm</div>
        <div style={{ fontSize: 18, fontFamily: 'monospace', fontWeight: 'bold', color: vsFpm > 0 ? '#4ade80' : '#f87171' }}>
          {vsFpm > 0 ? '+' : ''}{vsFpm}
        </div>
      </div>

      {/* Bottom center - Gear & Brakes */}
      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 12 }}>
        <div style={{ padding: '4px 12px', borderRadius: 4, fontFamily: 'monospace', fontSize: 14, fontWeight: 'bold', color: '#fff', background: gearDeployed ? '#16a34a' : '#dc2626' }}>
          GEAR {gearDeployed ? 'DOWN' : 'UP'}
        </div>
        {brakes && (
          <div style={{ padding: '4px 12px', borderRadius: 4, fontFamily: 'monospace', fontSize: 14, fontWeight: 'bold', color: '#fff', background: '#ca8a04' }}>
            BRAKES
          </div>
        )}
      </div>

      {/* Controls hint */}
      <div style={{ position: 'absolute', bottom: 16, left: 16, color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
        <div>W/Space: Throttle up | S/Shift: Throttle down</div>
        <div>A/D or Arrows: Turn left/right | Mouse: Pitch & Roll</div>
        <div>G: Gear | R: Reset | B: Brakes</div>
      </div>

      {/* Crosshair */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div style={{ width: 24, height: 2, background: 'rgba(255,255,255,0.3)', position: 'absolute', left: -12, top: -1 }} />
        <div style={{ width: 2, height: 24, background: 'rgba(255,255,255,0.3)', position: 'absolute', left: -1, top: -12 }} />
        <div style={{ width: 10, height: 10, border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', position: 'absolute', left: -5, top: -5 }} />
      </div>
    </div>
  )
}