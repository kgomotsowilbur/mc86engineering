"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Button } from "./ui/button";
import Dotbox from "./ui/dotbox";

// ─── Images ───────────────────────────────────────────────────────────────────

const HERO_IMAGES = [
    "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779021963/9196f923-701a-46cb-97dd-6e627519daaa_rke7qj.png",
    "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1778941158/629f1d22-4695-4a98-bd59-f36fae0be57d_g5ozlm.png",
    "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1778941837/74637125-0b33-4fc8-87f8-47244072d60d_jkvkdu.png"
];

const INTERVAL_MS = 5000;

// ─── CSS (injected once into <head>) ─────────────────────────────────────────

const STYLES = `
  @keyframes hc-iris-in {
    from { clip-path: circle(0% at 50% 50%); }
    to   { clip-path: circle(150% at 50% 50%); }
  }
  @keyframes hc-swipe-in {
    from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
    to   { clip-path: polygon(-20% 0, 100% 0, 120% 100%, 0 100%); }
  }
  @keyframes hc-kenburns-in {
    from { transform: scale(1.08); opacity: 0; }
    to   { transform: scale(1.00); opacity: 1; }
  }
  @keyframes hc-swipe-stripe {
    from { transform: translateX(-100%); }
    to   { transform: translateX(250%); }
  }

  .hc-iris-in  { animation: hc-iris-in  0.75s cubic-bezier(0.4,0,0.2,1) forwards; }
  .hc-swipe-in { animation: hc-swipe-in 0.65s cubic-bezier(0.77,0,0.18,1) forwards; }
  .hc-kb-in    { animation: hc-kenburns-in 0.9s ease forwards; }

  .hc-swipe-stripe {
    position: absolute; inset: 0; z-index: 8; pointer-events: none;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%);
    animation: hc-swipe-stripe 0.65s ease forwards;
  }
  .hc-flash-overlay {
    position: absolute; inset: 0; z-index: 8; pointer-events: none; background: #fff;
  }
  .hc-venetian-strip {
    position: absolute; overflow: hidden;
    top: 0; bottom: 0;
    transform: scaleX(0); transform-origin: left;
  }
  .hc-venetian-inner {
    position: absolute; top: 0; bottom: 0;
    background-size: cover; background-position: center; background-repeat: no-repeat;
  }
`;

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  const tag = document.createElement("style");
  tag.textContent = STYLES;
  document.head.appendChild(tag);
  stylesInjected = true;
}

// ─── commit ───────────────────────────────────────────────────────────────────

function commit(
  nextIndex: number,
  baseLayers: HTMLElement[],
  setActive: (i: number) => void,
) {
  baseLayers.forEach((el, i) => {
    el.style.opacity = i === nextIndex ? "1" : "0";
  });
  setActive(nextIndex);
}

// ─── Effect runners ───────────────────────────────────────────────────────────

type RunEffect = (p: {
  container: HTMLElement;
  baseLayers: HTMLElement[];
  nextUrl: string;
  nextIndex: number;
  setActive: (i: number) => void;
}) => Promise<void>;

// 1 · Venetian (vertical) blinds
const runVenetian: RunEffect = ({ container, baseLayers, nextUrl, nextIndex, setActive }) =>
  new Promise((resolve) => {
    const STRIPS = 10;
    const W = container.getBoundingClientRect().width;
    const sw = 100 / STRIPS;
    const els: HTMLElement[] = [];

    for (let i = 0; i < STRIPS; i++) {
      const strip = document.createElement("div");
      strip.className = "hc-venetian-strip";
      strip.style.cssText = `left:${i * sw}%;width:${sw + 0.1}%;height:100%;z-index:7;`;
      const inner = document.createElement("div");
      inner.className = "hc-venetian-inner";
      inner.style.cssText = `background-image:url('${nextUrl}');left:${-(i * (W / STRIPS))}px;width:${W}px;`;
      strip.appendChild(inner);
      container.appendChild(strip);
      els.push(strip);
    }

    let done = 0;
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);
    els.forEach((strip, i) => {
      setTimeout(() => {
        let t = 0;
        const tick = () => {
          t = Math.min(t + 0.07, 1);
          strip.style.transform = `scaleX(${ease(t)})`;
          if (t < 1) { requestAnimationFrame(tick); return; }
          if (++done === STRIPS) {
            commit(nextIndex, baseLayers, setActive);
            setTimeout(() => { els.forEach((s) => s.remove()); resolve(); }, 40);
          }
        };
        requestAnimationFrame(tick);
      }, i * 45);
    });
  });

