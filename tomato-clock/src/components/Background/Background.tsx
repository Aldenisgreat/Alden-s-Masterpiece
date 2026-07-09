import { useMemo } from 'react';
import './Background.css';

interface BackgroundProps {
  backgroundClass: string;
}

export default function Background({ backgroundClass }: BackgroundProps) {
  // Generate bubbles for bubble background
  const bubbles = useMemo(() => {
    if (backgroundClass !== 'bg-bubbles') return [];
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 12 + 4,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 4,
    }));
  }, [backgroundClass]);

  // Generate seaweed for coral reef
  const seaweeds = useMemo(() => {
    if (backgroundClass !== 'bg-coral-reef') return [];
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: (i / 12) * 100 + Math.random() * 5,
      height: Math.random() * 60 + 40,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    }));
  }, [backgroundClass]);

  // Generate light rays for underwater
  const lightRays = useMemo(() => {
    if (backgroundClass !== 'bg-underwater') return [];
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 10 + (i / 8) * 80,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 3,
    }));
  }, [backgroundClass]);

  // Generate aurora bands
  const auroraBands = useMemo(() => {
    if (backgroundClass !== 'bg-aurora-ocean') return [];
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      y: 5 + i * 8,
      color: ['rgba(0,180,216,0.3)', 'rgba(0,119,182,0.3)', 'rgba(144,224,239,0.2)', 'rgba(3,83,164,0.3)', 'rgba(0,255,200,0.2)'][i],
      delay: i * 1.5,
      duration: Math.random() * 3 + 4,
    }));
  }, [backgroundClass]);

  // Coral reef scene - always present on all backgrounds
  const coralData = useMemo(() => ({
    corals: [
      { id: 0, x: 0, src: './assets/sprite_1.png', height: 52 },
      { id: 1, x: 8, src: './assets/sprite_4.png', height: 58 },
      { id: 2, x: 19, src: './assets/sprite_7.png', height: 46 },
      { id: 3, x: 31, src: './assets/sprite_2.png', height: 55 },
      { id: 4, x: 40, src: './assets/sprite_5.png', height: 60 },
      { id: 5, x: 53, src: './assets/sprite_8.png', height: 44 },
      { id: 6, x: 62, src: './assets/sprite_1.png', height: 50 },
      { id: 7, x: 74, src: './assets/sprite_4.png', height: 56 },
      { id: 8, x: 85, src: './assets/sprite_7.png', height: 48 },
      { id: 9, x: 95, src: './assets/sprite_2.png', height: 54 },
    ],
    fishes: Array.from({ length: 8 }, (_, i) => ({
      id: i,
      y: 10 + Math.random() * 50,
      src: `./assets/fish/peixinhos${i + 1}.png`,
      speed: 10 + Math.random() * 8,
      delay: Math.random() * 12,
      size: 36 + Math.random() * 24,
      reverse: i % 2 === 1,
    })),
    bubbles: Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 3 + Math.random() * 6,
      delay: Math.random() * 10,
      duration: 5 + Math.random() * 5,
    })),
    seaweeds: [
      { id: 0, x: 4, src: './assets/sprite_3.png', height: 45, delay: 0, duration: 2.5 },
      { id: 1, x: 13, src: './assets/sprite_6.png', height: 38, delay: 0.5, duration: 3 },
      { id: 2, x: 24, src: './assets/sprite_9.png', height: 50, delay: 1, duration: 2.8 },
      { id: 3, x: 35, src: './assets/sprite_3.png', height: 42, delay: 1.5, duration: 3.2 },
      { id: 4, x: 46, src: './assets/sprite_6.png', height: 36, delay: 0.8, duration: 2.6 },
      { id: 5, x: 57, src: './assets/sprite_9.png', height: 48, delay: 0.3, duration: 2.9 },
      { id: 6, x: 67, src: './assets/sprite_3.png', height: 40, delay: 1.2, duration: 3.1 },
      { id: 7, x: 78, src: './assets/sprite_6.png', height: 44, delay: 0.7, duration: 2.7 },
      { id: 8, x: 89, src: './assets/sprite_9.png', height: 38, delay: 1.8, duration: 3.3 },
    ],
  }), []);

  return (
    <div className={`background ${backgroundClass}`}>
      {/* Background-specific decorative layers */}
      {backgroundClass === 'bg-bubbles' && (
        <div className="bubbles-layer">
          {bubbles.map(b => (
            <div
              key={b.id}
              className="bubble"
              style={{
                left: `${b.x}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.duration}s`,
              }}
            />
          ))}
        </div>
      )}
      {backgroundClass === 'bg-coral-reef' && (
        <div className="seaweed-layer">
          {seaweeds.map(s => (
            <div
              key={s.id}
              className="seaweed"
              style={{
                left: `${s.x}%`,
                height: `${s.height}px`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>
      )}
      {backgroundClass === 'bg-underwater' && (
        <div className="light-layer">
          {lightRays.map(r => (
            <div
              key={r.id}
              className="light-ray"
              style={{
                left: `${r.x}%`,
                animationDelay: `${r.delay}s`,
                animationDuration: `${r.duration}s`,
              }}
            />
          ))}
        </div>
      )}
      {backgroundClass === 'bg-aurora-ocean' && (
        <div className="aurora-layer">
          {auroraBands.map(a => (
            <div
              key={a.id}
              className="aurora-band"
              style={{
                top: `${a.y}%`,
                left: '-25%',
                background: a.color,
                animationDelay: `${a.delay}s`,
                animationDuration: `${a.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Coral reef scene - always visible on all backgrounds */}
      <div className="coral-scene">
        {/* Sandy bottom */}
        <div className="coral-sand" />

        {/* Coral formations */}
        {coralData.corals.map(c => (
          <img
            key={c.id}
            src={c.src}
            alt="coral"
            className="coral-img"
            style={{
              left: `${c.x}%`,
              height: `${c.height}px`,
            }}
          />
        ))}

        {/* Seaweed - with waving animation */}
        {coralData.seaweeds.map(s => (
          <img
            key={`sw-${s.id}`}
            src={s.src}
            alt="seaweed"
            className="coral-seaweed-img"
            style={{
              left: `${s.x}%`,
              height: `${s.height}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}

        {/* Fish swimming */}
        {coralData.fishes.map(f => (
          <img
            key={`fish-${f.id}`}
            src={f.src}
            alt="fish"
            className={`coral-fish-img ${f.reverse ? 'coral-fish-img--reverse' : ''}`}
            style={{
              top: `${f.y}%`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              animationDuration: `${f.speed}s`,
              animationDelay: `${f.delay}s`,
            }}
          />
        ))}

        {/* Bubbles */}
        {coralData.bubbles.map(b => (
          <div
            key={`pb-${b.id}`}
            className="coral-bubble"
            style={{
              left: `${b.x}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
