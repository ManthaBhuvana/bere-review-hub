import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "../components/site/PageHeader";
import { ArticleCard } from "../components/site/ArticleCard";
import { SubscribeForm } from "../components/site/SubscribeForm";
import { listPublishedArticles } from "@/lib/articles-db";
import { ARTICLES } from "../data/articles";
import { SITE_SHORT_NAME } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/articles/")({
  loader: async () => {
    try {
      return { articles: await listPublishedArticles(), failed: false };
    } catch (e) {
      console.error(e);
      return { articles: [], failed: true };
    }
  },
  head: () =>
    seo({
      title: `Articles & Insights | ${SITE_SHORT_NAME}`,
      ogTitle: "Articles & Insights — The Venugopal Bere Educational Review",
      description:
        "Research-informed articles on teacher professional development, instructional leadership, assessment and school improvement, published every Monday by Venugopal Bere.",
      keywords:
        "Teacher Professional Development, Instructional Leadership, Professional Learning, School Improvement, NEP 2020, NCF-SE 2023, Venugopal Bere",
      path: "/articles",
    }),
  component: ArticlesArchive,
});

function ArticlesArchive() {
  const { articles, failed } = Route.useLoaderData();
  const categories = useMemo(
    () => [...new Set(articles.map((a) => a.category))].sort(),
    [articles],
  );
  const [category, setCategory] = useState<string | null>(null);
  const shown = category ? articles.filter((a) => a.category === category) : articles;

  return (
    <>
      <PageHeader
        eyebrow="Articles & Insights"
        title="Research to Classroom Practice"
        lead="A new research-informed article every Monday — on teacher professional development, instructional leadership, assessment and school improvement — with practical tools to take each idea into the classroom."
      />

      <section className="container-editorial py-12 md:py-16">
        {categories.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {[null, ...categories].map((c) => (
              <button
                key={c ?? "all"}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                  category === c
                    ? "border-ink bg-ink text-white"
                    : "border-border text-foreground/80 hover:border-primary hover:text-primary"
                }`}
              >
                {c ?? "All articles"}
              </button>
            ))}
          </div>
        )}

        {shown.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <h2 className="font-serif text-2xl text-foreground">
              {failed
                ? "Articles are temporarily unavailable"
                : "New articles are published every Monday"}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Subscribe to receive each new article as it is published.
            </p>
            <SubscribeForm className="mx-auto mt-6 max-w-md" location="articles_archive" />
          </div>
        )}
      </section>

      {/* The four pieces of Volume 1, Issue 1 */}
      <section className="container-editorial mb-20">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Also from the Review
          </div>
          <h2 className="mt-2 font-serif text-2xl text-foreground">Volume 1, Issue 1 (2026)</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {ARTICLES.map((a) => (
              <li key={a.slug}>
                <Link
                  to="/articles/$slug"
                  params={{ slug: a.slug }}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border/70 px-4 py-3 text-sm text-foreground/90 hover:border-primary hover:text-primary"
                >
                  <span>{a.shortTitle ?? a.title}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
