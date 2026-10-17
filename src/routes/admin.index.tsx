import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Copy, ExternalLink, Plus, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatPublishDate, type Resource } from "@/lib/articles-db";
import { absoluteUrl } from "@/lib/site";
import {
  AdminGate,
  Field,
  fromIstInput,
  inputCls,
  slugify,
  statusOf,
  toIstInput,
  uploadFile,
} from "../components/admin/admin-kit";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Editorial Desk" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: () => <AdminGate>{({ role }) => <Dashboard role={role} />}</AdminGate>,
});

type Row = {
  id: string;
  week_number: number | null;
  slug: string;
  title: string;
  status: string;
  publish_at: string;
  preview_token: string;
  body_md: string;
};

function Dashboard({ role }: { role: string }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const navigate = useNavigate();

  const load = useCallback(async () => {
    const [a, r] = await Promise.all([
      supabase
        .from("articles")
        .select("id,week_number,slug,title,status,publish_at,preview_token,body_md")
        .order("publish_at"),
      supabase.from("resources").select("*").order("publish_at", { ascending: false }),
    ]);
    setRows((a.data as Row[]) ?? []);
    setResources((r.data as Resource[]) ?? []);
  }, []);
  useEffect(() => void load(), [load]);

  const previewUrl = (r: Row) => absoluteUrl(`/articles/${r.slug}?preview=${r.preview_token}`);

  const newArticle = async () => {
    const last = rows[rows.length - 1];
    const nextMonday = last
      ? new Date(new Date(last.publish_at).getTime() + 7 * 864e5).toISOString()
      : new Date().toISOString();
    const title = "Untitled article";
    const { data, error } = await supabase
      .from("articles")
      .insert({
        title,
        slug: `${slugify(title)}-${Date.now()}`,
        publish_at: nextMonday,
        week_number: (last?.week_number ?? 0) + 1,
      })
      .select("id")
      .single();
    if (error) return alert(error.message);
    navigate({ to: "/admin/articles/$id", params: { id: data.id } });
  };

  return (
    <div className="container-editorial py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Editorial Desk · {role}
          </div>
          <h1 className="font-serif text-3xl text-foreground">Articles &amp; Insights</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={newArticle}
            className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" /> New article
          </button>
          <button
            onClick={() => supabase.auth.signOut()}
            className="rounded-md border border-border px-4 py-2 text-sm"
          >
            Sign out
          </button>
        </div>
      </div>

      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Workflow: Draft → paste approved manuscript → <b>Awaiting approval</b> (share preview link)
        → Editor sets <b>Approved</b> → goes live automatically at 6:00 am IST on the publication
        date. Only the Editor can approve.
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink text-white">
            <tr>
              <th className="px-3 py-2">Wk</th>
              <th className="px-3 py-2">Publication date</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Manuscript</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const st = statusOf(r);
              return (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-3 py-2">{r.week_number ?? "–"}</td>
                  <td className="whitespace-nowrap px-3 py-2">
                    {formatPublishDate(r.publish_at, true)}
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      to="/admin/articles/$id"
                      params={{ id: r.id }}
                      className="font-medium text-foreground hover:text-primary"
                    >
                      {r.title}
                    </Link>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${st.cls}`}>
                      {st.label}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {r.body_md.trim()
                      ? `${r.body_md.split(/\s+/).length.toLocaleString()} words`
                      : "not yet received"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-right">
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(previewUrl(r));
                        setCopied(r.id);
                        setTimeout(() => setCopied(null), 1500);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <Copy className="h-3.5 w-3.5" /> {copied === r.id ? "Copied" : "Preview link"}
                    </button>
                    <a
                      href={previewUrl(r)}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> Open
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ResourcesPanel resources={resources} articles={rows} onChange={load} />
    </div>
  );
}

function ResourcesPanel({
  resources,
  articles,
  onChange,
}: {
  resources: Resource[];
  articles: Row[];
  onChange: () => void;
}) {
  const blank = {
    title: "",
    subtitle: "",
    description: "",
    categories: "Teacher Professional Development, School Leadership",
    article_id: "",
    status: "draft" as "draft" | "published",
    publish_at: toIstInput(new Date().toISOString()),
  };
  const [form, setForm] = useState(blank);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (!form.title || !file) return alert("A title and a PDF are required.");
    setBusy(true);
    try {
      const url = await uploadFile("resources", file, slugify(form.title));
      const slug = slugify(form.title);
      const { data, error } = await supabase
        .from("resources")
        .insert({
          slug,
          title: form.title,
          subtitle: form.subtitle || null,
          description: form.description || null,
          categories: form.categories
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean),
          file_url: url,
          file_name: `${slug}.pdf`,
          article_id: form.article_id || null,
          status: form.status,
          publish_at: fromIstInput(form.publish_at),
        })
        .select("id")
        .single();
      if (error) throw error;
      // Link the article to this resource, so the article shows the download button.
      if (form.article_id)
        await supabase.from("articles").update({ resource_id: data.id }).eq("id", form.article_id);
      setForm(blank);
      setFile(null);
      onChange();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const setStatus = async (r: Resource, status: "draft" | "published") => {
    const { error } = await supabase.from("resources").update({ status }).eq("id", r.id);
    if (error) alert(error.message);
    onChange();
  };

  return (
    <section className="mt-14">
      <h2 className="font-serif text-2xl text-foreground">Resources (PDFs)</h2>
      <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
        {resources.map((r) => (
          <li key={r.id} className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm">
            <span className="font-medium">{r.title}</span>
            <span className="text-xs text-muted-foreground">{r.categories.join(" / ")}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${r.status === "published" ? "bg-emerald-100 text-emerald-900" : "bg-zinc-100 text-zinc-700"}`}
            >
              {r.status === "published"
                ? `Published from ${formatPublishDate(r.publish_at)}`
                : "Draft"}
            </span>
            <a
              href={r.file_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-primary underline"
            >
              Test PDF
            </a>
            <button
              onClick={() => setStatus(r, r.status === "published" ? "draft" : "published")}
              className="ml-auto text-xs text-primary underline"
            >
              {r.status === "published" ? "Unpublish" : "Publish"}
            </button>
          </li>
        ))}
        {resources.length === 0 && (
          <li className="px-4 py-3 text-sm text-muted-foreground">No resources yet.</li>
        )}
      </ul>

      <div className="mt-6 grid gap-4 rounded-xl border border-border bg-card p-5 md:grid-cols-2">
        <h3 className="md:col-span-2 text-sm font-semibold uppercase tracking-wider">
          Upload a new resource
        </h3>
        <Field label="Title">
          <input
            className={inputCls}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Field>
        <Field label="Subtitle">
          <input
            className={inputCls}
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          />
        </Field>
        <Field label="Short description">
          <textarea
            className={inputCls}
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Field>
        <Field label="Categories" hint="comma-separated">
          <input
            className={inputCls}
            value={form.categories}
            onChange={(e) => setForm({ ...form, categories: e.target.value })}
          />
        </Field>
        <Field label="Accompanies article">
          <select
            className={inputCls}
            value={form.article_id}
            onChange={(e) => setForm({ ...form, article_id: e.target.value })}
          >
            <option value="">— none —</option>
            {articles.map((a) => (
              <option key={a.id} value={a.id}>
                Wk {a.week_number}: {a.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Visible from (IST)">
          <input
            type="datetime-local"
            className={inputCls}
            value={form.publish_at}
            onChange={(e) => setForm({ ...form, publish_at: e.target.value })}
          />
        </Field>
        <Field label="Status">
          <select
            className={inputCls}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
          >
            <option value="draft">Draft (hidden)</option>
            <option value="published">Published (visible from the date above)</option>
          </select>
        </Field>
        <Field label="PDF file">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="text-sm"
          />
        </Field>
        <div className="md:col-span-2">
          <button
            disabled={busy}
            onClick={save}
            className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            <Upload className="h-4 w-4" /> {busy ? "Uploading…" : "Upload resource"}
          </button>
        </div>
      </div>
    </section>
  );
}
