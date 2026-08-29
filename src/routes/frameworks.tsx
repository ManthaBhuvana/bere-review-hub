import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";
import { Search, Target, Users, Download } from "lucide-react";

export const Route = createFileRoute("/frameworks")({
  component: Frameworks,
  head: () => ({
    meta: [
      { title: "Educational Frameworks — The Venugopal Bere Educational Review" },
      {
        name: "description",
        content:
          "The Bere Professional Learning Framework and its alignment with NEP 2020 and NCF-SE 2023.",
      },
      { property: "og:title", content: "Educational Frameworks" },
      {
        property: "og:description",
        content: "The Bere Professional Learning Framework and related models.",
      },
      { property: "og:url", content: "/frameworks" },
    ],
    links: [{ rel: "canonical", href: "/frameworks" }],
  }),
});

const POSTERS = [
  {
    title: "The Bere Leadership Maturity Matrix",
    desc: "A self-assessment dashboard for principals and academic directors to evaluate leadership practice across five levels — from Administrator to Transformational Leader.",
    img: "/images/framework/leadership-maturity-matrix.png",
  },
  {
    title: "The Bere Reflective Practice Cycle",
    desc: "A seven-step continuous pathway — teach, observe, reflect, receive feedback, collaborate, refine, and teach again — for sustained teacher growth.",
    img: "/images/framework/reflective-practice-cycle.png",
  },
  {
    title: "Traditional Practice vs. NEP/NCF-Aligned Practice",
    desc: "A dimension-by-dimension comparison across purpose, teacher role, assessment, and classroom environment — showing what shifts under NEP 2020 and NCF-SE 2023.",
    img: "/images/framework/traditional-vs-nep-practice.png",
  },
  {
    title: "The Bere Policy-to-Practice Bridge",
    desc: "A seven-step cycle connecting national educational vision to classroom reality — from NEP 2020 and NCF-SE 2023 through shared school vision, teacher learning, and continuous improvement.",
    img: "/images/framework/bere-policy-practice-bridge.png",
  },
  {
    title: "School Readiness Self-Assessment",
    desc: "A leadership audit across five domains — vision, teacher learning, teaching quality, assessment, and school culture — to evaluate readiness for NEP/NCF implementation.",
    img: "/images/framework/school-readiness-self-assessment.png",
  },
  {
    title: "The Bere 90-Day School Improvement Action Planner",
    desc: "A three-phase, milestone-tracked planner — Foundation, Capacity Building, and Sustainability — turning professional learning into measurable school improvement.",
    img: "/images/framework/bere-90-day-planner.png",
  },
];

function Frameworks() {
  return (
    <>
      <PageHeader
        eyebrow="Educational Frameworks"
        title="Models for evidence-informed practice"
        lead="Practical frameworks that translate research, policy, and leadership into classroom-level change."
      />

      {/* Featured framework */}
      <section className="container-editorial mt-12">
        <div className="overflow-hidden rounded-2xl border border-primary/30 bg-ink">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Featured Framework
              </div>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground md:text-5xl">
                The Bere Professional Learning Framework
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">
                A practice-informed conceptual model integrating educational research, national
                policy, instructional leadership, and classroom practice into a coherent path for
                continuous school improvement.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Search, t: "Evidence-Informed", d: "Research shapes practice" },
                  { icon: Users, t: "People First", d: "Develop before deploy" },
                  { icon: Target, t: "Student Learning", d: "The measure of success" },
                ].map(({ icon: I, t, d }) => (
                  <div key={t} className="rounded-lg border border-border bg-background p-4">
                    <I className="h-5 w-5 text-primary" />
                    <div className="mt-3 text-sm font-semibold">{t}</div>
                    <div className="text-xs text-muted-foreground">{d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagram */}
            <div className="border-t border-border p-8 md:border-l md:border-t-0 md:p-12">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Framework Diagram
              </div>
              <div className="mt-6 grid aspect-square place-items-center rounded-2xl border border-border bg-background">
                <svg viewBox="0 0 320 320" className="h-full w-full p-8">
                  <defs>
                    <radialGradient id="fg" cx="50%" cy="50%" r="50%">
                      <stop offset="0" stopColor="oklch(0.52 0.19 25 / 0.35)" />
                      <stop offset="1" stopColor="transparent" />
                    </radialGradient>
                  </defs>
                  <circle cx="160" cy="160" r="140" fill="url(#fg)" />
                  {[
                    { x: 160, y: 40, label: "Research" },
                    { x: 280, y: 200, label: "Policy" },
                    { x: 40, y: 200, label: "Leadership" },
                    { x: 160, y: 290, label: "Practice" },
                  ].map((n) => (
                    <g key={n.label}>
                      <line
                        x1="160"
                        y1="160"
                        x2={n.x}
                        y2={n.y}
                        stroke="oklch(0.52 0.19 25)"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <circle cx={n.x} cy={n.y} r="34" fill="oklch(0.19 0.006 260)" stroke="oklch(0.52 0.19 25)" strokeWidth="1.5" />
                      <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="11" fill="oklch(0.94 0.005 90)" fontFamily="Inter">
                        {n.label}
                      </text>
                    </g>
                  ))}
                  <circle cx="160" cy="160" r="46" fill="oklch(0.52 0.19 25)" />
                  <text x="160" y="156" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" fontFamily="Inter">
                    STUDENT
                  </text>
                  <text x="160" y="170" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" fontFamily="Inter">
                    LEARNING
                  </text>
                </svg>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                The four pillars — research, policy, leadership, and practice — converge on student learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison cards */}
      <section className="container-editorial mt-16">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Alignment
          </div>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">Working with national frameworks</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "NEP 2020",
              sub: "National Education Policy",
              body:
                "The framework aligns with NEP 2020's emphasis on competency-based education, continuous professional development, and holistic school improvement.",
              points: ["Competency-Based Education", "Teacher Development", "Assessment Reform"],
            },
            {
              title: "NCF-SE 2023",
              sub: "National Curriculum Framework — School Education",
              body:
                "The framework translates NCF-SE 2023's learning standards into instructional practice through leadership routines and PLCs.",
              points: ["Learning Standards", "Pedagogical Practices", "School Culture"],
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-8 red-glow">
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-2xl">{c.title}</h3>
                <span className="text-xs uppercase tracking-widest text-primary">{c.sub}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {c.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Framework toolkit posters */}
      <section className="container-editorial mt-16 mb-8">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Framework Toolkit
          </div>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">Self-assessment tools for leaders</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Printable, workshop-ready tools built on the Bere Professional Learning Framework.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
  {POSTERS.map((p) => (
    <div key={p.title} className="flex flex-col rounded-2xl border border-border bg-card p-6 red-glow">
      <h3 className="font-serif text-xl">{p.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
      
        <a href={p.img}
        download
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 self-start rounded-full border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
      >
        <Download className="h-3.5 w-3.5" /> Download
      </a>
    </div>
  ))}
</div>
      </section>

      {/* Annual PL Calendar - full width, landscape image */}
      <section className="container-editorial mb-20">
  <div className="rounded-2xl border border-border bg-card p-6 red-glow">
    <h3 className="font-serif text-xl">Annual Professional Learning Calendar</h3>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
      A month-by-month system for professional learning sessions, coaching, PLCs, and reflection across the full academic year.
    </p>
    
      <a href="/images/framework/annual-pl-calendar.png"
      download
      target="_blank"
      rel="noreferrer"
      className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
    >
      <Download className="h-3.5 w-3.5" /> Download
    </a>
  </div>
</section>
    </>
  );
}