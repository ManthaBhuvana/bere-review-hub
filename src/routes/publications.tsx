import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Copy, Check, Download } from "lucide-react";
import { PageHeader } from "../components/site/PageHeader";

export const Route = createFileRoute("/publications")({
  component: Publications,

  head: () => ({
    meta: [
      {
        title: "Publications — The Venugopal Bere Educational Review",
      },
      {
        name: "description",
        content:
          "Archive of past issues and publications on educational leadership, teacher development, and classroom practice, with full citation details.",
      },
      {
        name: "keywords",
        content:
          "publications, journal archive, educational leadership research, citation, Venugopal Bere",
      },
      {
        property: "og:title",
        content: "Publications Archive",
      },
      {
        property: "og:description",
        content: "Search and browse past issues of the Review.",
      },
      {
        property: "og:url",
        content: "/publications",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "/publications",
      },
    ],
  }),
});

// Replace each pdfUrl with the real public URL of the file once uploaded
// to Supabase Storage.
//
// Example:
// https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/publications/volume-1.pdf

const PUBS = [
  {
    year: 2026,
    cat: "Journal Issue",
    theme: "Teacher Professional Development",
    title: "Volume 1, Issue 1 — Teacher Professional Development",
    author: "Venugopal Bere (Ed.)",
    date: "January 2026",
    volume: "Vol. 1, Issue 1",
    excerpt:
      "The inaugural issue: research, policy, leadership, and practice on teacher professional development.",
    pdfUrl:
      "https://zcgjgcncubxujgwtbkqo.supabase.co/storage/v1/object/public/publications/volume-1.pdf",
    readTo: "/articles/volume-1",
    citation:
      "Bere, V. (Ed.). (2026). The Venugopal Bere Educational Review, Vol. 1, Issue 1.",
    references: [
      "Ministry of Education, Government of India. (2020). National Education Policy 2020.",
      "NCERT. (2023). National Curriculum Framework for School Education (NCF-SE).",
    ],
  },
  {
    year: 2026,
    cat: "Guide",
    theme: "Instructional Leadership",
    title: "The Leader's Toolkit — Post-Observation Coaching Questions",
    author: "Venugopal Bere",
    date: "January 2026",
    volume: "Vol. 1, Issue 1",
    excerpt:
      "Ten coaching questions, a conversation model, and the Bere Coaching Compass for post-observation conferences.",
    pdfUrl:
      "https://zcgjgcncubxujgwtbkqo.supabase.co/storage/v1/object/public/publications/leaders-toolkit.pdf",
    readTo: "/articles/leaders-toolkit",
    citation:
      "Bere, V. (2026). The Leader's Toolkit: Ten Powerful Coaching Questions for Post-Observation Conferences. The Venugopal Bere Educational Review, Vol. 1, Issue 1.",
    references: [
      "Knight, J. (2007). Instructional Coaching: A Partnership Approach to Improving Instruction. Corwin Press.",
    ],
  },
];

const YEARS = ["All", "2026", "2025", "2024", "2023"] as const;

const CATS = [
  "All",
  "Journal Issue",
  "Monograph",
  "Working Paper",
  "Guide",
  "Essay",
  "Report",
] as const;

// Derived from PUBS so new entries automatically appear as a filter option.
const THEMES = ["All", ...Array.from(new Set(PUBS.map((p) => p.theme)))] as const;

function CiteButton({ citation }: { citation: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Clipboard unavailable.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Citation copied" : "Copy citation"}
      className="inline-flex items-center gap-1.5 self-start rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground/80 transition-colors hover:border-primary hover:text-primary"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}

      {copied ? "Copied" : "Cite"}
    </button>
  );
}

function Publications() {
  const [q, setQ] = useState("");
  const [year, setYear] =
    useState<(typeof YEARS)[number]>("All");
  const [cat, setCat] =
    useState<(typeof CATS)[number]>("All");
  const [theme, setTheme] =
    useState<(typeof THEMES)[number]>("All");
  const [openRefs, setOpenRefs] = useState<string | null>(null);

  const items = useMemo(() => {
    const searchTerm = q.trim().toLowerCase();

    return PUBS.filter((p) => {
      const matchesYear =
        year === "All" || String(p.year) === year;

      const matchesCategory =
        cat === "All" || p.cat === cat;

      const matchesTheme =
        theme === "All" || p.theme === theme;

      const matchesSearch =
        searchTerm === "" ||
        p.title.toLowerCase().includes(searchTerm) ||
        p.excerpt.toLowerCase().includes(searchTerm) ||
        p.author.toLowerCase().includes(searchTerm);

      return matchesYear && matchesCategory && matchesTheme && matchesSearch;
    });
  }, [q, year, cat, theme]);

  return (
    <>
      <PageHeader
        eyebrow="Archive"
        title="Publications"
        lead="Issues, monographs, working papers, and guides. Search by keyword or filter by year and category."
      />

      <section className="container-editorial mt-10">
        {/* Search and filters */}
        <div className="grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-[1fr_auto_auto_auto]">
          <label className="flex items-center gap-3 rounded-md border border-border bg-background px-3">
            <span className="sr-only">Search publications</span>

            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search publications…"
              className="w-full bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </label>

          <label>
            <span className="sr-only">Filter by year</span>

            <select
              value={year}
              onChange={(e) =>
                setYear(
                  e.target.value as (typeof YEARS)[number],
                )
              }
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  Year: {y}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Filter by category</span>

            <select
              value={cat}
              onChange={(e) =>
                setCat(
                  e.target.value as (typeof CATS)[number],
                )
              }
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground"
            >
              {CATS.map((c) => (
                <option key={c} value={c}>
                  Category: {c}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Filter by theme</span>

            <select
              value={theme}
              onChange={(e) =>
                setTheme(
                  e.target.value as (typeof THEMES)[number],
                )
              }
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground"
            >
              {THEMES.map((t) => (
                <option key={t} value={t}>
                  Theme: {t}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Publication cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article
              key={p.title}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card red-glow"
            >
              {/* Publication header */}
              <div className="flex aspect-[4/3] items-end justify-between bg-gradient-to-br from-primary/30 to-transparent p-5">
                <span className="rounded-full bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
                  {p.cat}
                </span>

                <span className="font-serif text-xl text-foreground">
                  {p.year}
                </span>
              </div>

              {/* Publication content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-lg leading-snug text-foreground">
                  {p.title}
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  {p.author} · {p.date} · {p.volume}
                </p>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.excerpt}
                </p>

                {/* Actions */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {p.readTo && (
                    <Link
                      to={p.readTo}
                      className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Read Article
                    </Link>
                  )}

                  {p.pdfUrl ? (
                    <a
                      href={`${p.pdfUrl}?download=1`}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 self-start rounded-full border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download PDF
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="inline-flex cursor-not-allowed items-center gap-2 self-start rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Coming soon
                    </span>
                  )}

                  <CiteButton citation={p.citation} />
                </div>

                {/* References */}
                {p.references.length > 0 && (
                  <div className="mt-4 border-t border-border/60 pt-3">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenRefs(
                          openRefs === p.title ? null : p.title,
                        )
                      }
                      aria-expanded={openRefs === p.title}
                      className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span>References</span>

                      <ChevronDown
                        aria-hidden="true"
                        className={`h-3.5 w-3.5 transition-transform ${
                          openRefs === p.title
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {openRefs === p.title && (
                      <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
                        {p.references.map((reference, index) => (
                          <li key={`${p.title}-reference-${index}`}>
                            {reference}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}

          {/* Empty state */}
          {items.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No publications match your filters.
            </div>
          )}
        </div>
      </section>
    </>
  );
}