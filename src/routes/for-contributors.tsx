import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";
import { SITE_NAME } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/for-contributors")({
  component: ForContributors,
  head: () =>
    seo({
      title: `For Contributors — ${SITE_NAME}`,
      ogTitle: "For Contributors — Submission Guidelines & Editorial Policy",
      description:
        "Scope, submission guidelines, referencing style, editorial review process, and publication ethics for The Venugopal Bere Educational Review.",
      keywords:
        "submission guidelines, editorial review, APA 7 referencing, publication ethics, Venugopal Bere Educational Review",
      path: "/for-contributors",
    }),
});

const SECTIONS = [
  {
    id: "scope",
    title: "Scope",
    body: [
      "The Venugopal Bere Educational Review welcomes original, practice-informed writing on teacher professional development, instructional leadership, school improvement, competency-based education, assessment, educational policy (including NEP 2020 and NCF-SE 2023), and classroom practice.",
      "We are particularly interested in work that connects educational research or policy with real, actionable school and classroom practice — case studies, frameworks, toolkits, and reflective essays from practising educators are all welcome alongside more conventional research writing.",
    ],
  },
  {
    id: "submission-guidelines",
    title: "Submission Guidelines",
    body: [
      "Submissions should be original, unpublished, and relevant to the scope above. Please submit as a Word document (.docx) or PDF, along with a short (2–3 sentence) author bio and, where relevant, your institutional affiliation.",
      "Include a working title, a 100–150 word abstract, and 3–5 keywords. Use clear section headings where appropriate, and ensure any figures, tables, or diagrams are provided as separate, high-resolution image files.",
      "Submissions are accepted on a rolling basis via the submission form on the Current Issue page, or by writing to the editorial team directly (see Contact).",
    ],
  },
  {
    id: "word-limits",
    title: "Suggested Word Limits",
    body: [
      "Full articles and essays: 1,500–3,000 words.",
      "Practitioner guides and toolkits (e.g. coaching questions, rubrics, planning tools): 800–2,000 words, inclusive of any templates.",
      "Short reflections or case notes: 600–1,200 words.",
      "These are guidelines rather than hard limits — the editorial team may suggest trimming or expanding a piece to better serve the reader.",
    ],
  },
  {
    id: "referencing",
    title: "APA 7 Referencing",
    body: [
      "All submissions should follow APA 7th edition referencing style for in-text citations and the reference list. Where a submission draws on national policy documents (such as NEP 2020 or NCF-SE 2023), please cite the issuing body and year, e.g. Ministry of Education, Government of India. (2020). National Education Policy 2020.",
      "Direct quotations should be used sparingly and always attributed; paraphrased ideas still require a citation.",
    ],
  },
  {
    id: "originality",
    title: "Originality",
    body: [
      "Submissions must be the author's own original work, not previously published elsewhere (including on other websites, blogs, or in print), and not under review with another publication at the same time.",
      "Where a submission draws substantially on an author's own previously published work, this must be disclosed to the editorial team at the time of submission.",
    ],
  },
  {
    id: "ai-use-policy",
    title: "AI-Use Policy",
    body: [
      "Authors may use AI tools to support tasks such as grammar checking, language editing, or organising ideas. However, the intellectual content, arguments, and conclusions of a submission must originate from the author.",
      "Authors should disclose, in a brief note accompanying their submission, whether and how generative AI tools were used in preparing the piece. Submissions that are substantially AI-generated, rather than AI-assisted, will not be accepted.",
    ],
  },
  {
    id: "editorial-review",
    title: "Editorial Review Process",
    body: [
      "Every submission goes through an Editorial Review by the Founder & Editor (and, as the Review grows, invited editorial readers), rather than a formal blind peer-review process. Editorial Review assesses relevance to scope, clarity, practical value to educators, and alignment with the Review's evidence-informed, practice-oriented voice.",
      "Authors can typically expect an initial editorial response within 3–4 weeks of submission. Feedback may include a request for revisions before a piece is accepted for publication.",
      "As the Review's contributor base grows, this page will be updated if a more formal peer-review mechanism is introduced.",
    ],
  },
  {
    id: "copyright",
    title: "Copyright",
    body: [
      "Authors retain copyright of their own work. By submitting, authors grant The Venugopal Bere Educational Review a non-exclusive licence to publish, distribute, and archive the piece on this website and in any associated PDF issue.",
      "Authors are free to share, repost, or republish their own work elsewhere after publication, with acknowledgement that it first appeared in The Venugopal Bere Educational Review.",
    ],
  },
  {
    id: "publication-ethics",
    title: "Publication Ethics",
    body: [
      "The Review is committed to honest, transparent, and fair editorial practice. Submissions are evaluated on their relevance, clarity, and value to educators — never on an author's institutional affiliation, seniority, or personal connection to the editorial team.",
      "Plagiarism, data fabrication, or misrepresentation of sources are grounds for immediate rejection and, if discovered after publication, retraction.",
    ],
  },
  {
    id: "conflict-of-interest",
    title: "Conflict of Interest",
    body: [
      "Authors should disclose any financial, institutional, or personal interest that could reasonably be seen to influence the content of their submission (for example, writing about a programme or product in which they hold a commercial interest).",
      "Where the Founder & Editor has a direct professional connection to a submission's subject matter, this will be disclosed within the published piece.",
    ],
  },
  {
    id: "author-responsibility",
    title: "Author Responsibility",
    body: [
      "Authors are responsible for the accuracy of facts, data, and citations in their submission, and for securing any necessary permissions for images, diagrams, or quoted material not their own.",
      "Authors should respond promptly to editorial queries during the review process and notify the editorial team of any significant error discovered after publication.",
    ],
  },
];

function ForContributors() {
  return (
    <>
      <PageHeader
        eyebrow="Contribute"
        title="For Contributors"
        lead="Before submitting, please review the scope, guidelines, and editorial process below."
      />

      <section className="container-editorial mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* On-page navigation */}
        <nav
          aria-label="On this page"
          className="hidden lg:sticky lg:top-24 lg:block lg:h-fit lg:self-start"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            On this page
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-foreground/75 hover:text-primary">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sections */}
        <div className="max-w-3xl space-y-12">
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="font-serif text-2xl text-primary">{s.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {s.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}

          <div className="on-ink rounded-2xl border border-primary/30 bg-ink p-6 md:p-8">
            <h3 className="font-serif text-xl text-foreground">Ready to submit?</h3>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Head to the Current Issue page to use the submission form, or write to the
              editorial team directly.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/current-issue"
                hash="submit-article"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Go to Submission Form
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Contact the Editor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
