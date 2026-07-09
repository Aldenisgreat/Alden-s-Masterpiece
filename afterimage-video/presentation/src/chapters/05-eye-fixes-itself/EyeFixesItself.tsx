import type { ChapterStepProps } from "../../registry/types";
import "./EyeFixesItself.css";

export default function EyeFixesItself({ step }: ChapterStepProps) {
  /* Step 0 — RPE labeled diagram */
  if (step === 0) {
    return (
      <div className="efi-scene">
        <div className="efi-rpe-scene">
          <div className="efi-rpe-title">MEET THE RPE</div>
          <div className="efi-rpe-subtitle">Retinal Pigment Epithelium</div>
          <div className="efi-rpe-image">
            <img src="/rpe.png" alt="RPE Layer" className="efi-rpe-img" />
            <div className="efi-rpe-image-label">RPE Layer</div>
          </div>

          <div className="efi-rpe-diagram">
            <svg viewBox="0 0 700 380" className="efi-rpe-svg">
              {/* Light direction arrow */}
              <defs>
                <marker id="efi-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="var(--accent)" />
                </marker>
              </defs>
              <line x1="60" y1="30" x2="60" y2="120" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#efi-arrow)" opacity="0.6" />
              <text x="30" y="20" className="efi-layer-label" textAnchor="middle" fontSize="16">LIGHT</text>

              {/* Photoreceptor layer */}
              <rect x="100" y="100" width="500" height="60" rx="8" fill="rgba(255,255,255,0.06)" stroke="var(--text)" strokeWidth="1.5" opacity="0.6" />
              <text x="350" y="135" className="efi-layer-label" textAnchor="middle">PHOTORECEPTORS</text>

              {/* RPE layer — highlighted */}
              <rect x="100" y="180" width="500" height="50" rx="8" fill="var(--accent)" opacity="0.25" stroke="var(--accent)" strokeWidth="2" className="efi-rpe-highlight" />
              <text x="350" y="210" className="efi-rpe-label" textAnchor="middle">RETINAL PIGMENT EPITHELIUM (RPE)</text>

              {/* Choroid layer */}
              <rect x="100" y="250" width="500" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke="var(--text)" strokeWidth="1" opacity="0.3" />
              <text x="350" y="275" className="efi-layer-label" textAnchor="middle" opacity="0.5">CHOROID</text>

              {/* Connection arrows */}
              <line x1="200" y1="160" x2="200" y2="180" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
              <line x1="350" y1="160" x2="350" y2="180" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
              <line x1="500" y1="160" x2="500" y2="180" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />

              {/* Label callout */}
              <line x1="600" y1="205" x2="660" y2="205" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
              <text x="665" y="200" className="efi-rpe-label" textAnchor="start" fontSize="18">Support</text>
              <text x="665" y="220" className="efi-rpe-label" textAnchor="start" fontSize="18">layer</text>
            </svg>
          </div>

          <div className="efi-narration">
            Don't worry — your eye can fix this. Behind your retina, there's a thin layer of cells called the Retinal Pigment Epithelium. RPE for short.
          </div>
        </div>
      </div>
    );
  }

  /* Step 1 — Conveyor belt recycling */
  if (step === 1) {
    return (
      <div className="efi-scene">
        <div className="efi-conveyor-scene">
          <div className="efi-conveyor-label">THE RECYCLING FACTORY</div>
          <div className="efi-conveyor-subtitle">Collect → Reset → Return</div>
          <div className="efi-conveyor">
            <div className="efi-conveyor-track" />

            <div className="efi-molecule efi-molecule-used" style={{ animationDelay: "0s" }}>M</div>
            <div className="efi-molecule efi-molecule-used" style={{ animationDelay: "-0.8s" }}>M</div>
            <div className="efi-molecule efi-molecule-used" style={{ animationDelay: "-1.6s" }}>M</div>
            <div className="efi-molecule efi-molecule-used" style={{ animationDelay: "-2.4s" }}>M</div>
            <div className="efi-molecule efi-molecule-recycled" style={{ animationDelay: "-3.2s" }}>M</div>
            <div className="efi-molecule efi-molecule-recycled" style={{ animationDelay: "-3.6s" }}>M</div>
            <div className="efi-molecule efi-molecule-recycled" style={{ animationDelay: "-4s" }}>M</div>
            <div className="efi-molecule efi-molecule-recycled" style={{ animationDelay: "-4.4s" }}>M</div>

            <div className="efi-conveyor-zone efi-conveyor-zone-collect">
              <div className="efi-zone-icon">↓</div>
              <div className="efi-zone-label">COLLECT</div>
            </div>
            <div className="efi-conveyor-zone efi-conveyor-zone-reset">
              <div className="efi-zone-icon">↻</div>
              <div className="efi-zone-label">RESET</div>
            </div>
            <div className="efi-conveyor-zone efi-conveyor-zone-return">
              <div className="efi-zone-icon">↑</div>
              <div className="efi-zone-label">RETURN</div>
            </div>

            <div className="efi-zone-arrow efi-zone-arrow-1">→</div>
            <div className="efi-zone-arrow efi-zone-arrow-2">→</div>
          </div>

          <div className="efi-narration">
            The RPE collects the used-up molecules, resets them, and sends them back to your photoreceptors. Same molecules, recycled over and over.
          </div>
        </div>
      </div>
    );
  }

  /* Step 2 — Clock / recovery time */
  if (step === 2) {
    return (
      <div className="efi-scene">
        <div className="efi-clock-scene">
          <div className="efi-clock-label">30 SECONDS TO 2 MINUTES</div>
          <div className="efi-clock-subtitle">Brighter light = longer recovery</div>
          <div className="efi-clock-wrap">
            <svg viewBox="0 0 260 260" className="efi-clock-face">
              {/* Clock circle */}
              <circle cx="130" cy="130" r="120" fill="none" stroke="var(--accent)" strokeWidth="3" opacity="0.4" />
              <circle cx="130" cy="130" r="116" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.15" />

              {/* Hour marks */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const x1 = 130 + 105 * Math.cos(angle);
                const y1 = 130 + 105 * Math.sin(angle);
                const x2 = 130 + 115 * Math.cos(angle);
                const y2 = 130 + 115 * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="var(--text)"
                    strokeWidth="2"
                    opacity="0.4"
                  />
                );
              })}

              {/* Clock hand */}
              <line
                x1="130"
                y1="130"
                x2="130"
                y2="40"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
                className="efi-clock-hand"
              />

              {/* Center dot */}
              <circle cx="130" cy="130" r="6" fill="var(--accent)" />
            </svg>
          </div>
          <div className="efi-clock-text">30 seconds — 2 minutes</div>

          <div className="efi-narration">
            This takes about 30 seconds to a couple minutes. Brighter the light, longer it takes. But it always works.
          </div>
        </div>
      </div>
    );
  }

  /* Step 3 — Sunlight vs moonlight */
  return (
    <div className="efi-scene">
      <div className="efi-adapt-scene">
        <div className="efi-adapt-title">A FEATURE, NOT A BUG!</div>
        <div className="efi-adapt-subtitle-top">Eyes adapt to any light</div>
        <div className="efi-adapt-panels">
          <div className="efi-adapt-panel">
            <svg viewBox="0 0 120 120" className="efi-sun-icon">
              <circle cx="60" cy="60" r="28" fill="var(--accent)" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 45) * (Math.PI / 180);
                const x1 = 60 + 38 * Math.cos(angle);
                const y1 = 60 + 38 * Math.sin(angle);
                const x2 = 60 + 52 * Math.cos(angle);
                const y2 = 60 + 52 * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="var(--accent)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
            <div className="efi-adapt-name">Sunlight</div>
          </div>

          <div className="efi-adapt-divider" />

          <div className="efi-adapt-panel">
            <svg viewBox="0 0 120 120" className="efi-moon-icon">
              <circle cx="60" cy="60" r="30" fill="none" stroke="var(--text)" strokeWidth="2" opacity="0.6" />
              <path
                d="M 60 30 A 30 30 0 0 1 60 90 A 20 20 0 0 0 60 30"
                fill="var(--text)"
                opacity="0.3"
              />
            </svg>
            <div className="efi-adapt-name">Moonlight</div>
          </div>
        </div>
        <div className="efi-adapt-subtitle">
          Afterimages are a side effect of eyes that can adapt
        </div>
        <div className="efi-funfact-step3">Pupils dilate 15x in the dark!</div>

        <div className="efi-narration">
          And honestly, this system is pretty great. It's how your eyes adjust to both bright sunlight and dim moonlight.
        </div>
      </div>
    </div>
  );
}
