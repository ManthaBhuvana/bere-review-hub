// -----------------------------------------------------------------------------
// Single source of truth for the site's identity, wording and public addresses.
// Change a value here and it updates everywhere (footer, meta tags, citations…).
// -----------------------------------------------------------------------------

// --- Public address ----------------------------------------------------------
// The site address is read from the VITE_SITE_URL environment variable so that
// moving from the Vercel URL to a custom domain needs NO code change:
//   1. Vercel → Project → Settings → Environment Variables → VITE_SITE_URL
//        e.g. https://www.yourdomain.com   (no trailing slash needed)
//   2. Redeploy. Canonical links, share previews, citations, sitemap.xml and
//      robots.txt all pick the new address up automatically.
// If the variable is not set, the previous default below is used.
const DEFAULT_SITE_URL = "https://thereviewer.co.in";

function resolveSiteUrl(): string {
  const raw = ((import.meta.env.VITE_SITE_URL as string | undefined) ?? "").trim();
  if (!raw) return DEFAULT_SITE_URL;
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, "");
}

export const SITE_URL = resolveSiteUrl();

/** Turns "/about" into "https://<your-domain>/about" (for canonical + og:url). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Default image shown when a page is shared on WhatsApp, LinkedIn, X, etc. */
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const OG_IMAGE_WIDTH = "1200";
export const OG_IMAGE_HEIGHT = "630";
export const OG_IMAGE_ALT = "The Venugopal Bere Educational Review";

// --- Brand wording -----------------------------------------------------------
export const SITE_NAME = "The Venugopal Bere Educational Review";
export const SITE_STRAPLINE = "Research. Policy. Leadership. Practice.";

/** Primary description — used on the homepage, in meta tags and share previews. */
export const SITE_DESCRIPTION =
  "An independent educational review connecting research, policy, leadership and classroom practice.";

export const FOUNDER_NAME = "Venugopal Bere";
export const FOUNDER_TITLE = "Founder & Editor";

// --- Footer (one standard footer on every page) ------------------------------
export const FOOTER_TEXT = {
  name: SITE_NAME,
  descriptor: "An Independent Educational Leadership & Professional Learning Publication",
  founder: `${FOUNDER_TITLE}: ${FOUNDER_NAME}`,
  motto: "Research • Reflect • Lead • Transform",
} as const;

// --- Copyright & credits -----------------------------------------------------
// The publication is copyright of the Founder & Editor. The website developer
// is credited separately and is NOT presented as a copyright holder.
export const COPYRIGHT_YEAR = 2026;
export const COPYRIGHT_NOTICE = `© ${COPYRIGHT_YEAR} Venugopal Bere. All Rights Reserved.`;
export const DEVELOPER_CREDIT = "Website by Readmi Solutions";

// --- Publication date --------------------------------------------------------
// Shown on Volume 1, Issue 1 and the Editorial / Foreword / Leader's Toolkit.
// Release month: September 2026 (date of publication).
// To change it, edit this ONE line — every page follows.
export const ISSUE_DATE = "September 2026";

// --- Contact & social --------------------------------------------------------
export const CONTACT_EMAIL = "venugopalbere@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/bere-venu-gopal-lordven111";
export const YOUTUBE_URL = "https://www.youtube.com/@EdWise.Politent";

/** Builds a mailto: link with a pre-filled subject line. */
export function mailtoLink(subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

// --- Embedded forms (Jotform) ------------------------------------------------
export const SUBMISSION_FORM_URL = "https://form.jotform.com/262354920466056";
export const CONTACT_FORM_URL = "https://form.jotform.com/262355375920056";
