"use client"

import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-5">A multi-discipline engineering and construction turnkey entity specializing in engineering, procurement, fabrication, installation, commissioning, maintenance and project management.</p>
            <div className="flex items-center gap-3">
              {/* <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/30 transition-colors"><Facebook className="h-4 w-4" /></a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/30 transition-colors"><Linkedin className="h-4 w-4" /></a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/30 transition-colors"><Instagram className="h-4 w-4" /></a> */}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-5 text-primary-foreground/60">Quick Links</h3>
            <ul className="space-y-2.5">
              {[{ label: "Home", to: "/" }, { label: "About Us", to: "/about" }, { label: "Services", to: "/services" }, { label: "Contact Us", to: "/contact" }].map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <Link href={item.to} className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors flex items-center gap-2 group">
                      <span className="text-accent">›</span>{item.label}
                    </Link>
                  ) : (
                    <a href={item.to} className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors flex items-center gap-2">
                      <span className="text-accent">›</span>{item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-5 text-primary-foreground/60">Our Services</h3>
            <ul className="space-y-2.5">
              {["Structural Steel", "Piping Systems", "Tank Fabrication", "Civil Works", "Electrical Works", "Fuel Infrastructure"].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors flex items-center gap-2">
                    <span className="text-accent">›</span>{s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-5 text-primary-foreground/60">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+27637179577" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors block mb-1">+27 (0) 63 717 9577</a>
                  <a href="tel:+27736023699" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors block">+27 (0) 73 602 3699</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:info@mc86group.com" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">info@mc86group.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <a
                  href="https://maps.google.com/?q=17+Makriel+Rd,+Wadeville,+Germiston,+1422,+South+Africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 text-sm hover:text-accent transition-colors"
                >
                  17 Makriel Rd, Wadeville, Germiston, 1422
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-primary-foreground/50 text-xs">© {currentYear} MC'86 Engineering &amp; Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}