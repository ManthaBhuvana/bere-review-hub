import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function SubscribeForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    const { error } = await supabase.from("subscribers").insert({ email });

    // Postgres 23505 = unique constraint violation, i.e. already subscribed — treat as success
    if (error && error.code !== "23505") {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <div className={className}>
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 sm:flex-row"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@school.edu"
          disabled={status === "loading"}
          className="w-full rounded-md border border-border bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-crimson-glow disabled:opacity-60"
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
  );
}
