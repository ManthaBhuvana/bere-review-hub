import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";
import { CONTACT_EMAIL, SITE_SHORT_NAME } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicy,
  head: () =>
    seo({
      title: `Privacy Policy | ${SITE_SHORT_NAME}`,
      ogTitle: "Privacy Policy",
      description:
        "How The Venugopal Bere Educational Review collects, uses and protects your personal information.",
      path: "/privacy-policy",
    }),
});

function PrivacyPolicy() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lead="How this website collects, uses and protects your information. Last updated: October 2026."
      />

      <section className="container-editorial mb-20 mt-10 max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
        <div>
          <h2 className="font-serif text-xl text-foreground">Information we collect</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Newsletter:</strong> your email address, when you
              subscribe through the form on this site.
            </li>
            <li>
              <strong className="text-foreground">Contact and submission forms:</strong> the details
              you enter (such as name, email and message). These forms are provided by Jotform.
            </li>
            <li>
              <strong className="text-foreground">Usage data:</strong> anonymous visit statistics
              collected through Google Analytics, such as pages viewed and approximate location.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground">How we use it</h2>
          <p className="mt-3">
            To send you new issues and updates, respond to your enquiries, review article
            submissions, and understand how the site is used so we can improve it. We do not sell
            your personal information.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground">Third-party services</h2>
          <p className="mt-3">
            Subscriber emails are stored with our database provider (Supabase). Forms are processed
            by Jotform, and analytics by Google. Each of these services has its own privacy policy.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground">Your choices</h2>
          <p className="mt-3">
            You may ask us to access, correct or delete your information, or to unsubscribe, at any
            time by writing to{" "}
            <a className="text-primary underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground">Changes</h2>
          <p className="mt-3">
            We may update this policy from time to time. The date at the top shows when it was last
            revised.
          </p>
        </div>
      </section>
    </>
  );
}