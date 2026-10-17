// Shared pieces for the /admin editorial area (client-only).
import { useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type Role = "editor" | "developer";

export function useEditor() {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setRole(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from("editors")
      .select("role")
      .eq("user_id", session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        setRole((data?.role as Role) ?? null);
        setLoading(false);
      });
  }, [session]);

  return { session, role, loading };
}

/** ISO → "2026-10-19T06:00" in Indian Standard Time (for <input type="datetime-local">). */
export function toIstInput(iso: string): string {
  const d = new Date(new Date(iso).getTime() + 5.5 * 3600 * 1000);
  return d.toISOString().slice(0, 16);
}
/** "2026-10-19T06:00" (IST) → ISO string. */
export function fromIstInput(v: string): string {
  return new Date(`${v}:00+05:30`).toISOString();
}

export function statusOf(a: { status: string; publish_at: string }) {
  if (a.status === "approved")
    return new Date(a.publish_at) <= new Date()
      ? { label: "Live", cls: "bg-emerald-100 text-emerald-900" }
      : { label: "Approved · Scheduled", cls: "bg-sky-100 text-sky-900" };
  if (a.status === "in_review")
    return { label: "Awaiting approval", cls: "bg-amber-100 text-amber-900" };
  return { label: "Draft", cls: "bg-zinc-100 text-zinc-700" };
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function uploadFile(
  bucket: "article-images" | "resources",
  file: File,
  folder: string,
) {
  const safe = `${folder}/${Date.now()}-${file.name.replace(/[^\w.-]+/g, "-")}`;
  const { error } = await supabase.storage.from(bucket).upload(safe, file, {
    upsert: false,
    contentType: file.type || undefined,
    cacheControl: "31536000",
  });
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(safe).data.publicUrl;
}

export const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
        {label}
      </span>
      {hint && <span className="ml-2 text-xs text-muted-foreground">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export function AdminGate({ children }: { children: (ctx: { role: Role }) => ReactNode }) {
  const { session, role, loading } = useEditor();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  if (loading)
    return <div className="container-editorial py-20 text-sm text-muted-foreground">Loading…</div>;

  if (!session)
    return (
      <div className="container-editorial max-w-md py-20">
        <h1 className="font-serif text-3xl text-foreground">Editorial sign-in</h1>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setErr(null);
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setErr(error.message);
          }}
        >
          <Field label="Email">
            <input
              className={inputCls}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Password">
            <input
              className={inputCls}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white">
            Sign in
          </button>
        </form>
      </div>
    );

  if (!role)
    return (
      <div className="container-editorial max-w-xl py-20 text-sm">
        <h1 className="font-serif text-2xl text-foreground">Not authorised yet</h1>
        <p className="mt-3 text-muted-foreground">
          This account is signed in but is not on the editors list. Ask the site administrator to
          add this user ID in Supabase (table <code>editors</code>):
        </p>
        <code className="mt-3 block rounded bg-secondary p-3">{session.user.id}</code>
        <button onClick={() => supabase.auth.signOut()} className="mt-6 text-primary underline">
          Sign out
        </button>
      </div>
    );

  return <>{children({ role })}</>;
}
