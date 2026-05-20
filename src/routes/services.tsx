import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Kraftify" },
      { name: "description", content: "Photography, videography, and content creation services by Kraftify studio." },
      { property: "og:title", content: "Services — Kraftify" },
      { property: "og:description", content: "Photography, videography, and content creation." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    n: "01",
    name: "Photography",
    desc: "Capturing life's most authentic moments. From portraits to events, every shot is crafted with intention.",
    bullets: ["Portrait sessions", "Weddings & couples", "Events & live", "Editorial"],
  },
  {
    n: "02",
    name: "Videography",
    desc: "Cinematic video production for events, weddings, and brands. We turn your moments into films.",
    bullets: ["Wedding films", "Brand films", "Event coverage", "Music videos"],
  },
  {
    n: "03",
    name: "Content Creation",
    desc: "Strategic visual content for your brand's social media and digital presence. Built to stop the scroll.",
    bullets: ["Social reels", "Product shoots", "Campaigns", "BTS content"],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="px-5 lg:px-8 py-16 md:py-24 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-7">
            <p className="label animate-fade-up">Services</p>
            <h1 className="display-lg mt-5 animate-fade-up delay-100">
              What we<br />craft<span className="text-gold">.</span>
            </h1>
          </div>
          <p className="col-span-12 md:col-span-4 md:col-start-9 text-sm md:text-base text-foreground/70 leading-relaxed self-end animate-fade-up delay-200">
            Three disciplines. One obsession with story, light, and detail. Pick the lane —
            or combine all three.
          </p>
        </div>

        <div className="border-t border-border">
          {services.map((s) => (
            <Link
              to="/book"
              key={s.n}
              className="group block border-b border-border py-10 md:py-14 px-2 md:px-4 hover:bg-card transition-colors"
            >
              <div className="grid grid-cols-12 gap-6 items-start">
                <div className="col-span-12 md:col-span-1 font-mono text-xs text-muted-foreground pt-3">
                  {s.n} /
                </div>
                <div className="col-span-12 md:col-span-5">
                  <h2 className="display-md group-hover:text-gold transition-colors">{s.name}</h2>
                </div>
                <p className="col-span-12 md:col-span-4 text-foreground/70 leading-relaxed">
                  {s.desc}
                </p>
                <div className="col-span-10 md:col-span-1 flex flex-wrap gap-2">
                  {s.bullets.map((b) => (
                    <span key={b} className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground border border-border px-2 py-1">
                      {b}
                    </span>
                  ))}
                </div>
                <div className="col-span-2 md:col-span-1 flex justify-end">
                  <ArrowUpRight size={28} className="text-foreground/40 group-hover:text-gold group-hover:rotate-45 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 lg:px-8 py-24 md:py-36 border-t border-border">
        <div className="max-w-[1600px] mx-auto text-center">
          <p className="label">Get in touch</p>
          <h2 className="display-lg mt-6">
            Ready to create<br />something<span className="text-gold"> extraordinary?</span>
          </h2>
          <Link
            to="/book"
            className="mt-12 inline-flex items-center gap-3 bg-foreground text-primary-foreground pl-6 pr-2 py-2 text-xs uppercase tracking-[0.16em] hover:bg-gold transition-colors"
          >
            Book a session
            <span className="h-9 w-9 bg-primary-foreground/10 grid place-items-center">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
