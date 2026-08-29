import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Crest } from "./Crest";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/current-issue", label: "Current Issue" },
  { to: "/publications", label: "Publications" },
  { to: "/frameworks", label: "Frameworks" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border/60 backdrop-blur transition-colors ${
        scrolled ? "bg-background/95" : "bg-background/80"
      }`}
    >
      <div className="container-editorial flex h-16 items-center gap-4 lg:h-20">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Crest className="h-9 w-9 shrink-0 lg:h-11 lg:w-11" />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-serif text-sm font-bold tracking-tight text-foreground sm:text-base lg:text-lg">
              The Venugopal Bere
            </div>
            <div className="truncate text-[10px] uppercase tracking-[0.2em] text-primary sm:text-[11px]">
              Educational Review
            </div>
          </div>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="link-underline link-underline-hover text-sm font-medium text-foreground/85 transition-colors hover:text-primary [&.active]:text-primary"
              activeProps={{ className: "active" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground/80 hover:bg-secondary hover:text-primary"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground/80 hover:bg-secondary hover:text-primary lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border/60 bg-background">
          <div className="container-editorial flex items-center gap-3 py-3">
            <Search className="h-4 w-4 text-primary" />
            <input
              autoFocus
              type="search"
              placeholder="Search articles, publications, frameworks…"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <nav className="container-editorial flex flex-col py-3">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-3 text-sm font-medium text-foreground/85 hover:text-primary [&.active]:text-primary"
                activeProps={{ className: "active" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
