import { useState, useEffect } from "react";
import type { ChapterStepProps } from "../../registry/types";
import "./HookIntro.css";

export default function HookIntro({ step }: ChapterStepProps) {
  const [ghostVisible, setGhostVisible] = useState(false);

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setGhostVisible(true), 800);
      return () => clearTimeout(timer);
    } else {
      setGhostVisible(false);
    }
  }, [step]);

  /* Step 0 — Character stares at bright light */
  if (step === 0) {
    return (
      <div className="hi-scene">
        {/* Desk lamp - custom image */}
        <div className="hi-lamp">
          <img
            src="./light.png"
            alt="Bright light"
            className="hi-lamp-img"
          />
          <div className="hi-light-glow-outer" />
        </div>

        {/* Character looking at light */}
        <div className="hi-character-step0">
          <img
            src="./character-1.png"
            alt="Character"
            className="hi-character-img"
          />
        </div>

        {/* Title text */}
        <div className="hi-title">
          <span className="hi-title-text">Have you ever seen this?</span>
          <span className="hi-subtitle-text">A glowing blob after looking at light</span>
          <span className="hi-narration-text">"You stare at a light — a lamp, your phone, the sun through a window — then you look away, and there it is."</span>
        </div>
      </div>
    );
  }

  /* Step 1 — Character looks away, ghost image appears */
  if (step === 1) {
    return (
      <div className="hi-scene">
        {/* White wall background */}
        <div className="hi-wall" />

        {/* Ghost image blob */}
        <div className={`hi-ghost ${ghostVisible ? "hi-ghost-visible" : ""}`}>
          <div className="hi-ghost-blob" />
          <div className="hi-ghost-glow" />
        </div>

        {/* Character looking at wall */}
        <div className="hi-character-step1">
          <img
            src="./character-1.png"
            alt="Character"
            className="hi-character-img hi-character-img-flipped"
          />
        </div>

        {/* Question text */}
        <div className="hi-question">
          <span className="hi-question-text">What is that?</span>
          <span className="hi-narration-text">"It goes away after a few seconds, but... what was that? Is something wrong with your eye?"</span>
        </div>
      </div>
    );
  }

  /* Step 2 — Narrator introduces the mystery */
  return (
    <div className="hi-scene">
      {/* Background with neon grid */}
      <div className="hi-grid-bg" />

      {/* Center text */}
      <div className="hi-mystery-text">
        <div className="hi-mystery-line hi-mystery-line-1">
          Let's go inside your eye
        </div>
        <div className="hi-mystery-line hi-mystery-line-2">
          and find out
        </div>
        <div className="hi-narration-text hi-narration-center">
          "Let's go inside your eye and figure it out. Turns out, the answer is pretty cool."
        </div>
      </div>

      {/* Eye icon */}
      <div className="hi-eye-icon">
        <svg viewBox="0 0 120 80" className="hi-eye-svg">
          <ellipse
            cx="60"
            cy="40"
            rx="55"
            ry="35"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle
            cx="60"
            cy="40"
            r="20"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle cx="60" cy="40" r="8" fill="var(--accent)" />
        </svg>
      </div>

      {/* Decorative elements */}
      <div className="hi-decor-dots">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="hi-dot"
            style={{
              left: `${10 + (i * 4.5) % 80}%`,
              top: `${15 + (i * 7.3) % 70}%`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
