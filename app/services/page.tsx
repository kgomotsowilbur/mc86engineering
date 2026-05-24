"use client"

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CheckCircle } from "lucide-react";
import { Badge } from "../components/ui/badge";
import LenisProvider from "../components/lenisprovider";
import {
  ParallaxLayer,
  ParallaxFloat,
  ParallaxFade,
  ParallaxScale,
  ParallaxScrub,
} from "../components/parallax";
import Image from "next/image";

// ─── Hero ────────────────────────────────────────────────────────────────────
function ServicesHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section ref={ref} className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
      </motion.div>

      <ParallaxScrub speedX={0.15} speedY={0.05} className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        <Badge className="mb-4 bg-accent text-primary-foreground text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full">What We Offer</Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground leading-tight mb-4">
          Our <span className="bg-gradient-to-r from-accent via-primary-foreground to-accent bg-clip-text text-transparent">Services</span>
        </h1>
        <p className="text-primary-foreground/80 text-base max-w-xl mx-auto">
          Comprehensive engineering and construction services tailored to your project needs.
        </p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <LenisProvider>
      <div
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1778977970/MC%2786/95c9bdb1-5c55-49cf-a2e6-8c1790516fa6_lqe9xy.png)`,
          backgroundAttachment: "fixed",   // native CSS parallax for the outer BG
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* ── Hero ── */}
        <ServicesHero />

        {/* ── Premium Services Section ── */}
        <section className="relative py-28 overflow-hidden bg-background">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-3xl rounded-full" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            {/* Heading */}
            <ParallaxFade>
              <div className="text-center mb-20">
                <Badge className="mb-4 bg-primary/10 text-primary border border-primary/20 px-4 py-1 tracking-[0.2em] uppercase text-xs">
                  Engineering Excellence
                </Badge>

                <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-foreground">
                  Industrial Solutions <br />
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Built For Performance
                  </span>
                </h2>

                <p className="max-w-3xl mx-auto mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
                  MC86 Engineering & Construction delivers integrated SMPP solutions
                  across industrial, mining, petrochemical, water infrastructure and
                  energy sectors — combining engineering precision, fabrication
                  expertise, and turnkey project execution.
                </p>
              </div>
            </ParallaxFade>

            {/* Services */}
            <div className="space-y-10">
              {[
                {
                  title: "Civil Works",
                  image:
                    "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779612705/MC%2786/2bc5d42f616a49118c4eb0f5afd92763_j34td0.jpg",
                  description:
                    "Comprehensive civil construction solutions supporting industrial infrastructure, heavy-duty foundations, concrete structures, drainage systems, and site development projects.",
                  features: [
                    "Industrial foundations & concrete works",
                    "Site preparation & earthworks",
                    "Drainage & infrastructure systems",
                    "Structural support installations",
                    "Project execution & site management",
                  ],
                },
                { title: "Electrical Works", 
                  image: "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779614585/MC%2786/IMG_20260505_113426_gjm9zg.jpg", 
                  description:
                    "Reliable electrical installations, maintenance and industrial power solutions engineered for safety, efficiency and long-term performance.",
                  features: [
                    "Electrical maintenance and installations",
                    "Commercial, retail and domestic electrical solutions",
                    "Compliance testing and inspection reports",
                    "Lighting, sockets and automation services",
                    "24-hour emergency electrical support",
                  ]
                },
                {
                  title: "Piping Systems",
                  image:
                    "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779613805/MC%2786/IMG-20250122-WA0000_mtx9bp.jpg",
                  description:
                    "Specialized fabrication, spooling, installation, and commissioning of industrial piping systems designed for high-performance operations in petrochemical, mining, water, and energy sectors.",
                  features: [
                    "High pressure & high temperature piping",
                    "Steam, slurry & chemical pipe systems",
                    "Carbon steel, stainless steel & HDPE piping",
                    "Valve, vessel & instrumentation integration",
                    "Shutdown tie-ins & live-site installations",
                  ],
                },
                {
                  title: "Tank Fabrication",
                  image:
                    "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779613806/MC%2786/IMG-20201022-WA0018_ixs79m.jpg",
                  description:
                    "Design, fabrication, installation, and maintenance of industrial storage tanks and vessels built to SANS standards for oil, fuel, chemical, and water storage applications.",
                  features: [
                    "Fuel, chemical & water storage tanks",
                    "On-site tank construction & assembly",
                    "Tank repairs, patching & re-lining",
                    "Heavy lift placement coordination",
                    "Protective coatings & insulation support",
                  ],
                },
                {
                  title: "Structural Steel",
                  image:
                    "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779613580/MC%2786/IMG_20120929_072452_xkbr3u.jpg",
                  description:
                    "Precision structural steel fabrication and installation services for industrial plants, process facilities, conveyor systems, platforms, and complex steel structures.",
                  features: [
                    "Plant structures & steel frameworks",
                    "Pipe racks, gantries & platforms",
                    "Conveyor support structures",
                    "Mezzanine floors & modular skids",
                    "On-site fabrication & commissioning",
                  ],
                },
                {
                  title: "Fuel Infrastructure",
                  image:
                    "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779614974/MC%2786/20210803_122519_xlje70.jpg",
                  description:
                    "End-to-end fuel infrastructure solutions including piping networks, storage systems, structural installations, and integrated mechanical support for fuel handling facilities.",
                  features: [
                    "Fuel transfer piping systems",
                    "Bulk fuel storage solutions",
                    "Pump & equipment installations",
                    "Integrated steel support structures",
                    "Maintenance & operational upgrades",
                  ],
                },
              ].map((service, index) => (
                <ParallaxScale key={service.title}>
                  <div
                    className={`group relative grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[32px] border border-border/50 bg-card/70 backdrop-blur-xl shadow-[0_10px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_80px_rgba(0,0,0,0.25)] transition-all duration-700 ${
                      index % 2 !== 0 ? "lg:grid-flow-col-dense" : ""
                    }`}
                  >
                    {/* Image Side */}
                    <div
                      className={`relative min-h-[420px] overflow-hidden ${
                        index % 2 !== 0 ? "lg:col-start-2" : ""
                      }`}
                    >
                      <ParallaxLayer
                        speed={0.12}
                        className="absolute inset-0"
                        style={{ height: '100%', width: '100%' }}
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                      </ParallaxLayer>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    </div>

                    {/* Content Side */}
                    <div className="relative p-10 lg:p-14 flex flex-col justify-center">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />

                      <h3 className="text-3xl md:text-4xl font-black text-foreground mb-5 relative z-10">
                        {service.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8 relative z-10">
                        {service.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                        {service.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background/60 backdrop-blur-sm p-4 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                          >
                            <div className="mt-1">
                              <CheckCircle className="h-5 w-5 text-primary" />
                            </div>

                            <span className="text-sm leading-relaxed text-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ParallaxScale>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose MC'86 ── */}
        <section className="py-20 bg-secondary overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <ParallaxFade>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-3">
                  Why Choose <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">MC'86</span>?
                </h2>
              </div>
            </ParallaxFade>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { title: "Turnkey Solutions", desc: "From concept and design through procurement, fabrication, installation, and commissioning — we handle every phase." },
                { title: "Multi-Discipline Expertise", desc: "Our diverse team covers civil, electrical, mechanical, piping, HVAC, and structural disciplines." },
                { title: "Proven Track Record", desc: "Over 5 years serving industry leaders including Sasol, Shell, BP, Sibanye, and many other major corporations." },
              ].map((item, index) => (
                <ParallaxFloat key={item.title} speed={0.06 + index * 0.04}>
                  <div className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </ParallaxFloat>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-16 overflow-hidden bg-gradient-to-tl from-primary/20 via-primary/80 to-primary/40">
          <ParallaxScrub speedX={-0.1} speedY={0} className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          <ParallaxFade>
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3">
                Precision Engineering That Drives Industrial Excellence
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                From structural projects to specialized engineering services, we provide practical solutions backed by skilled craftsmanship, modern equipment, and a commitment to delivering results.
              </p>
            </div>
          </ParallaxFade>
        </section>
      </div>
    </LenisProvider>
  );
}