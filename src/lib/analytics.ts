// Google Analytics 4 event helpers (the gtag snippet itself is in __root.tsx).
// Every custom event name and parameter used on the site is listed here, so the
// matching custom dimensions can be registered once in GA4 (see
// docs/ARTICLES-PROGRAMME.md → "Analytics").

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}

/** Article page opened (adds category/series so reports can group articles). */
export const trackArticleView = (p: {
  slug: string;
  title: string;
  category: string;
  series?: string | null;
}) =>
  track("article_view", {
    article_slug: p.slug,
    article_title: p.title,
    article_category: p.category,
    article_series: p.series ?? undefined,
  });

/** PDF download clicked. `placement` = where the button was (article_cta, article_sidebar, resources_page). */
export const trackResourceDownload = (p: {
  resourceSlug: string;
  resourceTitle: string;
  fileName: string;
  articleSlug?: string;
  placement: string;
}) =>
  track("resource_download", {
    resource_slug: p.resourceSlug,
    resource_title: p.resourceTitle,
    file_name: p.fileName,
    article_slug: p.articleSlug,
    placement: p.placement,
  });

/** Reader moved from an article to a resource, framework or publication. */
export const trackArticleToResource = (p: { articleSlug: string; target: string; kind: string }) =>
  track("article_to_resource", {
    article_slug: p.articleSlug,
    link_url: p.target,
    link_kind: p.kind,
  });

/** Share button clicked (GA4 recommended "share" event). */
export const trackShare = (p: { method: string; slug: string }) =>
  track("share", { method: p.method, content_type: "article", item_id: p.slug });

/** Newsletter subscription (GA4 recommended "sign_up" event). */
export const trackNewsletterSignup = (location: string) =>
  track("sign_up", { method: "newsletter", form_location: location });
