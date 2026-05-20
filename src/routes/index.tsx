import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import aboutPortrait from "@/assets/about-portrait.jpg";
import heroPortrait from "@/assets/hero-portrait.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kraftify — Visual Stories Studio" },
      { name: "description", content: "Kraftify is a photography and videography studio crafting cinematic visual stories — portraits, weddings, events, brand content." },
      { property: "og:title", content: "Kraftify — Visual Stories Studio" },
      { property: "og:description", content: "Photography, videography & content creation." },
    ],
  }),
  component: HomePage,
});

const services = [
  { n: "01", name: "Photography", desc: "Portraits, weddings, events. Real moments, made permanent." },
  { n: "02", name: "Videography", desc: "Cinematic films for brands, weddings, and the moments worth keeping." },
  { n: "03", name: "Content Creation", desc: "Strategic visuals for social and digital — built to stop the scroll." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] w-full overflow-hidden bg-background">
        <img
          src={heroPortrait}
          alt="Cinematic portrait — Kraftify visual story"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover object-right md:object-[70%_center] opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/40" />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />

        <div className="relative z-10 min-h-[100svh] flex flex-col">
          <div className="px-5 lg:px-8 pt-28 md:pt-32">
            <div className="max-w-[1600px] mx-auto flex items-start justify-between gap-6">
              <p className="label animate-fade-up">
                <span className="text-gold">●</span> Available for bookings — 2026
              </p>
              <p className="hidden md:block label text-right animate-fade-up delay-100">
                Lagos · Worldwide<br />
                <span className="text-foreground/50">Est. 2021</span>
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-center px-5 lg:px-8">
            <div className="max-w-[1600px] mx-auto w-full">
              <h1 className="font-display font-extrabold uppercase leading-[0.82] tracking-[-0.04em] text-foreground animate-fade-up delay-100 text-[clamp(4.5rem,18vw,17rem)]">
                Kraf<span className="text-gold">.</span><br />
                tify
              </h1>
            </div>
          </div>

          <div className="px-5 lg:px-8 pb-12 md:pb-16">
            <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6 md:gap-10 items-end">
              <div className="col-span-12 md:col-span-5 animate-fade-up delay-200">
                <p className="text-base md:text-lg text-foreground/85 leading-relaxed max-w-md">
                  We craft visual stories that linger — cinematic frames for the moments worth remembering.
                </p>
              </div>

              <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-wrap gap-3 md:justify-end animate-fade-up delay-300">
                <Link
                  to="/portfolio"
                  className="group inline-flex items-center gap-3 bg-foreground text-primary-foreground pl-6 pr-2 py-2 text-xs uppercase tracking-[0.16em] font-medium hover:bg-gold transition-colors"
                >
                  See My Work
                  <span className="h-9 w-9 bg-primary-foreground/10 grid place-items-center group-hover:rotate-45 transition-transform">
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
                <Link
                  to="/book"
                  className="inline-flex items-center px-6 py-3 text-xs uppercase tracking-[0.16em] border border-foreground/30 hover:border-foreground hover:bg-foreground/5 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-foreground/40">
          <span className="label text-[10px]">Scroll</span>
          <div className="w-px h-8 bg-foreground/30" />
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border py-5 overflow-hidden">
        <div className="flex gap-10 animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-10 items-center shrink-0">
              {["Portraits", "Weddings", "Events", "Brands", "Editorial", "Concerts", "Fashion", "Products"].map((w) => (
                <span key={w} className="flex items-center gap-10 text-2xl md:text-3xl font-display font-extrabold uppercase tracking-tight">
                  {w}
                  <span className="text-gold">●</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-5 lg:px-8 py-24 md:py-36">
        <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-5">
            <div className="relative overflow-hidden bg-card aspect-[4/5]">
              <img
                src={aboutPortrait}
                alt="Behind the lens at Kraftify"
                loading="lazy"
                width={1024}
                height={1280}
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-between">
            <div>
              <p className="label">About — 01</p>
              <h2 className="display-md mt-6">
                Born to<br />Create<span className="text-gold">.</span>
              </h2>
              <p className="mt-8 text-base md:text-lg text-foreground/80 leading-relaxed max-w-xl">
                Kraftify is a photography and videography brand dedicated to telling authentic
                visual stories. From intimate portraits to high-energy events, we bring creativity
                and precision to every frame.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 pt-8 border-t border-border">
              {[["200+", "Sessions"], ["05", "Years"], ["100%", "Loved"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-extrabold text-3xl md:text-4xl">{n}</div>
                  <div className="label mt-2">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-5 lg:px-8 py-24 border-t border-border">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
            <div>
              <p className="label">Services — 02</p>
              <h2 className="display-md mt-4">What we do</h2>
            </div>
            <Link to="/services" className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] hover:text-gold transition-colors">
              All services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {services.map((s) => (
              <div key={s.name} className="group bg-background p-8 md:p-10 hover:bg-card transition-colors min-h-[280px] flex flex-col">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{s.n} /</span>
                  <ArrowUpRight size={18} className="text-foreground/40 group-hover:text-gold group-hover:rotate-45 transition-all" />
                </div>
                <h3 className="font-display font-extrabold text-3xl mt-12">{s.name}</h3>
                <p className="mt-4 text-foreground/70 leading-relaxed flex-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO BENTO */}
      <section className="px-5 lg:px-8 py-24 border-t border-border">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
            <div>
              <p className="label">Selected Works — 03</p>
              <h2 className="display-md mt-4">Recent frames</h2>
            </div>
            <Link to="/portfolio" className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] hover:text-gold transition-colors">
              Full archive <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Bento */}
          <div className="grid grid-cols-6 auto-rows-[120px] md:auto-rows-[160px] gap-3 md:gap-4">
            <BentoCell src={p1} label="Bridal · Golden Hour" className="col-span-6 md:col-span-4 row-span-3" />
            <BentoCell src={p2} label="Portrait · Studio" className="col-span-3 md:col-span-2 row-span-2" />
            <BentoCell src={p4} label="Product · Brand" className="col-span-3 md:col-span-2 row-span-1" />
            <BentoCell src={p3} label="Concert · Live" className="col-span-6 md:col-span-3 row-span-2" />
            <BentoCell src={p6} label="Editorial · Fashion" className="col-span-3 md:col-span-2 row-span-2" />
            <BentoCell src={p5} label="Wedding · Couples" className="col-span-3 md:col-span-1 row-span-2" />
          </div>
        </div>
      </section>
    </>
  );
}

function BentoCell({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  return (
    <figure className={`group relative overflow-hidden bg-card ${className}`}>
      <img
        src={src}
        alt={label}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <figcaption className="absolute left-4 bottom-4 right-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground">{label}</span>
        <ArrowUpRight size={18} className="text-gold" />
      </figcaption>
    </figure>
  );
}
