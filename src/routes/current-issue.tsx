import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "../components/site/PageHeader";
import { ArrowRight } from "lucide-react";
import { ARTICLES, getFeaturedArticle } from "../data/articles";

export const Route = createFileRoute("/current-issue")({
  component: CurrentIssue,
  head: () => ({
    meta: [
      { title: "Current Issue — The Venugopal Bere Educational Review" },
      {
        name: "description",
        content:
          "Read the inaugural issue in full: the Editorial, the Foreword, and the Leader's Toolkit — on teacher professional development, instructional leadership, and NEP 2020 in practice.",
      },
      { name: "keywords", content: "current issue, educational review, teacher professional development, NEP 2020, school leadership" },
      { property: "og:title", content: "Current Issue — Volume 1" },
      { property: "og:description", content: "The Editorial, Foreword, and Leader's Toolkit from the inaugural issue of the Review." },
      { property: "og:url", content: "/current-issue" },
    ],
    links: [{ rel: "canonical", href: "/current-issue" }],
  }),
});

const TAGS = ["All", "Journal Issue", "Editorial", "Foreword", "Leader's Toolkit"] as const;

function CurrentIssue() {
  const [tag, setTag] = useState<(typeof TAGS)[number]>("All");
  const shown = tag === "All" ? ARTICLES : ARTICLES.filter((a) => a.tag === tag);
  const featured = getFeaturedArticle();

  return (
    <>
      <PageHeader
        eyebrow="Volume 1 · Inaugural Issue"
        title="Current Issue"
        lead="The Editorial, the Foreword, and the Leader's Toolkit from the inaugural issue — read in full below."
      />
      <div className="container-editorial mt-6 flex flex-wrap gap-3">
        <Link
          to="/articles/$slug"
          params={{ slug: "editorial" }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Read the Editorial
        </Link>

        <Link
          to="/articles/$slug"
          params={{ slug: "foreword" }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Read the Foreword
        </Link>
      </div>

      {/* Featured */}
      <section className="container-editorial mt-12">
        <article className="grid gap-8 overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2">
          <div className="bg-linear-to-br from-primary/40 via-primary/15 to-transparent p-10 md:p-14">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Feature · {featured.tag}
            </div>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground md:text-5xl">
              {featured.shortTitle ?? featured.title}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">By {featured.author}</p>
          </div>
          <div className="p-8 md:p-12">
            <p className="text-base leading-relaxed text-foreground/90">{featured.excerpt}</p>
            <Link
              to="/articles/$slug"
              params={{ slug: featured.slug }}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Read in full <ArrowRight className="h-4 w-4" />
            </Link>
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
          {shown.map((a) => (
            <article
              key={a.slug}
              className="flex h-full flex-col rounded-xl border border-border bg-card p-6 red-glow"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                {a.tag}
              </span>
              <h3 className="mt-3 line-clamp-2 font-serif text-lg leading-snug text-foreground">
                <Link to="/articles/$slug" params={{ slug: a.slug }} className="hover:text-primary">
                  {a.shortTitle ?? a.title}
                </Link>
              </h3>
              <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {a.excerpt}
              </p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>{a.author}</span>
                <Link
                  to="/articles/$slug"
                  params={{ slug: a.slug }}
                  className="font-semibold text-primary hover:underline"
                >
                  Read more →
                </Link>
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
              className="h-[70vh] min-h-125 w-full border-0 md:min-h-175"
              allow="geolocation; microphone; camera"
            />
          </div>
        </div>
      </section>
    </>
  );
}
