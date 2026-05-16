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
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/8500bd9e1_mc86group_com_fau-145x75_d7eb72ae.png", alt: "Faurecia" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/9a36235dd_mc86group_com_poly-145x75_0e6f35fe.png", alt: "Poly" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/0113b0b41_mc86group_com_redb-145x75_1ff3e6ac.png", alt: "Redbrick" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/2b86a5dea_mc86group_com_client_2-145x75_ea15d363.png", alt: "AECOM" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/cc969453e_mc86group_com_sappi-145x75_25faddd4.png", alt: "Sappi" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/cf4243773_mc86group_com_cidb-145x75_db54147e.png", alt: "CIDB" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/ead1cb48c_mc86group_com_coeng-145x75_d07d356f.png", alt: "COENG" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/a71e74af1_mc86group_com_dcb-145x75_14b891ef.png", alt: "DCB" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/2facfdd64_mc86group_com_ekur-145x75_03c0f7fa.png", alt: "Ekur" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/85822f4f0_mc86group_com_joburg-145x75_531d8de9.png", alt: "Joburg" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/fa77ffede_mc86group_com_lawrence-145x75_503df294.png", alt: "Lawrence" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/7027c4e2e_mc86group_com_noto-145x75_0e6629f2.png", alt: "Noto" },
  { src: "https://media.base44.com/images/public/69ff141f3dc8066a88d6ff99/2ef8fd5c4_mc86group_com_exce-145x75_32aee998.png", alt: "Excellerate" },
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