// 2 · Iris wipe
const runIris: RunEffect = ({ container, baseLayers, nextUrl, nextIndex, setActive }) =>
  new Promise((resolve) => {
    const layer = document.createElement("div");
    layer.style.cssText = `position:absolute;inset:0;z-index:7;background-image:url('${nextUrl}');background-size:cover;background-position:center;clip-path:circle(0% at 50% 50%);`;
    container.appendChild(layer);
    layer.getBoundingClientRect();
    layer.classList.add("hc-iris-in");
    layer.addEventListener("animationend", () => {
      commit(nextIndex, baseLayers, setActive);
      requestAnimationFrame(() => { layer.remove(); resolve(); });
    }, { once: true });
  });

// 3 · Ken Burns crossfade
const runKenBurns: RunEffect = ({ container, baseLayers, nextUrl, nextIndex, setActive }) =>
  new Promise((resolve) => {
    const layer = document.createElement("div");
    layer.style.cssText = `position:absolute;inset:0;z-index:7;background-image:url('${nextUrl}');background-size:cover;background-position:center;`;
    container.appendChild(layer);
    layer.getBoundingClientRect();
    layer.classList.add("hc-kb-in");
    layer.addEventListener("animationend", () => {
      commit(nextIndex, baseLayers, setActive);
      requestAnimationFrame(() => { layer.remove(); resolve(); });
    }, { once: true });
  });

// 4 · Flash burn
const runFlash: RunEffect = ({ container, baseLayers, nextIndex, setActive }) =>
  new Promise((resolve) => {
    const flash = document.createElement("div");
    flash.className = "hc-flash-overlay";
    flash.style.opacity = "0";
    flash.style.transition = "opacity 0.08s ease-in";
    container.appendChild(flash);
    requestAnimationFrame(() => {
      flash.style.opacity = "0.88";
      setTimeout(() => {
        commit(nextIndex, baseLayers, setActive);
        flash.style.transition = "opacity 0.5s ease-out";
        flash.style.opacity = "0";
        setTimeout(() => { flash.remove(); resolve(); }, 520);
      }, 110);
    });
  });

// 5 · Diagonal swipe reveal
const runSwipe: RunEffect = ({ container, baseLayers, nextUrl, nextIndex, setActive }) =>
  new Promise((resolve) => {
    const layer = document.createElement("div");
    layer.style.cssText = `position:absolute;inset:0;z-index:7;background-image:url('${nextUrl}');background-size:cover;background-position:center;clip-path:polygon(0 0,0 0,0 100%,0 100%);`;
    container.appendChild(layer);
    const stripe = document.createElement("div");
    stripe.className = "hc-swipe-stripe";
    container.appendChild(stripe);
    layer.getBoundingClientRect();
    layer.classList.add("hc-swipe-in");
    layer.addEventListener("animationend", () => {
      commit(nextIndex, baseLayers, setActive);
      requestAnimationFrame(() => { layer.remove(); stripe.remove(); resolve(); });
    }, { once: true });
  });

// ─── Effect sequence ──────────────────────────────────────────────────────────

type Effect = "venetian" | "iris" | "kenburns" | "flash" | "swipe";

const RUNNERS: Record<Effect, RunEffect> = {
  venetian: runVenetian,
  iris:     runIris,
  kenburns: runKenBurns,
  flash:    runFlash,
  swipe:    runSwipe,
};

const SEQUENCE: Effect[] = ["venetian", "iris", "kenburns", "flash", "swipe"];

// ─── CarouselEngine ───────────────────────────────────────────────────────────

