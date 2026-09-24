// Pre-deployment link, download and SEO checker.
//
//   node scripts/check-links.mjs https://your-site.vercel.app
//
// It visits every page listed in sitemap.xml (as a desktop browser AND as a phone),
// collects every link, button target, download, image, video thumbnail and embedded
// form on the page, and checks each one. It also checks that every page has a
// title, meta description, canonical URL and social-sharing tags.
//
// Exit code 1 = something needs fixing. Needs Node 18+ (built-in fetch).

const base = (process.argv[2] || process.env.SITE_CHECK_URL || "").replace(/\/+$/, "");
if (!base) {
  console.error("Usage: node scripts/check-links.mjs https://your-site.vercel.app");
  process.exit(2);
}

const UA = {
  desktop:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  mobile:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
};

// Sites that block scripts (they answer bots with 999/403/429). Not a real failure.
const BOT_BLOCKED_HOSTS = ["linkedin.com", "www.linkedin.com"];
const PLACEHOLDER = /(example\.com|yourdomain|your-domain|lorem|localhost|127\.0\.0\.1|todo|placeholder|lovable\.app|lovable\.dev)/i;
const FILE_TYPES = {
  pdf: "application/pdf",
  webp: "image/webp",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  ico: "image",
};

const problems = new Set();
const notes = new Set();
const linkSources = new Map(); // url -> Set(pages)

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");

async function get(url, ua, method = "GET") {
  return fetch(url, {
    method,
    redirect: "follow",
    headers: { "user-agent": ua, accept: "*/*" },
    signal: AbortSignal.timeout(25000),
  });
}

function metaContent(html, attr, key) {
  const re = new RegExp(`<meta[^>]+${attr}=["']${key}["'][^>]*>`, "i");
  const tag = html.match(re)?.[0];
  return tag?.match(/content=["']([^"']*)["']/i)?.[1];
}

function checkSeo(path, html) {
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
  const checks = {
    title,
    "meta description": metaContent(html, "name", "description"),
    "og:title": metaContent(html, "property", "og:title"),
    "og:description": metaContent(html, "property", "og:description"),
    "og:image": metaContent(html, "property", "og:image"),
    "twitter:card": metaContent(html, "name", "twitter:card"),
    canonical: html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1],
  };
  for (const [k, v] of Object.entries(checks)) {
    if (!v) problems.add(`[SEO] ${path} is missing ${k}`);
  }
  const canonical = checks.canonical;
  if (canonical && new URL(canonical).origin !== new URL(base).origin) {
    notes.add(
      `[SEO] ${path} canonical points to ${new URL(canonical).origin}, not ${new URL(base).origin}. ` +
        `Fine if that is your final domain; otherwise set VITE_SITE_URL and redeploy.`,
    );
  }
  const descLen = checks["meta description"]?.length ?? 0;
  if (descLen && (descLen < 70 || descLen > 320)) notes.add(`[SEO] ${path} description length is ${descLen} characters`);
}

function extractLinks(html, pageUrl) {
  const found = new Set();
  const re = /\s(?:href|src|data-src|poster)=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const raw = decode(m[1]).trim();
    if (!raw || raw.startsWith("#") || /^(javascript|data|blob):/i.test(raw)) {
      if (raw === "#" || /^javascript:/i.test(raw)) problems.add(`[LINK] ${pageUrl} has a placeholder link: "${raw}"`);
      continue;
    }
    if (/^(mailto|tel|whatsapp):/i.test(raw)) continue;
    try {
      const u = new URL(raw, pageUrl);
      u.hash = "";
      if (/\.(js|css|woff2?)(\?|$)/i.test(u.pathname)) continue; // build assets
      found.add(u.toString());
    } catch {
      /* ignore unparsable */
    }
  }
  // Also check social share images referenced in <meta content="...">
  for (const key of ["og:image", "twitter:image"]) {
    const v = metaContent(html, key.startsWith("og") ? "property" : "name", key);
    if (v) found.add(v);
  }
  return found;
}

