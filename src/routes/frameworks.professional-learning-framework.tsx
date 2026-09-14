// src/routes/frameworks.professional-learning-framework.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Copy, Download } from "lucide-react";
import { PageHeader } from "../components/site/PageHeader";

export const Route = createFileRoute(
  "/frameworks/professional-learning-framework",
)({
  component: ProfessionalLearningFramework,
  head: () => ({
    meta: [
      { title: "The Bere Professional Learning Framework — Frameworks" },
      {
        name: "description",
        content:
          "A practice-informed conceptual framework connecting teacher professional learning with continuous school improvement — Overview, Diagram, Purpose, Application, Research Foundations, and How to Cite.",
      },
      {
        name: "keywords",
        content:
          "Bere Professional Learning Framework, teacher professional development, instructional leadership, NEP 2020, NCF-SE 2023, practice-informed conceptual framework",
      },
      { property: "og:title", content: "The Bere Professional Learning Framework" },
      {
        property: "og:description",
        content:
          "A practice-informed conceptual framework connecting teacher learning with continuous school improvement.",
      },
      { property: "og:url", content: "/frameworks/professional-learning-framework" },
    ],
    links: [
      { rel: "canonical", href: "/frameworks/professional-learning-framework" },
    ],
  }),
});

const CITATION =
  "Bere, V. (2026). The Bere Professional Learning Framework. The Venugopal Bere Educational Review. https://venugopalbere.com/frameworks/professional-learning-framework";

const APPLICATION_STEPS = [
  {
    title: "Assess",
    body: "Begin with a School Readiness Self-Assessment across vision, teacher learning, teaching quality, assessment, and school culture to identify the current starting point.",
  },
  {
    title: "Align",
    body: "Connect the school's professional learning priorities to NEP 2020 and NCF-SE 2023 using the Bere Policy-to-Practice Bridge, so PD choices are grounded in the national vision, not just local habit.",
  },
  {
    title: "Build",
    body: "Design a structured cycle of observation, coaching conversations (using tools like The Leader's Toolkit), and Professional Learning Communities that give teachers regular, low-stakes opportunities to learn together.",
  },
  {
    title: "Reflect",
    body: "Use the Bere Reflective Practice Cycle — teach, observe, reflect, receive feedback, collaborate, refine, teach again — so learning compounds rather than resetting after every workshop.",
  },
  {
    title: "Sustain",
    body: "Track progress with the Professional Learning Dashboard and the Bere 90-Day School Improvement Action Planner, turning good intentions into a measurable, time-bound plan.",
  },
];

function CiteButton() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(CITATION);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard unavailable — citation remains visible for manual copying.
        }
      }}
      className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground/80 hover:border-primary hover:text-primary"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy citation"}
    </button>
  );
}

