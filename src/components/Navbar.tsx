import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/portfolio", label: "Works" },
  { to: "/services", label: "Services" },
  { to: "/book", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-background/75 border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1600px] px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display font-extrabold text-base tracking-tight hover:opacity-70 transition-opacity"
        >
          KRAFTIFY<span className="text-gold">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground/70 hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/book"
            className="ml-4 inline-flex items-center gap-2 bg-foreground text-primary-foreground px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] hover:bg-gold hover:text-primary-foreground transition-colors"
          >
            Book Now
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <div className="flex flex-col px-5 py-5 gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.14em] py-2 text-foreground/80 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="mt-2 bg-foreground text-primary-foreground px-5 py-3 text-xs uppercase tracking-[0.14em] text-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
