// src/routes/frameworks_.professional-learning-framework.tsx
// The trailing underscore in "frameworks_" makes this a standalone page at
// /frameworks/professional-learning-framework instead of a child of the
// /frameworks route (which has no <Outlet />, so a nested page would never show).
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Copy, Download } from "lucide-react";
import { PageHeader } from "../components/site/PageHeader";
import {
  BERE_PLF_STAGES,
  FRAMEWORK_DESCRIPTOR,
  FrameworkCycle,
  downloadFrameworkPng,
} from "../components/site/FrameworkCycle";
import { SITE_NAME, SITE_SHORT_NAME, absoluteUrl } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/frameworks_/professional-learning-framework")({
  component: ProfessionalLearningFramework,
  head: () =>
    seo({
      title: `The Bere Professional Learning Framework`,
      ogTitle: "The Bere Professional Learning Framework",
      description:
        "A Practice-Informed Conceptual Framework of eight interconnected stages connecting teacher professional learning with continuous school improvement — Overview, Diagram, Purpose, Application, Research Foundations, and How to Cite.",
      keywords:
        "Bere Professional Learning Framework, teacher professional development, instructional leadership, NEP 2020, NCF-SE 2023, Practice-Informed Conceptual Framework",
      path: "/frameworks/professional-learning-framework",
    }),
});

const CITATION = `Bere, V. (2026). The Bere Professional Learning Framework. ${SITE_NAME}. ${absoluteUrl(
  "/frameworks/professional-learning-framework",
)}`;

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
        eyebrow={FRAMEWORK_DESCRIPTOR}
        title="The Bere Professional Learning Framework"
        lead="Eight interconnected stages connecting teacher professional learning with continuous school improvement — a continuous cycle in which Continuous School Improvement feeds back into School Vision."
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
              The Bere Professional Learning Framework is a {FRAMEWORK_DESCRIPTOR} that treats
              teacher professional development not as an isolated training event, but as a
              continuous cycle connecting professional development with continuous school
              improvement.
            </p>
            <p>The framework identifies eight interconnected stages:</p>
            <ol className="grid gap-x-6 gap-y-1 pl-5 text-foreground/90 sm:grid-cols-2 [&>li]:list-decimal">
              {BERE_PLF_STAGES.map((stage) => (
                <li key={stage}>{stage}</li>
              ))}
            </ol>
            <p>
              The cycle then continues: Continuous School Improvement feeds back into School Vision,
              so that each round of professional learning informs the next.
            </p>
            <p>
              It is offered as a practice-informed conceptual framework for schools to apply and
              adapt in their own context, rather than as an empirically validated model.
            </p>
          </div>
        </div>

        {/* Diagram */}
        <div id="diagram" className="scroll-mt-24">
          <h2 className="font-serif text-2xl text-foreground">Diagram</h2>
          <div className="on-ink mt-4 max-w-3xl overflow-hidden rounded-2xl border border-primary/40 bg-ink">
            <FrameworkCycle svgId="plf-diagram" />
          </div>
        </div>

        {/* Editorial pillars — kept distinct from the framework */}
        <div id="editorial-pillars" className="scroll-mt-24">
          <div className="max-w-3xl rounded-2xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl text-foreground">The Review’s editorial pillars</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">
                Research, Policy, Leadership and Practice
              </span>{" "}
              are the four editorial pillars that organise each issue of The Venugopal Bere
              Educational Review. They describe how the Review approaches its subjects and are
              distinct from the eight stages of the Bere Professional Learning Framework.
            </p>
          </div>
        </div>

        {/* Purpose */}
        <div id="purpose" className="scroll-mt-24">
          <h2 className="font-serif text-2xl text-foreground">Purpose</h2>
          <div className="mt-3 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              The framework exists to answer a practical question school leaders ask constantly:
              what happens after a teacher attends a training programme? Its purpose is to close the
              gap between professional development as an event and professional learning as a
              culture — giving schools a coherent way to plan, sequence, and evaluate the growth of
              their teaching staff.
            </p>
            <p>
              It is deliberately conceptual rather than prescriptive: schools apply it using their
              own context, calendar, and constraints, guided by the supporting tools (the School
              Readiness Self-Assessment, the Bere Policy-to-Practice Bridge, the Bere Reflective
              Practice Cycle, and the Bere 90-Day School Improvement Action Planner) described
              below.
            </p>
          </div>
        </div>

        {/* Application */}
        <div id="application" className="scroll-mt-24">
          <h2 className="font-serif text-2xl text-foreground">Application</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Schools typically apply the framework in five overlapping steps:
          </p>
          <ol className="mt-5 max-w-3xl space-y-4">
            {APPLICATION_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-xl border border-border bg-card p-4"
              >
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
            <li>NCERT. (2023). National Curriculum Framework for School Education (NCF-SE).</li>
            <li>
              Knight, J. (2007). Instructional Coaching: A Partnership Approach to Improving
              Instruction. Corwin Press.
            </li>
            <li>
              DuFour, R., &amp; Eaker, R. (1998). Professional Learning Communities at Work: Best
              Practices for Enhancing Student Achievement. Solution Tree.
            </li>
            <li>
              Hattie, J. (2009). Visible Learning: A Synthesis of Over 800 Meta-Analyses Relating to
              Achievement. Routledge.
            </li>
          </ul>
        </div>

        {/* Download & Cite */}
        <div
          id="download-cite"
          className="rounded-2xl border border-border bg-card p-6 md:flex md:items-start md:justify-between md:gap-8"
        >
          <div>
            <button
              type="button"
              // Works on phones too: the circular diagram is in the page (hidden there), so it can still be exported.
              onClick={() => void downloadFrameworkPng("plf-diagram")}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Download Framework (PNG)
            </button>
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