async function checkUrl(url) {
  const host = new URL(url).hostname;
  const sameSite = new URL(url).origin === new URL(base).origin;
  if (!sameSite && PLACEHOLDER.test(url)) return { ok: false, why: "looks like a placeholder URL" };
  const ext = new URL(url).pathname.split(".").pop()?.toLowerCase();
  const wantType = FILE_TYPES[ext];
  try {
    let res = await get(url, UA.desktop, wantType ? "GET" : "HEAD");
    if ([403, 405, 501].includes(res.status) && !wantType) res = await get(url, UA.desktop, "GET");
    if (BOT_BLOCKED_HOSTS.includes(host) && [999, 403, 429].includes(res.status))
      return { ok: true, skipped: `bot-blocked (${res.status}) — open it manually` };
    if (res.status >= 400) return { ok: false, why: `HTTP ${res.status}` };
    if (wantType) {
      const type = res.headers.get("content-type") || "";
      const bytes = (await res.arrayBuffer()).byteLength;
      if (!type.includes(wantType)) return { ok: false, why: `expected ${wantType}, got "${type}" (blank/missing file?)` };
      if (bytes < 500) return { ok: false, why: `file is only ${bytes} bytes` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, why: err?.cause?.code || err?.message || "request failed" };
  }
}

async function pool(items, size, fn) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (queue.length) await fn(queue.shift());
    }),
  );
}

// ---------------------------------------------------------------------------
console.log(`Checking ${base}\n`);

let paths = ["/"];
try {
  const xml = await (await get(`${base}/sitemap.xml`, UA.desktop)).text();
  paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
} catch {
  problems.add("[SITE] Could not read /sitemap.xml — checking the home page only");
}

for (const path of paths) {
  const pageUrl = base + path;
  let firstHtml = "";
  for (const [device, ua] of Object.entries(UA)) {
    try {
      const res = await get(pageUrl, ua);
      const html = await res.text();
      if (res.status !== 200) problems.add(`[PAGE] ${path} (${device}) returned HTTP ${res.status}`);
      if (device === "desktop") {
        firstHtml = html;
        checkSeo(path, html);
      } else if (!/<title/i.test(html)) {
        problems.add(`[PAGE] ${path} (mobile) rendered without a <title>`);
      }
      for (const link of extractLinks(html, pageUrl)) {
        if (!linkSources.has(link)) linkSources.set(link, new Set());
        linkSources.get(link).add(path);
      }
    } catch (err) {
      problems.add(`[PAGE] ${path} (${device}) could not be loaded: ${err?.message}`);
    }
  }
  if (!/viewport/i.test(firstHtml)) problems.add(`[MOBILE] ${path} has no viewport meta tag`);
  process.stdout.write(`  visited ${path}\n`);
}

console.log(`\nChecking ${linkSources.size} unique links, downloads, images and embeds…\n`);
let checked = 0;
await pool([...linkSources.keys()], 8, async (url) => {
  const r = await checkUrl(url);
  checked++;
  const where = [...linkSources.get(url)].join(", ");
  if (!r.ok) problems.add(`[LINK] ${url} — ${r.why} (on: ${where})`);
  else if (r.skipped) notes.add(`[LINK] ${url} — ${r.skipped}`);
});

if (notes.size) console.log("Notes:\n" + [...notes].map((n) => "  • " + n).join("\n") + "\n");
if (problems.size) {
  console.log("PROBLEMS TO FIX:\n" + [...problems].map((p) => "  ✗ " + p).join("\n"));
  console.log(`\n${problems.size} problem(s) found.`);
  process.exit(1);
}
console.log(`✓ ${paths.length} pages and ${checked} links all OK.`);
console.log("Reminder: still tap the Jotform forms, the chat assistant and the Subscribe box once on a real phone.");
