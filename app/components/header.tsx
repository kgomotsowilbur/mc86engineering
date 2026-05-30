"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight, Phone, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Contact Us", to: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="relative z-50">
          <Image
            src="https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto/v1779964326/MC%2786/Untitled_design_f5awe5.svg"
            alt="MC'86 logo"
            width={240}
            height={100}
            className="h-14 md:h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.to}
              className={`
                relative px-5 py-2.5 rounded-full text-sm font-semibold
                transition-all duration-300
                ${
                  pathname === item.to
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-border/50 backdrop-blur-md bg-background/50 hover:bg-primary hover:text-white transition-all duration-300"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="
              w-[88%] sm:w-[420px]
              border-l border-border/50
              bg-background/95 backdrop-blur-2xl
              p-0 overflow-hidden
              [&>button]:hidden
            "
          >
            <VisuallyHidden.Root>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden.Root>

            {/* Background glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">

              {/* Top */}
              <div className="flex items-center justify-end p-4 border-b border-border/50">
                {/* Close Button */}
                <button
                  onClick={() => setOpen(false)}
                  className="
                    w-10 h-10 rounded-full border border-border/50
                    flex items-center justify-center
                    hover:bg-primary hover:text-white
                    transition-all duration-300
                  "
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 px-8 py-2">

                <div className="space-y-2">
                  {navLinks.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.08,
                      }}
                    >
                      <Link
                        href={item.to}
                        onClick={() => setOpen(false)}
                        className={`
                          group flex items-center justify-between
                          rounded-2xl px-6 py-5
                          transition-all duration-300
                          ${
                            pathname === item.to
                              ? "bg-primary text-white shadow-lg"
                              : "hover:bg-primary/5 text-foreground"
                          }
                        `}
                      >
                        <span className="text-2xl font-semibold tracking-tight">
                          {item.label}
                        </span>

                        <ArrowRight
                          className={`
                            h-5 w-5 transition-all duration-300
                            ${
                              pathname === item.to
                                ? "translate-x-0 opacity-100"
                                : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                            }
                          `}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="
                    mt-10 rounded-3xl overflow-hidden
                    border border-border/50
                    bg-gradient-to-br from-primary/10 via-background to-accent/10
                    backdrop-blur-md
                  "
                >
                  <div className="p-7">

                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                        <Phone className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">
                          Call Us
                        </p>

                        <h3 className="text-lg font-bold text-foreground">
                          Let's Talk
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <a
                        href="tel:+27637179577"
                        className="
                          block text-lg font-semibold text-primary
                          hover:text-accent transition-colors
                        "
                      >
                        +27 (0) 63 717 9577
                      </a>

                      <a
                        href="tel:+27736023699"
                        className="
                          block text-lg font-semibold text-primary
                          hover:text-accent transition-colors
                        "
                      >
                        +27 (0) 73 602 3699
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="px-8 pb-8">
                <div className="border-t border-border/50 pt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>MC'86 Engineering & Construction</span>

                  <span className="uppercase tracking-[0.2em]">
                    Since 2020
                  </span>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}