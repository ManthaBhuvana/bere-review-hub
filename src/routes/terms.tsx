import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";
import { COPYRIGHT_NOTICE, SITE_SHORT_NAME } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () =>
    seo({
      title: `Terms of Use | ${SITE_SHORT_NAME}`,
      ogTitle: "Terms of Use",
      description:
        "Terms governing use of The Venugopal Bere Educational Review website, including copyright and citation.",
      path: "/terms",
    }),
});

function Terms() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        lead="Please read these terms before using this website. Last updated: October 2026."
      />

      <section className="container-editorial mb-20 mt-10 max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
        <div>
          <h2 className="font-serif text-xl text-foreground">Copyright</h2>
          <p className="mt-3">
            {COPYRIGHT_NOTICE} Content on this site may be cited with proper attribution. Copying,
            republishing or distributing substantial portions requires written permission.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground">Use of content</h2>
          <p className="mt-3">
            The material is provided for educational and professional-learning purposes. It
            reflects the author's views and practice-informed frameworks, and is not a substitute
            for official guidance from regulatory bodies.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground">Submissions</h2>
          <p className="mt-3">
            Articles submitted for review are governed by the{" "}
            <Link to="/for-contributors" className="text-primary underline">
              contributor guidelines and editorial policy
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground">Liability</h2>
          <p className="mt-3">
            We make reasonable efforts to keep the information accurate but provide it without
            warranty. External links are provided for convenience and we are not responsible for
            their content.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground">Privacy</h2>
          <p className="mt-3">
            See our{" "}
            <Link to="/privacy-policy" className="text-primary underline">
              Privacy Policy
            </Link>{" "}
            for how personal information is handled.
          </p>
        </div>
      </section>
    </>
  );
}