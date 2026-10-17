import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Compass,
  Download,
  Eye,
  FileText,
  Lightbulb,
} from "lucide-react";
import { ArticleBody } from "./ArticleBody";
import { ShareButtons } from "./ShareButtons";
import { SubscribeForm } from "./SubscribeForm";
import {
  downloadUrl,
  formatPublishDate,
  readingMinutes,
  type InsightArticle,
  type RelatedLink,
} from "@/lib/articles-db";
import { trackArticleToResource, trackArticleView, trackResourceDownload } from "@/lib/analytics";
import { COPYRIGHT_NOTICE, absoluteUrl } from "@/lib/site";

type Neighbour = { slug: string; title: string } | null;

const KIND_LABEL: Record<RelatedLink["kind"], string> = {
  publication: "Related Publication",
  framework: "Related Framework",
  resource: "Related Resource",
  article: "Related Article",
  other: "Further Reading",
};
const KIND_ICON = {
  publication: BookOpen,
  framework: Compass,
  resource: FileText,
  article: BookOpen,
  other: BookOpen,
};

function RelatedLinkItem({ link, articleSlug }: { link: RelatedLink; articleSlug: string }) {
  const Icon = KIND_ICON[link.kind] ?? BookOpen;
  const inner = (
    <>
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      <span className="min-w-0">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {KIND_LABEL[link.kind] ?? "Related"}
        </span>
        <span className="mt-1 block font-serif text-base leading-snug text-foreground group-hover:text-primary">
          {link.label}
        </span>
      </span>
      <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
    </>
  );
  const cls =
    "group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary";
  const onClick = () => trackArticleToResource({ articleSlug, target: link.url, kind: link.kind });
  return link.url.startsWith("/") ? (
    <Link to={link.url as never} className={cls} onClick={onClick}>
      {inner}
    </Link>
  ) : (
    <a href={link.url} target="_blank" rel="noreferrer" className={cls} onClick={onClick}>
      {inner}
    </a>
  );
}

