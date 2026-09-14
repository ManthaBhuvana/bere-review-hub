import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Download,
  FileText,
  Search,
  Target,
  Users,
} from "lucide-react";
import { SubscribeForm } from "../components/site/SubscribeForm";
import { ARTICLES, getFeaturedArticle } from "../data/articles";

export const Route = createFileRoute("/")({
  component: Home,

  head: () => ({
    meta: [
      {
        title: "The Venugopal Bere Educational Review — Research. Policy. Leadership. Practice.",
      },
      {
        name: "description",
        content:
          "An independent educational review connecting research, policy, leadership and classroom practice — by Venugopal Bere. Read Volume 1, Issue 1 now.",
      },
      {
        name: "keywords",
        content:
          "Venugopal Bere, Teacher Professional Development, Educational Leadership, Teacher Education, Professional Learning, Instructional Leadership, NEP 2020, NCF-SE 2023, Competency-Based Education, School Improvement",
      },
      {
        property: "og:title",
        content: "The Venugopal Bere Educational Review",
      },
      {
        property: "og:description",
        content:
          "An independent educational review connecting research, policy, leadership and classroom practice.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const featured = getFeaturedArticle();
  const latest = ARTICLES.filter((a) => a.slug !== featured.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="on-ink border-b border-border/50 bg-ink">
        <div className="container-editorial grid gap-10 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
              Volume 1, Issue 1 · Inaugural Issue
            </div>

            <h1 className="font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
              The Venugopal Bere{" "}
              <span className="italic text-primary">Educational Review</span>
            </h1>

            <p className="mt-6 max-w-2xl font-serif text-xl italic text-muted-foreground md:text-2xl">
              Research. Policy. Leadership. Practice.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/85 md:text-lg">
              An independent educational review connecting research, policy, leadership and
              classroom practice — for principals, teachers, teacher educators, and policy
              leaders who take student learning seriously.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/current-issue"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-crimson-glow hover:shadow-[0_10px_40px_-10px_var(--crimson)]"
              >
                Read Online
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {featured.pdfUrl && (
                <a
                  href={featured.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground/90 red-glow"
                >
                  <Download className="h-4 w-4" />
                  Download Full Issue
                </a>
              )}
            </div>
          </div>

          {/* Cover */}
          <div className="mx-auto w-full max-w-xs lg:max-w-sm">
            <Link
              to="/current-issue"
              className="block overflow-hidden rounded-2xl border border-primary/30 shadow-2xl transition-transform hover:-translate-y-1"
            >
              <img
                src="/images/pdfs/volume-1-cover.jpg"
                alt="Cover of Volume 1, Issue 1 of The Venugopal Bere Educational Review"
                className="w-full object-cover"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Principal Feature — Volume 1, Issue 1 */}
      <section className="container-editorial mt-16">
        <div className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Principal Feature
        </div>

        <article className="grid gap-0 overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2">
          <div className="bg-linear-to-br from-primary/40 via-primary/15 to-transparent p-10 md:p-14">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {featured.volume}
            </div>

            <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground md:text-5xl">
              {featured.shortTitle ?? featured.title}
            </h2>

            <p className="mt-4 text-sm text-muted-foreground">By {featured.author}</p>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="text-base leading-relaxed text-foreground/90">{featured.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/articles/$slug"
                params={{ slug: featured.slug }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Read in full
                <ArrowRight className="h-4 w-4" />
              </Link>

              {featured.pdfUrl && (
                <a
                  href={featured.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              )}
            </div>
          </div>
        </article>
      </section>

      {/* Three Pillars */}
      <section className="container-editorial mt-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Search, title: "Evidence-Informed", description: "Research shapes practice" },
            { icon: Users, title: "People First", description: "Develop before deploy" },
            { icon: Target, title: "Student Learning", description: "The measure of success" },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5 red-glow">
              <Icon className="h-5 w-5 text-primary" />
              <div className="mt-3 text-sm font-semibold text-foreground">{title}</div>
              <div className="text-xs text-muted-foreground">{description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore the Review */}
      <section className="container-editorial mt-16">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Explore
          </div>
          <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
            Research → Publications → Frameworks → Resources
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: BookOpen,
              title: "About the Author",
              desc: "Educational leader, teacher educator, CBSE Resource Person, and practitioner-scholar.",
              to: "/about",
            },
            {
              icon: FileText,
              title: "Publications",
              desc: "Issues, guides, and working papers — organised by volume, issue, year, and theme.",
              to: "/publications",
            },
            {
              icon: Compass,
              title: "Frameworks",
              desc: "Practice-informed conceptual frameworks and tools for school leadership.",
              to: "/frameworks",
            },
            {
              icon: Users,
              title: "Resources",
              desc: "A growing professional library for school leaders, teachers, and teacher educators.",
              to: "/resources",
            },
          ].map(({ icon: Icon, title, desc, to }) => (
            <Link
              key={title}
              to={to}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 red-glow transition-colors hover:border-primary/50"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif text-lg text-foreground">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                Explore
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest from the Review */}
      {latest.length > 0 && (
        <section className="container-editorial mt-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Volume 1, Issue 1
              </div>
              <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
                More from the Current Issue
              </h2>
            </div>

            <Link
              to="/current-issue"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              View full issue
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {latest.map((article) => (
              <article
                key={article.slug}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-6 red-glow"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  {article.tag}
                </span>
                <h3 className="mt-3 line-clamp-2 font-serif text-lg leading-snug text-foreground">
                  <Link to="/articles/$slug" params={{ slug: article.slug }} className="hover:text-primary">
                    {article.shortTitle ?? article.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>
                <Link
                  to="/articles/$slug"
                  params={{ slug: article.slug }}
                  className="mt-4 text-xs font-semibold text-primary hover:underline"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* About teaser */}
      <section className="container-editorial mt-16">
        <div className="on-ink grid gap-8 rounded-2xl border border-border bg-ink p-8 md:grid-cols-[220px_1fr] md:items-center md:p-12">
          <div className="mx-auto aspect-3/4 w-40 overflow-hidden rounded-xl border border-border md:w-full">
            <img src="/author.jpg" alt="Venugopal Bere" className="h-full w-full object-cover" />
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              About the Founder &amp; Editor
            </div>
            <h2 className="mt-3 font-serif text-2xl text-foreground md:text-3xl">
              Venugopal Bere — Educational Leader | Teacher Educator | CBSE Resource Person |
              Practitioner-Scholar
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              30+ years bridging educational research with school leadership and classroom
              practice — as Academic Director, CBSE Resource Person, and teacher educator.
            </p>
            <Link
              to="/about"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Read the full profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="container-editorial mb-20 mt-16">
        <div className="rounded-2xl border border-primary/30 bg-card p-8 text-center md:p-12">
          <h2 className="font-serif text-2xl text-foreground md:text-3xl">
            Get new issues, essays, and frameworks in your inbox
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            No spam — just new publications and frameworks as they are released.
          </p>
          <SubscribeForm className="mx-auto mt-6 max-w-md" />
        </div>
      </section>
    </>
  );
}
