import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Copy,
  Check,
  Download,
  Linkedin,
  MessageCircle,
  Share2,
} from "lucide-react";
import {
  ARTICLES,
  getArticleBySlug,
  formatCitation,
} from "../data/articles";
import { COPYRIGHT_NOTICE, SITE_NAME, absoluteUrl } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);

    if (!article) {
      throw notFound();
    }

    return article;
  },

  component: ArticlePage,

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {};
    }

    const article = loaderData;

    const base = seo({
      title: `${article.title} — ${SITE_NAME}`,
      ogTitle: article.title,
      description: article.excerpt,
      keywords: `${article.tag}, school leadership, educational leadership, Venugopal Bere, teacher development, NEP 2020`,
      path: `/articles/${article.slug}`,
      type: "article",
    });

    return {
      meta: [...base.meta, { property: "article:author", content: article.author }],
      links: base.links,
    };
  },
});

function CitationBox({
  article,
}: {
  article: (typeof ARTICLES)[number];
}) {
  const [copied, setCopied] = useState(false);
  const citation = formatCitation(article);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(citation);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Clipboard API unavailable.
      // The citation remains visible for manual copying.
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        Recommended Citation
      </div>

      <p className="mt-3 text-sm leading-relaxed text-foreground/85">
        {citation}
      </p>

      <button
        type="button"
        onClick={copy}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}

        {copied ? "Copied" : "Copy citation"}
      </button>
    </div>
  );
}

function ArticlePage() {
  const article = Route.useLoaderData();

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : absoluteUrl(`/articles/${article.slug}`);

  const handleNativeShare = async () => {
    if (!navigator.share) {
      return;
    }

    try {
      await navigator.share({
        title: article.title,
        url: shareUrl,
      });
    } catch {
      // User cancelled the share dialog.
    }
  };

  return (
    <>
      {/* Article Header */}
      <section className="on-ink border-b border-border/50 bg-ink">
        <div className="container-editorial py-12 md:py-16">
          <Link
            to="/current-issue"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Current Issue
          </Link>

          <div className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {article.tag} 
          </div>

          <h1 className="mt-3 max-w-4xl font-serif text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
  {article.title}
</h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>
              By{" "}
              <span className="font-semibold text-foreground">
                {article.author}
              </span>
              {article.authorRole
                ? ` — ${article.authorRole}`
                : ""}
            </span>

            <span aria-hidden="true">•</span>

            <span>{article.date}</span>

            <span aria-hidden="true">•</span>

            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Main Article Layout */}
      <div className="container-editorial grid gap-12 py-12 md:py-16 lg:grid-cols-[1fr_320px]">
        {/* Article Body */}
        <article className="min-w-0 prose-lg space-y-5 text-base leading-relaxed text-foreground/90">
          {/* Excerpt */}
          <p className="font-serif text-xl italic text-muted-foreground">
            {article.excerpt}
          </p>

          {/* Article Content */}
          {article.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {/* References */}
          {article.references &&
            article.references.length > 0 && (
              <div className="mt-10 rounded-xl border border-border bg-card p-6">
                <h3 className="font-serif text-lg text-foreground">
                  References
                </h3>

                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {article.references.map((reference, index) => (
                    <li
                      key={index}
                      className="leading-relaxed"
                    >
                      {reference}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* CTA Row */}
          <div className="mt-10 flex flex-wrap gap-3 not-prose">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              Explore Resources
            </Link>

            <Link
              to="/speaking"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Invite for a Workshop
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground/85 hover:border-primary hover:text-primary"
            >
              Collaborate
            </Link>
          </div>

          {/* Copyright */}
          <p className="border-t border-border/60 pt-5 text-xs text-muted-foreground">
            {COPYRIGHT_NOTICE}
          </p>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {/* Citation */}
          <CitationBox article={article} />

          {/* PDF Download */}
          {article.pdfUrl && (
            <a
              href={article.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          )}

          {/* Share */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Share This Article
            </div>

            <div className="mt-4 flex gap-2">
              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/80 hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${article.title} — ${shareUrl}`
                )}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/80 hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
              </a>

              {/* Native Share */}
              <button
                type="button"
                onClick={handleNativeShare}
                aria-label="Share"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/80 hover:text-primary"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* More Articles */}
          <div className="on-ink rounded-2xl border border-border bg-ink p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <BookOpen className="h-3.5 w-3.5" />
              More in this Issue
            </div>

            <ul className="mt-4 space-y-3 text-sm">
              {ARTICLES.filter(
                (otherArticle) =>
                  otherArticle.slug !== article.slug
              )
                .slice(0, 4)
                .map((otherArticle) => (
                  <li key={otherArticle.slug}>
                    <Link
                      to="/articles/$slug"
                      params={{
                        slug: otherArticle.slug,
                      }}
                      className="text-foreground/85 hover:text-primary"
                    >
                      {otherArticle.shortTitle ??
                        otherArticle.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

