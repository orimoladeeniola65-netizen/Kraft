import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { VideoReel } from "@/components/VideoReel";

export const metadata: Metadata = {
  title: "Works — Kraftify",
  description:
    "Selected works from Kraftify — portraits, weddings, cinematic films, editorial and event photography.",
  openGraph: {
    title: "Works — Kraftify",
    description: "Photography, videography & cinematic films by Kraftify.",
  },
};

export default function PortfolioPage() {
  return (
    <section className="px-5 lg:px-8 py-16 md:py-24 max-w-[1600px] mx-auto">

      {/* ── Page header ──────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
        <div className="col-span-12 md:col-span-7">
          <p className="label animate-fade-up">Works — Archive</p>
          <h1 className="display-lg mt-5 animate-fade-up delay-100">
            Selected<br />Visual Works<span className="text-gold">.</span>
          </h1>
        </div>
        <p className="col-span-12 md:col-span-4 md:col-start-9 text-sm md:text-base text-foreground/70 leading-relaxed self-end animate-fade-up delay-200">
          Real moments, made permanent. From intimate ceremonies to editorial
          shoots and cinematic films — every frame crafted with intention.
        </p>
      </div>

      {/* ── Photography grid (filters + masonry + lightbox) ── */}
      <PortfolioGrid />

      {/* ── Films divider ────────────────────────────────── */}
      <div className="border-t border-border my-20 md:my-32" />

      {/* ── Video reel section ───────────────────────────── */}
      <VideoReel />

      {/* ── CTA ──────────────────────────────────────────── */}
      <div className="mt-24 md:mt-36 border-t border-border pt-12 flex flex-wrap justify-between gap-6 items-end">
        <div>
          <p className="label mb-4">Ready to work together?</p>
          <h3 className="display-md max-w-xl">
            Got a story?<br />Let&apos;s shoot it<span className="text-gold">.</span>
          </h3>
        </div>
        <Link
          href="/book"
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
