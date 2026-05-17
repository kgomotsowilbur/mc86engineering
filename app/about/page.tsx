"use client"

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Award, Users, Clock, Target } from "lucide-react";
import { Badge } from "../components/ui/badge";
import Link from "next/link";
import { Button } from "../components/ui/button";

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

const stats = [
  { icon: Clock, label: "Years of Experience", value: "5+" },
  { icon: Users, label: "Satisfied Clients", value: "24+" },
  { icon: Award, label: "Projects Completed", value: "100+" },
  { icon: Target, label: "Divisions", value: "3" },
];

const values = [
  { title: "Quality First", description: "We are committed to delivering the highest quality engineering and construction solutions to every client." },
  { title: "Innovation", description: "We continuously seek innovative approaches to optimize projects for cost efficiency and performance." },
  { title: "Integrity", description: "We maintain transparency and honesty in every interaction with our clients, partners, and communities." },
  { title: "Safety", description: "Safety is paramount on every project site. We adhere to the strictest safety standards and protocols." },
];

export default function Page() {
  return (
    <div style={{ 
      backgroundImage: `url(https://res.cloudinary.com/dk7dsm0lc/image/upload/v1778978926/8e0b0c63-6a9f-4e3f-b257-cf88bb170d32_owpkgz.png)`,
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-primary via-primary to-primary/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        >
          <Badge className="mb-4 bg-accent text-primary-foreground text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full">Our Story</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground leading-tight mb-4">
            About <span className="bg-gradient-to-r from-accent via-primary-foreground to-accent bg-clip-text text-transparent">MC'86 Group</span>
          </h1>
          <p className="text-primary-foreground/80 text-base max-w-xl mx-auto">A multi-discipline engineering and construction turnkey entity delivering excellence since inception.</p>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedElement>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img src="https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/980a3dfe0_mc86group_com_12-2_67dacc48.png" alt="MC'86 Engineering" className="w-full h-auto rounded-xl shadow-xl" />
              </div>
              <div>
                <Badge className="mb-3 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1">Who We Are</Badge>
                <h2 className="text-3xl font-bold text-foreground mb-5 leading-tight">
                  Engineering Excellence <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Built to Last</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm mb-5">
                  MC'86 Engineering &amp; Construction has been providing high quality services for the past five years as a multi-discipline engineering and construction turnkey entity which specializes in engineering, procurement, fabrication, installation, commissioning, maintenance and project management of any steelworks.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                  Our dedicated teams bring decades of combined expertise to every project, ensuring that each client receives tailored solutions that meet their specific requirements, timelines, and budget constraints.
                </p>
                <Link href="/Services">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                    View Our Services <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedElement>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-foreground/10 mb-3">
                    <stat.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-4xl font-bold text-primary-foreground mb-1">{stat.value}</div>
                  <div className="text-primary-foreground/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedElement>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedElement>
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1">Our Principles</Badge>
              <h2 className="text-3xl font-bold text-foreground">Our Core <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Values</span></h2>
            </div>
          </AnimatedElement>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedElement key={value.title} delay={index * 80}>
                <div className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full">
                  <CheckCircle className="h-8 w-8 text-primary mb-4 group-hover:text-accent transition-colors" />
                  <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden bg-gradient-to-tl from-primary/20 via-primary/80 to-primary/40">
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
        <AnimatedElement>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3">
              Engineering Built for Performance & Reliability
            </h2>

            <p className="text-primary-foreground/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Mc'86 Engineering & Construction delivers dependable engineering, fabrication, and construction solutions designed to keep industries moving with precision, safety, and quality workmanship.
            </p>
          </div>
        </AnimatedElement>
      </section>
    </div>
  );
}