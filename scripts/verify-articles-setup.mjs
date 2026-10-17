// Checks that the Articles & Insights setup is safe and ready.
//
//   npm run verify:articles
//   npm run verify:articles -- https://thereviewer.co.in        (also checks the live site)
//
// Optional — also check Article 1 is ready for Monday (uses an /admin login):
//   VERIFY_EMAIL=you@example.com VERIFY_PASSWORD=... npm run verify:articles
//
// Reads VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY from the environment or .env.

import { existsSync, readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const env = { ...process.env };
for (const f of [".env", ".env.local"]) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !env[m[1]]) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const URL_ = env.VITE_SUPABASE_URL;
const KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!URL_ || !KEY) {
  console.error("Missing VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY");
  process.exit(1);
}

const site = (process.argv[2] ?? "").replace(/\/+$/, "");
const ARTICLE1 = "why-one-day-teacher-training-rarely-transforms-classrooms";
let failures = 0;
let warnings = 0;
const ok = (m) => console.log(`  ✓ ${m}`);
const bad = (m) => (failures++, console.log(`  ✗ ${m}`));
const warn = (m) => (warnings++, console.log(`  ! ${m}`));
const now = new Date().toISOString();

const anon = createClient(URL_, KEY, { auth: { persistSession: false } });

console.log("\n1. Database tables (as a public visitor)");
{
  const { error } = await anon.from("articles").select("id").limit(1);
  if (error)
    bad(
      `articles table not reachable: ${error.message} — has supabase/articles-programme.sql been run?`,
    );
  else ok("articles table exists");

  const r = await anon.from("resources").select("id").limit(1);
  if (r.error) bad(`resources table not reachable: ${r.error.message}`);
  else ok("resources table exists");
}

console.log("\n2. Nothing unpublished is visible to the public");
{
  const drafts = await anon.from("articles").select("slug").neq("status", "approved");
  if (drafts.error) bad(drafts.error.message);
  else if (drafts.data.length)
    bad(
      `public can see ${drafts.data.length} unapproved article(s): ${drafts.data.map((d) => d.slug).join(", ")}`,
    );
  else ok("no drafts or articles awaiting approval are visible");

  const future = await anon.from("articles").select("slug").gt("publish_at", now);
  if (future.error) bad(future.error.message);
  else if (future.data.length)
    bad(`public can see future-dated article(s): ${future.data.map((d) => d.slug).join(", ")}`);
  else ok("no future-dated articles are visible");

  const tok = await anon.from("articles").select("preview_token").limit(1);
  if (!tok.error && tok.data.some((d) => d.preview_token))
    warn(
      "preview tokens of live articles are readable (harmless: those articles are already public)",
    );

  const rdrafts = await anon
    .from("resources")
    .select("slug")
    .or(`status.neq.published,publish_at.gt."${now}"`);
  if (rdrafts.error) bad(rdrafts.error.message);
  else if (rdrafts.data.length)
    bad(`public can see unpublished resource(s): ${rdrafts.data.map((d) => d.slug).join(", ")}`);
  else ok("no unpublished or future resources are visible");

  const subs = await anon.from("subscribers").select("email").limit(1);
  if (!subs.error && subs.data.length) bad("public can READ the subscriber list");
  else ok("subscriber list is private");
}

console.log("\n3. The public cannot write");
{
  const ins = await anon
    .from("articles")
    .insert({ slug: `verify-${Date.now()}`, title: "x", publish_at: now });
  if (ins.error) ok("public cannot create articles");
  else bad("PUBLIC CAN CREATE ARTICLES — check the row-level security policies");

  const upd = await anon.from("articles").update({ title: "x" }).eq("slug", ARTICLE1).select("id");
  if (upd.error || !upd.data?.length) ok("public cannot edit articles");
  else bad("PUBLIC CAN EDIT ARTICLES — check the row-level security policies");

  const up = await anon.storage
    .from("resources")
    .upload(`verify-${Date.now()}.txt`, new Blob(["x"]), { contentType: "text/plain" });
  if (up.error) ok("public cannot upload files");
  else bad("PUBLIC CAN UPLOAD FILES — check the storage policies");
}

console.log("\n4. Preview links and storage");
{
  const p = await anon.rpc("get_article_preview", {
    p_slug: ARTICLE1,
    p_token: "00000000-0000-0000-0000-000000000000",
  });
  if (p.error) bad(`preview function missing: ${p.error.message}`);
  else if (p.data) bad("preview function returned an article for a WRONG token");
  else ok("preview function exists and rejects wrong tokens");

  for (const bucket of ["article-images", "resources"]) {
    const res = await fetch(`${URL_}/storage/v1/object/public/${bucket}/__verify_missing__.pdf`);
    const body = await res.text();
    if (/bucket not found/i.test(body)) bad(`storage bucket "${bucket}" does not exist`);
    else ok(`storage bucket "${bucket}" exists and is public`);
  }
}

