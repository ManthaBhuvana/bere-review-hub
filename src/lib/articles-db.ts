// -----------------------------------------------------------------------------
// Articles & Insights — read from Supabase (tables defined in
// supabase/articles-programme.sql). The database decides what is public:
// status = 'approved' AND publish_at <= now(). The same filter is repeated here
// so that an Editor who is logged in to /admin never sees drafts on public pages.
// -----------------------------------------------------------------------------
import { supabase } from "@/integrations/supabase/client";

export interface RelatedLink {
  kind: "publication" | "framework" | "resource" | "article" | "other";
  label: string;
  url: string;
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  categories: string[];
  file_url: string;
  file_name: string;
  article_id: string | null;
  status: "draft" | "published";
  publish_at: string;
}

export interface InsightArticle {
  id: string;
  slug: string;
  week_number: number | null;
  title: string;
  subtitle: string | null;
  author: string;
  author_role: string;
  category: string;
  series: string | null;
  excerpt: string | null;
  body_md: string;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  framework_image_url: string | null;
  reference_list: string[];
  related_links: RelatedLink[];
  reflective_question: string | null;
  reading_time_minutes: number | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  resource_id: string | null;
  status: "draft" | "in_review" | "approved";
  publish_at: string;
  preview_token?: string;
  updated_at: string;
  resource?: Resource | null;
}

export type ArticleSummary = Pick<
  InsightArticle,
  | "slug"
  | "title"
  | "subtitle"
  | "excerpt"
  | "category"
  | "featured_image_url"
  | "featured_image_alt"
  | "publish_at"
  | "reading_time_minutes"
  | "body_md"
>;

const SUMMARY_COLUMNS =
  "slug,title,subtitle,excerpt,category,featured_image_url,featured_image_alt,publish_at,reading_time_minutes,body_md";

// Never select preview_token for public pages.
const PUBLIC_COLUMNS =
  "id,slug,week_number,title,subtitle,author,author_role,category,series,excerpt,body_md,featured_image_url,featured_image_alt,framework_image_url,reference_list,related_links,reflective_question,reading_time_minutes,seo_title,seo_description,seo_keywords,resource_id,status,publish_at,updated_at,resource:resources!articles_resource_fk(*)";

const nowIso = () => new Date().toISOString();

/** All live articles, newest first. */
export async function listPublishedArticles(limit = 100): Promise<ArticleSummary[]> {
  const { data, error } = await supabase
    .from("articles")
    .select(SUMMARY_COLUMNS)
    .eq("status", "approved")
    .lte("publish_at", nowIso())
    .order("publish_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as ArticleSummary[];
}

/** Same as above, but never throws — for the homepage, so it can't break. */
export async function listLatestArticlesSafe(limit = 3): Promise<ArticleSummary[]> {
  try {
    return await listPublishedArticles(limit);
  } catch (e) {
    console.error("[articles] latest articles unavailable", e);
    return [];
  }
}

export async function getPublishedArticle(slug: string): Promise<InsightArticle | null> {
  const { data, error } = await supabase
    .from("articles")
    .select(PUBLIC_COLUMNS)
    .eq("slug", slug)
    .eq("status", "approved")
    .lte("publish_at", nowIso())
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const article = data as unknown as InsightArticle;
  // A resource is only shown once it is itself published.
  if (article.resource && article.resource.status !== "published") article.resource = null;
  return article;
}

/** Draft / scheduled article, via the secret preview link. */
export async function getArticlePreview(
  slug: string,
  token: string,
): Promise<InsightArticle | null> {
  if (!/^[0-9a-f-]{36}$/i.test(token)) return null;
  const { data, error } = await supabase.rpc("get_article_preview", {
    p_slug: slug,
    p_token: token,
  });
  if (error || !data) return null;
  return data as InsightArticle;
}

/** Previous (older) and next (newer) live articles, for article navigation. */
export async function getNeighbours(publishAt: string) {
  const now = nowIso();
  const [older, newer] = await Promise.all([
    supabase
      .from("articles")
      .select("slug,title")
      .eq("status", "approved")
      .lt("publish_at", publishAt)
      .order("publish_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("articles")
      .select("slug,title")
      .eq("status", "approved")
      .gt("publish_at", publishAt)
      .lte("publish_at", now)
      .order("publish_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);
  return {
    previous: (older.data as { slug: string; title: string } | null) ?? null,
    next: (newer.data as { slug: string; title: string } | null) ?? null,
  };
}

export async function listPublishedResources(): Promise<
  (Resource & { article_slug?: string; article_title?: string })[]
> {
  try {
    const { data, error } = await supabase
      .from("resources")
      .select("*, article:articles!resources_article_id_fkey(slug,title,status,publish_at)")
      .eq("status", "published")
      .lte("publish_at", nowIso())
      .order("publish_at", { ascending: false });
    if (error) throw error;
    const now = Date.now();
    return (data ?? []).map((r) => {
      const a = (
        r as {
          article?: { slug: string; title: string; status: string; publish_at: string } | null;
        }
      ).article;
      const live = a && a.status === "approved" && new Date(a.publish_at).getTime() <= now;
      return {
        ...(r as Resource),
        article_slug: live ? a.slug : undefined,
        article_title: live ? a.title : undefined,
      };
    });
  } catch (e) {
    console.error("[resources] unavailable", e);
    return [];
  }
}

// --- Helpers -----------------------------------------------------------------

/** Minutes to read, at ~200 words per minute (shortcodes and markdown ignored). */
export function readingMinutes(
  a: Pick<InsightArticle, "body_md" | "reading_time_minutes">,
): number {
  if (a.reading_time_minutes) return a.reading_time_minutes;
  const words = a.body_md
    .replace(/\[\[[A-Z]+\]\]/g, " ")
    .replace(/[#>*_`[\]()!-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** "Monday, 19 October 2026" in Indian time. */
export function formatPublishDate(iso: string, withWeekday = false): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: withWeekday ? "long" : undefined,
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}

/** First paragraph of plain text, used when no excerpt was written. */
export function summaryText(
  a: Pick<InsightArticle, "excerpt" | "subtitle" | "body_md">,
  max = 180,
): string {
  const src =
    a.excerpt ||
    a.body_md
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .find((p) => p && !p.startsWith("#") && !p.startsWith("[[") && !p.startsWith("!")) ||
    a.subtitle ||
    "";
  const plain = src.replace(/[*_`#>]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  return plain.length > max ? `${plain.slice(0, max - 1).trimEnd()}…` : plain;
}

/** Public URL with a "save as" filename, so the PDF downloads rather than only opens. */
export function downloadUrl(r: Pick<Resource, "file_url" | "file_name">): string {
  if (r.file_url.includes(".supabase.co/storage/")) {
    const sep = r.file_url.includes("?") ? "&" : "?";
    return `${r.file_url}${sep}download=${encodeURIComponent(r.file_name)}`;
  }
  return r.file_url;
}
