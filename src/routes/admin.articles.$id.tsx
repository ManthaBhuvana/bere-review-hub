import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  formatPublishDate,
  readingMinutes,
  type InsightArticle,
  type RelatedLink,
} from "@/lib/articles-db";
import { absoluteUrl } from "@/lib/site";
import { ArticleBody } from "../components/site/ArticleBody";
import {
  AdminGate,
  Field,
  fromIstInput,
  inputCls,
  slugify,
  statusOf,
  toIstInput,
  uploadFile,
  type Role,
} from "../components/admin/admin-kit";

export const Route = createFileRoute("/admin/articles/$id")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Edit article · Editorial Desk" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => <AdminGate>{({ role }) => <Editor role={role} />}</AdminGate>,
});

// Related links are edited as lines:  kind | label | url | citation (citation optional)
const linksToText = (l: RelatedLink[]) =>
  l
    .map((x) =>
      [x.kind, x.label, x.url, x.citation].filter((v) => v !== undefined && v !== "").join(" | "),
    )
    .join("\n");
const textToLinks = (t: string): RelatedLink[] =>
  t
    .split("\n")
    .map((line) => line.split("|").map((p) => p.trim()))
    .filter((p) => p.length >= 3 && p[2])
    .map(([kind, label, url, ...rest]) => ({
      kind: (kind || "other") as RelatedLink["kind"],
      label,
      url,
      ...(rest.length && rest.join(" | ") ? { citation: rest.join(" | ") } : {}),
    }));

const istTime = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));

