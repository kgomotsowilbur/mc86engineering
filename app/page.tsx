"use client"

import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
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
        <HeroCarousel />

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