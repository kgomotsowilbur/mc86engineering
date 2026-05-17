"use client"

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { Badge } from "./components/ui/badge";
import Link from "next/link";
import { Button } from "./components/ui/button";
import ClientsMarquee from "./components/clientsmarquee";
import Dotbox from "./components/ui/dotbox";
import {
  ParallaxLayer,
  ParallaxFloat,
  ParallaxFade,
  ParallaxScale,
  ParallaxScrub,
} from "./components/parallax";
import LenisProvider from "./components/lenisprovider";

// ─── AnimatedElement (kept for compatibility) ───────────────────────────────
const AnimatedElement = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: "0px 0px 200px 0px" });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {children}
    </div>
  );
};

// ─── Hero with scroll-driven parallax ───────────────────────────────────────
function HeroSection() {
  const heroImages = [
    "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1778941158/629f1d22-4695-4a98-bd59-f36fae0be57d_g5ozlm.png",
    "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1778941837/74637125-0b33-4fc8-87f8-47244072d60d_jkvkdu.png",
  ];

  const heroRef = useRef<HTMLElement>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [prevHeroIndex, setPrevHeroIndex] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(false);
 
  // Trigger entrance animations after mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);
 
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
 
  // Background image drifts upward
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Hero content fades + rises on scroll-out
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
 
  // Decorative blocks slide OUT as user scrolls away
  const leftBlockX = useTransform(scrollYProgress, [0, 0.6], ["0%", "-100%"]);
  const rightBlockX = useTransform(scrollYProgress, [0, 0.6], ["0%", "100%"]);
  const dotboxX = useTransform(scrollYProgress, [0, 0.5], ["0%", "-120%"]);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevHeroIndex(heroIndex);
      setFading(true);
      setTimeout(() => {
        setHeroIndex((i) => (i + 1) % heroImages.length);
        setFading(false);
        setPrevHeroIndex(null);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroIndex]);
 
  const goToSlide = (i: number) => {
    if (i === heroIndex) return;
    setPrevHeroIndex(heroIndex);
    setFading(true);
    setTimeout(() => {
      setHeroIndex(i);
      setFading(false);
      setPrevHeroIndex(null);
    }, 800);
  };

  return (
    <section
      ref={heroRef}
      className="bg-muted relative flex items-center justify-center md:pl-30 md:pr-10 md:pt-8 pb-0"
    >
      {/* ── Dotbox: slides in from the left on mount, exits left on scroll ── */}
      <motion.div
        className="hidden md:flex w-60 h-96 absolute top-20 -left-4 z-30"
        style={{ x: dotboxX }}
        initial={{ x: "-110%" }}
        animate={mounted ? { x: "0%" } : { x: "-110%" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <Dotbox />
      </motion.div>
 
      {/* ── Left green block: slides in from the left on mount, exits left on scroll ── */}
      <motion.div
        className="hidden md:block absolute top-0 left-8 z-10"
        style={{ x: leftBlockX }}
        initial={{ x: "-100%" }}
        animate={mounted ? { x: "0%" } : { x: "-100%" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0 }}
      >
        <div className="bg-[#323209] w-[800px] h-[700px]" />
      </motion.div>
 
      {/* ── Main hero image area ── */}
      <div className="relative z-20 w-full min-h-[82vh] flex items-center justify-center overflow-hidden">
        {/* Parallax background images */}
        <motion.div className="absolute inset-0 w-full h-[120%] -top-[10%]" style={{ y: bgY }}>
          {prevHeroIndex !== null && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-800"
              style={{ backgroundImage: `url('${heroImages[prevHeroIndex]}')`, opacity: 1 }}
            />
          )}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat duration-800 bg-muted"
            style={{ backgroundImage: `url('${heroImages[heroIndex]}')`, opacity: fading ? 0 : 1 }}
          />
        </motion.div>
 
        <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/20 to-primary/75" />
 
        {/* Content with scroll-out parallax */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto self-end mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Badge className="mb-5 bg-accent text-primary-foreground text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
              MC'86 GROUP
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
              Multi-discipline engineering and construction turnkey solutions specializing in engineering, procurement,
              fabrication, installation, and project management.
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
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === heroIndex ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-primary-foreground/40 hover:bg-primary-foreground/70"
              }`}
            />
          ))}
        </div>
      </div>
 
      {/* ── Right olive block: slides in from the right on mount, exits right on scroll ── */}
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

// ─── Data ────────────────────────────────────────────────────────────────────
const staticServices = [
  { title: "FUEL SYSTEMS - PUMP AND TANK", image_url: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/412bcbca5_mc86group_com_1_e4a11c91.png", items: "New Aboveground/Underground tank installation|Tank removal for both ASTs and USTs|Tank Farm civil works|Replacement of STPs|UST and AST inspection and maintenance|Forecourt equipment" },
  { title: "CIVIL WORKS", image_url: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/42fffa9fd_mc86group_com_2_bf1e82cb.png", items: "Excavation and Embankment filling works|Construction of Pipe culverts|Concrete lining works for storm water drainage|Water line protection works|Sewage line protection works|Cold/Hot Asphalt road works" },
  { title: "GENERAL BUILDING & SURFACING", image_url: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/aa74970fa_mc86group_com_3_524014d3.png", items: "Maintenance and renovation of sales buildings|Construction and extension of sales buildings|Demolition of sales building|Tiling of building interiors and exteriors|Plastering and painting" },
  { title: "ELECTRICAL WORKS", image_url: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/e71d2acab_mc86group_com_4_630557ed.png", items: "Electrical maintenance|Electrical installations|Compliance testing|Lighting Services|Commercial installations|Periodic inspection & test reports" },
  { title: "HVAC & REFRIGERATION", image_url: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/1a044c296_mc86group_com_5_58889b78.png", items: "New Air Condition Installation and Maintenance|Refrigeration Maintenance|Food Services Equipment Maintenance|Ventilation or Extraction Fans|Split Air Condition Units" },
  { title: "ENGINEERING DESIGN & CONSULTING", image_url: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/82dc8ad9b_mc86group_com_6_98b1594d.png", items: "Technical Studies|Concept designs|Draughting and Technical Drawings|Wet Services designs and studies|Electrical designs and Load calculations" },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <LenisProvider>
      <div
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dk7dsm0lc/image/upload/v1778977970/95c9bdb1-5c55-49cf-a2e6-8c1790516fa6_lqe9xy.png)`,
          backgroundAttachment: "fixed",   // native CSS parallax for the outer BG
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* ── Hero ── */}
        <HeroSection />

        {/* ── Services ── */}
        <section className="py-10 bg-muted">
          <div className="max-w-7xl mx-auto px-6">
            <ParallaxFade>
              <div className="text-center mb-14">
                <Badge className="mb-3 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1">What We Do</Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Our Services</h2>
                <p className="text-muted-foreground text-sm">A list of our Services</p>
              </div>
            </ParallaxFade>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {staticServices.map((service, index) => (
                <ParallaxScale key={service.title}>
                  <div className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
                    {/* Card image with its own inner parallax */}
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      <ParallaxLayer speed={0.08} className="h-full">
                        <img
                          src={service.image_url}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          style={{ minHeight: "110%" }}
                        />
                      </ParallaxLayer>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3 pb-2 border-b border-border">{service.title}</h3>
                      <ul className="space-y-1.5 flex-1">
                        {(service.items || "").split("|").slice(0, 6).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                            <span>{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ParallaxScale>
              ))}
            </div>

            <ParallaxFade delay={0.1}>
              <div className="text-center mt-10">
                <Link href="/services">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8">
                    View All Services <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </ParallaxFade>
          </div>
        </section>

        {/* ── About ── */}
        <section className="py-20 bg-secondary overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
              {/* Image with parallax float */}
              <ParallaxFloat speed={0.1} className="relative">
                <img
                  src="https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/980a3dfe0_mc86group_com_12-2_67dacc48.png"
                  alt="Who are we"
                  className="w-full h-auto rounded-xl shadow-xl"
                />
              </ParallaxFloat>

              {/* Text with scroll-linked fade */}
              <ParallaxFade>
                <Badge className="mb-3 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1">About MC'86</Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5 leading-tight">
                  Who are <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">we</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                  MC'86 Engineering &amp; Construction has been providing high quality services for the past five years as a multi-discipline engineering and construction turnkey entity which specializes in engineering, procurement, fabrication, installation, commissioning, maintenance and project management of any steelworks (Structural Steel, Mezzanine and Piping) from our specialized division.
                </p>
                <Link href="/about">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                    Read more <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </ParallaxFade>
            </div>
          </div>
        </section>

        {/* ── Clients Marquee ── */}
        <ClientsMarquee />

        {/* ── CTA ── */}
        <section className="relative py-16 overflow-hidden bg-gradient-to-tl from-primary/20 via-primary/80 to-primary/40">
          {/* Floating decorative blob */}
          <ParallaxScrub speedX={0.15} speedY={0.05} className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none bg-accent/10" />

          <ParallaxFade>
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3">
                Trusted Engineering Solutions for Modern Industry
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                We combine technical expertise, innovation, and industry experience to deliver construction and engineering services that meet the highest standards of durability and efficiency.
              </p>
            </div>
          </ParallaxFade>
        </section>
      </div>
    </LenisProvider>
  );
}