function CarouselEngine({
  images,
  bgY,
  onSync,
}: {
  images: string[];
  bgY: MotionValue<string>;
  onSync: (activeIndex: number, goTo: (i: number) => void) => void;
}) {
  const containerRef   = useRef<HTMLDivElement>(null);
  const baseLayerRefs  = useRef<HTMLElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const effectCursor   = useRef(0);
  const transitioning  = useRef(false);
  const timerRef       = useRef<ReturnType<typeof setInterval> | null>(null);
  const introPlayed    = useRef(false);

  useEffect(() => { injectStyles(); }, []);

  // ── Intro: reveal first image with a transition effect on mount ──
  useEffect(() => {
    if (introPlayed.current || !containerRef.current) return;
    introPlayed.current = true;
    transitioning.current = true;

    // Start fully hidden then iris-in to reveal
    runSwipe({
      container:  containerRef.current,
      baseLayers: baseLayerRefs.current,
      nextUrl:    images[0],
      nextIndex:  0,
      setActive: (i) => {
        activeIndexRef.current = i;
        setActiveIndex(i);
      },
    }).then(() => {
      transitioning.current = false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  activeIndexRef.current = activeIndex;

  const goTo = async (next: number) => {
    if (next === activeIndexRef.current || transitioning.current || !containerRef.current) return;
    transitioning.current = true;

    const effect = SEQUENCE[effectCursor.current % SEQUENCE.length];
    effectCursor.current++;

    await RUNNERS[effect]({
      container:  containerRef.current,
      baseLayers: baseLayerRefs.current,
      nextUrl:    images[next],
      nextIndex:  next,
      setActive: (i) => {
        activeIndexRef.current = i;
        setActiveIndex(i);
      },
    });

    transitioning.current = false;
  };

  // Stable interval — reads ref, never stale
  useEffect(() => {
    if (images.length <= 1) return;
    timerRef.current = setInterval(() => {
      goTo((activeIndexRef.current + 1) % images.length);
    }, INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  // ── FIX: stabilise handleDot so it doesn't change identity every render ──
  const handleDot = useCallback((i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── FIX: call onSync in an effect, never during render ──
  useEffect(() => {
    onSync(activeIndex, handleDot);
  }, [activeIndex, handleDot, onSync]);

  return (
    <motion.div
      className="absolute inset-0 w-full h-[120%] -top-[10%]"
      style={{ y: bgY }}
    >
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden"
        style={{ isolation: "isolate" }}
      >
        {images.map((url, i) => (
          <div
            key={url}
            ref={(el) => { if (el) baseLayerRefs.current[i] = el; }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${url}')`,
              opacity: 0,           // intro effect & commit() manage opacity from here
              zIndex: 1,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── HeroCarousel ─────────────────────────────────────────────────────────────

export function HeroCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  const [dotActive, setDotActive] = useState(0);
  const dotGoTo = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY         = useTransform(scrollYProgress, [0, 1],   ["0%",   "30%"]);
  const contentY    = useTransform(scrollYProgress, [0, 1],   ["0%",   "-15%"]);
  const contentOp   = useTransform(scrollYProgress, [0, 0.7], [1,      0]);
  const leftBlockX  = useTransform(scrollYProgress, [0, 0.6], ["0%",   "-100%"]);
  const rightBlockX = useTransform(scrollYProgress, [0, 0.6], ["0%",   "100%"]);
  const dotboxX     = useTransform(scrollYProgress, [0, 0.5], ["0%",   "-120%"]);

  // ── FIX: stable callback so CarouselEngine's useEffect dep array is stable ──
  const handleSync = useCallback((ai: number, goTo: (i: number) => void) => {
    setDotActive(ai);
    dotGoTo.current = goTo;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-muted relative flex items-center justify-center md:pl-30 md:pr-10 md:pt-8 pb-0"
    >
      {/* ── Dotbox ── */}
      <motion.div
        className="hidden md:flex w-60 h-96 absolute top-20 -left-4 z-30"
        style={{ x: dotboxX }}
        initial={{ x: "-110%" }}
        animate={mounted ? { x: "0%" } : { x: "-110%" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <Dotbox />
      </motion.div>

      {/* ── Left green block ── */}
      <motion.div
        className="hidden md:block absolute top-0 left-8 z-10"
        style={{ x: leftBlockX }}
        initial={{ x: "-100%" }}
        animate={mounted ? { x: "0%" } : { x: "-100%" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0 }}
      >
        <div className="bg-[#323209] w-[800px] h-[700px]" />
      </motion.div>

      {/* ── Main hero area ── */}
      <div className="relative z-20 w-full min-h-[82vh] flex items-center justify-center overflow-hidden">

        <CarouselEngine
          images={HERO_IMAGES}
          bgY={bgY}
          onSync={handleSync}
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/20 to-primary/75" />

        {/* Content */}
        <motion.div
          style={{ y: contentY, opacity: contentOp }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto self-end mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Badge className="mb-5 bg-accent text-primary-foreground text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
              MC&apos;86 GROUP
            </Badge>

            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-primary-foreground leading-tight tracking-tight mb-5">
              <span
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-accent via-primary-foreground to-accent bg-clip-text text-transparent"
                style={{ backgroundSize: "200%", animation: "gradient-x 4s ease infinite" }}
              >
                Engineering &amp; Construction
              </span>
            </h1>

            <p className="text-primary-foreground/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
              Multi-discipline engineering and construction turnkey solutions specializing in
              engineering, procurement, fabrication, installation, and project management.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary-foreground font-bold px-8 shadow-lg">
                  About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-bold px-8">
                  Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-1.5">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => dotGoTo.current(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === dotActive
                  ? "w-6 h-2 bg-accent"
                  : "w-2 h-2 bg-primary-foreground/40 hover:bg-primary-foreground/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Right olive block ── */}
      <motion.div
        className="hidden md:block absolute -bottom-30 right-0 z-10"
        style={{ x: rightBlockX }}
        initial={{ x: "100%" }}
        animate={mounted ? { x: "0%" } : { x: "100%" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <div className="bg-[#435426] w-[400px] h-[700px]" />
      </motion.div>
    </section>
  );
}