import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Linkedin, Youtube, Mail } from "lucide-react";
import { Crest } from "./Crest";
import { supabase } from "@/integrations/supabase/client";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    const { error } = await supabase.from("subscribers").insert({ email });

    if (error && error.code !== "23505") {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <footer className="mt-20 border-t border-border/60 bg-ink">
      <div className="border-b border-border/40 bg-linear-to-r from-primary/10 via-primary/20 to-primary/10">
        <div className="container-editorial flex flex-col items-center gap-2 py-5 text-center">
          <p className="font-serif text-lg tracking-[0.25em] text-primary sm:text-xl">
            RESEARCH &nbsp;•&nbsp; REFLECT &nbsp;•&nbsp; LEAD &nbsp;•&nbsp; TRANSFORM
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Building a Culture of Continuous Professional Learning
          </p>
        </div>
      </div>

      <div className="container-editorial grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Crest className="h-10 w-10" />
            <div>
              <div className="font-serif text-lg font-bold">The Venugopal Bere</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-primary">
                Educational Review
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            An editorial platform where educational research, policy, leadership, and classroom
            practice converge — in service of continuous school improvement.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              disabled={status === "loading"}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-crimson-glow disabled:opacity-60"
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
          {status === "success" && (
            <p className="mt-2 text-xs text-primary">You're subscribed — thank you!</p>
          )}
          {status === "error" && (
            <p className="mt-2 text-xs text-destructive">Something went wrong. Please try again.</p>
          )}
        </div>

        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-foreground/80">
            {[
              ["/", "Home"],
              ["/about", "About the Author"],
              ["/current-issue", "Current Issue"],
              ["/publications", "Publications"],
              ["/frameworks", "Frameworks"],
              ["/resources", "Resources"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-primary">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Connect
          </h4>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/bere-venu-gopal-lordven111"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/80 red-glow hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/@EdWise.Politent/featured"
              aria-label="YouTube"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/80 red-glow hover:text-primary"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="mailto:contact@example.com"
              aria-label="Email"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/80 red-glow hover:text-primary"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Follow the review for new issues, essays, and frameworks.
          </p>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="container-editorial flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} The Venugopal Bere Educational Review.</p>
          <p>Research. Policy. Leadership. Practice.</p>
        </div>
      </div>
    </footer>
  );
}
