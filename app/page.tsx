"use client"

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Building2, CheckCircle, Database, Factory, Fuel, GitBranch, HardHat, Phone, ShieldCheck, Warehouse, Wrench } from "lucide-react";
import { Badge } from "./components/ui/badge";
import Link from "next/link";
import { Button } from "./components/ui/button";
import ClientsMarquee from "./components/clientsmarquee";
import {
  ParallaxLayer,
  ParallaxFloat,
  ParallaxFade,
  ParallaxScale,
  ParallaxScrub,
} from "./components/parallax";
import LenisProvider from "./components/lenisprovider";
import { HeroCarousel } from "./components/herocarousel";

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

const services = [ 
  { title: "Civil Works", image: "/images/services/civil.jpg", intro: "Industrial civil construction solutions built for durability, stability and operational efficiency.", features: [ "Concrete & structural foundations", "Earthworks & site preparation", "Drainage & infrastructure systems", ], }, 
  { title: "Piping Systems", image: "/images/services/piping.jpg", intro: "Advanced piping fabrication and installation for high-performance industrial operations.", features: [ "High pressure process piping", "Steam, slurry & chemical systems", "Valve & instrumentation integration", ], }, 
  { title: "Tank Fabrication", image: "/images/services/tanks.jpg", intro: "Custom storage tank fabrication and installation engineered to SANS standards.", features: [ "Fuel, oil & water storage tanks", "On-site assembly & maintenance", "Protective coatings & repairs", ], }, 
  { title: "Structural Steel", image: "/images/services/steel.jpg", intro: "Precision steel fabrication for industrial plants, platforms and heavy-duty structures.", features: [ "Steel frameworks & pipe racks", "Gantries & support structures", "Modular skids & platforms", ], }, 
  { title: "Fuel Infrastructure", image: "/images/services/fuel.jpg", intro: "Integrated fuel infrastructure systems designed for reliability, safety and efficiency.", features: [ "Fuel transfer piping systems", "Bulk fuel storage solutions", "Pump & equipment installations", ], }, 
]

