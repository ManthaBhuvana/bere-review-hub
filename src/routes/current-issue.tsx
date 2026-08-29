import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "../components/site/PageHeader";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/current-issue")({
  component: CurrentIssue,
  head: () => ({
    meta: [
      { title: "Current Issue — The Venugopal Bere Educational Review" },
      {
        name: "description",
        content:
          "Read the inaugural issue: essays on the Bere Professional Learning Framework, instructional leadership, and NEP 2020 in practice.",
      },
      { property: "og:title", content: "Current Issue — Volume 1" },
      { property: "og:description", content: "Essays from the inaugural issue of the Review." },
      { property: "og:url", content: "/current-issue" },
    ],
    links: [{ rel: "canonical", href: "/current-issue" }],
  }),
});

const TAGS = ["All", "Framework", "Leadership", "Policy", "Assessment", "Teacher Development"] as const;

const ARTICLES = [
  {
    tag: "Framework",
    featured: true,
    title: "The Bere Professional Learning Framework",
    author: "Venugopal Bere",
    excerpt:
      "A practice-informed conceptual framework integrating research, policy, leadership, and classroom practice into a coherent model for continuous school improvement.",
  },
  {
    tag: "Leadership",
    title: "People Before Programmes: A Leader's First Task",
    author: "Editorial",
    excerpt:
      "Why the growth of educators must precede the roll-out of new initiatives — and how principals can create that condition.",
  },
  {
    tag: "Policy",
    title: "NEP 2020 in the Classroom",
    author: "Editorial",
    excerpt: "Translating national policy into daily instructional decisions across subjects and stages.",
  },
  {
    tag: "Assessment",
    title: "From Testing to Learning: Rethinking Assessment",
    author: "Editorial",
    excerpt: "A practical account of assessment for learning aligned with competency-based education.",
  },
  {
    tag: "Teacher Development",
    title: "Professional Learning Communities That Move Practice",
    author: "Editorial",
    excerpt: "What separates high-impact PLCs from routine meetings — five design principles.",
  },
  {
    tag: "Leadership",
    title: "Coaching Coordinators: The Middle Layer That Matters",
    author: "Editorial",
    excerpt: "Investing in academic coordinators as the connective tissue of school improvement.",
  },
];

function CurrentIssue() {
  const [tag, setTag] = useState<(typeof TAGS)[number]>("All");
  const shown = tag === "All" ? ARTICLES : ARTICLES.filter((a) => a.tag === tag);
  const featured = ARTICLES.find((a) => a.featured)!;

  return (
    <>
      <PageHeader
        eyebrow="Volume 1 · Inaugural Issue"
        title="Current Issue"
        lead="Essays and dispatches on the practice of school leadership, teacher learning, and evidence-informed classrooms."
      />
     <div className="container-editorial mt-6 flex flex-wrap gap-3">
  <a
  href="https://zcgjgcncubxujgwtbkqo.supabase.co/storage/v1/object/public/publications/editorial.pdf"
  target="_blank"
  rel="noreferrer"
  className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
>
  Read the Editorial
</a>

<a
  href="https://zcgjgcncubxujgwtbkqo.supabase.co/storage/v1/object/public/publications/foreword.pdf"
  target="_blank"
  rel="noreferrer"
  className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
>
  Read the Foreword
</a>
</div>


      {/* Featured */}
      <section className="container-editorial mt-12">
        <article className="grid gap-8 overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2">
          <div className="bg-linear-to-br from-primary/40 via-primary/15 to-transparent p-10 md:p-14">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Feature · {featured.tag}
            </div>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground md:text-5xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">By {featured.author}</p>
          </div>
          <div className="p-8 md:p-12">
            <p className="text-base leading-relaxed text-foreground/90">{featured.excerpt}</p>
              <a href="https://zcgjgcncubxujgwtbkqo.supabase.co/storage/v1/object/public/publications/leaders-toolkit.pdf"
  target="_blank"
  rel="noreferrer"
  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
>
  Read the essay <ArrowRight className="h-4 w-4" />
</a>
          </div>
        </article>
      </section>

      {/* Filters */}
      <section className="container-editorial mt-16">
        <div className="flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                tag === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground/80 hover:border-primary hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((a, i) => (
            <article
              key={i}
              className="flex flex-col rounded-xl border border-border bg-card p-6 red-glow"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                {a.tag}
              </span>
              <h3 className="mt-3 font-serif text-xl leading-snug text-foreground">{a.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {a.excerpt}
              </p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>{a.author}</span>
                <a href="/pdfs/volume-1.pdf" target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">
                  Read more →
              </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Submit an article */}
      <section className="container-editorial mt-20">
        <div className="rounded-2xl border border-border bg-ink p-8 md:p-12">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Submit an Article
          </div>
          <h3 className="mt-2 font-serif text-2xl md:text-3xl">
            Contribute to the next issue
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            We welcome essays from practitioners and researchers. Fill out the form below to
            submit your manuscript for review.
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border border-border/60 bg-background">
            <iframe
              id="jotform-submit-article"
              title="Submit an Article"
              src="https://form.jotform.com/262354920466056"
              className="min-h-175 w-full border-0"
              allow="geolocation; microphone; camera"
            />
          </div>
        </div>
      </section>
    </>
  );
}
