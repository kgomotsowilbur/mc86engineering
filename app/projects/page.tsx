"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Badge } from "../components/ui/badge";
import LenisProvider from "../components/lenisprovider";
import {
  ParallaxFade,
  ParallaxFloat,
  ParallaxScale,
  ParallaxScrub,
} from "../components/parallax";
import {
  Building2,
  Fuel,
  Factory,
  Pipette,
  ShieldCheck,
  Zap,
} from "lucide-react";
import DotPattern from "../components/ui/dot-pattern";

// ─────────────────────────────────────────────────────────────────────────────
// Project Data
// ─────────────────────────────────────────────────────────────────────────────

const projectCategories = [
  {
    title: "Structural Steel",
    icon: ShieldCheck,
    accent: "from-accent to-primary",
    description:
      "Engineered steel structures fabricated and installed to withstand the most demanding industrial and commercial applications.",
    images: [
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779613854/MC%2786/20120907_090233_lgckqp.jpg",
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779614234/MC%2786/20200617_165206_vxtai9.jpg",
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779613580/MC%2786/IMG_20120929_072452_xkbr3u.jpg",
    ],
  },
  {
    title: "Piping Systems",
    icon: Pipette,
    accent: "from-accent to-primary",
    description:
      "Precision industrial piping installations engineered for efficiency, durability and operational reliability in demanding environments.",
    images: [
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/c_crop,ar_4:3/f_auto,q_auto,w_1400/v1779613875/MC%2786/DSC_0397_2_xebhkx.jpg",
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779613805/MC%2786/IMG-20250122-WA0000_mtx9bp.jpg",
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779613971/MC%2786/IMG_20260505_105431_oj2qqv.jpg",
    ],
  },
  {
    title: "Tank Fabrication",
    icon: Factory,
    accent: "from-primary via-accent to-primary",
    description:
      "Custom industrial tank fabrication solutions designed with uncompromised quality, safety and operational excellence.",
    images: [
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779613949/MC%2786/IMG_20120828_090618_yzjsyc.jpg",
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779613936/MC%2786/IMG_20120810_160841_pgbwit.jpg",
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779614462/MC%2786/IMG_20120626_115006_qcvrqw.jpg",
    ],
  },
  {
    title: "Civil Works",
    icon: Building2,
    accent: "from-primary to-accent",
    description:
      "Heavy-duty infrastructure construction, industrial foundations and concrete engineering built for longevity and structural performance.",
    images: [
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779614628/MC%2786/IMG_20260516_103657_ecb4a6.jpg",
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779614411/MC%2786/DSC_9730_c5xela.jpg",
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779614623/MC%2786/IMG_20240226_111055_xy4cjp.jpg",
    ],
  },
  {
    title: "Eletrical Works",
    icon: Zap,
    accent: "from-accent to-primary",
    description:
      "Reliable electrical installations, maintenance and industrial power solutions engineered for safety, efficiency and long-term performance.",
    images: [
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/c_crop,w_3072,h_2304,x_0,y_270,ar_4:3/f_auto,q_auto,w_1400/v1779614025/MC%2786/IMG_20260505_113037_hhejtr.jpg",
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779612703/MC%2786/20211111_133409_kmorvo.jpg",
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779614936/MC%2786/DSC_0510_xqfwf9.jpg",
    ],
  },
  {
    title: "Fuel Infrastructure",
    icon: Fuel,
    accent: "from-primary to-accent",
    description:
      "Fuel storage, transfer and infrastructure systems built with strict compliance, safety and operational continuity in mind.",
    images: [
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779612802/MC%2786/8a6eba56ad854f9aa43c1ec75a09279a_iyxxb6.jpg",
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779614046/MC%2786/20221029_144828_iufkt9.jpg",
      "https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779613582/MC%2786/IMG_20231206_144520_boacet.jpg",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

function ProjectsHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1800&auto=format&fit=crop"
          alt="MC86 Projects"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-primary via-primary to-primary/80" />
      </motion.div>

      {/* Hero dots — bottom-left, scrubbed via hero scroll */}
      <div className="absolute left-8 bottom-8 z-10 hidden lg:block">
        <DotPattern
          columns={4}
          rows={10}
          gap={18}
          dotSize={7}
          opacity={1}
          direction="diagonal-right"
          animated={true}
          scrollProgress={scrollYProgress}
        />
      </div>

      {/* Hero dots — top-right cluster */}
      <div className="absolute right-10 top-10 z-10 hidden lg:block rotate-12">
        <DotPattern
          columns={5}
          rows={6}
          gap={16}
          dotSize={6}
          opacity={1}
          direction="diagonal-left"
          animated={true}
          scrollProgress={scrollYProgress}
        />
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
        style={{ opacity: contentOpacity }}
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

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  const [activeSection, setActiveSection] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const allImages = projectCategories.flatMap((project) =>
    project.images.map((image, imageIndex) => ({
      src: image,
      projectTitle: project.title,
      sectionId: project.title.toLowerCase().replace(/\s+/g, "-"),
      localIndex: imageIndex,
    }))
  );

  const openGallery = (sectionId: string, clickedImage: string) => {
    const index = allImages.findIndex((img) => img.src === clickedImage);
    if (index !== -1) {
      setActiveIndex(index);
      setIsOpen(true);
      setActiveSection(sectionId);
    }
  };

  const closeGallery = () => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(activeSection);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const nextImage = () => setActiveIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  const prevImage = () => setActiveIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, allImages.length]);

  return (
    <LenisProvider>
      <div className="bg-background overflow-hidden">
        {/* HERO */}
        <ProjectsHero />

        {/* FLOATING SIDE NAV */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
          {projectCategories.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href={`#${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative flex items-center justify-end"
              >
                <div className="absolute right-16 opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="whitespace-nowrap rounded-xl bg-card/90 backdrop-blur-md border border-border/50 px-4 py-2 shadow-xl">
                    <span className="text-sm font-semibold text-foreground">{item.title}</span>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-2xl border border-border/40 bg-card/70 backdrop-blur-md flex items-center justify-center shadow-xl hover:scale-110 hover:border-primary/40 transition-all duration-300">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </a>
            );
          })}
        </div>

        {/* PROJECT SHOWCASE */}
        <section className="relative pb-24 pt-8">

          {/* Left edge — tall vertical strip running the full section */}
          <div className="absolute left-0 bottom-40 hidden xl:block">
            <DotPattern
              columns={3}
              rows={10}
              gap={22}
              dotSize={7}
              opacity={0.8}
              direction="vertical"
              animated={true}
            />
          </div>

          {/* Right edge — mirrors the left */}
          <div className="absolute right-0 top-60 hidden xl:block">
            <DotPattern
              columns={3}
              rows={10}
              gap={22}
              dotSize={7}
              opacity={0.8}
              direction="vertical"
              animated={true}
            />
          </div>

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
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.accent} flex items-center justify-center shadow-xl`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <Badge className="bg-primary/10 text-primary border border-primary/20">
                          Featured Projects
                        </Badge>
                      </div>

                      <h2 className="text-4xl sm:text-5xl font-black leading-tight text-foreground mb-6">
                        {project.title}
                      </h2>

                      {/* Decorative dot cluster beside the text block */}
                      <div className="mt-8 opacity-90">
                        <DotPattern
                          columns={5}
                          rows={4}
                          gap={14}
                          dotSize={5}
                          direction="horizontal"
                          animated={true}
                        />
                      </div>
                    </div>
                  </ParallaxFade>

                  {/* GALLERY SIDE */}
                  <div className="lg:col-span-8">
                    <div className="grid md:grid-cols-2 gap-6 auto-rows-[260px]">
                      {/* Large image */}
                      <ParallaxScale className="md:col-span-2">
                        <ParallaxFloat speed={0.08}>
                          <div
                            onClick={() => openGallery(project.title.toLowerCase().replace(/\s+/g, "-"), project.images[0])}
                            className="group relative overflow-hidden rounded-[2rem] border border-border/50 h-[420px] shadow-2xl cursor-pointer"
                          >
                            <img
                              src={project.images[0]}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Dot cluster — bottom-right corner of large image */}
                            <div className="absolute bottom-6 right-6 z-10 opacity-50">
                              <DotPattern
                                columns={4}
                                rows={3}
                                gap={10}
                                dotSize={4}
                                animated={false}
                              />
                            </div>

                            <div className="absolute bottom-0 left-0 p-8">
                              <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                            </div>
                          </div>
                        </ParallaxFloat>
                      </ParallaxScale>

                      {/* Bottom cards */}
                      {project.images.slice(1).map((image, imgIndex) => (
                        <ParallaxFloat speed={0.05 + imgIndex * 0.03} key={imgIndex}>
                          <div
                            onClick={() => openGallery(project.title.toLowerCase().replace(/\s+/g, "-"), image)}
                            className="group relative overflow-hidden rounded-[2rem] border border-border/50 h-[320px] shadow-xl cursor-pointer"
                          >
                            <img
                              src={image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
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

      {/* LIGHTBOX */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          >
            <button onClick={closeGallery} className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
              <X className="w-6 h-6 text-white" />
            </button>
            <button onClick={prevImage} className="absolute left-4 md:left-8 z-50 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button onClick={nextImage} className="absolute right-4 md:right-8 z-50 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            <motion.img
              key={allImages[activeIndex]?.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              src={allImages[activeIndex]?.src}
              alt="Project image"
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />

            <div className="absolute top-6 left-6">
              <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <p className="text-white text-sm uppercase tracking-widest opacity-70">Project Category</p>
                <h3 className="text-white font-bold text-xl">{allImages[activeIndex]?.projectTitle}</h3>
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm backdrop-blur-md">
              {activeIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LenisProvider>
  );
}