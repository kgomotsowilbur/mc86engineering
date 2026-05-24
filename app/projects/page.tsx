"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { Badge } from "../components/ui/badge";
import LenisProvider from "../components/lenisprovider";
import {
  ParallaxFade,
  ParallaxFloat,
  ParallaxScale,
  ParallaxScrub,
} from "../components/parallax";
import {
  ArrowRight,
  Building2,
  Fuel,
  Factory,
  Pipette,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/button";

// ─────────────────────────────────────────────────────────────────────────────
// Project Data
// Replace image URLs later
// ─────────────────────────────────────────────────────────────────────────────

const projectCategories = [
  {
    title: "Civil Works",
    icon: Building2,
    accent: "from-primary to-accent",
    description:
      "Heavy-duty infrastructure construction, industrial foundations and concrete engineering built for longevity and structural performance.",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1400&auto=format&fit=crop",
    ],
  },

  {
    title: "Piping Systems",
    icon: Pipette,
    accent: "from-accent to-primary",
    description:
      "Precision industrial piping installations engineered for efficiency, durability and operational reliability in demanding environments.",
    images: [
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1400&auto=format&fit=crop",
    ],
  },

  {
    title: "Tank Fabrication",
    icon: Factory,
    accent: "from-primary via-accent to-primary",
    description:
      "Custom industrial tank fabrication solutions designed with uncompromised quality, safety and operational excellence.",
    images: [
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1400&auto=format&fit=crop",
    ],
  },

  {
    title: "Structural Steel",
    icon: ShieldCheck,
    accent: "from-accent to-primary",
    description:
      "Engineered steel structures fabricated and installed to withstand the most demanding industrial and commercial applications.",
    images: [
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=1400&auto=format&fit=crop",
    ],
  },

  {
    title: "Fuel Infrastructure",
    icon: Fuel,
    accent: "from-primary to-accent",
    description:
      "Fuel storage, transfer and infrastructure systems built with strict compliance, safety and operational continuity in mind.",
    images: [
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=1400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1400&auto=format&fit=crop",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

function ProjectsHero() {
  return (
    <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1800&auto=format&fit=crop"
          alt="MC86 Projects"
          className="w-full h-[130%] object-cover absolute -top-[15%]"
        />

        <div className="absolute inset-0 bg-gradient-to-tl from-primary via-primary to-primary/80" />
      </div>

      {/* Floating blob */}
      <ParallaxScrub
        speedX={-0.2}
        speedY={0.1}
        className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        <Badge className="mb-4 bg-accent text-primary-foreground text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full">
          Our Projects
        </Badge>

        <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground leading-tight mb-4">
          Engineering{" "}
          <span className="bg-gradient-to-r from-accent via-primary-foreground to-accent bg-clip-text text-transparent">
            Excellence
          </span>
        </h1>

        <p className="text-primary-foreground/80 text-base max-w-xl mx-auto">
          Explore a portfolio of industrial projects delivered with precision,
          safety and uncompromised quality workmanship.
        </p>
      </motion.div>

      {/* Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <LenisProvider>
      <div className="bg-background overflow-hidden">
        {/* HERO */}
        <ProjectsHero />

        {/* ───────────────────────────────────────────────────────────── */}
{/* FLOATING SIDE NAV */}
{/* ───────────────────────────────────────────────────────────── */}

<div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
  {projectCategories.map((item) => {
    const Icon = item.icon;

    return (
      <a
        key={item.title}
        href={`#${item.title.toLowerCase().replace(/\s+/g, "-")}`}
        className="group relative flex items-center justify-end"
      >
        {/* Label */}
        <div className="absolute right-16 opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div className="whitespace-nowrap rounded-xl bg-card/90 backdrop-blur-md border border-border/50 px-4 py-2 shadow-xl">
            <span className="text-sm font-semibold text-foreground">
              {item.title}
            </span>
          </div>
        </div>

        {/* Icon Button */}
        <div className="w-14 h-14 rounded-2xl border border-border/40 bg-card/70 backdrop-blur-md flex items-center justify-center shadow-xl hover:scale-110 hover:border-primary/40 transition-all duration-300">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </a>
    );
  })}
</div>

        {/* PROJECT SHOWCASE */}
        <section className="relative pb-24 pt-8">
          <div className="max-w-7xl mx-auto px-6 space-y-40">
            {projectCategories.map((project, index) => {
              const Icon = project.icon;

              return (
                <div
                    id={project.title.toLowerCase().replace(/\s+/g, "-")}
                    key={project.title}
                    className={`scroll-mt-32 grid lg:grid-cols-12 gap-10 items-center ${
                    index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* TEXT SIDE */}
                  <ParallaxFade className="lg:col-span-4">
                    <div className="sticky top-24">
                      <div className="inline-flex items-center gap-3 mb-5">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.accent} flex items-center justify-center shadow-xl`}
                        >
                          <Icon className="h-7 w-7 text-white" />
                        </div>

                        <Badge className="bg-primary/10 text-primary border border-primary/20">
                          Featured Projects
                        </Badge>
                      </div>

                      <h2 className="text-4xl sm:text-5xl font-black leading-tight text-foreground mb-6">
                        {project.title}
                      </h2>

                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-8">
                        {project.description}
                      </p>

                      <div className="flex items-center gap-3 text-primary font-semibold">
                        Explore Portfolio
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </ParallaxFade>

                  {/* GALLERY SIDE */}
                  <div className="lg:col-span-8">
                    <div className="grid md:grid-cols-2 gap-6 auto-rows-[260px]">
                      {/* Large image */}
                      <ParallaxScale className="md:col-span-2">
                        <ParallaxFloat speed={0.08}>
                          <div className="group relative overflow-hidden rounded-[2rem] border border-border/50 h-[420px] shadow-2xl">
                            <img
                              src={project.images[0]}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-8">
                              <div className="text-white/60 text-xs uppercase tracking-[0.25em] mb-2">
                                MC'86 Group
                              </div>

                              <h3 className="text-3xl font-bold text-white">
                                {project.title}
                              </h3>
                            </div>
                          </div>
                        </ParallaxFloat>
                      </ParallaxScale>

                      {/* Bottom cards */}
                      {project.images.slice(1).map((image, imgIndex) => (
                        <ParallaxFloat
                          speed={0.05 + imgIndex * 0.03}
                          key={imgIndex}
                        >
                          <div className="group relative overflow-hidden rounded-[2rem] border border-border/50 h-[320px] shadow-xl">
                            <img
                              src={image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />

                            {/* Hover line */}
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />

                            <div className="absolute bottom-6 left-6">
                              <div className="text-white font-semibold text-lg">
                                Project {imgIndex + 1}
                              </div>
                            </div>
                          </div>
                        </ParallaxFloat>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </LenisProvider>
  );
}