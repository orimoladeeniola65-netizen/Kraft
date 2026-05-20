import { Link } from "@tanstack/react-router";
import { Instagram, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      {/* Big wordmark band */}
      <div className="px-5 lg:px-8 pt-16 pb-10 border-b border-border">
        <Link to="/book" className="group block">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <p className="label">Get in touch</p>
            <ArrowUpRight className="text-foreground/60 group-hover:text-gold group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" size={28} />
          </div>
          <h2 className="display-lg mt-6 group-hover:text-gold transition-colors">
            Let's make<br />something good.
          </h2>
        </Link>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 lg:px-8 py-10 grid gap-8 md:grid-cols-12 items-start">
        <div className="md:col-span-4">
          <Link to="/" className="font-display font-extrabold text-base tracking-tight">
            KRAFTIFY<span className="text-gold">.</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            A photography & videography studio crafting visual stories.
          </p>
        </div>

        <div className="md:col-span-4 md:col-start-6">
          <p className="label mb-4">Sitemap</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gold transition-colors">Index</Link></li>
            <li><Link to="/portfolio" className="hover:text-gold transition-colors">Works</Link></li>
            <li><Link to="/services" className="hover:text-gold transition-colors">Services</Link></li>
            <li><Link to="/book" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3 md:col-start-10">
          <p className="label mb-4">Elsewhere</p>
          <a
            href="https://instagram.com/shotbykraft"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-sm hover:text-gold transition-colors"
          >
            <Instagram size={16} />
            @shotbykraft
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1600px] px-5 lg:px-8 py-5 flex flex-wrap justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
          <span>© 2025 Kraftify</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
