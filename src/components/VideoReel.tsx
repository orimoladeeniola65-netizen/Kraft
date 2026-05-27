"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { Play, X, Volume2, VolumeX } from "lucide-react";

/* ──────────────────────────────────────────────────────────
   VIDEO CATALOGUE
────────────────────────────────────────────────────────── */
const FILMS = [
  {
    src:    "/Kraftify-images/Krafy-Video/kraft-reel.mp4",
    poster: "/Kraftify-images/Krafy-Video/thumbs/kraft-reel-poster.jpg",
    title:  "KRAFT Reel",
    sub:    "Brand Showreel",
    tag:    "Showreel",
    desc:   "The Kraftify signature reel — cultural elegance, cinematic light, and moments that last forever.",
    featured: true,
  },
  {
    src:    "/Kraftify-images/Krafy-Video/ife-bi-eji-owuro.mp4",
    poster: "/Kraftify-images/Krafy-Video/thumbs/ife-bi-eji-owuro-poster.jpg",
    title:  "Ife bi eji owuro",
    sub:    "Wedding Film",
    tag:    "Wedding",
    desc:   "\"Love like the morning star\" — a cinematic wedding film capturing raw emotion and cultural beauty.",
    featured: false,
  },
  {
    src:    "/Kraftify-images/Krafy-Video/bride-2.mp4",
    poster: "/Kraftify-images/Krafy-Video/thumbs/bride-2-poster.jpg",
    title:  "She Said Yes",
    sub:    "Bridal Film",
    tag:    "Bridal",
    desc:   "Pure joy, white tulle, and the electricity of the morning before it all begins.",
    featured: false,
  },
  {
    src:    "/Kraftify-images/Krafy-Video/bride-3.mp4",
    poster: "/Kraftify-images/Krafy-Video/thumbs/bride-3-poster.jpg",
    title:  "Bridal Film",
    sub:    "Bridal Session",
    tag:    "Bridal",
    desc:   "Movement, texture, and grace — the bridal experience through a cinematic lens.",
    featured: false,
  },
];

type Film = typeof FILMS[number];

/* ──────────────────────────────────────────────────────────
   VIDEO MODAL
────────────────────────────────────────────────────────── */
function VideoModal({ film, onClose }: { film: Film; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  // Auto-play when modal opens
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        const v = videoRef.current;
        if (v) v.paused ? v.play() : v.pause();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Pause & reset when modal closes
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      if (videoRef.current) videoRef.current.muted = !m;
      return !m;
    });
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-background/97 flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 px-6 py-5 flex items-center justify-between z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
            / {film.tag}
          </span>
          <p className="font-display font-extrabold text-lg uppercase tracking-tight text-foreground mt-0.5">
            {film.title}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMute}
            className="p-2 text-foreground/50 hover:text-foreground transition-colors"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button
            onClick={onClose}
            className="p-2 text-foreground/50 hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Video */}
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={film.src}
          poster={film.poster}
          controls
          playsInline
          className="w-full max-h-[80vh] object-contain bg-black"
          muted={muted}
        />
      </div>

      {/* Caption */}
      <p
        className="mt-4 text-sm text-foreground/50 max-w-xl text-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {film.desc}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   FILM CARD — Large featured card
────────────────────────────────────────────────────────── */
function FeaturedFilmCard({ film, onClick }: { film: Film; onClick: () => void }) {
  return (
    <div
      className="group relative w-full overflow-hidden bg-card cursor-pointer"
      style={{ height: "min(72vh, 680px)" }}
      onClick={onClick}
    >
      <Image
        src={film.poster}
        alt={film.title}
        fill
        className="object-cover object-center transition-transform duration-[1400ms] group-hover:scale-[1.03]"
        sizes="100vw"
      />
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-20 w-20 rounded-full border-2 border-foreground/60 group-hover:border-gold flex items-center justify-center bg-background/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
          <Play size={32} className="text-foreground group-hover:text-gold transition-colors ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex items-end justify-between">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold block mb-3">
            / {film.tag} — Featured Film
          </span>
          <h3 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-foreground leading-none">
            {film.title}
          </h3>
          <p className="mt-3 text-sm text-foreground/60 max-w-md leading-relaxed hidden md:block">
            {film.desc}
          </p>
        </div>
        <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/40 self-end pb-1">
          Click to play
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   FILM CARD — Grid card
────────────────────────────────────────────────────────── */
function FilmCard({ film, onClick }: { film: Film; onClick: () => void }) {
  return (
    <div
      className="group relative overflow-hidden bg-card cursor-pointer aspect-[9/16] sm:aspect-video md:aspect-[4/5]"
      onClick={onClick}
    >
      <Image
        src={film.poster}
        alt={film.title}
        fill
        loading="lazy"
        className="object-cover object-center transition-transform duration-[1200ms] group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/0 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-14 w-14 rounded-full border border-foreground/40 group-hover:border-gold flex items-center justify-center bg-background/20 backdrop-blur-sm transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-110">
          <Play size={20} className="text-foreground group-hover:text-gold transition-colors ml-0.5" fill="currentColor" />
        </div>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold block mb-1.5">
          / {film.tag}
        </span>
        <p className="font-display font-extrabold text-xl uppercase tracking-tight text-foreground leading-tight">
          {film.title}
        </p>
        <p className="text-xs text-foreground/50 mt-1">{film.sub}</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN EXPORT
────────────────────────────────────────────────────────── */
export function VideoReel() {
  const [playing, setPlaying] = useState<Film | null>(null);

  const featured = FILMS[0];
  const grid = FILMS.slice(1);

  return (
    <>
      {/* Section header */}
      <div className="flex items-end justify-between gap-6 flex-wrap mb-10 md:mb-12">
        <div>
          <p className="label">Films — 04</p>
          <h2 className="display-md mt-4">
            Cinematic<br />Films<span className="text-gold">.</span>
          </h2>
        </div>
        <p className="text-sm text-foreground/60 max-w-xs leading-relaxed self-end">
          Moving stories — crafted with the same intentionality as every still frame.
        </p>
      </div>

      {/* Featured film */}
      <FeaturedFilmCard film={featured} onClick={() => setPlaying(featured)} />

      {/* Grid of remaining films */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4">
        {grid.map((film) => (
          <FilmCard key={film.src} film={film} onClick={() => setPlaying(film)} />
        ))}
      </div>

      {/* Video modal */}
      {playing && (
        <VideoModal film={playing} onClose={() => setPlaying(null)} />
      )}
    </>
  );
}
