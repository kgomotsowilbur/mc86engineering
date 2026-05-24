"use client"

const clientLogos = [
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/b4026334e_mc86group_com_Shell-145x75_231a73b3.png", alt: "Shell" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/b5f6bb321_mc86group_com_sibanye-145x75_112aa98a.png", alt: "Sibanye Stillwater" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/a85d9a865_mc86group_com_sasol-145x75_1bb6aa0e.png", alt: "Sasol" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/b41ecdf5e_mc86group_com_bp-145x75_d9f91a9e.png", alt: "BP" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/04ab2704e_mc86group_com_gulf-145x75_7557cc7d.png", alt: "Gulf" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/4400e4ff9_mc86group_com_astron-145x75_38dae7f3.png", alt: "Astron Energy" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/5d6f19ccc_mc86group_com_Central-145x75_c882a49e.png", alt: "Central Supplier Database" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/482928850_mc86group_com_kwenta-145x75_209e6a4d.png", alt: "Kwenta Group" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/4821f2ee7_mc86group_com_pump-145x75_61b6d4ef.png", alt: "Pumpquip" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/c08743899_mc86group_com_masinga-145x75_0f4c96d7.png", alt: "Masingi" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/0113b0b41_mc86group_com_redb-145x75_1ff3e6ac.png", alt: "Redbrick" },
  { src: "https://res.cloudinary.com/dk7dsm0lc/image/upload/v1779525129/images_crrldo.png", alt: "CBRE Excellerate"},
  { src: "https://res.cloudinary.com/dk7dsm0lc/image/upload/v1779525128/samancor-logo-png_seeklogo-171246_jdrewf.png", alt: "samancor"},
  { src: "https://res.cloudinary.com/dk7dsm0lc/image/upload/v1779525128/pragma_logo_rlxtbj.jpg", alt: "pragma"},
  { src: "https://res.cloudinary.com/dk7dsm0lc/image/upload/v1779525129/SERITI-Logo-RGB_jmrncy.png", alt: "seriti"},
  { src: "https://res.cloudinary.com/dk7dsm0lc/image/upload/v1779525129/Heineken_sfljjd.png", alt: "heineken"},
  { src: "https://res.cloudinary.com/dk7dsm0lc/image/upload/v1779525130/Department_of_Water_and_Sanitation_logo.svg_vmwfou.png", alt: "water and sanitation"}
];

export default function ClientsMarquee() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <p className="text-xs font-bold tracking-widest uppercase text-primary/60 mb-2">Trusted Partners</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground uppercase tracking-tight">
          Our <span className="text-primary">Clients</span>
        </h2>
        <div className="w-16 h-1 bg-accent mx-auto mt-4" />
      </div>

      <div className="relative w-full flex overflow-hidden select-none group">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

        <div className="flex gap-8 animate-marquee">
          {[...clientLogos, ...clientLogos].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center w-36 h-20 bg-card border border-border rounded-lg px-4 py-3 hover:shadow-md transition-all duration-300"
            >
              <img src={logo.src} alt={logo.alt} className="max-h-12 max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}