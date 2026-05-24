"use client"

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import LenisProvider from "../components/lenisprovider";
import {
  ParallaxFloat,
  ParallaxFade,
  ParallaxScale,
  ParallaxScrub,
} from "../components/parallax";
import MapEmbed from "../components/mapembed";

// ─── Hero ────────────────────────────────────────────────────────────────────
function ContactHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section ref={ref} className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <div className="absolute inset-0 bg-gradient-to-tl from-primary via-primary to-primary/60" />
      </motion.div>

      {/* Floating accent blobs */}
      <ParallaxScrub speedX={0.18} speedY={-0.06} className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <ParallaxScrub speedX={-0.12} speedY={0.08} className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        <Badge className="mb-4 bg-accent text-primary-foreground text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full">Get In Touch</Badge>
        <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground leading-tight mb-4">
          Contact <span className="bg-gradient-to-r from-accent via-primary-foreground to-accent bg-clip-text text-transparent">Us</span>
        </h1>
        <p className="text-primary-foreground/80 text-base max-w-xl mx-auto">
          Have a project in mind? We'd love to hear from you. Send us a message or give us a call.
        </p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const contactInfo = [
  { icon: Phone, label: "Phone", lines: ["+27 (0) 63 717 9577", "+27 (0) 73 602 3699"], href: ["tel:+27637179577", "tel:+27736023699"] },
  { icon: Mail, label: "Email", lines: ["info@mc86group.com"], href: ["mailto:info@mc86group.com"] },
  { icon: MapPin, label: "Location", lines: ["Johannesburg", "Gauteng, South Africa"] },
  { icon: Clock, label: "Office Hours", lines: ["Mon – Fri: 07:30 – 17:00", "Sat: 08:00 – 13:00 (by appointment)"] },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Send failed");
      }

      setSent(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again or email us directly at info@mc86group.com");
    } finally {
      setSending(false);
    }
  };

  return (
    <LenisProvider>
      <div
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dk7dsm0lc/image/upload/f_auto,q_auto,w_1400/v1779021963/MC%2786/9196f923-701a-46cb-97dd-6e627519daaa_rke7qj.png)`,
          backgroundAttachment: "fixed",   // native CSS parallax for the outer BG
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* ── Hero ── */}
        <ContactHero />

        {/* ── Contact Info + Form ── */}
        <section className="py-20 bg-muted overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Left: Contact cards with staggered float */}
              <ParallaxFade>
                <div>
                  <Badge className="mb-3 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1">Contact Details</Badge>
                  <h2 className="text-3xl font-bold text-foreground mb-6 leading-tight">
                    Let's <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Connect</span>
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    Our team is ready to assist you with any engineering or construction enquiry. Reach out via phone, email, or fill in the form and we'll get back to you promptly.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contactInfo.map((item, i) => (
                      <ParallaxFloat key={item.label} speed={0.05 + i * 0.03}>
                        <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                            {item.lines.map((line, j) => (
                              item.href ? (
                                <a key={j} href={item.href[j] || "#"} className="block text-sm font-medium text-foreground hover:text-primary transition-colors">{line}</a>
                              ) : (
                                <p key={j} className="text-sm text-foreground">{line}</p>
                              )
                            ))}
                          </div>
                        </div>
                      </ParallaxFloat>
                    ))}
                  </div>
                </div>
              </ParallaxFade>

              {/* Right: Form with scale-in */}
              <ParallaxScale>
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h3>
                  {sent ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Send className="h-8 w-8 text-primary" />
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-2">Message Sent!</h4>
                      <p className="text-muted-foreground text-sm mb-6">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                      <Button variant="outline" onClick={() => setSent(false)}>Send Another</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input id="name" name="name" placeholder="John Smith" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" name="phone" placeholder="+27 xx xxx xxxx" value={form.phone} onChange={handleChange} />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" name="subject" placeholder="Project enquiry" value={form.subject} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea id="message" name="message" placeholder="Tell us about your project..." className="h-32 resize-none" value={form.message} onChange={handleChange} required />
                      </div>
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" disabled={sending}>
                        {sending ? "Sending..." : <><Send className="h-4 w-4 mr-2" /> Send Message</>}
                      </Button>
                    </form>
                  )}
                </div>
              </ParallaxScale>
            </div>
          </div>
        </section>

        {/* ── Map ── */}
        <section className="py-0 overflow-hidden bg-secondary">
          <div className="max-w-7xl mx-auto px-6 pb-20">
            <ParallaxFade>
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1">Find Us</Badge>
                <h2 className="text-3xl font-bold text-foreground">
                  Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Location</span>
                </h2>
              </div>
            </ParallaxFade>
            <ParallaxScale>
              <div className="rounded-2xl overflow-hidden border border-border shadow-lg h-[450px]">
                <MapEmbed />
              </div>
            </ParallaxScale>
          </div>
        </section>
      </div>
    </LenisProvider>
  );
}