export function InsightArticlePage({
  article,
  preview,
  previous,
  next,
}: {
  article: InsightArticle;
  preview: boolean;
  previous: Neighbour;
  next: Neighbour;
}) {
  const url = absoluteUrl(`/articles/${article.slug}`);
  const minutes = readingMinutes(article);
  const resource = article.resource ?? null;
  const related = article.related_links ?? [];

  useEffect(() => {
    if (!preview)
      trackArticleView({
        slug: article.slug,
        title: article.title,
        category: article.category,
        series: article.series,
      });
  }, [article.slug, article.title, article.category, article.series, preview]);

  const isLive = article.status === "approved" && new Date(article.publish_at) <= new Date();

  return (
    <>
      {preview && (
        <div className="sticky top-16 z-30 border-b border-amber-300 bg-amber-50 text-amber-950 lg:top-20">
          <div className="container-editorial flex flex-wrap items-center gap-x-3 gap-y-1 py-2 text-xs">
            <Eye className="h-4 w-4" />
            <strong>Editorial preview — not public.</strong>
            <span>
              Status: <b>{article.status.replace("_", " ")}</b> · Scheduled for{" "}
              {formatPublishDate(article.publish_at, true)}, 6:00 am IST
              {isLive ? " (already live)" : ""}
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="on-ink border-b border-border/50 bg-ink">
        <div className="container-editorial py-12 md:py-16">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Articles &amp; Insights
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {article.series && <span>{article.series}</span>}
            {article.series && <span aria-hidden="true">·</span>}
            <span>{article.category}</span>
          </div>

          <h1 className="mt-4 max-w-4xl font-serif text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="mt-4 max-w-3xl font-serif text-lg italic leading-relaxed text-muted-foreground md:text-2xl">
              {article.subtitle}
            </p>
          )}

          <div className="mt-8 flex items-center gap-4">
            <img
              src="/author.jpg"
              alt=""
              className="h-12 w-12 rounded-full border-2 border-primary object-cover"
            />
            <div className="text-sm leading-relaxed">
              <div>
                <span className="font-semibold text-foreground">{article.author}</span>
                <span className="text-muted-foreground"> – {article.author_role}</span>
              </div>
              <div className="text-muted-foreground">
                <time dateTime={article.publish_at}>
                  {formatPublishDate(article.publish_at, true)}
                </time>
                <span aria-hidden="true"> · </span>
                {minutes} min read
              </div>
            </div>
          </div>
        </div>
      </header>

      {article.featured_image_url && (
        <div className="container-editorial -mb-4 mt-8 md:mt-10">
          <figure className="overflow-hidden rounded-2xl border border-border">
            <img
              src={article.featured_image_url}
              alt={article.featured_image_alt ?? ""}
              className="aspect-[1200/630] w-full object-cover"
              fetchPriority="high"
            />
          </figure>
        </div>
      )}

      <div className="container-editorial grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0 max-w-[70ch]">
          <ArticleBody article={article} />

          {/* Reflective question */}
          {article.reflective_question && (
            <section className="mt-12 rounded-2xl border-l-4 border-primary bg-ink p-6 text-white md:p-8">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                <Lightbulb className="h-4 w-4" /> Pause &amp; Reflect
              </div>
              <p className="mt-3 font-serif text-xl leading-relaxed md:text-2xl">
                {article.reflective_question}
              </p>
            </section>
          )}

          {/* References */}
          {article.reference_list.length > 0 && (
            <section className="mt-12 border-t border-border pt-8" aria-labelledby="references">
              <h2 id="references" className="font-serif text-2xl text-foreground">
                References
              </h2>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/80">
                {article.reference_list.map((r, i) => (
                  <li key={i} className="pl-8 -indent-8">
                    {r}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-12" aria-label="Related publications and frameworks">
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((l) => (
                  <RelatedLinkItem key={l.url} link={l} articleSlug={article.slug} />
                ))}
              </div>
            </section>
          )}

          {/* Share (also in the sidebar on desktop) */}
          <section className="mt-12 rounded-2xl border border-border bg-card p-5 lg:hidden">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Share this article
            </div>
            <div className="mt-3">
              <ShareButtons url={url} title={article.title} slug={article.slug} />
            </div>
          </section>

          {/* Previous / Next */}
          {(previous || next) && (
            <nav
              aria-label="More articles"
              className="mt-12 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  to="/articles/$slug"
                  params={{ slug: previous.slug }}
                  className="group rounded-xl border border-border p-4 hover:border-primary"
                >
                  <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    <ArrowLeft className="h-3.5 w-3.5" /> Previous Article
                  </span>
                  <span className="mt-1 block font-serif text-base text-foreground group-hover:text-primary">
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  to="/articles/$slug"
                  params={{ slug: next.slug }}
                  className="group rounded-xl border border-border p-4 text-right hover:border-primary"
                >
                  <span className="flex items-center justify-end gap-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Next Article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="mt-1 block font-serif text-base text-foreground group-hover:text-primary">
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          )}

          <div className="mt-8">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Back to all Articles &amp; Insights
            </Link>
          </div>

          <section className="mt-12 rounded-2xl border border-primary/30 bg-card p-6 text-center">
            <h2 className="font-serif text-xl text-foreground">A new article every Monday</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Subscribe to receive each article and resource as it is published.
            </p>
            <SubscribeForm className="mx-auto mt-4 max-w-md" location="article_footer" />
          </section>

          <p className="mt-10 border-t border-border/60 pt-5 text-xs text-muted-foreground">
            {COPYRIGHT_NOTICE}
          </p>
        </article>

        {/* Sidebar */}
        <aside className="hidden space-y-6 lg:sticky lg:top-24 lg:block lg:self-start">
          {resource && (
            <div className="rounded-2xl border-2 border-primary bg-accent/60 p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/70">
                Practical Resource
              </div>
              <p className="mt-2 font-serif text-base leading-snug text-foreground">
                {resource.title}
              </p>
              {resource.subtitle && (
                <p className="mt-1 text-xs text-foreground/70">{resource.subtitle}</p>
              )}
              <a
                href={downloadUrl(resource)}
                onClick={() =>
                  trackResourceDownload({
                    resourceSlug: resource.slug,
                    resourceTitle: resource.title,
                    fileName: resource.file_name,
                    articleSlug: article.slug,
                    placement: "article_sidebar",
                  })
                }
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 text-xs font-bold uppercase tracking-wider text-white hover:opacity-90"
              >
                <Download className="h-4 w-4 text-primary" /> Download Checklist (PDF)
              </a>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Share this article
            </div>
            <div className="mt-4">
              <ShareButtons url={url} title={article.title} slug={article.slug} />
            </div>
          </div>

          <div className="on-ink rounded-2xl border border-border bg-ink p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              About the author
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">{article.author}</span> is the Founder
              &amp; Editor of The Venugopal Bere Educational Review.
            </p>
            <Link
              to="/about"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              Full profile <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
