"use client"

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

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

const contactInfo = [
  { icon: Phone, label: "Phone", lines: ["+27 (0) 63 717 9577", "+27 (0) 73 602 3699"], href: ["tel:+27637179577", "tel:+27736023699"] },
  { icon: Mail, label: "Email", lines: ["info@mc86group.com"], href: ["mailto:info@mc86group.com"] },
  { icon: MapPin, label: "Location", lines: ["Johannesburg", "Gauteng, South Africa"] },
  { icon: Clock, label: "Office Hours", lines: ["Mon – Fri: 07:30 – 17:00", "Sat: 08:00 – 13:00 (by appointment)"] },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // await base44.integrations.Core.SendEmail({
    //   to: "info@mc86group.com",
    //   subject: `Website Enquiry: ${form.subject || "General"}`,
    //   body: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`,
    // });
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        >
          <Badge className="mb-4 bg-accent text-primary-foreground text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full">Get In Touch</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground leading-tight mb-4">
            Contact <span className="bg-gradient-to-r from-accent via-primary-foreground to-accent bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-primary-foreground/80 text-base max-w-xl mx-auto">Have a project in mind? We'd love to hear from you. Send us a message or give us a call.</p>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Contact Cards + Form */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Info */}
            <AnimatedElement>
              <div>
                <Badge className="mb-3 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1">Contact Details</Badge>
                <h2 className="text-3xl font-bold text-foreground mb-6 leading-tight">
                  Let's <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Connect</span>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  Our team is ready to assist you with any engineering or construction enquiry. Reach out via phone, email, or fill in the form and we'll get back to you promptly.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="bg-card border border-border rounded-xl p-5 flex items-start gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{item.label}</p>
                        {item.lines.map((line, i) => (
                          item.href ? (
                            <a key={i} href={item.href[i] || "#"} className="block text-sm font-medium text-foreground hover:text-primary transition-colors">{line}</a>
                          ) : (
                            <p key={i} className="text-sm text-foreground">{line}</p>
                          )
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedElement>

            {/* Right: Form */}
            <AnimatedElement delay={150}>
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
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-0">
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <AnimatedElement>
            <div className="text-center mb-8">
              <Badge className="mb-3 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1">Find Us</Badge>
              <h2 className="text-3xl font-bold text-foreground">Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Location</span></h2>
            </div>
          </AnimatedElement>
          <AnimatedElement delay={100}>
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg h-[450px]">
              <iframe
                title="MC'86 Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.037374!2d28.0473!3d-26.2041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c68f0406a51%3A0x238ac9d9b1d34041!2sJohannesburg%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1682000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}