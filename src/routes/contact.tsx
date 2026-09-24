import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";
import { BookOpen, FileText, GraduationCap, Linkedin, Mail, Mic, Youtube } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_FORM_URL,
  LINKEDIN_URL,
  SITE_NAME,
  YOUTUBE_URL,
  mailtoLink,
} from "@/lib/site";
import { seo } from "@/lib/seo";

// The four enquiry categories, in the order agreed for the site.
// Each card offers a pre-addressed email (subject line already filled in) so the
// message reaches the right conversation, plus a link to the relevant page.
const ENQUIRY_CATEGORIES = [
  {
    id: "editorial-enquiries",
    icon: BookOpen,
    title: "Editorial Enquiries",
    desc: "Questions about the Review, its editorial policy, permissions, citations, or corrections.",
    subject: "Editorial Enquiry",
    link: { to: "/for-contributors", label: "Editorial policy" },
  },
  {
    id: "article-submissions",
    icon: FileText,
    title: "Article Submissions",
    desc: "Submit an essay, case study, framework, or toolkit for Editorial Review.",
    subject: "Article Submission",
    link: { to: "/current-issue", hash: "submit-article", label: "Submission form" },
  },
  {
    id: "speaking-training",
    icon: Mic,
    title: "Speaking & Training",
    desc: "Keynotes, capacity building programmes, school workshops, and teacher training.",
    subject: "Speaking & Training Enquiry",
    link: { to: "/speaking", label: "Speaking & Training" },
  },
  {
    id: "research-academic-collaboration",
    icon: GraduationCap,
    title: "Research/Academic Collaboration",
    desc: "Research partnerships, academic collaboration, and joint educational projects.",
    subject: "Research/Academic Collaboration",
    link: { to: "/about", label: "Research interests" },
  },
] as const;

export const Route = createFileRoute("/contact")({
  component: Contact,

  head: () =>
    seo({
      title: `Contact — ${SITE_NAME}`,
      ogTitle: "Contact the Review",
      description:
        "Contact The Venugopal Bere Educational Review for editorial enquiries, article submissions, speaking and training, and research or academic collaboration.",
      keywords:
        "contact, editorial enquiries, article submissions, speaking and training, research collaboration, academic collaboration, Venugopal Bere",
      path: "/contact",
    }),
});

function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact"
        lead="Editorial enquiries, article submissions, speaking and training requests, and research or academic collaboration are all welcome."
      />

      {/* Enquiry categories */}
      <section className="container-editorial mt-10" aria-labelledby="enquiry-heading">
        <h2 id="enquiry-heading" className="font-serif text-2xl">
          How can we help?
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose the category that fits your enquiry — the email opens with the subject line
          already filled in.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ENQUIRY_CATEGORIES.map(({ id, icon: Icon, title, desc, subject, link }) => (
            <article
              key={id}
              id={id}
              className="flex h-full scroll-mt-24 flex-col rounded-2xl border border-border bg-card p-5 red-glow"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif text-lg leading-tight text-foreground">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <a
                  href={mailtoLink(subject)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </a>
                <Link
                  to={link.to}
                  hash={"hash" in link ? link.hash : undefined}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {link.label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="container-editorial mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Contact Form */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-serif text-2xl">Send a message</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Prefer a form? Fill it out below, mention which category your enquiry falls under, and
            the editorial team will follow up.
          </p>

          <div className="mt-6 overflow-hidden rounded-lg border border-border/60 bg-background">
            <iframe
              id="jotform-contact"
              title="Contact the Review"
              src={CONTACT_FORM_URL}
              className="h-[70vh] min-h-100 w-full border-0 md:min-h-130"
              allow="geolocation; microphone; camera"
            />
          </div>
        </div>

        {/* Contact Sidebar */}
        <aside className="space-y-6">
          <div className="on-ink rounded-2xl border border-border bg-ink p-6">
            <h3 className="font-serif text-primary text-lg">Reach us</h3>

            <ul className="mt-4 space-y-4 text-sm">
              {/* Email */}
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="break-all text-foreground/85 hover:text-primary"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {/* LinkedIn */}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/80 red-glow hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              {/* YouTube */}
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/80 red-glow hover:text-primary"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
