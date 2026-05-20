import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";
import p9 from "@/assets/p9.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Works — Kraftify" },
      { name: "description", content: "Selected works from Kraftify — portraits, weddings, editorial, brand and event photography." },
      { property: "og:title", content: "Works — Kraftify" },
      { property: "og:description", content: "Selected cinematic works by Kraftify." },
    ],
  }),
  component: PortfolioPage,
});

type Cell = { src: string; label: string; tag: string; className: string };

const cells: Cell[] = [
  { src: p1, label: "Aria & James", tag: "Wedding", className: "col-span-6 md:col-span-4 row-span-3" },
  { src: p2, label: "Studio No. 04", tag: "Portrait", className: "col-span-3 md:col-span-2 row-span-2" },
  { src: p6, label: "Velvet", tag: "Editorial", className: "col-span-3 md:col-span-2 row-span-2" },
  { src: p3, label: "Static Sessions", tag: "Concert", className: "col-span-6 md:col-span-3 row-span-2" },
  { src: p4, label: "Maison Noir", tag: "Brand", className: "col-span-3 md:col-span-2 row-span-2" },
  { src: p9, label: "After Hours", tag: "Street", className: "col-span-3 md:col-span-1 row-span-2" },
  { src: p5, label: "Two of Us", tag: "Couples", className: "col-span-6 md:col-span-3 row-span-2" },
  { src: p7, label: "Set 12", tag: "BTS", className: "col-span-3 md:col-span-2 row-span-2" },
  { src: p8, label: "House of Glass", tag: "Architecture", className: "col-span-3 md:col-span-1 row-span-2" },
];

function PortfolioPage() {
  return (
    <section className="px-5 lg:px-8 py-16 md:py-24 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
        <div className="col-span-12 md:col-span-7">
          <p className="label animate-fade-up">Works — Archive</p>
          <h1 className="display-lg mt-5 animate-fade-up delay-100">
            Selected<br />Visual Works<span className="text-gold">.</span>
          </h1>
        </div>
        <p className="col-span-12 md:col-span-4 md:col-start-9 text-sm md:text-base text-foreground/70 leading-relaxed self-end animate-fade-up delay-200">
          A curated selection of moments, light, and stories. Captured frame by frame —
          across weddings, editorial, live, and brand work.
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-6 auto-rows-[120px] md:auto-rows-[160px] gap-3 md:gap-4">
        {cells.map((c, i) => (
          <figure key={i} className={`group relative overflow-hidden bg-card ${c.className}`}>
            <img
              src={c.src}
              alt={c.label}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <figcaption className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">/ {c.tag}</span>
                <ArrowUpRight size={18} className="text-foreground" />
              </div>
              <div className="font-display font-extrabold text-xl md:text-2xl uppercase tracking-tight">
                {c.label}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 md:mt-32 border-t border-border pt-12 flex flex-wrap justify-between gap-6 items-end">
        <h3 className="display-md max-w-xl">
          Got a story?<br />Let's shoot it<span className="text-gold">.</span>
        </h3>
        <Link
          to="/book"
          className="group inline-flex items-center gap-3 bg-foreground text-primary-foreground pl-6 pr-2 py-2 text-xs uppercase tracking-[0.16em] hover:bg-gold transition-colors"
        >
          Book a session
          <span className="h-9 w-9 bg-primary-foreground/10 grid place-items-center group-hover:rotate-45 transition-transform">
            <ArrowUpRight size={16} />
          </span>
        </Link>
      </div>
    </section>
  );
}