if (env.VERIFY_EMAIL && env.VERIFY_PASSWORD) {
  console.log("\n5. Editorial Desk login and Article 1 readiness");
  const ed = createClient(URL_, KEY, { auth: { persistSession: false } });
  const { data: auth, error } = await ed.auth.signInWithPassword({
    email: env.VERIFY_EMAIL,
    password: env.VERIFY_PASSWORD,
  });
  if (error) bad(`sign-in failed: ${error.message}`);
  else {
    const role = await ed.from("editors").select("role").eq("user_id", auth.user.id).maybeSingle();
    if (!role.data) bad(`this login is not in the editors table (UID ${auth.user.id})`);
    else ok(`signed in as ${role.data.role}`);

    const cal = await ed
      .from("articles")
      .select("week_number,slug,status,publish_at")
      .order("publish_at");
    const weeks = (cal.data ?? []).filter((a) => a.week_number >= 1 && a.week_number <= 12);
    weeks.length === 12
      ? ok("all 12 calendar entries present")
      : bad(`expected 12 calendar entries, found ${weeks.length}`);

    const { data: a } = await ed
      .from("articles")
      .select(
        "title,subtitle,body_md,reference_list,reflective_question,featured_image_url,framework_image_url,seo_title,seo_description,status,publish_at,resource_id,body_md",
      )
      .eq("slug", ARTICLE1)
      .maybeSingle();
    if (!a) bad("Article 1 row not found");
    else {
      const words = a.body_md.trim() ? a.body_md.trim().split(/\s+/).length : 0;
      words > 300
        ? ok(`manuscript pasted (${words.toLocaleString()} words)`)
        : bad("manuscript not pasted yet");
      /^##\s/m.test(a.body_md)
        ? ok("manuscript has subheadings")
        : warn("no ## subheadings found in the manuscript");
      a.reference_list.length
        ? ok(`${a.reference_list.length} reference(s)`)
        : warn("no references entered");
      a.reflective_question
        ? ok("concluding reflective question entered")
        : bad("concluding reflective question missing");
      a.featured_image_url ? ok("featured image set") : bad("featured image missing");
      a.framework_image_url
        ? ok("framework visual uploaded")
        : warn("no framework visual uploaded (panel will show without an image)");
      a.seo_title && a.seo_description
        ? ok("SEO title and description set")
        : bad("SEO metadata missing");
      new Date(a.publish_at).toISOString() === "2026-10-19T00:30:00.000Z"
        ? ok("scheduled for Monday 19 Oct 2026, 06:00 IST")
        : warn(`publication time is ${a.publish_at} (expected 2026-10-19 06:00 IST)`);

      if (!a.resource_id) bad("checklist PDF not linked to Article 1");
      else {
        const { data: r } = await ed
          .from("resources")
          .select("title,file_url,status,publish_at")
          .eq("id", a.resource_id)
          .single();
        ok(`linked resource: ${r.title}`);
        r.status === "published"
          ? ok("resource set to Published (shows from its date)")
          : bad("resource is still Draft");
        const pdfUrl = r.file_url.startsWith("/")
          ? `${site || "https://thereviewer.co.in"}${r.file_url}`
          : r.file_url;
        const head = await fetch(pdfUrl, { method: "HEAD" });
        const type = head.headers.get("content-type") ?? "";
        head.ok && type.includes("pdf")
          ? ok(
              `PDF opens (${type}, ${Math.round(Number(head.headers.get("content-length") ?? 0) / 1024)} KB)`,
            )
          : bad(`PDF does not open correctly (HTTP ${head.status}, ${type})`);
      }

      const statusMsg = { draft: "Draft", in_review: "Awaiting approval", approved: "Approved" }[
        a.status
      ];
      a.status === "approved"
        ? ok("approved by the Editor")
        : warn(`status is "${statusMsg}" — needs the Editor's approval before Monday`);
    }
    await ed.auth.signOut();
  }
} else {
  console.log("\n5. (skipped) set VERIFY_EMAIL and VERIFY_PASSWORD to check Article 1 readiness");
}

if (site) {
  console.log(`\n6. Live site ${site}`);
  for (const [path, must] of [
    ["/articles", "Articles &amp; Insights"],
    ["/sitemap.xml", "<urlset"],
    ["/robots.txt", "Disallow: /admin"],
  ]) {
    try {
      const res = await fetch(site + path);
      const body = await res.text();
      res.ok && body.includes(must)
        ? ok(`${path} OK`)
        : bad(`${path} — HTTP ${res.status}, expected content missing`);
    } catch (e) {
      bad(`${path} — ${e.message}`);
    }
  }
  const sm = await (await fetch(`${site}/sitemap.xml`)).text().catch(() => "");
  const a1Live = sm.includes(ARTICLE1);
  const isLiveTime = Date.now() >= Date.parse("2026-10-19T00:30:00Z");
  if (isLiveTime)
    a1Live
      ? ok("Article 1 is in the sitemap")
      : bad("Article 1 is not in the sitemap yet (approved?)");
  else
    !a1Live
      ? ok("Article 1 is correctly NOT in the sitemap before Monday")
      : bad("Article 1 is in the sitemap before its date");
}

console.log(
  `\n${failures ? `✗ ${failures} problem(s)` : "✓ No problems"}${warnings ? `, ${warnings} warning(s)` : ""}\n`,
);
process.exit(failures ? 1 : 0);
