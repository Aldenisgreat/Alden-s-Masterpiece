import type { ChapterStepProps } from "../../registry/types";
import "./GhostImage.css";

export default function GhostImage({ step }: ChapterStepProps) {
  /* Step 0 — White wall, light hitting all cells equally */
  if (step === 0) {
    return (
      <div className="gi-scene">
        <div className="gi-wall" />
        <div className="gi-wall-gradient" />

        <div className="gi-light-beams">
          <div className="gi-beam" />
          <div className="gi-beam" />
          <div className="gi-beam" />
          <div className="gi-beam" />
          <div className="gi-beam" />
        </div>

        <div className="gi-light-image">
          <img src="/light2.png" alt="Light source" className="gi-light-img" />
        </div>

        <div className="gi-white-label">WHITE LIGHT EVERYWHERE</div>
        <div className="gi-subtitle-step0">All cells receive equal light</div>
        <div className="gi-funfact-step0">Your retina has ~120 million rod cells!</div>

        <div className="gi-narration">
          So you look away. You're staring at a white wall now. Light is hitting all your cells the same — white light, everywhere.
        </div>
      </div>
    );
  }

  /* Step 1 — Fresh vs tired cells split view */
  if (step === 1) {
    return (
      <div className="gi-scene">
        <div className="gi-step1-header">
          <div className="gi-step1-title">FRESH VS TIRED</div>
          <div className="gi-step1-subtitle">Some cells work, some don't</div>
        </div>
        <div className="gi-cells-split">
          <div className="gi-cells-fresh">
            <div className="gi-cell-label">FRESH</div>
            <div className="gi-cell-grid">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="gi-cell gi-cell-fresh" />
              ))}
            </div>
            <div className="gi-signal-arrow">STRONG ▲</div>
          </div>
          <div className="gi-cells-tired">
            <div className="gi-cell-label">TIRED</div>
            <div className="gi-cell-grid">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="gi-cell gi-cell-tired" />
              ))}
            </div>
            <div className="gi-signal-arrow weak">WEAK ▲</div>
          </div>
        </div>

        <div className="gi-narration">
          But some cells are fresh, and some are still tired. The fresh ones are sending a strong signal. The tired ones are barely doing anything.
        </div>
      </div>
    );
  }

  /* Step 2 — Ghost blob appears */
  if (step === 2) {
    return (
      <div className="gi-scene">
        <div className="gi-ghost-scene">
          <div className="gi-ghost-brain">THE GHOST APPEARS!</div>
          <div className="gi-ghost-subtitle">Brain creates image from imbalance</div>
          <div className="gi-ghost-container">
            <div className="gi-ghost-glow" />
            <div className="gi-ghost-blob" />
          </div>
          <div className="gi-ghost-label">GHOST IMAGE</div>
        </div>

        <div className="gi-narration">
          Your brain gets this mixed message and tries to make sense of it. And what does it come up with? The ghost image.
        </div>
      </div>
    );
  }

  /* Step 3 — Colors flip: red → cyan */
  return (
    <div className="gi-scene">
      <div className="gi-color-scene">
        <div className="gi-flip-title">COLORS FLIP!</div>
        <div className="gi-flip-subtitle">Tired red = you see cyan</div>

        <div className="gi-color-wheel-wrap">
          <svg viewBox="0 0 300 300" className="gi-color-wheel-svg">
            <defs>
              <linearGradient id="gi-wheel-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff4444" />
                <stop offset="16%" stopColor="#ff8844" />
                <stop offset="33%" stopColor="#ffff44" />
                <stop offset="50%" stopColor="#44ff44" />
                <stop offset="66%" stopColor="#44ffff" />
                <stop offset="83%" stopColor="#4444ff" />
                <stop offset="100%" stopColor="#ff44ff" />
              </linearGradient>
            </defs>
            <circle
              cx="150"
              cy="150"
              r="130"
              fill="none"
              stroke="url(#gi-wheel-grad)"
              strokeWidth="24"
              opacity="0.7"
            />
            {/* Opposite markers */}
            <circle cx="150" cy="20" r="8" fill="#ff4444" />
            <circle cx="150" cy="280" r="8" fill="#44ffff" />
          </svg>
          <svg viewBox="0 0 300 300" className="gi-color-arrow-svg">
            <path
              d="M 150 36 Q 200 150 150 264"
              fill="none"
              stroke="var(--text)"
              strokeWidth="3"
              className="gi-color-arrow-path"
            />
            <polygon
              points="146,258 154,258 150,270"
              fill="var(--text)"
              opacity="0"
              style={{ animation: "gi-fade-in 0.3s ease-out 1.8s forwards" }}
            />
          </svg>
        </div>

        <div className="gi-color-labels">
          <div className="gi-color-label">
            <div className="gi-color-swatch red" />
            <div className="gi-color-name">RED</div>
          </div>
          <div className="gi-flip-arrow">→</div>
          <div className="gi-color-label">
            <div className="gi-color-swatch cyan" />
            <div className="gi-color-name">CYAN</div>
          </div>
        </div>
        <div className="gi-funfact-step3">Artists use this trick!</div>

        <div className="gi-narration">
          Here's the cool part — the colors flip. Say you stared at something red. Your red-detecting cells are the ones that got tired. So your brain sees what's left — cyan. The opposite of red.
        </div>
      </div>
    </div>
  );
}
