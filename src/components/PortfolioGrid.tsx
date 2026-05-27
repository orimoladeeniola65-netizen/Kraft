"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────
   IMAGE CATALOGUE
   hero: true  → pinned as the full-width opener
   w / h       → actual pixel dimensions (required for masonry)
───────────────────────────────────────────── */
const ALL_ITEMS = [
  // ── Hero ──────────────────────────────────────────────────────────────────
  {
    src: "/Kraftify-images/Kraft-images-02/IMG_8465.jpg",
    w: 1290, h: 2240,
    label: "Bridal Portrait",       tag: "Portrait",  hero: true,
  },
  // ── Wedding ───────────────────────────────────────────────────────────────
  {
    src: "/Kraftify-images/Kraft-images-02/IMG_8464.jpg",
    w: 1290, h: 2084,
    label: "Traditional Ceremony",  tag: "Wedding",   hero: false,
  },
  {
    src: "/Kraftify-images/k7.jpg",
    w: 982,  h: 1080,
    label: "Wedding BTS",           tag: "Wedding",   hero: false,
  },
  {
    src: "/Kraftify-images/Kraft-images-02/IMG_8467.jpg",
    w: 1290, h: 1007,
    label: "The Ring",              tag: "Wedding",   hero: false,
  },
  {
    src: "/Kraftify-images/k9.jpg",
    w: 660,  h: 1080,
    label: "Cultural Ceremony",     tag: "Wedding",   hero: false,
  },
  {
    src: "/Kraftify-images/k1.jpg",
    w: 798,  h: 1080,
    label: "Engagement",            tag: "Wedding",   hero: false,
  },
  {
    src: "/Kraftify-images/Kraft-images-02/IMG_8468.jpg",
    w: 1290, h: 2265,
    label: "The Ceremony",          tag: "Wedding",   hero: false,
  },
  // ── Portrait ──────────────────────────────────────────────────────────────
  {
    src: "/Kraftify-images/Kraft-images-02/IMG_8466.jpg",
    w: 1290, h: 2255,
    label: "Bridal Detail",         tag: "Portrait",  hero: false,
  },
  {
    src: "/Kraftify-images/k6.jpg",
    w: 720,  h: 1080,
    label: "Studio Portrait",       tag: "Portrait",  hero: false,
  },
  // ── Events / Editorial / BTS ──────────────────────────────────────────────
  {
    src: "/Kraftify-images/k5.jpg",
    w: 724,  h: 1080,
    label: "Red Stage",             tag: "Events",    hero: false,
  },
  {
    src: "/Kraftify-images/k3.jpg",
    w: 824,  h: 1080,
    label: "Blue Mustang",          tag: "Editorial", hero: false,
  },
  {
    src: "/Kraftify-images/k4.jpg",
    w: 810,  h: 1080,
    label: "Gear Session",          tag: "BTS",       hero: false,
  },
];

const CATEGORIES = ["All", "Wedding", "Portrait", "Events", "Editorial", "BTS"];

type Item = typeof ALL_ITEMS[number];

/* ─────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────── */
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: Item[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  // keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 bg-background/97 flex flex-col items-center justify-center"
      onClick={onClose}
    >
      {/* close */}
      <button
        className="absolute top-5 right-5 z-10 p-2 text-foreground/50 hover:text-foreground transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={26} />
      </button>

      {/* prev */}
      {items.length > 1 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-foreground/50 hover:text-foreground transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* image */}
      <div
        className="relative w-full max-w-4xl max-h-[82vh] px-14"
        style={{ aspectRatio: `${item.w} / ${item.h}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={item.src}
          src={item.src}
          alt={item.label}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 80vw"
          priority
        />
      </div>

      {/* caption */}
      <div className="mt-6 text-center px-4" onClick={(e) => e.stopPropagation()}>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold block mb-1">
          / {item.tag}
        </span>
        <p className="font-display font-extrabold text-lg uppercase tracking-tight text-foreground">
          {item.label}
        </p>
        <p className="font-mono text-[11px] text-foreground/40 mt-1">
          {index + 1} / {items.length}
        </p>
      </div>

      {/* next */}
      {items.length > 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-foreground/50 hover:text-foreground transition-colors"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MASONRY CARD
───────────────────────────────────────────── */
function MasonryCard({ item, onClick }: { item: Item; onClick: () => void }) {
  return (
    <div
      className="group relative overflow-hidden break-inside-avoid mb-3 md:mb-4 cursor-zoom-in bg-card"
      onClick={onClick}
    >
      <Image
        src={item.src}
        alt={item.label}
        width={item.w}
        height={item.h}
        loading="lazy"
        className="w-full h-auto block transition-transform duration-[1200ms] group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {/* hover overlay */}
      <div className="absolute inset-0 bg-background/65 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <div className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
          / {item.tag}
        </span>
        <p className="font-display font-extrabold text-lg md:text-xl uppercase tracking-tight text-foreground">
          {item.label}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export function PortfolioGrid() {
  const [active, setActive] = useState("All");
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  const filtered = active === "All"
    ? ALL_ITEMS
    : ALL_ITEMS.filter((i) => i.tag === active);

  const hero = active === "All" ? filtered[0] : null;
  const grid = active === "All" ? filtered.slice(1) : filtered;

  const openLightbox = useCallback((src: string) => {
    const idx = filtered.findIndex((i) => i.src === src);
    setLbIndex(idx);
  }, [filtered]);

  const closeLightbox = useCallback(() => setLbIndex(null), []);
  const prev = useCallback(() => setLbIndex((i) => i === null ? null : (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const next = useCallback(() => setLbIndex((i) => i === null ? null : (i + 1) % filtered.length), [filtered.length]);

  return (
    <>
      {/* ── Filter tabs ─────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-10 md:mb-14">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActive(cat); setLbIndex(null); }}
            className={`px-5 py-2 text-[11px] uppercase tracking-[0.16em] border transition-colors ${
              active === cat
                ? "border-foreground bg-foreground text-primary-foreground"
                : "border-border text-foreground/60 hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Hero (full-width featured) ───────────────── */}
      {hero && (
        <div
          className="group relative w-full overflow-hidden bg-card mb-3 md:mb-4 cursor-zoom-in"
          style={{ height: "min(80vh, 820px)" }}
          onClick={() => openLightbox(hero.src)}
        >
          <Image
            src={hero.src}
            alt={hero.label}
            fill
            priority
            className="object-cover object-top transition-transform duration-[1400ms] group-hover:scale-[1.03]"
            sizes="100vw"
          />
          {/* dark gradient at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
          {/* label */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex items-end justify-between">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold block mb-3">
                / {hero.tag} — Featured
              </span>
              <h3 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-foreground leading-none">
                {hero.label}
              </h3>
            </div>
            <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/40 self-end pb-1">
              Click to view full image
            </span>
          </div>
        </div>
      )}

      {/* ── Masonry grid ────────────────────────────── */}
      {grid.length > 0 && (
        <div className="columns-2 md:columns-3 gap-3 md:gap-4">
          {grid.map((item) => (
            <MasonryCard
              key={item.src}
              item={item}
              onClick={() => openLightbox(item.src)}
            />
          ))}
        </div>
      )}

      {/* ── Lightbox ────────────────────────────────── */}
      {lbIndex !== null && (
        <Lightbox
          items={filtered}
          index={lbIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
