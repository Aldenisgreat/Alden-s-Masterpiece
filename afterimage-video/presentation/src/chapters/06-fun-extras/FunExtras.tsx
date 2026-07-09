import type { ChapterStepProps } from "../../registry/types";
import "./FunExtras.css";

export default function FunExtras({ step }: ChapterStepProps) {
  /* Step 0 — Complementary colors in painting */
  if (step === 0) {
    return (
      <div className="fe-scene">
        <div className="fe-title-top">Artists Knew This!</div>
        <div className="fe-subtitle-top">
          <span className="fe-accent-text">Complementary colors</span> make each other brighter
        </div>

        <div className="fe-painting-scene">
          <div className="fe-canvas">
            <div className="fe-canvas-half fe-canvas-top" />
            <div className="fe-canvas-label fe-canvas-label-top">Cyan</div>
            <div className="fe-canvas-divider" />
            <div className="fe-canvas-half fe-canvas-bottom" />
            <div className="fe-canvas-label fe-canvas-label-bottom">Magenta</div>
          </div>

          <div className="fe-arrow-container">
            <svg className="fe-arrow-svg" viewBox="0 0 80 80" fill="none">
              <path
                d="M10 40 H60 M50 25 L65 40 L50 55"
                stroke="var(--accent)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="fe-arrow-label">Brighter!</span>
          </div>

          <div className="fe-canvas" style={{ borderColor: "var(--accent)" }}>
            <div
              className="fe-canvas-half fe-canvas-top"
              style={{ background: "var(--accent-glow)" }}
            />
            <div className="fe-canvas-label fe-canvas-label-top">Magenta</div>
            <div className="fe-canvas-divider" />
            <div
              className="fe-canvas-half fe-canvas-bottom"
              style={{ background: "var(--accent)" }}
            />
            <div className="fe-canvas-label fe-canvas-label-bottom">Cyan</div>
          </div>
        </div>

        <div className="fe-monet-container">
          <img src="./monet.png" alt="Monet's Water Lilies" className="fe-monet-img" />
          <div className="fe-monet-label">Monet's Water Lilies</div>
        </div>

        <div className="fe-fun-fact">
          <span className="fe-fun-fact-label">FUN FACT</span>
          <span className="fe-fun-fact-text">Monet used this trick in his water lilies</span>
        </div>

        <div className="fe-narration">
          Fun fact — painters have known about this for a long time. They put complementary colors next to each other because they make each other look brighter.
        </div>
      </div>
    );
  }

  /* Step 1 — Sun warning */
  if (step === 1) {
    return (
      <div className="fe-scene">
        <div className="fe-warning-scene">
          <div className="fe-sun-container">
            <div className="fe-sun">
              <div className="fe-sun-ray" />
              <div className="fe-sun-ray" />
              <div className="fe-sun-ray" />
              <div className="fe-sun-ray" />
              <div className="fe-sun-ray" />
              <div className="fe-sun-ray" />
              <div className="fe-sun-ray" />
              <div className="fe-sun-ray" />
            </div>
            <div className="fe-cross">
              <div className="fe-cross-line" />
              <div className="fe-cross-line" />
            </div>
          </div>

          <div className="fe-warning-text">Don't Stare at the Sun!</div>
          <div className="fe-warning-sub">
            <span className="fe-accent-text">Permanent damage</span> to your retina
          </div>
          <div className="fe-warning-detail">
            A lamp or window is fine — the afterimage goes away.
            <br />
            But the sun can <span className="fe-accent-text">permanently burn</span> your retinal cells.
          </div>
          <div className="fe-warning-badge">
            <span className="fe-warning-badge-label">WARNING</span>
            <span className="fe-warning-badge-text">Solar retinopathy = permanent vision loss</span>
          </div>
        </div>

        <div className="fe-narration">
          One serious thing though — don't stare at the sun. A lamp or window is fine, the afterimage goes away. But the sun can actually burn the cells in your retina.
        </div>
      </div>
    );
  }

  /* Step 2 — Try it yourself */
  return (
    <div className="fe-scene">
      <div className="fe-try-title">Try It Yourself!</div>
      <div className="fe-try-subtitle">
        <span className="fe-accent-text">See the science</span> in action
      </div>

      <div className="fe-try-scene">
        <div className="fe-window">
          <div className="fe-window-glow" />
          <div className="fe-window-pane" />
          <div className="fe-window-pane-v" />
          <div className="fe-window-label">LIGHT SOURCE</div>
        </div>

        <div className="fe-try-arrow">
          <svg className="fe-try-arrow-svg" viewBox="0 0 100 60" fill="none">
            <path
              d="M5 30 H80 M70 15 L90 30 L70 45"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="fe-try-label">Look away</span>
        </div>

        <div className="fe-wall">
          <div className="fe-afterimage" />
          <div className="fe-wall-label">WALL</div>
        </div>
      </div>

      <div className="fe-try-steps">
        <div className="fe-try-step">
          <div className="fe-try-step-num">1</div>
          <div className="fe-try-step-title">STEP 1: STARE</div>
          <div className="fe-try-step-text">Stare at light for 10 seconds</div>
        </div>
        <div className="fe-try-step">
          <div className="fe-try-step-num">2</div>
          <div className="fe-try-step-title">STEP 2: LOOK AWAY</div>
          <div className="fe-try-step-text">Shift your gaze to a blank wall</div>
        </div>
        <div className="fe-try-step">
          <div className="fe-try-step-num">3</div>
          <div className="fe-try-step-title">STEP 3: SEE THE GHOST</div>
          <div className="fe-try-step-text">Spot the glowing afterimage!</div>
        </div>
      </div>

      <div className="fe-narration">
        If you want to see this for yourself, you can try it later. Stare at a bright window for ten seconds, then look at a white wall. You'll see it.
      </div>
    </div>
    );
}
