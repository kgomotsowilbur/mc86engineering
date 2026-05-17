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

// ─── Data ────────────────────────────────────────────────────────────────────
const services = [
  { title: "FUEL SYSTEMS - PUMP AND TANK", image_url: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/412bcbca5_mc86group_com_1_e4a11c91.png", items: "New Aboveground/Underground tank installation|Tank removal for both ASTs and USTs|Tank Farm civil works|Replacement of STPs|UST and AST inspection and maintenance|Forecourt equipment|Tank Manhole repairs, modification and installation|Tank sump|Tank Farm and Forecourt Surfacing|Installation of Fuel dispensers and dispenser pumps|Building or modifying forecourt islands" },
  { title: "CIVIL WORKS", image_url: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/42fffa9fd_mc86group_com_2_bf1e82cb.png", items: "Excavation and Embankment filling works - Construction of box culverts|Construction of Pipe culverts|Concrete lining works for storm water drainage|Water line protection works|Sewage line protection works|Laying of drainage layer like GSB and ABC|Cold/Hot Asphalt road works|Electrical trenching and pole installation works|Precast works|Sewage manhole works|Casting of Pipeline sleepers" },
  { title: "GENERAL BUILDING & SURFACING", image_url: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/aa74970fa_mc86group_com_3_524014d3.png", items: "Maintenance and renovation of sales buildings|Construction and extension of sales buildings|Demolition of sales building|Tiling of building interiors and exteriors|Plastering and painting|Installation of forecourt crush barriers|Installation of ceiling structures|Hot or cold water plumbing works" },
  { title: "ELECTRICAL WORKS", image_url: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/e71d2acab_mc86group_com_4_630557ed.png", items: "Electrical maintenance|Electrical installations to the domestic market, retail sector and construction industry|Compliance testing|Lighting Services|Commercial installations|Additional sockets and lighting points|Periodic inspection & test reports|Electrical fence and gate automation|24 hour emergency service" },
  { title: "HVAC & REFRIGERATION", image_url: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/1a044c296_mc86group_com_5_58889b78.png", items: "New Air Condition Installation and Maintenance|Refrigeration Maintenance - Mobile, Walk-ins, Underbars, Huskys or Chest Freezers|Food Services Equipment Maintenance|Ventilation or Extraction Fans|Split Air Condition Units|Cassette Air Condition Units|Ducted Air Condition Units" },
  { title: "ENGINEERING DESIGN & CONSULTING", image_url: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/82dc8ad9b_mc86group_com_6_98b1594d.png", items: "Technical Studies|Concept designs|Draughting and Technical Drawings|Wet Services designs and studies|HVAC and Refrigeration|Electrical designs and Load calculations|Project cost estimation|Structural designs and integrity studies|Enterprise Asset Management consulting" },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <LenisProvider>
      <div
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1778977970/95c9bdb1-5c55-49cf-a2e6-8c1790516fa6_lqe9xy.png)`,
          backgroundAttachment: "fixed",   // native CSS parallax for the outer BG
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* ── Hero ── */}
        <ServicesHero />

        {/* ── Service Cards ── */}
        <section className="py-20 bg-muted overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <ParallaxFade>
              <div className="text-center mb-14">
                <Badge className="mb-3 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1">Full Scope</Badge>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  A List of Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Services</span>
                </h2>
              </div>
            </ParallaxFade>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ParallaxScale key={service.title}>
                  <div className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 flex flex-col h-full">
                    {/* Image with inner parallax */}
                    <div className="aspect-[16/9] overflow-hidden bg-muted relative">
                      <ParallaxLayer speed={0.1} className="h-full w-full absolute inset-0">
                        <img
                          src={service.image_url}
                          alt={service.title}
                          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          style={{ height: "120%", marginTop: "-10%" }}
                        />
                      </ParallaxLayer>
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 pb-3 border-b border-border">{service.title}</h3>
                      <ul className="space-y-2 flex-1">
                        {service.items.split("|").map((item, i) => (
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