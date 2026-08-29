import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Compass, GraduationCap, Play } from "lucide-react";
import { SubscribeForm } from "../components/site/SubscribeForm";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "The Venugopal Bere Educational Review — Research. Policy. Leadership. Practice." },
      {
        name: "description",
        content:
          "An editorial review bridging educational research, policy, leadership, and classroom practice.",
      },
      {
        property: "og:title",
        content: "The Venugopal Bere Educational Review — Research. Policy. Leadership. Practice.",
      },
      {
        property: "og:description",
        content:
          "An editorial review bridging educational research, policy, leadership, and classroom practice.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const FEATURED = [
  {
    tag: "Framework",
    title: "Introducing the Bere Professional Learning Framework",
    excerpt:
      "A practice-informed conceptual model integrating research, policy, leadership, and classroom practice into a coherent path for school improvement.",
    author: "Venugopal Bere",
    read: "12 min read",
  },
  {
    tag: "Instructional Leadership",
    title: "From Programmes to People: Rethinking School Improvement",
    excerpt:
      "Why sustainable change begins with the professional growth of educators — and how leaders can build the conditions for it.",
    author: "Editorial",
    read: "8 min read",
  },
  {
    tag: "Policy",
    title: "NEP 2020 and NCF-SE 2023 in Practice",
    excerpt:
      "Translating national policy vision into competency-based classrooms, coherent assessment, and cultures of continuous learning.",
    author: "Editorial",
    read: "10 min read",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 10%, oklch(0.52 0.19 25) 0px, transparent 40%), radial-gradient(circle at 90% 80%, oklch(0.42 0.15 25) 0px, transparent 45%)",
          }}
          aria-hidden
        />
        <div className="container-editorial relative py-20 md:py-32">
          <div className="max-w-4xl animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
              Inaugural Issue · Volume 1
            </div>
            <h1 className="font-serif text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              The Venugopal Bere{" "}
              <span className="italic text-primary">Educational Review</span>
            </h1>
            <p className="mt-6 max-w-2xl font-serif text-xl italic text-muted-foreground md:text-2xl">
              Research. Policy. Leadership. Practice.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/85 md:text-lg">
              A journal-style platform where evidence-informed practice meets school leadership —
              built for principals, teachers, teacher educators, and policy leaders who take
              student learning seriously.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/current-issue"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-crimson-glow hover:shadow-[0_10px_40px_-10px_var(--crimson)]"
              >
                Read the Current Issue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/frameworks"
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground/90 red-glow"
              >
                Explore the Framework
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-editorial py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Featured
            </div>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">From this issue</h2>
          </div>
          <Link
            to="/current-issue"
            className="hidden text-sm font-semibold text-primary hover:underline sm:inline"
          >
            All articles →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURED.map((a, i) => (
            <article
              key={i}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card red-glow"
            >
              <div className="aspect-16/10 w-full bg-linear-to-br from-primary/25 via-primary/10 to-transparent">
                <div className="flex h-full items-end p-5">
                  <span className="rounded-full bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
                    {a.tag}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-xl leading-snug text-foreground group-hover:text-primary md:text-2xl">
                  {a.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {a.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{a.author}</span>
                  <span>{a.read}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="border-y border-border/50 bg-ink">
        <div className="container-editorial grid gap-12 py-20 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              About the Author
            </div>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              Bridging research with leadership and practice.
            </h2>
          </div>
          <div className="md:col-span-3">
            <p className="text-base leading-relaxed text-foreground/85">
              Venugopal Bere is an educational leader with more than three decades of experience in
              school education, teacher development, academic leadership, and instructional
              improvement — a teacher, principal, academic administrator, and teacher educator
              committed to evidence-informed practice.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { icon: BookOpen, t: "Evidence-informed", d: "Research shaping practice" },
                { icon: Compass, t: "People before programmes", d: "Leadership that develops educators" },
                { icon: GraduationCap, t: "Student learning", d: "The ultimate measure" },
              ].map(({ icon: I, t, d }) => (
                <div
                  key={t}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <I className="h-5 w-5 text-primary" />
                  <div className="mt-3 text-sm font-semibold text-foreground">{t}</div>
                  <div className="text-xs text-muted-foreground">{d}</div>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Read the full profile <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="container-editorial py-20">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Watch
          </div>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">
            Introduction to the Bere Professional Learning Framework
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            A short welcome to the Review and an overview of the framework guiding this
            inaugural issue.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/5_18kZaWoY8?si=RcfCFT-wyPr8jkgl"
              title="Introduction to the Bere Professional Learning Framework"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border/50 bg-ink">
        <div className="container-editorial py-16 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Subscribe
              </div>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">
                New essays, delivered when it matters.
              </h2>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                Join principals, teacher educators, and policy leaders receiving each new issue
                of the Review.
              </p>
            </div>
            <SubscribeForm />
          </div>
        </div>
      </section>
    </>
  );
}
