import { useGameStore } from '../stores/gameStore'

export default function LandingResult() {
  const landingScore = useGameStore((s) => s.landingScore)
  const resetFlight = useGameStore((s) => s.resetFlight)
  const setGamePhase = useGameStore((s) => s.setGamePhase)

  if (!landingScore) return null

  const crashed = landingScore.totalScore === 0

  const getGrade = (score: number) => {
    if (score >= 90) return { label: 'S', color: '#facc15', glow: 'rgba(250,204,21,0.4)' }
    if (score >= 75) return { label: 'A', color: '#4ade80', glow: 'rgba(74,222,128,0.4)' }
    if (score >= 60) return { label: 'B', color: '#60a5fa', glow: 'rgba(96,165,250,0.4)' }
    if (score >= 40) return { label: 'C', color: '#fb923c', glow: 'rgba(251,146,60,0.4)' }
    return { label: 'F', color: '#f87171', glow: 'rgba(248,113,113,0.4)' }
  }

  const grade = getGrade(landingScore.totalScore)

  const statRow = (label: string, value: string, valueColor: string) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(147,197,253,0.08)' }}>
      <span style={{ color: '#94a3b8', fontSize: 14, fontFamily: 'Georgia, serif' }}>{label}</span>
      <span style={{ color: valueColor, fontSize: 15, fontFamily: '"Courier New", monospace', fontWeight: 600 }}>{value}</span>
    </div>
  )

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #0a1628 0%, #1a3a6a 30%, #4a8ac0 55%, #7ab8e8 75%, #a0d4f0 90%, #e8c87a 100%)',
    }}>
      {/* Cloud silhouettes for atmosphere */}
      <div style={{ position: 'absolute', top: '12%', left: '8%', width: 220, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ position: 'absolute', top: '22%', right: '12%', width: 180, height: 35, borderRadius: 20, background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', top: '35%', left: '15%', width: 150, height: 30, borderRadius: 20, background: 'rgba(255,255,255,0.05)' }} />

      {/* Ground gradient at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '15%',
        background: 'linear-gradient(180deg, transparent 0%, rgba(74,140,42,0.3) 60%, rgba(61,122,36,0.5) 100%)',
      }} />

      {/* Runway silhouette at bottom */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%) perspective(400px) rotateX(60deg)',
        width: 120,
        height: 300,
        background: 'repeating-linear-gradient(0deg, rgba(60,60,60,0.4) 0px, rgba(60,60,60,0.4) 18px, transparent 18px, transparent 30px)',
        borderRadius: 4,
      }} />

      {/* Card */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: 420,
        margin: '0 16px',
        background: 'rgba(10,22,40,0.85)',
        backdropFilter: 'blur(20px)',
        borderRadius: 20,
        padding: '36px 32px 28px',
        border: '1px solid rgba(147,197,253,0.15)',
        boxShadow: '0 0 60px rgba(37,99,235,0.15), 0 20px 60px rgba(0,0,0,0.5)',
      }}>
        {/* Title */}
        <h2 style={{
          fontSize: 38,
          fontWeight: 900,
          fontFamily: 'Georgia, serif',
          color: crashed ? '#f87171' : '#ffffff',
          textAlign: 'center',
          margin: 0,
          letterSpacing: 6,
          textShadow: crashed
            ? '0 0 20px rgba(248,113,113,0.6)'
            : '0 0 20px rgba(147,197,253,0.6), 0 0 40px rgba(147,197,253,0.3)',
        }}>
          {crashed ? 'CRASH!' : 'LANDED'}
        </h2>
        <p style={{
          color: '#94a3b8',
          textAlign: 'center',
          margin: '6px 0 24px',
          fontSize: 15,
          fontFamily: 'Georgia, serif',
          letterSpacing: 2,
        }}>
          {crashed
            ? 'Better luck next time...'
            : landingScore.onRunway ? 'On the runway' : 'Off runway'}
        </p>

        {/* Grade */}
        <div style={{
          background: `radial-gradient(ellipse at center, ${grade.glow} 0%, transparent 70%)`,
          borderRadius: 16,
          padding: '20px 16px',
          marginBottom: 24,
          textAlign: 'center',
          border: `1px solid ${grade.color}22`,
        }}>
          <div style={{
            fontSize: 72,
            fontWeight: 900,
            fontFamily: 'Georgia, serif',
            color: grade.color,
            lineHeight: 1,
            textShadow: `0 0 30px ${grade.glow}, 0 0 60px ${grade.glow}`,
          }}>
            {grade.label}
          </div>
          <div style={{
            color: '#94a3b8',
            marginTop: 8,
            fontSize: 15,
            fontFamily: '"Courier New", monospace',
          }}>
            Score: {landingScore.totalScore}/100
          </div>
        </div>

        {/* Stats */}
        <div style={{ marginBottom: 24 }}>
          {statRow('Approach Speed', `${Math.round(landingScore.speed)} kts`, '#e2e8f0')}
          {statRow('Vertical Speed', `${Math.round(landingScore.verticalSpeed * 196.85)} fpm`,
            Math.abs(landingScore.verticalSpeed) < 3 ? '#4ade80' : '#f87171')}
          {statRow('Gear Status', landingScore.gearDeployed ? 'DOWN' : 'UP',
            landingScore.gearDeployed ? '#4ade80' : '#f87171')}
          {statRow('Alignment', `${Math.round(landingScore.alignmentScore)}%`, '#e2e8f0')}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={resetFlight}
            style={{
              flex: 1,
              padding: '14px 0',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'Georgia, serif',
              color: '#ffffff',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              border: '1px solid rgba(147,197,253,0.3)',
              borderRadius: 12,
              cursor: 'pointer',
              letterSpacing: 3,
              textTransform: 'uppercase' as const,
              boxShadow: '0 0 20px rgba(37,99,235,0.4), 0 4px 16px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(37,99,235,0.6), 0 8px 24px rgba(0,0,0,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(37,99,235,0.4), 0 4px 16px rgba(0,0,0,0.3)'
            }}
          >
            FLY AGAIN
          </button>
          <button
            onClick={() => setGamePhase('menu')}
            style={{
              flex: 1,
              padding: '14px 0',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'Georgia, serif',
              color: '#e2e8f0',
              background: 'rgba(51,65,85,0.8)',
              border: '1px solid rgba(147,197,253,0.15)',
              borderRadius: 12,
              cursor: 'pointer',
              letterSpacing: 3,
              textTransform: 'uppercase' as const,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)'
              e.currentTarget.style.background = 'rgba(71,85,105,0.9)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.background = 'rgba(51,65,85,0.8)'
            }}
          >
            MENU
          </button>
        </div>
      </div>
    </div>
  )
}
