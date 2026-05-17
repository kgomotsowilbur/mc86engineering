"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

/**
 * GrinderParallax
 *
 * Drop this anywhere in your Next.js page tree.
 * It needs to be inside a scrollable container (the default <body> is fine).
 *
 * Install deps:
 *   npm install framer-motion
 *
 * Usage:
 *   import GrinderParallax from "@/components/GrinderParallax";
 *   <GrinderParallax />
 */

// ─── Spark particle type ───────────────────────────────────────────────────────
interface SparkProps {
  style: React.CSSProperties;
  delay: number;
  duration: number;
  angle: number;
  distance: number;
}

const SPARKS: SparkProps[] = Array.from({ length: 28 }, (_, i) => ({
  style: {
    width: `${Math.random() * 3 + 1}px`,
    height: `${Math.random() * 12 + 4}px`,
    left: `${48 + Math.random() * 6}%`,
    top: `${52 + Math.random() * 6}%`,
    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
    background: `hsl(${30 + Math.random() * 20}deg 100% ${70 + Math.random() * 20}%)`,
    filter: "blur(0.5px)",
    boxShadow: "0 0 6px 2px rgba(255,160,20,0.7)",
  },
  delay: Math.random() * 1.2,
  duration: 0.6 + Math.random() * 0.8,
  angle: -10 + Math.random() * 80, // degrees from horizontal
  distance: 80 + Math.random() * 160,
}));

// ─── Single spark ──────────────────────────────────────────────────────────────
function Spark({ style, delay, duration, angle, distance }: SparkProps) {
  const rad = (angle * Math.PI) / 180;
  const dx = Math.cos(rad) * distance;
  const dy = -Math.sin(rad) * distance;

  return (
    <motion.span
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0, x: 0, y: 0, scaleY: 1 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, dx * 0.4, dx],
        y: [0, dy * 0.4, dy],
        scaleY: [1, 0.5, 0.2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
        times: [0, 0.3, 1],
      }}
    />
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function GrinderParallax() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // ── Smooth spring base ──────────────────────────────────────────────────────
  const springConfig = { stiffness: 60, damping: 20, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // ── Grinder image transforms ────────────────────────────────────────────────
  // Translate upward as user scrolls down (classic parallax)
  const grinderY = useTransform(smoothProgress, [0, 1], ["12%", "-12%"]);
  // Slight rightward drift on scroll (like the arm pushing forward)
  const grinderX = useTransform(smoothProgress, [0, 1], ["-3%", "3%"]);
  // Subtle rotation: tilts slightly as it "grinds"
  const grinderRotate = useTransform(smoothProgress, [0, 1], [-2, 3]);
  // Scale: pops into view from slightly smaller
  const grinderScale = useTransform(smoothProgress, [0, 0.3, 1], [0.92, 1, 1.04]);

  // ── Spark container transforms (lag behind the grinder) ─────────────────────
  const sparksY = useTransform(smoothProgress, [0, 1], ["18%", "-6%"]);
  const sparksX = useTransform(smoothProgress, [0, 1], ["-6%", "6%"]);
  const sparksOpacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.6]);

  // ── Ambient glow pulse ──────────────────────────────────────────────────────
  const glowScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] bg-[#0a0704] overflow-hidden flex items-center justify-center"
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* ── Background gradient atmosphere ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 55% 55%, rgba(180,80,10,0.18) 0%, rgba(10,7,4,1) 70%)",
          }}
        />

        {/* ── Ambient glow behind sparks ── */}
        <motion.div
          className="absolute"
          style={{
            width: "45%",
            height: "40%",
            left: "48%",
            top: "48%",
            translateX: "-50%",
            translateY: "-50%",
            scale: glowScale,
            background:
              "radial-gradient(ellipse, rgba(255,120,10,0.35) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* ── Grinder image ── */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: grinderY,
            x: grinderX,
            rotate: grinderRotate,
            scale: grinderScale,
          }}
        >
          <Image
            src="https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1778941837/74637125-0b33-4fc8-87f8-47244072d60d_jkvkdu.png" 
            alt="Angle grinder cutting metal with sparks"
            fill
            priority
            className="object-cover object-center"
            style={{ mixBlendMode: "lighten" }}
          />
        </motion.div>

        {/* ── Sparks layer (slightly different parallax for depth) ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            y: sparksY,
            x: sparksX,
            opacity: sparksOpacity,
          }}
        >
          {SPARKS.map((s, i) => (
            <Spark key={i} {...s} />
          ))}
        </motion.div>

        {/* ── Vignette overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(5,3,1,0.85) 100%)",
          }}
        />

        {/* ── Optional headline ── */}
        <motion.div
          className="relative z-10 text-center select-none"
          style={{
            y: useTransform(smoothProgress, [0, 1], ["0%", "-30%"]),
            opacity: useTransform(smoothProgress, [0, 0.2, 0.7, 1], [1, 1, 0.6, 0]),
          }}
        >
          <h1
            className="text-6xl md:text-8xl font-black tracking-tighter uppercase"
            style={{
              fontFamily: "'Impact', 'Anton', sans-serif",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(255,140,30,0.8)",
              textShadow: "0 0 40px rgba(255,100,10,0.5)",
              letterSpacing: "-0.03em",
            }}
          >
            Forged in Fire
          </h1>
          <p
            className="mt-4 text-sm tracking-[0.4em] uppercase"
            style={{ color: "rgba(255,160,60,0.6)" }}
          >
            Scroll to ignite
          </p>
        </motion.div>
      </div>
    </section>
  );
}