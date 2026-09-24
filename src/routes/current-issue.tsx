import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "../components/site/PageHeader";
import { ARTICLES, getFeaturedArticle } from "../data/articles";
import { SITE_NAME, SUBMISSION_FORM_URL } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/current-issue")({
  component: CurrentIssue,

  head: () =>
    seo({
      title: `Current Issue — ${SITE_NAME}`,
      ogTitle: "Current Issue — Volume 1, Issue 1",
      description:
        "Read the inaugural issue, Volume 1, Issue 1, in full: the Editorial, the Foreword, and the Leader's Toolkit — on teacher professional development, instructional leadership, and NEP 2020 in practice.",
      keywords:
        "current issue, Volume 1 Issue 1, educational review, teacher professional development, NEP 2020, school leadership",
      path: "/current-issue",
    }),
});

const TAGS = [
  "All",
  "Review Issue",
  "Editorial",
  "Foreword",
  "Leader's Toolkit",
] as const;

function CurrentIssue() {
  const [tag, setTag] = useState<(typeof TAGS)[number]>("All");

  const shown =
    tag === "All" ? ARTICLES : ARTICLES.filter((article) => article.tag === tag);

  const featured = getFeaturedArticle();

  return (
    <>
      {/* Page Header */}
      <PageHeader
        eyebrow="Volume 1, Issue 1 · Inaugural Issue"
        title="Current Issue"
        lead="The Editorial, the Foreword, and the Leader's Toolkit from the inaugural issue — read in full below."
      />

      {/* Table of Contents */}
      <section className="container-editorial mt-8 grid gap-6 rounded-2xl border border-border bg-card p-6 md:grid-cols-[200px_1fr] md:p-8">
        <img
          src="/images/pdfs/volume-1-cover.jpg"
          alt="Volume 1, Issue 1 of The Venugopal Bere Educational Review"
          className="w-full rounded-lg border border-border object-cover"
        />

        <div>
          <h2 className="font-serif text-xl text-foreground">
            Table of Contents
          </h2>

          <ol className="mt-3 space-y-2 list-decimal list-inside font-serif text-lg leading-relaxed text-foreground">
  {ARTICLES.map((article) => (
    <li key={article.slug}>
      <Link
        to="/articles/$slug"
        params={{ slug: article.slug }}
        className="hover:text-primary"
      >
        {article.shortTitle ?? article.title}
      </Link>
    </li>
  ))}
</ol>
        </div>
      </section>

      {/* Quick Article Links */}
      <div className="container-editorial mt-6 flex flex-wrap gap-3">
        <Link
          to="/articles/$slug"
          params={{ slug: "editorial" }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Read the Editorial
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <Link
          to="/articles/$slug"
          params={{ slug: "foreword" }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Read the Foreword
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Featured Article */}
      {featured && (
        <section className="container-editorial mt-12">
          <article className="grid gap-0 overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2">
            <div className="bg-linear-to-br from-primary/40 via-primary/15 to-transparent p-10 md:p-14">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Feature · {featured.tag}
              </div>

              <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground md:text-5xl">
                {featured.shortTitle ?? featured.title}
              </h2>

              <p className="mt-4 text-sm text-muted-foreground">
                By {featured.author}
              </p>
            </div>

            <div className="p-8 md:p-12">
              <p className="text-base leading-relaxed text-foreground/90">
                {featured.excerpt}
              </p>

              <Link
                to="/articles/$slug"
                params={{ slug: featured.slug }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Read in full
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </section>
      )}

      {/* Filters and Articles */}
      <section className="container-editorial mt-16">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter articles by category"
        >
          {TAGS.map((currentTag) => (
            <button
              key={currentTag}
              type="button"
              onClick={() => setTag(currentTag)}
              aria-pressed={tag === currentTag}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                tag === currentTag
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground/80 hover:border-primary hover:text-primary"
              }`}
            >
              {currentTag}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.length > 0 ? (
            shown.map((article) => (
              <article
                key={article.slug}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-6 red-glow"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  {article.tag}
                </span>

                <h3 className="mt-3 line-clamp-2 font-serif text-lg leading-snug text-foreground">
                  <Link
                    to="/articles/$slug"
                    params={{ slug: article.slug }}
                    className="hover:text-primary"
                  >
                    {article.shortTitle ?? article.title}
                  </Link>
                </h3>

                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>

                <div className="mt-5 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                  <span className="line-clamp-1">{article.author}</span>

                  <Link
                    to="/articles/$slug"
                    params={{ slug: article.slug }}
                    className="shrink-0 font-semibold text-primary hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full rounded-xl border border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No articles are available in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Submit an Article */}
      <section id="submit-article" className="container-editorial mt-20 scroll-mt-24">
        <div className="on-ink rounded-2xl border border-border bg-ink p-8 md:p-12">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Submit an Article
          </div>

          <h3 className="mt-2 font-serif text-2xl text-foreground md:text-3xl">
            Contribute to the next issue
          </h3>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            We welcome essays from practitioners and researchers. Please read
            the{" "}
            <Link to="/for-contributors" className="font-semibold text-primary hover:underline">
              submission guidelines and editorial policy
            </Link>{" "}
            before submitting your manuscript for Editorial Review using the form below.
          </p>

          <div className="mt-6 overflow-hidden rounded-lg border border-border/60 bg-background">
            <iframe
              id="jotform-submit-article"
              title="Submit an Article"
              src={SUBMISSION_FORM_URL}
              className="h-[70vh] min-h-125 w-full border-0 md:min-h-175"
              allow="geolocation; microphone; camera"
            />
          </div>
        </div>
      </section>
    </>
  );
}