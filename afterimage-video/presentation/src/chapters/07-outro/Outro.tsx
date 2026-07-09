import type { ChapterStepProps } from "../../registry/types";
import "./Outro.css";

export default function Outro({ step }: ChapterStepProps) {
  /* Step 0 — Recap: cells taking a nap */
  if (step === 0) {
    return (
      <div className="oe-scene">
        <div className="oe-recap-scene">
          <div className="oe-ghost-container">
            <div className="oe-ghost-glow" />
            <div className="oe-ghost" />
            <div className="oe-zzz">
              <span className="oe-z">z</span>
              <span className="oe-z">z</span>
              <span className="oe-z">z</span>
            </div>
          </div>

          <div className="oe-recap-title">
            Just a Quick Nap!
          </div>

          <div className="oe-recap-sub">
            Your <span className="oe-accent-text">light-catching cells</span> rest and recover
          </div>

          <div className="oe-recap-detail">
            Don't worry — they'll be back in a minute.
          </div>

          <div className="oe-fun-fact">
            <span className="oe-fun-fact-label">FUN FACT</span>
            <span className="oe-fun-fact-text">30 seconds is all it takes</span>
          </div>
        </div>

        <div className="oe-narration">
          So next time you see that ghost image after looking at something bright — don't worry. Your light-catching cells are just taking a quick nap.
        </div>
      </div>
    );
  }

  /* Step 1 — Goodbye / CTA */
  return (
    <div className="oe-scene">
      <div className="oe-hearts">
        <div className="oe-heart" style={{ color: "var(--accent)" }}>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="oe-heart" style={{ color: "var(--accent-glow)" }}>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="oe-heart" style={{ color: "var(--accent)" }}>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="oe-heart" style={{ color: "var(--accent-glow)" }}>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="oe-heart" style={{ color: "var(--accent)" }}>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      <div className="oe-goodbye-scene">
        <div className="oe-goodbye-text">See You Next Time!</div>

        <div className="oe-goodbye-sub">
          Share with a friend who <span className="oe-accent-text">stares at lights</span>
        </div>

        <div className="oe-cta-row">
          <div className="oe-cta oe-cta-share">
            <svg className="oe-cta-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98M21 5a3 3 0 11-6 0 3 3 0 016 0zM9 12a3 3 0 11-6 0 3 3 0 016 0zM21 19a3 3 0 11-6 0 3 3 0 016 0z"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="oe-cta-text">SHARE</span>
          </div>
          <div className="oe-cta oe-cta-subscribe">
            <svg className="oe-cta-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 3H3v7h2V5.41l10.3 10.3 1.4-1.42L5.41 4H10V3zm4 16h7v-7h-2v3.59L8.7 5.29 7.3 6.7 17.59 17H14v2z"
                fill="var(--accent)"
              />
            </svg>
            <span className="oe-cta-text">SUBSCRIBE</span>
          </div>
        </div>
      </div>

      <div className="oe-narration">
        If you learned something, share this with a friend. See you next time.
      </div>
    </div>
    );
}
