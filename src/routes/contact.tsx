import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";
import { Linkedin, Mail, MapPin, Youtube } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — The Venugopal Bere Educational Review" },
      {
        name: "description",
        content:
          "Contact the editorial team of The Venugopal Bere Educational Review for inquiries, submissions, and collaborations.",
      },
      { property: "og:title", content: "Contact the Review" },
      {
        property: "og:description",
        content: "Get in touch with the editorial team.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact"
        lead="Inquiries, submissions, workshop requests, and collaboration proposals are all welcome."
      />

      <section className="container-editorial mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-serif text-2xl">Send a message</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill out the form below and the editorial team will follow up.
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border border-border/60 bg-background">
            <iframe
              id="jotform-contact"
              title="Contact the Review"
              src="https://form.jotform.com/262355375920056"
              className="min-h-130 w-full border-0"
              allow="geolocation; microphone; camera"
            />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-ink p-6">
            <h3 className="font-serif text-lg">Reach us</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:contact@example.com" className="text-foreground/85 hover:text-primary">
                  venugopalbere@gmail.com 
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.linkedin.com/in/bere-venu-gopal-lordven111"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/80 red-glow hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>
                <a href="https://www.youtube.com/@EdWise.Politent"
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
