import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  formatPublishDate,
  readingMinutes,
  summaryText,
  type ArticleSummary,
} from "@/lib/articles-db";

export function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card red-glow">
      <Link
        to="/articles/$slug"
        params={{ slug: article.slug }}
        className="block aspect-[1200/630] overflow-hidden bg-ink"
      >
        {article.featured_image_url ? (
          <img
            src={article.featured_image_url}
            alt={article.featured_image_alt ?? ""}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center font-serif text-3xl text-primary/70">
            The Bere Review
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          <span>{article.category}</span>
        </div>
        <h3 className="mt-3 font-serif text-xl leading-snug text-foreground">
          <Link to="/articles/$slug" params={{ slug: article.slug }} className="hover:text-primary">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {summaryText(article)}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
          <span className="text-xs text-muted-foreground">
            <time dateTime={article.publish_at}>{formatPublishDate(article.publish_at)}</time> ·{" "}
            {readingMinutes(article)} min read
          </span>
          <Link
            to="/articles/$slug"
            params={{ slug: article.slug }}
            className="inline-flex shrink-0 items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
          >
            Read Article <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
