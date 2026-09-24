import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";
import { Search, Target, Users, Download } from "lucide-react";
import { SITE_NAME } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/frameworks")({
  component: Frameworks,

  head: () =>
    seo({
      title: `Educational Frameworks — ${SITE_NAME}`,
      ogTitle: "Educational Frameworks — The Bere Professional Learning Framework",
      description:
        "The Bere Professional Learning Framework, a Practice-Informed Conceptual Framework, and its alignment with NEP 2020 and NCF-SE 2023 — with downloadable leadership tools.",
      keywords:
        "educational framework, Bere Professional Learning Framework, Practice-Informed Conceptual Framework, NEP 2020, NCF-SE 2023, school leadership",
      path: "/frameworks",
    }),
});

/* Framework page links — only frameworks with a dedicated page go here.
   The rest show "View Framework" as a full-size image preview instead
   (their dedicated pages are planned for Phase 2). */
const FRAMEWORK_LINKS: Record<string, string> = {
  "The Bere Professional Learning Framework":
    "/frameworks/professional-learning-framework",
};

/* Framework posters */
const POSTERS = [
  {
    title: "The Bere Leadership Maturity Matrix",
    desc: "A self-assessment dashboard for principals and academic directors to evaluate leadership practice across five levels — from Administrator to Transformational Leader.",
    img: "/images/framework/leadership-maturity-matrix.webp",
  },
  {
    title: "The Bere Reflective Practice Cycle",
    desc: "A seven-step continuous pathway — teach, observe, reflect, receive feedback, collaborate, refine, and teach again — for sustained teacher growth.",
    img: "/images/framework/reflective-practice-cycle.webp",
  },
  {
    title: "Traditional Practice vs. NEP/NCF-Aligned Practice",
    desc: "A dimension-by-dimension comparison across purpose, teacher role, assessment, and classroom environment — showing what shifts under NEP 2020 and NCF-SE 2023.",
    img: "/images/framework/traditional-vs-nep-practice.webp",
  },
  {
    title: "The Bere Policy-to-Practice Bridge",
    desc: "A seven-step cycle connecting national educational vision to classroom reality — from NEP 2020 and NCF-SE 2023 through shared school vision, teacher learning, and continuous improvement.",
    img: "/images/framework/bere-policy-practice-bridge.webp",
  },
  {
    title: "School Readiness Self-Assessment",
    desc: "A leadership audit across five domains — vision, teacher learning, teaching quality, assessment, and school culture — to evaluate readiness for NEP/NCF implementation.",
    img: "/images/framework/school-readiness-self-assessment.webp",
  },
  {
    title: "The Bere 90-Day School Improvement Action Planner",
    desc: "A three-phase, milestone-tracked planner — Foundation, Capacity Building, and Sustainability — turning professional learning into measurable school improvement.",
    img: "/images/framework/bere-90-day-planner.webp",
  },
];

function Frameworks() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        eyebrow="Practice-Informed Conceptual Frameworks / Tools"
        title="Frameworks"
        lead="Original models developed from research and school-leadership practice — for professional learning, policy alignment, reflection, and leadership growth."
      />

      {/* Featured Framework */}
      <section className="container-editorial mt-12">
        <div className="on-ink overflow-hidden rounded-2xl border border-primary/30 bg-ink">
          <div className="grid gap-0 md:grid-cols-2">
            {/* Framework Introduction */}
            <div className="p-8 md:p-12">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Featured Framework
              </div>

              <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground md:text-5xl">
                The Bere Professional Learning Framework
              </h2>

              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                A Practice-Informed Conceptual Framework integrating educational
                research, national policy, instructional leadership, and
                classroom practice into a coherent path for continuous school
                improvement.
              </p>

              {/* Three Principles */}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    icon: Search,
                    title: "Evidence-Informed",
                    description: "Research shapes practice",
                  },
                  {
                    icon: Users,
                    title: "People First",
                    description: "Develop before deploy",
                  },
                  {
                    icon: Target,
                    title: "Student Learning",
                    description: "The measure of success",
                  },
                ].map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="rounded-lg border border-border bg-background p-4"
                  >
                    <Icon className="h-5 w-5 text-primary" />

                    <div className="mt-3 text-sm font-semibold text-foreground">
                      {title}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      {description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Framework Diagram */}
            <div className="border-t border-border p-8 md:border-l md:border-t-0 md:p-12">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Framework Diagram
              </div>

              <div className="mt-6 grid aspect-square place-items-center rounded-2xl border border-border bg-background">
                <svg
  viewBox="0 0 320 340"
  className="h-full w-full p-8"
  role="img"
  aria-label="Bere Professional Learning Framework showing Research, Policy, Leadership and Practice converging on Student Learning"
