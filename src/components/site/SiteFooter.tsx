import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Linkedin, Youtube, Mail } from "lucide-react";
import { Crest } from "./Crest";
import { supabase } from "@/integrations/supabase/client";
import {
  CONTACT_EMAIL,
  COPYRIGHT_NOTICE,
  DEVELOPER_CREDIT,
  FOOTER_TEXT,
  LINKEDIN_URL,
  YOUTUBE_URL,
} from "@/lib/site";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setStatus("loading");

    const { error } = await supabase
      .from("subscribers")
      .insert({ email });

    if (error && error.code !== "23505") {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  };

  return (
    <footer className="on-ink mt-20 border-t border-border/60 bg-ink text-foreground">
      {/* ================= MAIN FOOTER ================= */}
      <div className="container-editorial py-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* ================= BRAND ================= */}
          <div className="md:col-span-7">
            <div className="flex items-start gap-3">
              <Crest className="mt-0.5 h-10 w-10 shrink-0" />

              <div>
                <div className="font-serif text-lg font-bold leading-snug text-foreground">
                  {FOOTER_TEXT.name}
                </div>

                <p className="mt-2 max-w-xl text-xs font-medium uppercase leading-relaxed tracking-wide text-foreground/65">
                  {FOOTER_TEXT.descriptor}
                </p>

                <p className="mt-1 text-xs font-medium text-foreground/65">
                  {FOOTER_TEXT.founder}
                </p>
              </div>
            </div>

            {/* Motto */}
            <p className="mt-6 font-serif text-sm tracking-[0.18em] text-primary sm:text-base">
              {FOOTER_TEXT.motto}
            </p>

            {/* Newsletter */}
            <div className="mt-6 max-w-xl">
              <p className="mb-2 text-xs leading-relaxed text-foreground/55">
                Stay informed about new issues, essays, and frameworks.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex max-w-lg flex-col gap-2 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  disabled={status === "loading"}
                  className="w-full rounded-md border border-border/70 bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-crimson-glow disabled:opacity-60"
                >
                  {status === "loading" ? "Subscribing…" : "Subscribe"}
                </button>
              </form>

              {status === "success" && (
                <p className="mt-2 text-xs text-primary">
                  You're subscribed — thank you!
                </p>
              )}

              {status === "error" && (
                <p className="mt-2 text-xs text-destructive">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </div>

          {/* ================= EXPLORE ================= */}
          <div className="md:col-span-3">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Explore
            </h4>

            <ul className="space-y-2.5 text-sm text-foreground/75">
              {[
                ["/about", "About"],
                ["/current-issue", "Current Issue"],
                ["/publications", "Publications"],
                ["/frameworks", "Frameworks"],
                ["/resources", "Resources"],
                ["/speaking", "Speaking & Training"],
                ["/for-contributors", "Editorial Policy"],
                ["/publications", "Citation"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= CONNECT ================= */}
          <div className="md:col-span-2">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Connect
            </h4>

            <div className="flex gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-border/70 text-foreground/70 transition-all duration-200 hover:border-primary hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="grid h-10 w-10 place-items-center rounded-full border border-border/70 text-foreground/70 transition-all duration-200 hover:border-primary hover:text-primary"
              >
                <Youtube className="h-4 w-4" />
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email"
                className="grid h-10 w-10 place-items-center rounded-full border border-border/70 text-foreground/70 transition-all duration-200 hover:border-primary hover:text-primary"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Follow the review for new issues, essays, and frameworks.
            </p>
          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT BAR ================= */}
      <div className="border-t border-border/40">
        <div className="container-editorial flex flex-col items-center justify-center py-5 text-center">
          <p className="text-xs text-muted-foreground">
            {COPYRIGHT_NOTICE}
          </p>

          {/* Small editorial divider */}
          <span
            aria-hidden="true"
            className="my-2 h-px w-8 bg-primary/60"
          />

          <p className="text-xs font-medium text-foreground/60">
            {DEVELOPER_CREDIT}
          </p>
        </div>
      </div>
    </footer>
  );
}