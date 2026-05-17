"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from "next/image";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"}`}>
      <div className="mx-auto px-2 md:px-10 h-16 md:h-22 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779027428/logo_wstzeb.svg"
            alt="MC'86 logo"
            width={700}
            height={700}
            className={`h-16 md:h-24 w-auto object-contain transition-all duration-300`}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.to}
              className={`text-base font-bold px-3 py-2 rounded-md transition-colors hover:bg-primary/10 hover:text-primary ${pathname === item.to ? "text-primary font-black" : "text-foreground"}]`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className={"text-foreground"}>
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-card w-72">
            <VisuallyHidden.Root>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden.Root>
            <div className="mt-2 mb-8">
              <img
                src="https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/5f58b058a_mc86group_com_MC-86-logo-1_14886ea9.png"
                alt="MC'86 logo"
                className="h-10 w-auto object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium px-3 py-2.5 rounded-md transition-colors hover:bg-primary/10 hover:text-primary ${pathname === item.to ? "bg-primary/10 text-primary" : "text-foreground"}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest font-semibold">Call us</p>
              <a href="tel:+27637179577" className="block text-sm font-semibold text-primary hover:text-accent transition-colors mb-1.5">+27 (0) 63 717 9577</a>
              <a href="tel:+27736023699" className="block text-sm font-semibold text-primary hover:text-accent transition-colors">+27 (0) 73 602 3699</a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}