function ProfessionalLearningFramework() {
  return (
    <>
      <PageHeader
        eyebrow="Practice-Informed Conceptual Framework"
        title="The Bere Professional Learning Framework"
        lead="A model connecting teacher learning with continuous school improvement — integrating research, policy, leadership, and classroom practice."
      >
        <Link
          to="/frameworks"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Frameworks
        </Link>
      </PageHeader>

      <section className="container-editorial mt-12 space-y-14">
        {/* Overview */}
        <div id="overview" className="scroll-mt-24">
          <h2 className="font-serif text-2xl text-foreground">Overview</h2>
          <div className="mt-3 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              The Bere Professional Learning Framework is a practice-informed conceptual model
              that treats teacher professional development not as an isolated training event, but
              as a continuous cycle connecting educational research, national policy, instructional
              leadership, and everyday classroom practice.
            </p>
            <p>
              At its centre sits student learning — the measure against which every professional
              learning decision is ultimately judged. Around that centre, four pillars —
              Research, Policy, Leadership, and Practice — work together rather than in isolation:
              research shapes what is worth trying, policy (NEP 2020 and NCF-SE 2023) sets the
              national direction, leadership creates the conditions for teachers to grow, and
              classroom practice is where all of it is tested against real learners.
            </p>
          </div>
        </div>

        {/* Diagram */}
        <div id="diagram" className="scroll-mt-24">
          <h2 className="font-serif text-2xl text-foreground">Diagram</h2>
          <div className="mt-4 max-w-3xl overflow-hidden rounded-2xl border border-border bg-card p-8">
            <svg
              viewBox="0 0 320 320"
              className="mx-auto h-full w-full max-w-md"
              role="img"
              aria-label="The Bere Professional Learning Framework showing Research, Policy, Leadership and Practice converging on Student Learning"
            >
              <defs>
                <radialGradient id="plf-gradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="oklch(0.52 0.19 25 / 0.35)" />
                  <stop offset="1" stopColor="transparent" />
                </radialGradient>
              </defs>
              <circle cx="160" cy="160" r="140" fill="url(#plf-gradient)" />
              {[
                { x: 160, y: 40, label: "Research" },
                { x: 280, y: 200, label: "Policy" },
                { x: 40, y: 200, label: "Leadership" },
                { x: 160, y: 290, label: "Practice" },
              ].map((node) => (
                <g key={node.label}>
                  <line
                    x1="160"
                    y1="160"
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
              <circle cx="160" cy="160" r="46" fill="oklch(0.78 0.14 85)" />
              <text
                x="160"
                y="156"
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
                y="170"
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="oklch(0.18 0.05 255)"
                fontFamily="Inter, sans-serif"
              >
                LEARNING
              </text>
            </svg>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              The four pillars — research, policy, leadership, and practice — converge on student
              learning.
            </p>
          </div>
        </div>

        {/* Purpose */}
        <div id="purpose" className="scroll-mt-24">
          <h2 className="font-serif text-2xl text-foreground">Purpose</h2>
          <div className="mt-3 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              The framework exists to answer a practical question school leaders ask constantly:
              what happens after a teacher attends a training programme? Its purpose is to close
              the gap between professional development as an event and professional learning as a
              culture — giving schools a coherent way to plan, sequence, and evaluate the growth of
              their teaching staff.
            </p>
            <p>
              It is deliberately conceptual rather than prescriptive: schools apply it using their
              own context, calendar, and constraints, guided by the supporting tools (the School
              Readiness Self-Assessment, the Bere Policy-to-Practice Bridge, the Bere Reflective
              Practice Cycle, and the 90-Day Action Planner) described below.
            </p>
          </div>
        </div>

        {/* Application */}
        <div id="application" className="scroll-mt-24">
          <h2 className="font-serif text-2xl text-foreground">Application</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Schools typically apply the framework in five overlapping stages:
          </p>
          <ol className="mt-5 max-w-3xl space-y-4">
            {APPLICATION_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">{step.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Research Foundations */}
        <div id="research-foundations" className="scroll-mt-24">
          <h2 className="font-serif text-2xl text-foreground">Research Foundations</h2>
          <ul className="mt-3 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>
              Ministry of Education, Government of India. (2020). National Education Policy 2020.
            </li>
            <li>
              NCERT. (2023). National Curriculum Framework for School Education (NCF-SE).
            </li>
            <li>
              Knight, J. (2007). Instructional Coaching: A Partnership Approach to Improving
              Instruction. Corwin Press.
            </li>
            <li>
              DuFour, R., &amp; Eaker, R. (1998). Professional Learning Communities at Work: Best
              Practices for Enhancing Student Achievement. Solution Tree.
            </li>
            <li>
              Hattie, J. (2009). Visible Learning: A Synthesis of Over 800 Meta-Analyses Relating
              to Achievement. Routledge.
            </li>
          </ul>
        </div>

        {/* Download & Cite */}
        <div
          id="download-cite"
          className="rounded-2xl border border-border bg-card p-6 md:flex md:items-start md:justify-between md:gap-8"
        >
          <div>
            <a
              href="/images/framework/professional-learning-dashboard.png"
              download
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Download Framework
            </a>
          </div>

          <div className="mt-6 md:mt-0">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
              How to Cite
            </h3>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">{CITATION}</p>
            <CiteButton />
          </div>
        </div>
      </section>
    </>
  );
}
