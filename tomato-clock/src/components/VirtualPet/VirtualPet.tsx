import { useState, useEffect } from 'react';
import type { HeartAnimation } from '../../types';
import './VirtualPet.css';

interface VirtualPetProps {
  mood: string;
  action: string;
  isSwimming: boolean;
  hearts: HeartAnimation[];
  feedMessage: string | null;
  onSwim: () => void;
}

const stateFilters: Record<string, string> = {
  happy: 'none',
  hungry: 'none',
  tired: 'brightness(0.7) saturate(0.5)',
  bored: 'saturate(0.6)',
  sick: 'hue-rotate(80deg) saturate(0.8)',
  eating: 'none',
  playing: 'none',
  sleeping: 'brightness(0.6) saturate(0.3)',
};

export default function VirtualPet({ mood, action, isSwimming, hearts, feedMessage, onSwim }: VirtualPetProps) {
  const [flipped, setFlipped] = useState(false);

  // Randomly flip dolphin every 3-7 seconds (not while sleeping)
  useEffect(() => {
    if (action === 'sleeping') return;
    const scheduleFlip = () => {
      const delay = 3000 + Math.random() * 4000;
      return setTimeout(() => {
        setFlipped(prev => !prev);
        timerId = scheduleFlip();
      }, delay);
    };
    let timerId = scheduleFlip();
    return () => clearTimeout(timerId);
  }, [action]);

  const displayState = action !== 'idle' ? action : mood;
  const animClass = action !== 'idle' ? `pet--${action}` : `pet--${mood}`;
  const filter = stateFilters[displayState] || 'none';

  return (
    <div className="virtual-pet-container">
      {/* Pixelated hearts */}
      {hearts.map(h => (
        <div
          key={h.id}
          className="pixel-heart"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            animationDelay: `${h.delay}s`,
          }}
        >
          <svg width={h.size} height={h.size} viewBox="0 0 16 16" fill="none">
            {/* Pixel heart shape */}
            <rect x="2" y="0" width="2" height="2" fill="#ff6b9d"/>
            <rect x="4" y="0" width="2" height="2" fill="#ff6b9d"/>
            <rect x="8" y="0" width="2" height="2" fill="#ff6b9d"/>
            <rect x="10" y="0" width="2" height="2" fill="#ff6b9d"/>
            <rect x="0" y="2" width="2" height="2" fill="#ff6b9d"/>
            <rect x="2" y="2" width="2" height="2" fill="#ff8fb8"/>
            <rect x="4" y="2" width="2" height="2" fill="#ff6b9d"/>
            <rect x="6" y="2" width="2" height="2" fill="#ff6b9d"/>
            <rect x="8" y="2" width="2" height="2" fill="#ff6b9d"/>
            <rect x="10" y="2" width="2" height="2" fill="#ff6b9d"/>
            <rect x="12" y="2" width="2" height="2" fill="#ff6b9d"/>
            <rect x="0" y="4" width="2" height="2" fill="#ff6b9d"/>
            <rect x="2" y="4" width="2" height="2" fill="#ff6b9d"/>
            <rect x="4" y="4" width="2" height="2" fill="#ff6b9d"/>
            <rect x="6" y="4" width="2" height="2" fill="#ff6b9d"/>
            <rect x="8" y="4" width="2" height="2" fill="#ff6b9d"/>
            <rect x="10" y="4" width="2" height="2" fill="#ff6b9d"/>
            <rect x="12" y="4" width="2" height="2" fill="#ff6b9d"/>
            <rect x="2" y="6" width="2" height="2" fill="#ff6b9d"/>
            <rect x="4" y="6" width="2" height="2" fill="#ff6b9d"/>
            <rect x="6" y="6" width="2" height="2" fill="#ff6b9d"/>
            <rect x="8" y="6" width="2" height="2" fill="#ff6b9d"/>
            <rect x="10" y="6" width="2" height="2" fill="#ff6b9d"/>
            <rect x="4" y="8" width="2" height="2" fill="#ff6b9d"/>
            <rect x="6" y="8" width="2" height="2" fill="#ff6b9d"/>
            <rect x="8" y="8" width="2" height="2" fill="#ff6b9d"/>
            <rect x="6" y="10" width="2" height="2" fill="#ff6b9d"/>
          </svg>
        </div>
      ))}

      <div
        className={`virtual-pet ${animClass} ${isSwimming ? 'pet--swimming' : ''}`}
        onClick={onSwim}
        style={{ cursor: 'pointer' }}
      >
        <img
          src="/assets/dolphin_ref.webp"
          alt="pixel dolphin"
          className="pet-sprite-img"
          style={{
            filter,
            transform: flipped ? 'scaleX(-1)' : 'scaleX(1)',
          }}
        />
      </div>
      {action === 'sleeping' && (
        <div className="sleep-zzz">
          <span className="z z1">Z</span>
          <span className="z z2">z</span>
          <span className="z z3">Z</span>
        </div>
      )}
      {mood === 'hungry' && action === 'idle' && (
        <div className="mood-bubble">🐟</div>
      )}
      {mood === 'tired' && action === 'idle' && (
        <div className="mood-bubble">💤</div>
      )}
      {mood === 'bored' && action === 'idle' && (
        <div className="mood-bubble">🫧</div>
      )}
      {mood === 'sick' && action === 'idle' && (
        <div className="mood-bubble">🤒</div>
      )}
      {feedMessage && (
        <div className="feed-message">{feedMessage}</div>
      )}
    </div>
  );
}
