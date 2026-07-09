import type { ChapterStepProps } from "../../registry/types";
import "./StaringTooLong.css";

export default function StaringTooLong({ step }: ChapterStepProps) {
  /* Step 0 — Calm switches: normal blinking */
  if (step === 0) {
    return (
      <div className="stl-scene">
        <div className="stl-calm-cells">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="stl-calm-cell" style={{ animationDelay: `${i * 0.25}s` }}>
              <svg viewBox="0 0 40 56" className="stl-calm-cell-svg">
                <ellipse cx="20" cy="36" rx="14" ry="18" fill="var(--accent)" opacity="0.2" stroke="var(--accent)" strokeWidth="1" />
                <ellipse cx="20" cy="22" rx="8" ry="14" fill="var(--accent)" opacity="0.4" />
                <circle cx="20" cy="10" r="6" fill="var(--accent)" />
              </svg>
              {/* Gentle pulse indicating normal activity */}
              <div className="stl-calm-pulse" />
            </div>
          ))}
        </div>

        {/* Title & subtitle */}
        <div className="stl-step-title">
          <span className="stl-step-heading">Normal Vision</span>
          <span className="stl-step-sub">Blinking gives cells time to <span className="stl-accent">reset</span></span>
        </div>

        {/* Blink indicator */}
        <div className="stl-blink-indicator">
          <div className="stl-blink-eye">
            <svg viewBox="0 0 80 50" className="stl-blink-svg">
              <ellipse className="stl-blink-lid" cx="40" cy="25" rx="35" ry="20" fill="none" stroke="var(--accent)" strokeWidth="3" />
              <circle cx="40" cy="25" r="8" fill="var(--accent)" />
            </svg>
          </div>
          <span className="stl-blink-text">Blink... blink...</span>
        </div>

        <div className="stl-status-ok">
          <span className="stl-status-text">Everything's fine</span>
        </div>

        {/* Floating labels */}
        <div className="stl-tag stl-tag-reset">RESET</div>
        <div className="stl-tag stl-tag-fresh">FRESH</div>

        <span className="stl-narration">"Normally this works great. You blink, you look around, each cell gets little breaks to reset."</span>
      </div>
    );
  }

  /* Step 1 — Overloaded switches */
  if (step === 1) {
    return (
      <div className="stl-scene">
        {/* Bright light source */}
        <div className="stl-bright-source">
          <div className="stl-bright-core" />
          <div className="stl-bright-glow" />
          <div className="stl-bright-rays">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="stl-bright-ray"
                style={{ transform: `rotate(${i * 30}deg)` }}
              />
            ))}
          </div>
        </div>

        {/* Overloaded cells */}
        <div className="stl-overload-cells">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="stl-overload-cell" style={{ animationDelay: `${i * 0.1}s` }}>
              <svg viewBox="0 0 40 56" className="stl-overload-cell-svg">
                <ellipse cx="20" cy="36" rx="14" ry="18" fill="var(--accent)" opacity="0.4" stroke="var(--accent)" strokeWidth="1.5" />
                <ellipse cx="20" cy="22" rx="8" ry="14" fill="var(--accent)" opacity="0.6" />
                <circle cx="20" cy="10" r="6" fill="var(--accent)" />
              </svg>
              <div className="stl-overload-sparks">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="stl-spark" style={{ animationDelay: `${j * 0.15}s` }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="stl-warning-label">
          <span className="stl-step-heading">Overload!</span>
          <span className="stl-step-sub">Too much light, too fast</span>
          <span className="stl-warning-text">Too fast! No breaks!</span>
        </div>

        {/* Floating label */}
        <div className="stl-tag stl-tag-overloaded">OVERLOADED</div>

        <span className="stl-narration">"But when you stare at something bright — like a lamp or the sun — the switches start flipping way too fast."</span>
      </div>
    );
  }

  /* Step 2 — Empty supply */
  if (step === 2) {
    return (
      <div className="stl-scene">
        {/* Depleted cells */}
        <div className="stl-empty-cells">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="stl-empty-cell" style={{ animationDelay: `${i * 0.15}s` }}>
              <svg viewBox="0 0 40 56" className="stl-empty-cell-svg">
                <ellipse cx="20" cy="36" rx="14" ry="18" fill="var(--accent)" opacity="0.1" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" />
                <ellipse cx="20" cy="22" rx="8" ry="14" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" />
                {/* Empty circles - used up switches */}
                <circle cx="20" cy="10" r="6" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" />
              </svg>
            </div>
          ))}
        </div>

        {/* Empty bin / supply indicator */}
        <div className="stl-supply-meter">
          <div className="stl-supply-track">
            <div className="stl-supply-fill" />
          </div>
          <span className="stl-supply-label">Supply: EMPTY</span>
        </div>

        <div className="stl-temp-blind-label">
          <span className="stl-step-heading">Supply Empty!</span>
          <span className="stl-step-sub">No more <span className="stl-accent">switches</span> available</span>
          <span className="stl-blind-text">Temporarily blind in this spot</span>
        </div>

        {/* Floating label */}
        <div className="stl-tag stl-tag-exhausted">EXHAUSTED</div>

        <span className="stl-narration">"Eventually the cell runs out of switches. They're all used up. Now this cell can't respond to light anymore."</span>
      </div>
    );
  }

  /* Step 3 — Brain volume knob */
  if (step === 3) {
    return (
      <div className="stl-scene">
        {/* TV / volume metaphor */}
        <div className="stl-tv-container">
          <svg viewBox="0 0 280 200" className="stl-tv-svg">
            {/* TV frame */}
            <rect x="20" y="20" width="240" height="160" rx="12" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
            {/* Screen */}
            <rect x="35" y="35" width="210" height="130" rx="4" fill="var(--accent)" opacity="0.1" />
            {/* Static / noise lines */}
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="35"
                y1={45 + i * 16}
                x2="245"
                y2={45 + i * 16}
                stroke="var(--accent)"
                strokeWidth="1"
                opacity="0.2"
                className="stl-static-line"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
            {/* Mute icon */}
            <g className="stl-mute-icon">
              <rect x="190" y="130" width="40" height="25" rx="4" fill="var(--accent)" opacity="0.3" />
              <text x="210" y="148" textAnchor="middle" fill="var(--accent)" fontSize="16" fontFamily="var(--font-display-en)">🔇</text>
            </g>
          </svg>
        </div>

        {/* Volume knob */}
        <div className="stl-volume-knob">
          <svg viewBox="0 0 100 100" className="stl-volume-svg">
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent)" strokeWidth="3" />
            <circle cx="50" cy="50" r="30" fill="var(--accent)" opacity="0.15" />
            {/* Volume indicator line */}
            <line x1="50" y1="50" x2="50" y2="20" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" className="stl-volume-needle" />
            {/* Tick marks */}
            {[...Array(8)].map((_, i) => {
              const angle = -135 + i * 38.6;
              const rad = (angle * Math.PI) / 180;
              return (
                <circle
                  key={i}
                  cx={50 + 44 * Math.cos(rad)}
                  cy={50 + 44 * Math.sin(rad)}
                  r="2"
                  fill="var(--accent)"
                  opacity={i < 2 ? 0.8 : 0.2}
                />
              );
            })}
          </svg>
          <span className="stl-volume-label">Volume: LOW</span>
        </div>

        <div className="stl-brain-ignore">
          <span className="stl-step-heading">Brain Turns Down Volume</span>
          <span className="stl-step-sub">Like muting a loud TV</span>
          <span className="stl-ignore-text">Brain: "I'll just ignore that"</span>
        </div>

        {/* Floating label */}
        <div className="stl-tag stl-tag-volume">VOLUME: LOW</div>

        <span className="stl-narration">"Your brain also gets tired of hearing the same signal over and over. So it turns down the volume on that spot."</span>
      </div>
    );
  }

  /* Step 4 — Combined effect */
  return (
    <div className="stl-scene">
      {/* Two-part split screen */}
      <div className="stl-split">
        {/* Left: tired cells */}
        <div className="stl-split-left">
          <div className="stl-split-header">Tired cells</div>
          <div className="stl-split-icon">
            <svg viewBox="0 0 80 80" className="stl-tired-icon-svg">
              <circle cx="40" cy="40" r="30" fill="var(--accent)" opacity="0.15" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" />
              <text x="40" y="48" textAnchor="middle" fill="var(--accent)" fontSize="28" fontFamily="var(--font-display-en)">😴</text>
            </svg>
          </div>
        </div>

        {/* Plus sign */}
        <div className="stl-split-plus">+</div>

        {/* Right: ignoring brain */}
        <div className="stl-split-right">
          <div className="stl-split-header">Ignoring brain</div>
          <div className="stl-split-icon">
            <svg viewBox="0 0 80 80" className="stl-brain-icon-svg">
              <path
                d="M 40 65 C 20 65 8 48 15 30 C 20 15 32 5 40 12 C 48 5 60 15 65 30 C 72 48 60 65 40 65 Z"
                fill="var(--accent)"
                opacity="0.15"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <text x="40" y="45" textAnchor="middle" fill="var(--accent)" fontSize="20" fontFamily="var(--font-display-en)">🔇</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Equals result */}
      <div className="stl-result">
        <div className="stl-result-equals">=</div>
        <div className="stl-result-text">
          <span className="stl-step-heading">The Perfect Storm</span>
          <span className="stl-step-sub"><span className="stl-accent">Tired cells</span> + <span className="stl-accent">ignoring brain</span></span>
          <span className="stl-result-main">Afterimage</span>
          <span className="stl-result-sub">That's where it gets interesting...</span>
        </div>
      </div>

      <span className="stl-narration">"So now you've got tired cells AND a brain that's ignoring them. That's where it gets interesting."</span>
    </div>
  );
}
