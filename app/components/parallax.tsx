"use client"

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// ─── ParallaxLayer ────────────────────────────────────────────────────────────
interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxLayer({ children, speed = 0.3, className = "", style = {} }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = speed * 120;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, ...style }}>{children}</motion.div>
    </div>
  );
}

// ─── ParallaxHeroImage ────────────────────────────────────────────────────────
interface ParallaxHeroImageProps {
  src: string;
  alt?: string;
  speed?: number;
  children?: React.ReactNode;
  className?: string;
}

export function ParallaxHeroImage({ src, alt = "", speed = 0.25, children, className = "" }: ParallaxHeroImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 40}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${src}')` }}
          aria-label={alt}
          role="img"
        />
      </motion.div>
      {children}
    </div>
  );
}

// ─── ParallaxFloat ────────────────────────────────────────────────────────────
interface ParallaxFloatProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxFloat({ children, speed = 0.15, className = "" }: ParallaxFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = speed * 80;
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [range, 0, -range]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── ParallaxFade ─────────────────────────────────────────────────────────────
interface ParallaxFadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function ParallaxFade({ children, delay = 0, className = "" }: ParallaxFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── ParallaxScale ────────────────────────────────────────────────────────────
interface ParallaxScaleProps {
  children: React.ReactNode;
  className?: string;
}

export function ParallaxScale({ children, className = "" }: ParallaxScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.4"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── ParallaxScrub ────────────────────────────────────────────────────────────
interface ParallaxScrubProps {
  children?: React.ReactNode;
  speedX?: number;
  speedY?: number;
  className?: string;
}

export function ParallaxScrub({ children, speedX = 0.1, speedY = 0, className = "" }: ParallaxScrubProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [`${speedX * -60}px`, `${speedX * 60}px`]);
  const y = useTransform(scrollYProgress, [0, 1], [`${speedY * -60}px`, `${speedY * 60}px`]);

  return (
    <motion.div ref={ref} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}