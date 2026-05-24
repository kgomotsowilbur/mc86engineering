"use client"

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Building2, CheckCircle, Database, Factory, Fuel, GitBranch, HardHat, Phone, Pipette, ShieldCheck, Warehouse, Wrench, Zap } from "lucide-react";
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
          backgroundImage: `url(https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779021958/MC%2786/3c415808-5797-4f43-8c0c-7a44abd4a1c5_wbdyhl.png)`,
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
            {[
              {
                title: "Civil Works",
                image: "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779612705/MC%2786/2bc5d42f616a49118c4eb0f5afd92763_j34td0.jpg",
                icon: Building2,
                into: 
                  "Heavy-duty civil construction and infrastructure development built for industrial performance, reliability and durability.",
                features: [
                  "Concrete & structural foundations",
                  "Earthworks & site preparation",
                  "Drainage & infrastructure systems",
                ]
              },
              {
                title: "Eletrical Works",
                image: "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779614025/MC%2786/IMG_20260505_113037_hhejtr.jpg",
                icon: Zap,
                into: 
                  "Reliable electrical installations and power systems tailored for industrial, commercial and residential applications with a strong focus on safety and efficiency.",
                features: [
                  "Electrical installations for industrial, commercial & residential projects",
                  "Maintenance, fault finding & compliance testing",
                  "Lighting systems and automation solutions",
                ]
              },
              {
                title: "Piping Systems",
                image: "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779613805/MC%2786/IMG-20250122-WA0000_mtx9bp.jpg",
                icon: Pipette,
                into: 
                  "Advanced piping fabrication and installation for high-pressure, high-temperature and critical industrial applications.",
                features: [
                  "High pressure process piping",
                  "Steam, slurry & chemical systems",
                  "Valve & instrumentation integration",
                ]
              },
              {
                title: "Tank Fabrication",
                image: "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779613949/MC%2786/IMG_20120828_090618_yzjsyc.jpg",
                icon: Database,
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
                image: "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779621210/MC%2786/WhatsApp_Image_2026-05-22_at_15.37.40_cvf4l2.jpg",
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
                image: "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779613828/MC%2786/20221029_144933_awgqur.jpg",
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