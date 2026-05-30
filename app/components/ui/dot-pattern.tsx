"use client";

import { cn } from "@/app/lib/utils";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import { useRef } from "react";

type Direction =
  | "vertical"
  | "horizontal"
  | "diagonal-right"
  | "diagonal-left"
  | "radial";

interface DotPatternProps {
  className?: string;
  columns?: number;
  rows?: number;
  gap?: number;
  dotSize?: number;
  opacity?: number;
  animated?: boolean;
  speedX?: number;
  speedY?: number;
  blur?: boolean;
  glow?: boolean;
  rotate?: number;
  direction?: Direction;
  variant?: "hero" | "side" | "corner" | "footer" | "overlay";
  /** Pass a scrollYProgress MotionValue from the parent to override internal scroll tracking.
   *  Use this when the DotPattern is in a hero/above-fold section where internal tracking
   *  starts mid-range and the enter animation never plays. */
  scrollProgress?: MotionValue<number>;
}

// ── Single scrubbing dot ──────────────────────────────────────────────────────
function ScrubDot({
  dotSize,
  glow,
  scrollYProgress,
  enterAt,   // scrollYProgress value when this dot becomes fully visible
  leaveAt,   // scrollYProgress value when this dot starts to disappear
}: {
  dotSize: number;
  glow: boolean;
  scrollYProgress: MotionValue<number>;
  enterAt: number;
  leaveAt: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [enterAt - 0.04, enterAt, leaveAt, leaveAt + 0.04],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [enterAt - 0.04, enterAt, leaveAt, leaveAt + 0.04],
    [0.35, 1, 1, 0.35]
  );

  // Light spring smoothing — keeps it feeling physical without lag
  const springOpacity = useSpring(opacity, { stiffness: 120, damping: 20 });
  const springScale   = useSpring(scale,   { stiffness: 120, damping: 20 });

  return (
    <motion.div
      style={{
        width: `${dotSize}px`,
        height: `${dotSize}px`,
        borderRadius: "999px",
        opacity: springOpacity,
        scale: springScale,
        background: `
          radial-gradient(
            circle at 35% 35%,
            #F1F3ED 0%,
            #79924F 35%,
            #435426 65%,
            #16181D 100%
          )
        `,
        boxShadow: glow
          ? `0 0 18px rgba(121,146,79,0.35), 0 4px 12px rgba(22,24,29,0.5), inset 0 -3px 6px rgba(121,146,79,0.5)`
          : `0 4px 12px rgba(22,24,29,0.5), inset 0 -3px 6px rgba(121,146,79,0.5)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "18%", left: "22%",
          width: "30%", height: "22%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)",
          transform: "rotate(-30deg)",
          filter: "blur(1px)",
        }}
      />
    </motion.div>
  );
}

// ── DotPattern ────────────────────────────────────────────────────────────────
export default function DotPattern({
  className,
  columns = 4,
  rows = 15,
  gap = 22,
  dotSize = 8,
  opacity = 1,
  animated = true,
  speedX = 0,
  speedY = 0,
  blur = false,
  glow = false,
  rotate = 0,
  direction = "diagonal-right",
  variant = "side",
  scrollProgress,
}: DotPatternProps) {
  const total = columns * rows;
  const containerRef = useRef<HTMLDivElement>(null);

  // Internal scroll: scoped to this element's position on the page.
  // When scrollProgress is passed from the parent, we use that instead —
  // this is necessary for above-fold / hero placements where the internal
  // tracker starts mid-range and the enter animation is skipped.
  const { scrollYProgress: internalProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const activeProgress = scrollProgress ?? internalProgress;

  // Parallax drift on the whole container
  const driftY = useTransform(activeProgress, [0, 1], [0, speedY]);
  const driftX = useTransform(activeProgress, [0, 1], [0, speedX]);

  // Stagger offset per dot (normalised to a 0–1 scroll window)
  // Each dot gets a unique enterAt based on direction — spread across the first 60% of scroll range
  const getStaggerOffset = (row: number, col: number) => {
    const maxIndex = rows - 1 + columns - 1;
    let index = 0;
    switch (direction) {
      case "vertical":      index = row; break;
      case "horizontal":    index = col; break;
      case "diagonal-left": index = row + (columns - 1 - col); break;
      case "radial": {
        const cx = columns / 2, cy = rows / 2;
        index = Math.sqrt(Math.pow(col - cx, 2) + Math.pow(row - cy, 2));
        break;
      }
      case "diagonal-right":
      default:              index = row + col; break;
    }
    // Spread stagger across 0–0.55 of the scroll range
    return (index / maxIndex) * 0.55;
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn("pointer-events-none select-none", className)}
      style={{ opacity, x: driftX, y: driftY, rotate }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, ${dotSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${dotSize}px)`,
          gap: `${gap}px`,
          width: "fit-content",
        }}
      >
        {Array.from({ length: total }, (_, i) => {
          const col = i % columns;
          const row = Math.floor(i / columns);
          const offset = animated ? getStaggerOffset(row, col) : 0;

          // Each dot is fully visible between its enterAt and leaveAt scroll values
          const enterAt = 0.05 + offset * 0.7;   // arrives early-to-mid scroll
          const leaveAt = animated ? 0.70 + offset * 0.25 : 1; // leaves mid-to-late scroll

          return animated ? (
            <ScrubDot
              key={i}
              dotSize={dotSize}
              glow={glow}
              scrollYProgress={activeProgress}
              enterAt={enterAt}
              leaveAt={leaveAt}
            />
          ) : (
            // Non-animated: static dot
            <div
              key={i}
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                borderRadius: "999px",
                background: `
                  radial-gradient(
                    circle at 35% 35%,
                    #F1F3ED 0%,
                    #79924F 35%,
                    #435426 65%,
                    #16181D 100%
                  )
                `,
                boxShadow: glow
                  ? `0 0 18px rgba(121,146,79,0.35), 0 4px 12px rgba(22,24,29,0.5), inset 0 -3px 6px rgba(121,146,79,0.5)`
                  : `0 4px 12px rgba(22,24,29,0.5), inset 0 -3px 6px rgba(121,146,79,0.5)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "18%", left: "22%",
                  width: "30%", height: "22%",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)",
                  transform: "rotate(-30deg)",
                  filter: "blur(1px)",
                }}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}