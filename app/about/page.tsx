"use client"

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  CheckCircle,
  Award,
  Users,
  Clock,
  Target,
  ShieldCheck,
  Eye,
  BadgeCheck,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import LenisProvider from "../components/lenisprovider";
import {
  ParallaxFloat,
  ParallaxFade,
  ParallaxScale,
  ParallaxScrub,
} from "../components/parallax";

// ─── Parallax hero (about page) ──────────────────────────────────────────────
function AboutHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={ref} className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
      {/* Parallax background gradient */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <div className="absolute inset-0 bg-gradient-to-tl from-primary via-primary to-primary/80" />
      </motion.div>

      {/* Floating decorative blob */}
      <ParallaxScrub speedX={-0.2} speedY={0.1} className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        <Badge className="mb-4 bg-accent text-primary-foreground text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full">Our Story</Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground leading-tight mb-4">
          About <span className="bg-gradient-to-r from-accent via-primary-foreground to-accent bg-clip-text text-transparent">Us</span>
        </h1>
        <p className="text-primary-foreground/80 text-base max-w-xl mx-auto">
          A multi-discipline engineering and construction turnkey entity delivering excellence since inception.
        </p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const values = [
  { title: "Quality First", description: "We are committed to delivering the highest quality engineering and construction solutions to every client." },
  { title: "Innovation", description: "We continuously seek innovative approaches to optimize projects for cost efficiency and performance." },
  { title: "Integrity", description: "We maintain transparency and honesty in every interaction with our clients, partners, and communities." },
  { title: "Safety", description: "Safety is paramount on every project site. We adhere to the strictest safety standards and protocols." },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <LenisProvider>
      <div
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/f_auto,q_auto,w_1400/v1778978926/MC%2786/8e0b0c63-6a9f-4e3f-b257-cf88bb170d32_owpkgz.png)`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* ── Hero ── */}
        <AboutHero />

        {/* ── Company Philosophy Showcase ── */}
        <section className="relative py-24 bg-gradient-to-b from-background via-muted to-background">
          {/* Background glow effects */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-accent/10 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Heading */}
            <ParallaxFade>
              <div className="text-center mb-20">
                <Badge className="mb-4 bg-primary/10 text-primary text-xs font-bold tracking-[0.25em] uppercase px-4 py-1 rounded-full">
                  Company Standards
                </Badge>

                <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-5">
                  The Foundation Behind{" "}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Us
                  </span>
                </h2>

                <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Built on innovation, safety, trust and engineering excellence.
                  Every project reflects our commitment to quality workmanship and
                  long-term client relationships.
                </p>
              </div>
            </ParallaxFade>

            {/* Top Layout */}
            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Hero Card */}
              <ParallaxFloat speed={0.08} className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden border border-border/50 bg-card shadow-2xl h-full">
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-black/80 z-10" />

                  {/* Background image */}
                  <img
                    src="https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/980a3dfe0_mc86group_com_12-2_67dacc48.png"
                    alt="MC86 Team"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Content */}
                  <div className="relative z-20 p-10 flex flex-col justify-end min-h-[560px]">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                      <span className="text-primary-foreground/80 text-xs tracking-[0.2em] uppercase">
                        Engineering Excellence
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold text-primary-foreground leading-tight mb-5">
                      Delivering Excellence Through Innovation & Safety
                    </h3>

                    <p className="text-primary-foreground/80 leading-relaxed text-sm">
                      We continue to deliver trusted
                      engineering, structural steel, piping and fabrication solutions
                      across demanding industries with a strong focus on safety,
                      reliability and performance.
                    </p>

                    {/* Mini Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-10">
                      <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">100+</div>
                        <div className="text-[11px] text-white/70 uppercase tracking-wider">
                          Projects
                        </div>
                      </div>

                      <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">24+</div>
                        <div className="text-[11px] text-white/70 uppercase tracking-wider">
                          Clients
                        </div>
                      </div>

                      <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-white">5+</div>
                        <div className="text-[11px] text-white/70 uppercase tracking-wider">
                          Years
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ParallaxFloat>

              {/* Right Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Vision */}
                <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/90 backdrop-blur-sm p-7 shadow-md">
                  <div className="flex items-start gap-6 md:block">
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-0 md:mb-6 shrink-0">
                      <Eye className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">Vision</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        To provide excellent project deliverables and downtime services
                        that exceeds the expectations of our esteemed clients.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mission */}
                <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/90 backdrop-blur-sm p-7 shadow-md">
                  <div className="flex items-start gap-6 md:block">
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-0 md:mb-6 shrink-0">
                      <Target className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">Mission</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        To establish and maintain lifetime relationships with our clients
                        and provide exceptional customer services through fully integrated
                        expertise, modern project approaches and advanced maintenance
                        techniques.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Core Values */}
                <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/90 backdrop-blur-sm p-7 shadow-md">
                  <div className="flex items-start gap-6 md:block">
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-0 md:mb-6 shrink-0">
                      <ShieldCheck className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">Core Values</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        We believe in satisfying our clients with respect and trust. We
                        grow through creativity, invention and innovation. We integrate
                        honesty, integrity and business ethics into all aspects of our
                        business functioning.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Affiliations */}
                <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/90 backdrop-blur-sm p-7 shadow-md">
                  <div className="flex items-start gap-6 md:block">
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-0 md:mb-6 shrink-0">
                      <BadgeCheck className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">Affiliations</h3>
                      <div className="space-y-2 text-muted-foreground text-sm">
                        <p>CIDB Registered</p>
                        <p>ISO Compliant Processes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Full Width Tiles */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              
              {/* Health & Safety */}
              <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/90 backdrop-blur-sm p-8 shadow-md">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-8 w-8 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      Health & Safety
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      We adhere to all HSSE (OHS Act.) and internal safety programs.
                      Daily job hazard analysis and toolbox talks are conducted while
                      all staff are trained to prioritize safety before beginning any
                      task.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quality Statement */}
              <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/90 backdrop-blur-sm p-8 shadow-md">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <Award className="h-8 w-8 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      Quality Statement
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      MC'86 Engineering & Construction is committed to delivering
                      dependable engineering, fabrication and construction solutions
                      with uncompromised quality, safety, efficiency and client
                      satisfaction across every project.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-b from-secondary via-background to-secondary">
          {/* Background glow */}
          <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <ParallaxFade>
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-primary/10 text-primary text-xs font-bold tracking-[0.25em] uppercase px-4 py-1 rounded-full">
                  Our Principles
                </Badge>

                <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                  The Values That{" "}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Drive Us
                  </span>
                </h2>

                <p className="max-w-2xl mx-auto text-muted-foreground mt-5 text-sm sm:text-base leading-relaxed">
                  Every project we undertake is guided by a commitment to excellence,
                  innovation, integrity and safety. Ensuring dependable results that
                  create long-term value for our clients.
                </p>
              </div>
            </ParallaxFade>

            {/* Elegant card layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
              {values.map((value, index) => (
                <ParallaxScale key={value.title}>
                  <ParallaxFloat speed={0.05 + index * 0.02}>
                    <div className="group relative h-full overflow-hidden rounded-3xl border border-border/40 bg-card/80 backdrop-blur-sm p-7 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                      
                      {/* Animated glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />

                      {/* Floating accent orb */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-accent/10 transition-all duration-500 blur-2xl" />

                      {/* Icon */}
                      <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg mb-6">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold text-foreground mb-4">
                          {value.title}
                        </h3>

                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {value.description}
                        </p>
                      </div>

                      {/* Bottom line animation */}
                      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
                    </div>
                  </ParallaxFloat>
                </ParallaxScale>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative py-16 overflow-hidden bg-gradient-to-tl from-primary/20 via-primary/80 to-primary/40">
          <ParallaxScrub speedX={0.12} speedY={0.04} className="absolute top-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          <ParallaxFade>
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3">
                Engineering Built for Performance &amp; Reliability
              </h2>
              <p className="text-primary-foreground/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                Mc'86 Engineering &amp; Construction delivers dependable engineering, fabrication, and construction solutions designed to keep industries moving with precision, safety, and quality workmanship.
              </p>
            </div>
          </ParallaxFade>
        </section>
      </div>
    </LenisProvider>
  );
}