import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, FileText } from "lucide-react";
import { downloadUrl, type Resource } from "@/lib/articles-db";
import { trackResourceDownload } from "@/lib/analytics";

type Item = Resource & { article_slug?: string; article_title?: string };

export function DownloadableResources({ resources }: { resources: Item[] }) {
  if (resources.length === 0) return null;
  return (
    <section id="downloads" className="container-editorial mt-12 scroll-mt-24">
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Downloadable Resources
        </div>
        <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
          Tools to take into your school
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Practical, printable tools that accompany each article — free to download and use with
          your teams.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((r) => (
          <article
            key={r.id}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 red-glow"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ink text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  {r.categories.join(" / ") || "Resource"} · PDF
                </div>
                <h3 className="mt-1 font-serif text-xl leading-snug text-foreground">{r.title}</h3>
                {r.subtitle && (
                  <p className="mt-1 text-sm font-medium text-foreground/80">{r.subtitle}</p>
                )}
              </div>
            </div>
            {r.description && (
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {r.description}
              </p>
            )}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={downloadUrl(r)}
                onClick={() =>
                  trackResourceDownload({
                    resourceSlug: r.slug,
                    resourceTitle: r.title,
                    fileName: r.file_name,
                    articleSlug: r.article_slug,
                    placement: "resources_page",
                  })
                }
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:opacity-90"
              >
                <Download className="h-4 w-4" /> Download (PDF)
              </a>
              {r.article_slug && (
                <Link
                  to="/articles/$slug"
                  params={{ slug: r.article_slug }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  Read the accompanying article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
