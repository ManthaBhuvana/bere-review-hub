import { OG_IMAGE, OG_IMAGE_ALT, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_NAME, absoluteUrl } from "./site";

type MetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

export interface SeoOptions {
  /** Full <title> (also used for the social-sharing title unless ogTitle is given). */
  title: string;
  /** Meta description — aim for roughly 120–160 characters. */
  description: string;
  /** Path of the page, e.g. "/about". Used for the canonical URL and og:url. */
  path: string;
  keywords?: string;
  /** Optional shorter title for social previews. */
  ogTitle?: string;
  type?: "website" | "article";
  /** Absolute image URL for social previews (defaults to the site-wide image). */
  image?: string;
}

/**
 * Builds the complete <head> metadata for a page: title, description, canonical
 * URL, Open Graph (Facebook / LinkedIn / WhatsApp) and Twitter/X card tags.
 * Every page uses this so titles, descriptions and previews stay consistent.
 */
export function seo({
  title,
  description,
  path,
  keywords,
  ogTitle,
  type = "website",
  image = OG_IMAGE,
}: SeoOptions): { meta: MetaTag[]; links: { rel: string; href: string }[] } {
  const url = absoluteUrl(path);
  const socialTitle = ogTitle ?? title;

  const meta: MetaTag[] = [
    { title },
    { name: "description", content: description },
    ...(keywords ? [{ name: "keywords", content: keywords }] : []),
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:type", content: type },
    { property: "og:title", content: socialTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: OG_IMAGE_WIDTH },
    { property: "og:image:height", content: OG_IMAGE_HEIGHT },
    { property: "og:image:alt", content: OG_IMAGE_ALT },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: socialTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  return { meta, links: [{ rel: "canonical", href: url }] };
}