>
  <defs>
    <radialGradient
      id="framework-gradient"
      cx="50%"
      cy="50%"
      r="50%"
    >
      <stop
        offset="0"
        stopColor="oklch(0.52 0.19 25 / 0.35)"
      />
      <stop offset="1" stopColor="transparent" />
    </radialGradient>
  </defs>

  {/* Background Glow */}
  <circle
    cx="160"
    cy="175"
    r="150"
    fill="url(#framework-gradient)"
  />

  {/* Framework Pillars */}
  {[
    {
      x: 160,
      y: 50,
      label: "Research",
    },
    {
      x: 280,
      y: 220,
      label: "Policy",
    },
    {
      x: 40,
      y: 220,
      label: "Leadership",
    },
    {
      x: 160,
      y: 300,
      label: "Practice",
    },
  ].map((node) => (
    <g key={node.label}>
      <line
        x1="160"
        y1="175"
        x2={node.x}
        y2={node.y}
        stroke="oklch(0.78 0.14 85)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />

      <circle
        cx={node.x}
        cy={node.y}
        r="34"
        fill="oklch(0.20 0.07 255)"
        stroke="oklch(0.78 0.14 85)"
        strokeWidth="1.5"
      />

      <text
        x={node.x}
        y={node.y + 4}
        textAnchor="middle"
        fontSize="11"
        fill="oklch(0.94 0.005 90)"
        fontFamily="Inter, sans-serif"
      >
        {node.label}
      </text>
    </g>
  ))}

  {/* Central Student Learning Circle */}
  <circle
    cx="160"
    cy="175"
    r="46"
    fill="oklch(0.78 0.14 85)"
  />

  <text
    x="160"
    y="171"
    textAnchor="middle"
    fontSize="10"
    fontWeight="700"
    fill="oklch(0.18 0.05 255)"
    fontFamily="Inter, sans-serif"
  >
    STUDENT
  </text>

  <text
    x="160"
    y="185"
    textAnchor="middle"
    fontSize="10"
    fontWeight="700"
    fill="oklch(0.18 0.05 255)"
    fontFamily="Inter, sans-serif"
  >
    LEARNING
  </text>
</svg>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                The four pillars — research, policy, leadership, and practice —
                converge on student learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alignment with National Frameworks */}
      <section className="container-editorial mt-16">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Alignment
          </div>

          <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
            Working with national frameworks
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "NEP 2020",
              sub: "National Education Policy",
              body: "The framework aligns with NEP 2020's emphasis on competency-based education, continuous professional development, and holistic school improvement.",
              points: [
                "Competency-Based Education",
                "Teacher Development",
                "Assessment Reform",
              ],
            },
            {
              title: "NCF-SE 2023",
              sub: "National Curriculum Framework — School Education",
              body: "The framework translates NCF-SE 2023's learning standards into instructional practice through leadership routines and PLCs.",
              points: [
                "Learning Standards",
                "Pedagogical Practices",
                "School Culture",
              ],
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border bg-card p-8 red-glow"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-serif text-2xl text-foreground">
                  {card.title}
                </h3>

                <span className="text-xs uppercase tracking-widest text-primary">
                  {card.sub}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {card.body}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {card.points.map((point) => (
                  <li
                    key={point}
                    className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Framework Toolkit */}
      <section className="container-editorial mt-16 mb-8">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Framework Toolkit
          </div>

          <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
            Self-assessment tools for leaders
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Printable, workshop-ready tools built on the Bere Professional
            Learning Framework.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {POSTERS.map((poster) => {
            const frameworkLink = FRAMEWORK_LINKS[poster.title];

            return (
              <div
                key={poster.title}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 red-glow"
              >
                <h3 className="font-serif text-xl text-foreground">
                  {poster.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {poster.desc}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {frameworkLink ? (
                    <a
                      href={frameworkLink}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      View Framework
                    </a>
                  ) : (
                    <a
                      href={poster.img}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      View Framework
                    </a>
                  )}

                  <a
                    href={poster.img}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Annual Professional Learning Calendar */}
      <section className="container-editorial mb-20">
        <div className="rounded-2xl border border-border bg-card p-6 red-glow">
          <h3 className="font-serif text-xl text-foreground">
            Annual Professional Learning Calendar
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A month-by-month system for professional learning sessions,
            coaching, PLCs, and reflection across the full academic year.
          </p>

          <a
            href="/images/framework/annual-pl-calendar.webp"
            download
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </a>
        </div>
      </section>
    </>
  );
}