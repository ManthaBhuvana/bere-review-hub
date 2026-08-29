import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "../components/site/PageHeader";
import { Download, Search } from "lucide-react";

export const Route = createFileRoute("/publications")({
  component: Publications,
  head: () => ({
    meta: [
      { title: "Publications — The Venugopal Bere Educational Review" },
      {
        name: "description",
        content:
          "Archive of past issues and publications on educational leadership, teacher development, and classroom practice.",
      },
      { property: "og:title", content: "Publications Archive" },
      { property: "og:description", content: "Search and browse past issues of the Review." },
      { property: "og:url", content: "/publications" },
    ],
    links: [{ rel: "canonical", href: "/publications" }],
  }),
});

// Replace each pdfUrl with the real public URL of the file once uploaded to
// Supabase Storage (Storage -> publications bucket -> file -> "Get URL"),
// e.g. https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/publications/volume-1.pdf
const PUBS = [
  { year: 2026, cat: "Journal Issue", title: "Volume 1 — Inaugural Issue", excerpt: "The Bere Professional Learning Framework and essays on instructional leadership.", pdfUrl: "https://zcgjgcncubxujgwtbkqo.supabase.co/storage/v1/object/public/publications/volume-1.pdf" },
  { year: 2025, cat: "Monograph", title: "Instructional Leadership for the Indian Classroom", excerpt: "A practitioner monograph on the daily work of academic leaders.", pdfUrl: "https://zcgjgcncubxujgwtbkqo.supabase.co/storage/v1/object/public/publications/leaders-toolkit.pdf" }
];

const YEARS = ["All", "2026", "2025", "2024", "2023"] as const;
const CATS = ["All", "Journal Issue", "Monograph", "Working Paper", "Guide", "Essay", "Report"] as const;

function Publications() {
  const [q, setQ] = useState("");
  const [year, setYear] = useState<(typeof YEARS)[number]>("All");
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");

  const items = useMemo(
    () =>
      PUBS.filter(
        (p) =>
          (year === "All" || String(p.year) === year) &&
          (cat === "All" || p.cat === cat) &&
          (q === "" ||
            p.title.toLowerCase().includes(q.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, year, cat],
  );

  return (
    <>
      <PageHeader
        eyebrow="Archive"
        title="Publications"
        lead="Issues, monographs, working papers, and guides. Search by keyword or filter by year and category."
      />

      <section className="container-editorial mt-10">
        <div className="grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-[1fr_auto_auto]">
          <label className="flex items-center gap-3 rounded-md border border-border bg-background px-3">
            <Search className="h-4 w-4 text-primary" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search publications…"
              className="w-full bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value as (typeof YEARS)[number])}
            className="rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>Year: {y}</option>
            ))}
          </select>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as (typeof CATS)[number])}
            className="rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground"
          >
            {CATS.map((c) => (
              <option key={c} value={c}>Category: {c}</option>
            ))}
          </select>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article key={p.title} className="flex flex-col rounded-xl border border-border bg-card red-glow">
              <div className="flex aspect-4/3 items-end justify-between bg-linear-to-br from-primary/30 to-transparent p-5">
                <span className="rounded-full bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
                  {p.cat}
                </span>
                <span className="font-serif text-xl text-foreground">{p.year}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-lg leading-snug text-foreground">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                {p.pdfUrl ? (
                  <a
  href={`${p.pdfUrl}?download`}
  download
  className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
>
  <Download className="h-3.5 w-3.5" />
  Download PDF
</a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="mt-5 inline-flex cursor-not-allowed items-center gap-2 self-start rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                  >
                    <Download className="h-3.5 w-3.5" /> Coming soon
                  </span>
                )}
              </div>
            </article>
          ))}
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
