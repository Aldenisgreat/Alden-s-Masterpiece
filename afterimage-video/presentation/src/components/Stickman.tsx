import { useEffect, useState } from "react";
import "./Stickman.css";

interface StickmanProps {
  expression?: "neutral" | "happy" | "confused" | "surprised" | "worried";
  scale?: number;
  animation?: "none" | "bounce" | "wave" | "point";
  lookAt?: "left" | "right" | "up" | "center";
}

export function Stickman({
  expression = "neutral",
  scale = 1,
  animation = "none",
  lookAt = "center",
}: StickmanProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const eyeOffsetX = lookAt === "left" ? -3 : lookAt === "right" ? 3 : 0;
  const eyeOffsetY = lookAt === "up" ? -2 : 0;

  return (
    <div
      className={`stickman stickman-${animation} ${
        mounted ? "stickman-visible" : ""
      }`}
      style={{ transform: `scale(${scale})`, transformOrigin: "bottom center" }}
    >
      <svg
        viewBox="0 0 160 240"
        className="stickman-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body - rounded blob shape */}
        <ellipse
          cx="80"
          cy="160"
          rx="35"
          ry="45"
          className="stickman-body-blob"
        />

        {/* Left leg */}
        <ellipse
          cx="65"
          cy="215"
          rx="12"
          ry="18"
          className="stickman-body-blob"
        />

        {/* Right leg */}
        <ellipse
          cx="95"
          cy="215"
          rx="12"
          ry="18"
          className="stickman-body-blob"
        />

        {/* Left arm */}
        {animation === "wave" ? (
          <ellipse
            cx="40"
            cy="130"
            rx="10"
            ry="25"
            className="stickman-body-blob stickman-arm-wave"
            transform="rotate(-30, 40, 130)"
          />
        ) : animation === "point" ? (
          <ellipse
            cx="38"
            cy="140"
            rx="10"
            ry="25"
            className="stickman-body-blob"
            transform="rotate(-60, 38, 140)"
          />
        ) : (
          <ellipse
            cx="45"
            cy="155"
            rx="10"
            ry="25"
            className="stickman-body-blob"
            transform="rotate(15, 45, 155)"
          />
        )}

        {/* Right arm */}
        {animation === "wave" ? (
          <ellipse
            cx="130"
            cy="110"
            rx="10"
            ry="25"
            className="stickman-body-blob stickman-arm-wave"
            transform="rotate(40, 130, 110)"
          />
        ) : animation === "point" ? (
          <ellipse
            cx="135"
            cy="130"
            rx="10"
            ry="25"
            className="stickman-body-blob"
            transform="rotate(60, 135, 130)"
          />
        ) : (
          <ellipse
            cx="115"
            cy="155"
            rx="10"
            ry="25"
            className="stickman-body-blob"
            transform="rotate(-15, 115, 155)"
          />
        )}

        {/* Head - big round blob */}
        <circle
          cx="80"
          cy="75"
          r="50"
          className="stickman-head-blob"
        />

        {/* Eyes - simple dots */}
        <g className="stickman-eyes">
          <circle
            cx={65 + eyeOffsetX}
            cy={68 + eyeOffsetY}
            r="6"
            className="stickman-eye"
          />
          <circle
            cx={95 + eyeOffsetX}
            cy={68 + eyeOffsetY}
            r="6"
            className="stickman-eye"
          />
          {/* Eye highlights */}
          <circle
            cx={63 + eyeOffsetX}
            cy={65 + eyeOffsetY}
            r="2.5"
            className="stickman-eye-highlight"
          />
          <circle
            cx={93 + eyeOffsetX}
            cy={65 + eyeOffsetY}
            r="2.5"
            className="stickman-eye-highlight"
          />
        </g>

        {/* Eyebrows */}
        {expression === "happy" && (
          <g className="stickman-brow">
            <path
              d={`M ${55 + eyeOffsetX} ${58 + eyeOffsetY} Q ${65 + eyeOffsetX} ${52 + eyeOffsetY} ${75 + eyeOffsetX} ${58 + eyeOffsetY}`}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M ${85 + eyeOffsetX} ${58 + eyeOffsetY} Q ${95 + eyeOffsetX} ${52 + eyeOffsetY} ${105 + eyeOffsetX} ${58 + eyeOffsetY}`}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}
        {expression === "confused" && (
          <g className="stickman-brow">
            <path
              d={`M ${55 + eyeOffsetX} ${55 + eyeOffsetY} L ${75 + eyeOffsetX} ${60 + eyeOffsetY}`}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M ${85 + eyeOffsetX} ${60 + eyeOffsetY} L ${105 + eyeOffsetX} ${55 + eyeOffsetY}`}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}
        {expression === "surprised" && (
          <g className="stickman-brow">
            <path
              d={`M ${55 + eyeOffsetX} ${52 + eyeOffsetY} Q ${65 + eyeOffsetX} ${48 + eyeOffsetY} ${75 + eyeOffsetX} ${52 + eyeOffsetY}`}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M ${85 + eyeOffsetX} ${52 + eyeOffsetY} Q ${95 + eyeOffsetX} ${48 + eyeOffsetY} ${105 + eyeOffsetX} ${52 + eyeOffsetY}`}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}
        {expression === "worried" && (
          <g className="stickman-brow">
            <path
              d={`M ${55 + eyeOffsetX} ${60 + eyeOffsetY} Q ${65 + eyeOffsetX} ${55 + eyeOffsetY} ${75 + eyeOffsetX} ${57 + eyeOffsetY}`}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M ${85 + eyeOffsetX} ${57 + eyeOffsetY} Q ${95 + eyeOffsetX} ${55 + eyeOffsetY} ${105 + eyeOffsetX} ${60 + eyeOffsetY}`}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        {/* Mouth */}
        {expression === "neutral" && (
          <path
            d="M 70 90 Q 80 95 90 90"
            className="stickman-mouth"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        )}
        {expression === "happy" && (
          <path
            d="M 65 88 Q 80 102 95 88"
            className="stickman-mouth"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        )}
        {expression === "confused" && (
          <path
            d="M 65 95 Q 80 88 95 95"
            className="stickman-mouth"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        )}
        {expression === "surprised" && (
          <ellipse
            cx="80"
            cy="92"
            rx="8"
            ry="10"
            className="stickman-mouth"
            strokeWidth="3.5"
            fill="none"
          />
        )}
        {expression === "worried" && (
          <path
            d="M 65 97 Q 80 88 95 97"
            className="stickman-mouth"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </svg>
    </div>
  );
}
