// /sitemap.xml — generated on every request, so a scheduled article is added
// the moment it goes live (no rebuild needed). Drafts never appear here,
// because the public database policy hides them.
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { ARTICLES } from "../data/articles";
import { ISSUE_DATE_ISO, SITE_URL } from "@/lib/site";

// Update a page's date only when its content really changes.
const LASTMOD = "2026-10-19";

// [path, changefreq, priority, lastmod]
const STATIC_PAGES: [string, string, string, string][] = [
  ["/", "weekly", "1.0", LASTMOD],
  ["/articles", "weekly", "0.9", LASTMOD],
  ["/about", "monthly", "0.8", LASTMOD],
  ["/current-issue", "weekly", "0.9", ISSUE_DATE_ISO],
  ["/publications", "weekly", "0.8", ISSUE_DATE_ISO],
  ["/frameworks", "monthly", "0.8", LASTMOD],
  ["/frameworks/professional-learning-framework", "monthly", "0.7", LASTMOD],
  ["/resources", "weekly", "0.7", LASTMOD],
  ["/speaking", "monthly", "0.6", LASTMOD],
  ["/for-contributors", "monthly", "0.5", LASTMOD],
  ["/contact", "monthly", "0.6", LASTMOD],
  ["/privacy-policy", "yearly", "0.2", LASTMOD],
  ["/terms", "yearly", "0.2", LASTMOD],
];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const pages = [...STATIC_PAGES];
        for (const a of ARTICLES) {
          pages.push([
            `/articles/${a.slug}`,
            "monthly",
            a.slug === "volume-1" ? "0.7" : "0.6",
            ISSUE_DATE_ISO,
          ]);
        }
        try {
          const { data } = await supabase
            .from("articles")
            .select("slug,publish_at,updated_at")
            .eq("status", "approved")
            .lte("publish_at", new Date().toISOString())
            .order("publish_at", { ascending: false });
          for (const a of data ?? []) {
            const mod = a.updated_at > a.publish_at ? a.updated_at : a.publish_at;
            pages.push([`/articles/${a.slug}`, "monthly", "0.8", String(mod).slice(0, 10)]);
          }
        } catch (e) {
          console.error("[sitemap] articles unavailable", e);
        }

        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ([path, freq, pri, mod]) =>
      `  <url><loc>${esc(SITE_URL + path)}</loc><lastmod>${mod}</lastmod><changefreq>${freq}</changefreq><priority>${pri}</priority></url>`,
  )
  .join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=0, s-maxage=900",
          },
        });
      },
    },
  },
});