function Editor({ role }: { role: Role }) {
  const { id } = Route.useParams();
  const [a, setA] = useState<InsightArticle | null>(null);
  const [refs, setRefs] = useState("");
  const [links, setLinks] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [tab, setTab] = useState<"write" | "preview">("write");

  useEffect(() => {
    supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error) return setMsg(error.message);
        const art = data as InsightArticle;
        setA(art);
        setRefs(art.reference_list.join("\n"));
        setLinks(linksToText(art.related_links ?? []));
      });
  }, [id]);

  if (!a)
    return (
      <div className="container-editorial py-20 text-sm text-muted-foreground">
        {msg ?? "Loading…"}
      </div>
    );

  const set = <K extends keyof InsightArticle>(k: K, v: InsightArticle[K]) =>
    setA({ ...a, [k]: v });

  const save = async (status?: InsightArticle["status"]) => {
    setMsg("Saving…");
    const payload = {
      slug: a.slug,
      week_number: a.week_number,
      title: a.title,
      subtitle: a.subtitle || null,
      author: a.author,
      author_role: a.author_role,
      category: a.category,
      series: a.series || null,
      excerpt: a.excerpt || null,
      body_md: a.body_md,
      featured_image_url: a.featured_image_url || null,
      featured_image_alt: a.featured_image_alt || null,
      framework_image_url: a.framework_image_url || null,
      reference_list: refs
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      related_links: textToLinks(links),
      reflective_question: a.reflective_question || null,
      reflective_heading: a.reflective_heading || null,
      reading_time_minutes: a.reading_time_minutes || null,
      seo_title: a.seo_title || null,
      seo_description: a.seo_description || null,
      seo_keywords: a.seo_keywords || null,
      publish_at: a.publish_at,
      status: status ?? a.status,
    };
    const { data, error } = await supabase
      .from("articles")
      .update(payload)
      .eq("id", a.id)
      .select("*")
      .single();
    if (error) return setMsg(`Not saved: ${error.message}`);
    setA(data as InsightArticle);
    setMsg(
      (data as InsightArticle).status !== payload.status
        ? "Saved — content changed, so it went back to “Awaiting approval”."
        : "Saved.",
    );
  };

  const upload = async (field: "featured_image_url" | "framework_image_url", file?: File) => {
    if (!file) return;
    setMsg("Uploading image…");
    try {
      set(field, await uploadFile("article-images", file, a.slug));
      setMsg("Image uploaded — remember to Save.");
    } catch (e) {
      setMsg((e as Error).message);
    }
  };

  const previewUrl = absoluteUrl(`/articles/${a.slug}?preview=${a.preview_token}`);
  const st = statusOf(a);
  const seoTitleLen = (a.seo_title ?? "").length;
  const seoDescLen = (a.seo_description ?? "").length;

  return (
    <div className="container-editorial py-10">
      <Link
        to="/admin"
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Editorial Desk
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="font-serif text-2xl text-foreground md:text-3xl">{a.title}</h1>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${st.cls}`}>
          {st.label}
        </span>
      </div>

      {/* Action bar */}
      <div className="sticky top-16 z-20 mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-background/95 p-3 backdrop-blur lg:top-20">
        <button
          onClick={() => save()}
          className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white"
        >
          <Save className="h-4 w-4" /> Save
        </button>
        {a.status === "draft" && (
          <button
            onClick={() => save("in_review")}
            className="rounded-md border border-amber-400 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900"
          >
            Send for approval
          </button>
        )}
        {role === "editor" && a.status !== "approved" && (
          <button
            onClick={() => {
              // If the scheduled time has already passed, approval publishes at once.
              const due = new Date(a.publish_at) <= new Date();
              if (
                due &&
                !window.confirm(
                  `The scheduled time (${formatPublishDate(a.publish_at, true)}, ${istTime(a.publish_at)} IST) has already passed.\n\n` +
                    "Approving now will publish the article immediately, keeping that publication date.\n\nContinue?",
                )
              )
                return;
              void save("approved");
            }}
            className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white"
          >
            {new Date(a.publish_at) <= new Date() ? "Approve & publish now" : "Approve & schedule"}
          </button>
        )}
        {a.status === "approved" && (
          <button
            onClick={() => save("in_review")}
            className="rounded-md border border-border px-4 py-2 text-sm"
          >
            Withdraw approval
          </button>
        )}
        <a
          href={previewUrl}
          target="_blank"
          rel="noreferrer"
          className="ml-auto inline-flex items-center gap-1 text-sm text-primary underline"
        >
          <ExternalLink className="h-4 w-4" /> Open preview
        </a>
        {msg && <span className="w-full text-xs text-muted-foreground">{msg}</span>}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Field label="Title">
          <input
            className={inputCls}
            value={a.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </Field>
        <Field label="Subtitle">
          <input
            className={inputCls}
            value={a.subtitle ?? ""}
            onChange={(e) => set("subtitle", e.target.value)}
          />
        </Field>
        <Field label="URL slug" hint={`/articles/${a.slug}`}>
          <div className="flex gap-2">
            <input
              className={inputCls}
              value={a.slug}
              onChange={(e) => set("slug", slugify(e.target.value))}
            />
            <button
              type="button"
              onClick={() => set("slug", slugify(a.title))}
              className="shrink-0 rounded-md border border-border px-3 text-xs"
            >
              From title
            </button>
          </div>
        </Field>
        <Field label="Publication date & time (IST)">
          <input
            type="datetime-local"
            className={inputCls}
            value={toIstInput(a.publish_at)}
            onChange={(e) => set("publish_at", fromIstInput(e.target.value))}
          />
        </Field>
        <Field label="Category">
          <input
            className={inputCls}
            value={a.category}
            onChange={(e) => set("category", e.target.value)}
          />
        </Field>
        <Field label="Series">
          <input
            className={inputCls}
            value={a.series ?? ""}
            onChange={(e) => set("series", e.target.value)}
          />
        </Field>
        <Field label="Author">
          <input
            className={inputCls}
            value={a.author}
            onChange={(e) => set("author", e.target.value)}
          />
        </Field>
        <Field label="Author role">
          <input
            className={inputCls}
            value={a.author_role}
            onChange={(e) => set("author_role", e.target.value)}
          />
        </Field>
        <Field label="Card summary" hint="1–2 sentences for the homepage & archive">
          <textarea
            className={inputCls}
            rows={2}
            value={a.excerpt ?? ""}
            onChange={(e) => set("excerpt", e.target.value)}
          />
        </Field>
        <Field
          label="Reading time (minutes)"
          hint={`leave empty for automatic: ${readingMinutes({ ...a, reading_time_minutes: null })} min`}
        >
          <input
            type="number"
            min={1}
            className={inputCls}
            value={a.reading_time_minutes ?? ""}
            onChange={(e) =>
              set("reading_time_minutes", e.target.value ? Number(e.target.value) : null)
            }
          />
        </Field>
      </div>

      {/* Images */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <Field label="Featured image" hint="1200 × 630 px works best">
            <input
              className={inputCls}
              value={a.featured_image_url ?? ""}
              onChange={(e) => set("featured_image_url", e.target.value)}
              placeholder="URL, or upload ↓"
            />
          </Field>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => upload("featured_image_url", e.target.files?.[0])}
            className="text-sm"
          />
          <input
            className={inputCls}
            value={a.featured_image_alt ?? ""}
            onChange={(e) => set("featured_image_alt", e.target.value)}
            placeholder="Image description (alt text)"
          />
          {a.featured_image_url && (
            <img
              src={a.featured_image_url}
              alt=""
              className="max-h-40 rounded border border-border"
            />
          )}
        </div>
        <div className="space-y-2">
          <Field label="Framework visual" hint="shown where [[FRAMEWORK]] is placed">
            <input
              className={inputCls}
              value={a.framework_image_url ?? ""}
              onChange={(e) => set("framework_image_url", e.target.value)}
              placeholder="URL, or upload ↓"
            />
          </Field>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => upload("framework_image_url", e.target.files?.[0])}
            className="text-sm"
          />
          {a.framework_image_url && (
            <img
              src={a.framework_image_url}
              alt=""
              className="max-h-40 rounded border border-border"
            />
          )}
        </div>
      </div>

      {/* Manuscript */}
      <div className="mt-8">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
            Approved manuscript
          </span>
          <div className="ml-auto flex rounded-md border border-border text-xs">
            {(["write", "preview"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 ${tab === t ? "bg-ink text-white" : ""}`}
              >
                {t === "write" ? "Write" : "Preview"}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Markdown: <code>## Subheading</code>, <code>**bold**</code>, <code>&gt; quotation</code>,{" "}
          <code>- list item</code>. Put <code>[[FRAMEWORK]]</code> or <code>[[DOWNLOAD]]</code> on a
          line of its own to place those blocks.
        </p>
        {tab === "write" ? (
          <textarea
            className={`${inputCls} mt-2 min-h-[60vh] font-mono text-[13px] leading-relaxed`}
            value={a.body_md}
            onChange={(e) => set("body_md", e.target.value)}
            spellCheck
          />
        ) : (
          <div className="mt-2 max-w-[70ch] rounded-xl border border-border p-6">
            <ArticleBody article={{ ...a, related_links: textToLinks(links), resource: null }} />
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Field label="References" hint="one per line, exactly as supplied">
          <textarea
            className={`${inputCls} min-h-40`}
            value={refs}
            onChange={(e) => setRefs(e.target.value)}
          />
        </Field>
        <Field
          label="Related links"
          hint="kind | label | url | citation (optional) — kind: publication, framework, resource, article, other"
        >
          <textarea
            className={`${inputCls} min-h-40 font-mono text-xs`}
            value={links}
            onChange={(e) => setLinks(e.target.value)}
          />
        </Field>
        <Field label="Reflective question heading" hint="default “Pause & Reflect”">
          <input
            className={inputCls}
            value={a.reflective_heading ?? ""}
            onChange={(e) => set("reflective_heading", e.target.value)}
          />
        </Field>
        <Field label="Concluding reflective question">
          <textarea
            className={inputCls}
            rows={3}
            value={a.reflective_question ?? ""}
            onChange={(e) => set("reflective_question", e.target.value)}
          />
        </Field>
        <div className="space-y-4">
          <Field label="SEO title" hint={`${seoTitleLen} characters (aim ≤ 70)`}>
            <input
              className={inputCls}
              value={a.seo_title ?? ""}
              onChange={(e) => set("seo_title", e.target.value)}
            />
          </Field>
          <Field label="Meta description" hint={`${seoDescLen} characters (aim 120–160)`}>
            <textarea
              className={inputCls}
              rows={3}
              value={a.seo_description ?? ""}
              onChange={(e) => set("seo_description", e.target.value)}
            />
          </Field>
          <Field label="Keywords" hint="comma-separated">
            <input
              className={inputCls}
              value={a.seo_keywords ?? ""}
              onChange={(e) => set("seo_keywords", e.target.value)}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}
