import type { ChapterStepProps } from "../../registry/types";
import "./HowEyeWorks.css";

export default function HowEyeWorks({ step }: ChapterStepProps) {
  /* Step 0 — Camera analogy: eye as camera */
  if (step === 0) {
    return (
      <div className="hew-scene">
        <div className="hew-camera-container">
          {/* Camera body */}
          <svg viewBox="0 0 300 220" className="hew-camera-svg">
            <rect x="40" y="60" width="220" height="140" rx="16" fill="none" stroke="var(--accent)" strokeWidth="3" />
            <circle cx="150" cy="130" r="50" fill="none" stroke="var(--accent)" strokeWidth="3" />
            <circle cx="150" cy="130" r="30" fill="none" stroke="var(--accent)" strokeWidth="2" opacity="0.6" />
            <circle cx="150" cy="130" r="12" fill="var(--accent)" opacity="0.8" />
            {/* Flash */}
            <rect x="195" y="70" width="40" height="20" rx="4" fill="var(--accent)" opacity="0.4" />
            {/* Viewfinder */}
            <rect x="110" y="45" width="30" height="20" rx="3" fill="none" stroke="var(--accent)" strokeWidth="2" />
          </svg>

          {/* Light rays entering camera */}
          <div className="hew-light-incoming">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`hew-ray hew-ray-${i}`} />
            ))}
          </div>
        </div>

        {/* Title & subtitle */}
        <div className="hew-label hew-label-camera">
          <span className="hew-label-text">Your Eye = A Camera</span>
          <span className="hew-label-subtitle">Light enters through the <span className="hew-accent">pupil</span></span>
        </div>

        {/* Floating labels */}
        <div className="hew-tag hew-tag-pupil">PUPIL</div>
        <div className="hew-tag hew-tag-lens">LENS</div>
        <div className="hew-tag hew-tag-retina">RETINA</div>

        {/* Diagram: light → lens → retina */}
        <div className="hew-diagram">
          <div className="hew-diagram-item">
            <span className="hew-diagram-icon">☀</span>
            <span className="hew-diagram-label">Light</span>
          </div>
          <div className="hew-diagram-arrow">→</div>
          <div className="hew-diagram-item">
            <svg viewBox="0 0 40 40" className="hew-lens-icon">
              <ellipse cx="20" cy="20" rx="8" ry="18" fill="none" stroke="var(--accent)" strokeWidth="2" />
              <line x1="12" y1="8" x2="12" y2="32" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
              <line x1="28" y1="8" x2="28" y2="32" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
            </svg>
            <span className="hew-diagram-label">Lens</span>
          </div>
          <div className="hew-diagram-arrow">→</div>
          <div className="hew-diagram-item">
            <svg viewBox="0 0 40 40" className="hew-retina-icon">
              <rect x="5" y="5" width="30" height="30" rx="6" fill="none" stroke="var(--accent)" strokeWidth="2" />
              <circle cx="15" cy="15" r="3" fill="var(--accent)" opacity="0.6" />
              <circle cx="25" cy="15" r="3" fill="var(--accent)" opacity="0.6" />
              <circle cx="15" cy="25" r="3" fill="var(--accent)" opacity="0.6" />
              <circle cx="25" cy="25" r="3" fill="var(--accent)" opacity="0.6" />
            </svg>
            <span className="hew-diagram-label">Retina</span>
          </div>
        </div>

        {/* Eye image */}
        <div className="hew-eye-image">
          <img src="./eye.png" alt="Eye" className="hew-eye-img" />
        </div>

        <span className="hew-narration">"Okay, basics first. Your eye works kind of like a camera. Light comes in the front, goes through the lens, and hits the back wall."</span>
      </div>
    );
  }

  /* Step 1 — Retina cells: millions of photoreceptors */
  if (step === 1) {
    return (
      <div className="hew-scene">
        <div className="hew-cells-grid">
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className={`hew-cell hew-cell-${i % 3}`}
              style={{ animationDelay: `${(i * 0.08) % 2}s` }}
            >
              <svg viewBox="0 0 30 44" className="hew-cell-svg">
                <ellipse cx="15" cy="30" rx="10" ry="14" fill="var(--accent)" opacity="0.3" />
                <ellipse cx="15" cy="18" rx="6" ry="12" fill="var(--accent)" opacity="0.6" />
                <circle cx="15" cy="8" r="5" fill="var(--accent)" />
              </svg>
            </div>
          ))}
        </div>

        <div className="hew-cells-label">
          <span className="hew-cells-title">130 Million Cells!</span>
          <span className="hew-cells-subtitle"><span className="hew-accent">Photoreceptors</span> line your retina</span>
          <span className="hew-funfact">Each cell is 100x thinner than a hair</span>
        </div>

        {/* Eye image */}
        <div className="hew-eye-image hew-eye-image-side">
          <img src="./eye.png" alt="Eye" className="hew-eye-img" />
        </div>

        <span className="hew-narration">"Your retina is covered in millions of tiny cells. Scientists call them photoreceptors, but really they're just little light-catching machines."</span>
      </div>
    );
  }

  /* Step 2 — Switch flipping: retinal molecule */
  if (step === 2) {
    return (
      <div className="hew-scene">
        <div className="hew-switch-container">
          {/* Single cell close-up */}
          <svg viewBox="0 0 200 260" className="hew-cell-closeup">
            {/* Cell body */}
            <ellipse cx="100" cy="180" rx="60" ry="70" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="2" />
            {/* Inner segment */}
            <ellipse cx="100" cy="110" rx="25" ry="50" fill="var(--accent)" opacity="0.3" stroke="var(--accent)" strokeWidth="1.5" />
            {/* Switch molecule */}
            <g className="hew-switch">
              <rect x="85" y="90" width="30" height="14" rx="7" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
              <circle className="hew-switch-knob" cx="100" cy="97" r="5" fill="var(--accent)" />
            </g>
          </svg>

          {/* Switch states */}
          <div className="hew-switch-labels">
            <div className="hew-switch-state hew-switch-off">
              <span className="hew-switch-dot hew-switch-dot-off" />
              OFF
            </div>
            <div className="hew-switch-arrow">→</div>
            <div className="hew-switch-state hew-switch-on">
              <span className="hew-switch-dot hew-switch-dot-on" />
              ON
            </div>
          </div>
        </div>

        <div className="hew-retinal-label">
          <span className="hew-retinal-name">The Light Switch</span>
          <span className="hew-retinal-sub"><span className="hew-accent">Retinal</span> changes shape when hit by light</span>
          <span className="hew-funfact">This is why carrots help you see!</span>
        </div>

        {/* Floating labels */}
        <div className="hew-tag hew-tag-vitamin">VITAMIN A</div>
        <div className="hew-tag hew-tag-retinal-mol">RETINAL</div>

        {/* Eye image */}
        <div className="hew-eye-image hew-eye-image-corner">
          <img src="./eye.png" alt="Eye" className="hew-eye-img" />
        </div>

        <span className="hew-narration">"Inside each cell, there's a molecule that changes shape when light hits it. Like a switch flipping from off to on."</span>
      </div>
    );
  }

  /* Step 3 — Signals to brain */
  return (
    <div className="hew-scene">
      {/* Cell grid at bottom */}
      <div className="hew-signal-cells">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="hew-signal-cell"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <svg viewBox="0 0 24 36" className="hew-signal-cell-svg">
              <ellipse cx="12" cy="22" rx="8" ry="12" fill="var(--accent)" opacity="0.3" />
              <circle cx="12" cy="10" r="5" fill="var(--accent)" />
            </svg>
            {/* Signal pulse */}
            <div className="hew-signal-pulse" />
          </div>
        ))}
      </div>

      {/* Signal paths going up */}
      <div className="hew-signal-paths">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="hew-signal-path"
            style={{ left: `${15 + i * 14}%`, animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      {/* Brain */}
      <div className="hew-brain">
        <svg viewBox="0 0 200 160" className="hew-brain-svg">
          <path
            d="M 100 140 C 40 140 10 100 30 60 C 40 30 70 10 100 20 C 130 10 160 30 170 60 C 190 100 160 140 100 140 Z"
            fill="var(--accent)"
            opacity="0.2"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          {/* Brain folds */}
          <path d="M 60 80 Q 80 60 100 80 Q 120 100 140 80" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
          <path d="M 50 100 Q 70 80 90 100" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
          <path d="M 110 100 Q 130 80 150 100" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
        </svg>
        <div className="hew-brain-glow" />
      </div>

      <div className="hew-brain-label">
        <span className="hew-brain-title">Millions of Signals</span>
        <span className="hew-brain-sub">Your brain receives light data</span>
        <span className="hew-brain-text">"Hey, there's light here!"</span>
      </div>

      {/* Floating labels */}
      <div className="hew-tag hew-tag-brain">BRAIN</div>
      <div className="hew-tag hew-tag-signal">SIGNAL</div>

      {/* Eye image */}
      <div className="hew-eye-image hew-eye-image-bottom">
        <img src="./eye.png" alt="Eye" className="hew-eye-img" />
      </div>

      <span className="hew-narration">"That flip is what tells your brain 'hey, there's light here.' Millions of these switches flipping all day — that's how you see."</span>
    </div>
  );
}