// ─── Shared Service Card ──────────────────────────────────────────────────────
const ServiceCard = ({ service, index }) => (
  <ParallaxScale key={service.title}>
    <ParallaxFloat speed={0.04 + index * 0.02}>
      <div className="group relative overflow-hidden rounded-3xl border border-border/40 bg-card/80 backdrop-blur-sm shadow-md hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 h-full flex flex-col">

        {/* Top image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
          <div className="absolute inset-0 bg-primary/10 z-10 group-hover:bg-primary/20 transition-colors duration-500" />

          <ParallaxLayer speed={0.08} className="h-full">
            <img
              src={service.image_url}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              style={{ minHeight: "115%" }}
            />
          </ParallaxLayer>

          <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-white/80 text-[11px] uppercase tracking-[0.25em]">
                MC'86 Services
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white leading-tight">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-7 flex flex-col flex-1">
          <div className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all duration-700 blur-2xl" />

          <ul className="space-y-3 flex-1 relative z-10">
            {(service.items || "")
              .split("|")
              .slice(0, 6)
              .map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                  <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-3 w-3 text-primary" />
                  </div>
                  <span>{item.trim()}</span>
                </li>
              ))}
          </ul>

          <div className="mt-8 pt-5 border-t border-border flex items-center justify-between relative z-10">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Industrial Solutions
            </span>
            <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
              <ArrowRight className="h-4 w-4 text-primary group-hover:text-white transition-colors duration-500" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-700" />
        </div>
      </div>
    </ParallaxFloat>
  </ParallaxScale>
);

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <LenisProvider>
      <div
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779021958/3c415808-5797-4f43-8c0c-7a44abd4a1c5_wbdyhl.png)`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* ── Hero ── */}
        <HeroCarousel />

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

        {/* SERVICES */}
        <section className="px-10 py-20 bg-muted overflow-hidden">
          <ParallaxFade>
            <div className="text-center mb-14">
              <Badge className="mb-3 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1">Full Scope</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                A List of Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Services</span>
              </h2>
            </div>
          </ParallaxFade>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

            {/* ── Row 1 : Civil Works ── */}
            <ParallaxScale>
              <div className="group relative h-full min-h-[560px] overflow-hidden rounded-[32px] border border-white/10 bg-[#151b11]/80 backdrop-blur-xl shadow-[0_15px_60px_rgba(0,0,0,0.25)]">

                {/* Background */}
                <div className="absolute inset-0">
                  <img
                    src="/images/services/civil.jpg"
                    alt="Civil Works"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/65 to-[#0d120b]" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full p-8">

                  {/* Top */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl border border-[#79924F]/30 bg-[#79924F]/10 flex items-center justify-center backdrop-blur-md">
                      <Building2 className="h-7 w-7 text-[#A5C46D]" />
                    </div>

                    <span className="text-[#79924F]/20 text-6xl font-black">
                      01
                    </span>
                  </div>

                  {/* Title */}
                  <div className="mb-6">
                    <h3 className="text-4xl font-black text-white mb-4">
                      Civil Works
                    </h3>

                    <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#79924F] to-[#A5C46D]" />
                  </div>

                  {/* Intro */}
                  <p className="text-white/75 text-[15px] leading-relaxed mb-10">
                    Heavy-duty civil construction and infrastructure development built
                    for industrial performance, reliability and durability.
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mt-auto">

                    {[
                      "Concrete & structural foundations",
                      "Earthworks & site preparation",
                      "Drainage & infrastructure systems",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-md"
                      >
                        <CheckCircle className="h-5 w-5 text-[#A5C46D] shrink-0" />

                        <span className="text-sm text-white/90">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ParallaxScale>

           {/* ── CENTER CREATIVE CARD ── */}
            <ParallaxScale>
              <div className="hidden relative md:grid overflow-hidden rounded-[32px] border border-[#79924F]/20 bg-gradient-to-b from-[#151d12] via-[#0f140d] to-[#0b0f09] backdrop-blur-xl min-h-[480px] shadow-[0_15px_60px_rgba(0,0,0,0.25)]">

                {/* Ambient Glow */}
                <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[24rem] h-[24rem] rounded-full bg-[#79924F]/20 blur-3xl" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* Decorative Lines */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-[#A5C46D] to-transparent opacity-40" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-t from-[#A5C46D] to-transparent opacity-40" />

                {/* Floating Rings */}
                <div className="absolute top-16 left-10 w-32 h-32 rounded-full border border-[#79924F]/10" />
                <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full border border-[#79924F]/10" />

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-12 text-center">

                  {/* Icon Orb */}
                  <div className="relative mb-10">

                    {/* Outer Glow */}
                    <div className="absolute inset-0 w-40 h-40 rounded-full bg-[#79924F]/20 blur-3xl animate-pulse" />

                    {/* Outer Ring */}
                    <div className="relative w-40 h-40 rounded-full border border-[#79924F]/20 flex items-center justify-center">

                      {/* Middle Ring */}
                      <div className="w-28 h-28 rounded-full border border-[#79924F]/30 bg-[#79924F]/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_40px_rgba(121,146,79,0.18)]">

                        {/* Inner Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#79924F] to-[#435426] flex items-center justify-center shadow-[0_0_30px_rgba(121,146,79,0.3)]">
                          <ShieldCheck className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Brand */}
                  <div className="space-y-5">

                    <div>
                      <div className="text-[#A5C46D] text-xs uppercase tracking-[0.45em] mb-4">
                        MC86 Engineering
                      </div>

                      <h3 className="text-4xl font-black text-white tracking-tight leading-none">
                        Built To
                        <span className="block bg-gradient-to-r from-[#79924F] via-[#A5C46D] to-[#79924F] bg-clip-text text-transparent">
                          Deliver
                        </span>
                      </h3>
                    </div>

                    <p className="max-w-xs mx-auto text-white/60 text-sm leading-relaxed">
                      Precision engineering solutions crafted with performance,
                      innovation and industrial excellence at the core.
                    </p>
                  </div>

                  {/* Bottom Accent */}
                  <div className="mt-12 flex items-center gap-3">

                    <div className="w-14 h-[2px] rounded-full bg-gradient-to-r from-transparent to-[#79924F]" />

                    <div className="w-2 h-2 rounded-full bg-[#A5C46D] shadow-[0_0_12px_rgba(165,196,109,0.8)]" />

                    <div className="w-14 h-[2px] rounded-full bg-gradient-to-l from-transparent to-[#79924F]" />
                  </div>
                </div>
              </div>
            </ParallaxScale>

            {/* ── Row 1 : Piping Systems ── */}
            <ParallaxScale>
              <div className="group relative h-full min-h-[560px] overflow-hidden rounded-[32px] border border-white/10 bg-[#151b11]/80 backdrop-blur-xl shadow-[0_15px_60px_rgba(0,0,0,0.25)]">

                <div className="absolute inset-0">
                  <img
                    src="/images/services/piping.jpg"
                    alt="Piping Systems"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/65 to-[#0d120b]" />
                </div>

                <div className="relative z-10 flex flex-col h-full p-8">

                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl border border-[#79924F]/30 bg-[#79924F]/10 flex items-center justify-center backdrop-blur-md">
                      <GitBranch className="h-7 w-7 text-[#A5C46D]" />
                    </div>

                    <span className="text-[#79924F]/20 text-6xl font-black">
                      02
                    </span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-4xl font-black text-white mb-4">
                      Piping Systems
                    </h3>

                    <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#79924F] to-[#A5C46D]" />
                  </div>

                  <p className="text-white/75 text-[15px] leading-relaxed mb-10">
                    Advanced piping fabrication and installation for high-pressure,
                    high-temperature and critical industrial applications.
                  </p>

                  <div className="space-y-4 mt-auto">

                    {[
                      "High pressure process piping",
                      "Steam, slurry & chemical systems",
                      "Valve & instrumentation integration",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-md"
                      >
                        <CheckCircle className="h-5 w-5 text-[#A5C46D] shrink-0" />

                        <span className="text-sm text-white/90">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ParallaxScale>

            {/* ───────────────────────────────────────────── */}
            {/* SECOND ROW */}
            {/* ───────────────────────────────────────────── */}

            {[
              {
                title: "Tank Fabrication",
                image: "/images/services/tanks.jpg",
                icon: Database,
                number: "03",
                intro:
                  "Custom storage tank fabrication and installation built to SANS standards.",
                features: [
                  "Fuel, oil & water storage tanks",
                  "On-site assembly & maintenance",
                  "Protective coatings & repairs",
                ],
              },

              {
                title: "Structural Steel",
                image: "/images/services/steel.jpg",
                icon: Warehouse,
                number: "04",
                intro:
                  "Precision steel fabrication for industrial plants and heavy-duty structures.",
                features: [
                  "Steel frameworks & pipe racks",
                  "Gantries & support structures",
                  "Modular skids & platforms",
                ],
              },

              {
                title: "Fuel Infrastructure",
                image: "/images/services/fuel.jpg",
                icon: Fuel,
                number: "05",
                intro:
                  "Integrated fuel infrastructure systems designed for safe, efficient operations.",
                features: [
                  "Fuel transfer piping systems",
                  "Bulk fuel storage solutions",
                  "Pump & equipment installations",
                ],
              },
            ].map((service) => (
              <ParallaxScale key={service.title}>
                <div className="group relative h-full min-h-[560px] overflow-hidden rounded-[32px] border border-white/10 bg-[#151b11]/80 backdrop-blur-xl shadow-[0_15px_60px_rgba(0,0,0,0.25)]">

                  <div className="absolute inset-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/65 to-[#0d120b]" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full p-8">

                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl border border-[#79924F]/30 bg-[#79924F]/10 flex items-center justify-center backdrop-blur-md">
                        <service.icon className="h-7 w-7 text-[#A5C46D]" />
                      </div>

                      <span className="text-[#79924F]/20 text-6xl font-black">
                        {service.number}
                      </span>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-4xl font-black text-white mb-4">
                        {service.title}
                      </h3>

                      <div className="w-16 h-[3px] rounded-full bg-gradient-to-r from-[#79924F] to-[#A5C46D]" />
                    </div>

                    <p className="text-white/75 text-[15px] leading-relaxed mb-10">
                      {service.intro}
                    </p>

                    <div className="space-y-4 mt-auto">

                      {service.features.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-md"
                        >
                          <CheckCircle className="h-5 w-5 text-[#A5C46D] shrink-0" />

                          <span className="text-sm text-white/90">
                            {item}
                          </span>
                        </div>
                      ))}

                    </div>
                  </div>
                </div>
              </ParallaxScale>
            ))}
          </div>
        </section>

        {/* ── Clients Marquee ── */}
        <ClientsMarquee />

        {/* ── CTA ── */}
        <section className="relative py-16 overflow-hidden bg-gradient-to-tl from-primary/20 via-primary/80 to-primary/40">
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