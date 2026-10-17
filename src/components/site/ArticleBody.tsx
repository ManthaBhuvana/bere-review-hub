import { Link } from "@tanstack/react-router";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight, Compass, Download, FileText } from "lucide-react";
import { downloadAttr, downloadUrl, type InsightArticle, type Resource } from "@/lib/articles-db";
import { trackArticleToResource, trackResourceDownload } from "@/lib/analytics";
import { FrameworkCycle } from "./FrameworkCycle";

/** One line of Markdown rendered inline (italics, bold, links) — for references and citations. */
export function InlineMd({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children: c }) => <>{c}</>,
        a: ({ href, children: c }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="break-all text-foreground underline decoration-primary underline-offset-2 hover:text-primary"
          >
            {c}
          </a>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

// The manuscript is stored as Markdown. Two shortcodes may be placed on a line
// of their own, exactly where the Editor wants them to appear:
//   [[FRAMEWORK]]  → the Bere Professional Learning Framework panel
//   [[DOWNLOAD]]   → the "DOWNLOAD CHECKLIST (PDF)" call to action
// If a shortcode isn't used, the website adds that block automatically
// (framework after the body, download after the framework).
const SHORTCODE = /^\s*\[\[(FRAMEWORK|DOWNLOAD)\]\]\s*$/m;

const isInternal = (href?: string) => !!href && href.startsWith("/");

const md: Components = {
  h2: ({ children }) => (
    <h2 className="mt-12 scroll-mt-24 font-serif text-2xl leading-snug text-foreground md:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => <h3 className="mt-8 font-serif text-xl text-foreground">{children}</h3>,
  h4: ({ children }) => (
    <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-foreground">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mt-5 text-[1.0625rem] leading-[1.8] text-foreground/90">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-[1.0625rem] leading-[1.75] text-foreground/90 marker:text-primary">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-[1.0625rem] leading-[1.75] text-foreground/90 marker:font-semibold marker:text-primary">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-primary bg-accent/50 px-6 py-4 font-serif text-xl italic leading-relaxed text-foreground [&_p]:mt-0 [&_p]:text-xl [&_p]:leading-relaxed">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  hr: () => <hr className="my-10 border-border" />,
  a: ({ href, children }) =>
    isInternal(href) ? (
      <Link
        to={href as never}
        className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-primary"
      >
        {children}
      </Link>
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-primary"
      >
        {children}
      </a>
    ),
  img: ({ src, alt }) => (
    <figure className="my-8">
      <img
        src={typeof src === "string" ? src : undefined}
        alt={alt ?? ""}
        loading="lazy"
        className="w-full rounded-xl border border-border"
      />
      {alt && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">{alt}</figcaption>
      )}
    </figure>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="bg-ink px-4 py-3 font-semibold text-white">{children}</th>,
  td: ({ children }) => (
    <td className="border-t border-border px-4 py-3 align-top text-foreground/90">{children}</td>
  ),
};

export function FrameworkPanel({ article }: { article: InsightArticle }) {
  return (
    <section
      aria-labelledby="framework-heading"
      className="on-ink my-12 overflow-hidden rounded-2xl border border-primary/40 bg-ink"
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
        <Compass className="h-5 w-5 text-primary" />
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
            Practice-Informed Conceptual Framework
          </div>
          <h2 id="framework-heading" className="font-serif text-xl text-foreground md:text-2xl">
            The Bere Professional Learning Framework
          </h2>
        </div>
      </div>
      {article.framework_image_url ? (
        <a
          href={article.framework_image_url}
          target="_blank"
          rel="noreferrer"
          className="block bg-white p-3 md:p-5"
        >
          <img
            src={article.framework_image_url}
            alt="The Bere Professional Learning Framework"
            loading="lazy"
            className="mx-auto w-full max-w-3xl"
          />
        </a>
      ) : (
        <FrameworkCycle />
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
        <p className="text-sm text-muted-foreground">
          Explore each stage of the framework in detail.
        </p>
        <Link
          to="/frameworks/professional-learning-framework"
          onClick={() =>
            trackArticleToResource({
              articleSlug: article.slug,
              target: "/frameworks/professional-learning-framework",
              kind: "framework",
            })
          }
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
        >
          View the framework <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

export function DownloadCta({
  resource,
  articleSlug,
  placement = "article_cta",
}: {
  resource: Resource;
  articleSlug?: string;
  placement?: string;
}) {
  const onDownload = () =>
    trackResourceDownload({
      resourceSlug: resource.slug,
      resourceTitle: resource.title,
      fileName: resource.file_name,
      articleSlug,
      placement,
    });

  return (
    <section className="my-12 rounded-2xl border-2 border-primary bg-accent/60 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-primary sm:grid">
          <FileText className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/70">
            Practical Resource
          </div>
          <h2 className="mt-1 font-serif text-xl leading-snug text-foreground md:text-2xl">
            {resource.title}
          </h2>
          {resource.subtitle && (
            <p className="mt-1 text-sm font-medium text-foreground/80">{resource.subtitle}</p>
          )}
          {resource.description && (
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              {resource.description}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={downloadUrl(resource)}
              download={downloadAttr(resource)}
              onClick={onDownload}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold uppercase tracking-wider text-white hover:opacity-90"
            >
              <Download className="h-4 w-4 text-primary" />
              Download Checklist (PDF)
            </a>
            <a
              href={resource.file_url}
              target="_blank"
              rel="noreferrer"
              onClick={onDownload}
              className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-5 py-3 text-sm font-semibold text-foreground hover:border-ink"
            >
              View online
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArticleBody({ article }: { article: InsightArticle }) {
  const parts = article.body_md.split(SHORTCODE); // [text, CODE, text, CODE, …]
  const usedFramework = parts.includes("FRAMEWORK");
  const usedDownload = parts.includes("DOWNLOAD");
  const resource = article.resource ?? null;

  return (
    <div>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          if (part === "FRAMEWORK") return <FrameworkPanel key={i} article={article} />;
          if (part === "DOWNLOAD")
            return resource ? (
              <DownloadCta key={i} resource={resource} articleSlug={article.slug} />
            ) : null;
          return null;
        }
        return (
          <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={md}>
            {part}
          </ReactMarkdown>
        );
      })}
      {!usedFramework &&
        (article.framework_image_url ||
          article.related_links?.some((l) => l.kind === "framework")) && (
          <FrameworkPanel article={article} />
        )}
      {!usedDownload && resource && <DownloadCta resource={resource} articleSlug={article.slug} />}
    </div>
  );
}
