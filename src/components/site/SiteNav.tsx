import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Crest } from "./Crest";
import { ARTICLES } from "../../data/articles";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/current-issue", label: "Current Issue" },
  { to: "/publications", label: "Publications" },
  { to: "/frameworks", label: "Frameworks" },
  { to: "/resources", label: "Resources" },
  { to: "/speaking", label: "Speaking & Training" },
  { to: "/contact", label: "Contact" },
] as const;

// Static pages that aren't in ARTICLES but should still be searchable.
const SEARCHABLE_PAGES = [
  { to: "/about", label: "About the Author", type: "Page" },
  { to: "/current-issue", label: "Current Issue", type: "Page" },
  { to: "/publications", label: "Publications", type: "Page" },
  { to: "/frameworks", label: "Frameworks", type: "Page" },
  {
    to: "/frameworks/professional-learning-framework",
    label: "The Bere Professional Learning Framework",
    type: "Framework",
  },
  { to: "/resources", label: "Resources", type: "Page" },
  { to: "/speaking", label: "Speaking & Training", type: "Page" },
  { to: "/for-contributors", label: "For Contributors", type: "Page" },
  { to: "/contact", label: "Contact", type: "Page" },
] as const;

type SearchResult = { to: string; label: string; type: string };

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const fromArticles: SearchResult[] = ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        (a.shortTitle ?? "").toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q),
    ).map((a) => ({
      to: `/articles/${a.slug}`,
      label: a.shortTitle ?? a.title,
      type: a.tag,
    }));

    const fromPages: SearchResult[] = SEARCHABLE_PAGES.filter((p) =>
      p.label.toLowerCase().includes(q),
    ).map((p) => ({ to: p.to, label: p.label, type: p.type }));

    return [...fromArticles, ...fromPages].slice(0, 8);
  }, [query]);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results[0]) {
      navigate({ to: results[0].to as never });
      closeSearch();
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border/60 backdrop-blur transition-colors ${
        scrolled ? "bg-background/95" : "bg-background/80"
      }`}
    >
      <div className="container-editorial flex h-16 items-center gap-4 lg:h-20">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
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

        <nav className="ml-auto hidden items-center gap-4 xl:gap-6 lg:flex">
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
            onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
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
          <div className="container-editorial py-3">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
              <Search className="h-4 w-4 shrink-0 text-primary" />
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, publications, frameworks…"
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="button"
                onClick={closeSearch}
                className="shrink-0 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
              >
                Close
              </button>
            </form>

            {query.trim() !== "" && (
              <ul className="mt-3 max-h-80 divide-y divide-border/60 overflow-y-auto rounded-lg border border-border/60">
                {results.length > 0 ? (
                  results.map((r) => (
                    <li key={`${r.type}-${r.to}`}>
                      <Link
                        to={r.to as never}
                        onClick={closeSearch}
                        className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-foreground/85 hover:bg-secondary hover:text-primary"
                      >
                        <span className="truncate">{r.label}</span>
                        <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {r.type}
                        </span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2.5 text-sm text-muted-foreground">
                    No results for "{query}".
                  </li>
                )}
              </ul>
            )}
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
