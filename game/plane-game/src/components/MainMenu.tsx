import { useGameStore } from '../stores/gameStore'

export default function MainMenu() {
  const startGame = useGameStore((s) => s.startGame)

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #0a1628 0%, #1a3a6a 25%, #4a8ac0 50%, #7ab8e8 70%, #a0d4f0 85%, #e8c87a 95%, #f0a050 100%)',
    }}>
      {/* Sun glow */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #fff5cc 0%, #f0a050 40%, transparent 70%)',
        boxShadow: '0 0 60px 30px rgba(240,160,80,0.4)',
      }} />

      {/* Cloud silhouettes */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 200, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.15)' }} />
      <div style={{ position: 'absolute', top: '30%', right: '15%', width: 160, height: 35, borderRadius: 20, background: 'rgba(255,255,255,0.12)' }} />
      <div style={{ position: 'absolute', top: '40%', left: '20%', width: 180, height: 30, borderRadius: 20, background: 'rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', top: '25%', left: '50%', width: 140, height: 25, borderRadius: 20, background: 'rgba(255,255,255,0.08)' }} />

      {/* Plane silhouette */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '30%',
        fontSize: 40,
        color: 'rgba(255,255,255,0.3)',
        transform: 'rotate(-10deg)',
      }}>
        ✈
      </div>

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: 8,
            textShadow: '0 0 20px rgba(147,197,253,0.8), 0 0 40px rgba(147,197,253,0.4), 0 4px 8px rgba(0,0,0,0.5)',
            fontFamily: 'Georgia, serif',
            margin: 0,
          }}>
            SKY <span style={{ color: '#93c5fd' }}>TOUCHDOWN</span>
          </h1>
          <p style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: 6,
            textTransform: 'uppercase',
            fontFamily: 'Georgia, serif',
            marginTop: 8,
          }}>
            3D Plane Landing Simulator
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={startGame}
          style={{
            padding: '18px 60px',
            fontSize: 22,
            fontWeight: 700,
            color: '#ffffff',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            border: '2px solid rgba(147,197,253,0.5)',
            borderRadius: 12,
            cursor: 'pointer',
            letterSpacing: 4,
            textTransform: 'uppercase',
            fontFamily: 'Georgia, serif',
            boxShadow: '0 0 30px rgba(37,99,235,0.5), 0 8px 32px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 0 50px rgba(37,99,235,0.8), 0 12px 40px rgba(0,0,0,0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(37,99,235,0.5), 0 8px 32px rgba(0,0,0,0.3)'
          }}
        >
          Start Flight
        </button>

        {/* Controls Panel */}
        <div style={{
          marginTop: 50,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          padding: '24px 32px',
          border: '1px solid rgba(147,197,253,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}>
          <h3 style={{
            color: '#93c5fd',
            fontSize: 14,
            letterSpacing: 4,
            textTransform: 'uppercase',
            fontFamily: 'Georgia, serif',
            textAlign: 'center',
            marginBottom: 16,
          }}>
            Controls
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 40px' }}>
            {[
              ['W / Space', 'Throttle Up'],
              ['S / Shift', 'Throttle Down'],
              ['A / D', 'Turn Left / Right'],
              ['Mouse', 'Pitch & Roll'],
              ['G', 'Toggle Gear'],
              ['R', 'Reset Position'],
            ].map(([key, action]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  background: 'rgba(147,197,253,0.15)',
                  border: '1px solid rgba(147,197,253,0.3)',
                  borderRadius: 6,
                  padding: '4px 10px',
                  fontSize: 13,
                  fontFamily: 'monospace',
                  color: '#93c5fd',
                  minWidth: 80,
                  textAlign: 'center',
                }}>
                  {key}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'Georgia, serif' }}>
                  {action}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p style={{
          position: 'absolute',
          bottom: 24,
          color: 'rgba(255,255,255,0.3)',
          fontSize: 12,
          fontFamily: 'Georgia, serif',
          letterSpacing: 2,
        }}>
          Deploy gear before landing • Approach the runway at 60-80 knots
        </p>
      </div>
    </div>
  )
}