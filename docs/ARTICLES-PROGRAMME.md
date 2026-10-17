# Articles & Insights — 12-Week Publishing Programme
### Implementation guide for the developer · The Venugopal Bere Educational Review

Repository: `ManthaBhuvana/bere-review-hub` · Branch: `articles-insights-programme` · Stack: TanStack Start + React + Tailwind on Vercel, Supabase backend.

**How it works.** The four Volume 1, Issue 1 pages stay as they are (`src/data/articles.ts`). Every new weekly article is a row in the Supabase table `articles`. The database only lets the public see an article when `status = 'approved'` **and** `publish_at <= now()`. An article approved on Sunday and dated Monday 06:00 IST therefore appears by itself on Monday: on its page, in the archive, on the homepage and in `sitemap.xml`. No rebuild and no developer are needed. Articles and PDFs are managed at **`/admin`** (the Editorial Desk).

All code is in the branch / `articles-insights-programme.patch` (apply with `git am articles-insights-programme.patch`).

---

## STEP 0 — Get the code in (10 minutes)

```bash
git clone https://github.com/ManthaBhuvana/bere-review-hub.git && cd bere-review-hub
git checkout -b articles-insights-programme
git am /path/to/articles-insights-programme.patch     # adds 3 commits
npm ci && npm run build                                # must finish with "✓ built"
git push -u origin articles-insights-programme
```
Open a pull request on GitHub and **merge it normally** (no force-push, squash or rebase of pushed commits — the repo is linked to Lovable). Vercel deploys automatically. No new environment variables are needed.

## STEP 1 — Create the database (5 minutes)

1. Supabase → **SQL Editor** → New query → paste all of **`supabase/articles-programme.sql`** → **Run**.
   It creates tables `editors`, `articles`, `resources`, storage buckets `article-images` and `resources`, the preview function, the approval rules, and the 12 calendar weeks as hidden drafts. Safe to run again.
2. New query → paste all of **`supabase/article-01-content.sql`** → **Run**.
   It loads Article 1 (manuscript, references, closing question, related links, SEO) and the checklist record. The last line prints a check row — expect `in_review | 2026-10-19 06:00:00 | 1326 | 3 | t`.

Both files have been run and tested on PostgreSQL 16 (11 security and workflow tests passed — see the table at the end).

## STEP 2 — Create the two logins (5 minutes)

1. Supabase → **Authentication → Users → Add user → Create new user**: the Editor's email and a strong password, tick **Auto Confirm User**. Repeat for the developer.
2. Copy each user's **UID** and run in SQL Editor:
   ```sql
   insert into public.editors (user_id, role) values
     ('<EDITOR-UID>',    'editor'),     -- Venugopal Bere: the only role that can approve
     ('<DEVELOPER-UID>', 'developer');
   ```
3. **Authentication → Providers → Email** → turn **off** "Allow new users to sign up".

## STEP 3 — Run the automatic check

```bash
npm run verify:articles -- https://thereviewer.co.in
```
Every line should show ✓. It proves, as a public visitor, that drafts, the scheduled Article 1 and the unpublished PDF are all invisible. It also checks that the public cannot create, edit or upload, that preview links reject wrong tokens, and that the storage buckets exist.

---

# The ten points of the brief

Each point lists **Files** (where the code is), **Code** (the key lines) and **Process** (what to do).

## 1. Articles & Insights section

**Files**
| File | What it does |
|---|---|
| `src/routes/articles.index.tsx` | NEW · `/articles` archive with category filter |
| `src/routes/articles.$slug.tsx` | CHANGED · serves Volume 1 pages (unchanged) **and** new articles |
| `src/components/site/InsightArticlePage.tsx` | NEW · the article layout |
| `src/components/site/ArticleBody.tsx` | NEW · Markdown body, framework panel, download panel |
| `src/components/site/FrameworkCycle.tsx` | NEW · eight-stage framework visual |
| `src/components/site/ShareButtons.tsx` | NEW · LinkedIn, WhatsApp, Facebook, X, email, copy link, phone share |
| `src/components/site/ArticleCard.tsx` | NEW · cards for archive and homepage |
| `src/components/site/SiteNav.tsx` | CHANGED · "Articles & Insights" menu item |
| `src/lib/articles-db.ts` | NEW · all Supabase reads |

**Code** — the menu item (`SiteNav.tsx`):
```tsx
{ to: "/articles", label: "Articles & Insights", short: "Articles" },
```
The short label shows only on 1024–1279 px screens so the logo stays readable. "Home" is left out of the desktop menu because the logo links home; it stays in the phone menu.

The article route tries Volume 1 first, then the database (`articles.$slug.tsx`):
```tsx
const issueArticle = getArticleBySlug(params.slug);
if (issueArticle) return { kind: "issue", article: issueArticle };
const article = deps.preview
  ? await getArticlePreview(params.slug, deps.preview)   // secret preview link
  : await getPublishedArticle(params.slug);              // approved + date reached
if (!article) throw notFound();
```

**Process** — nothing to build. Verify on the live site that each requirement appears:

| Requirement | Shown as |
|---|---|
| SEO-friendly URL | `/articles/<slug>` |
| Title and subtitle | large serif title, italic subtitle |
| Author attribution | photo + "Venugopal Bere – Founder & Editor" |
| Date, category, reading time | "Monday 19 October 2026 · 7 min read" + series/category line |
| Headings and paragraphs | `##` sections, 70-character line length, tested at 390 px and 1366 px with no sideways scrolling |
| Featured image | full-width image under the header |
| References | separate **References** section, italic titles, clickable DOI |
| Related publications/frameworks/resources | labelled cards |
| Sharing | LinkedIn, WhatsApp, Facebook, X, email, copy link |
| Previous / Next | automatic from Week 2 onwards |
| Back to archive | top of page and after the article |
| Oxford Blue / Gold / White | existing tokens in `src/styles.css`; no new colours |

## 2. Weekly publishing schedule

**Files** — `supabase/articles-programme.sql` (visibility rule), `src/lib/articles-db.ts`.

**Code** — the rule that publishes automatically (`articles-programme.sql`):
```sql
create policy "public reads live articles" on public.articles
  for select to anon, authenticated
  using (status = 'approved' and publish_at <= now());
```

**Process**
1. **Monday** — automatic at 06:00 IST once approved. Nothing to do.
2. **Wednesday** — LinkedIn post. Use a tracked link so Analytics credits LinkedIn:
   `https://thereviewer.co.in/articles/why-one-day-teacher-training-rarely-transforms-classrooms?utm_source=linkedin&utm_medium=social&utm_campaign=articles_wk01`
   Change `wk01` to `wk02`, `wk03`… each week. The canonical tag keeps Google indexing the clean URL.
3. **Friday** — LinkedIn reflective post. Use the same link with `&utm_content=friday`. For Week 1, the article's closing question ("A Question for School Leaders") is ready-made.
4. **Last Saturday of the month** (31 Oct, 28 Nov, 26 Dec) — upload that month's resource (§5) and prepare the report (§8).

## 3. Twelve-week editorial calendar

**Files** — `supabase/articles-programme.sql` (section "12-week editorial calendar").

**Code**
```sql
insert into public.articles (week_number, slug, title, publish_at, status) values
  (1, 'why-one-day-teacher-training-rarely-transforms-classrooms',
      'Why One-Day Teacher Training Rarely Transforms Classrooms', '2026-10-19 06:00+05:30', 'draft'),
  (2, 'from-school-administrator-to-instructional-leader',
      'From School Administrator to Instructional Leader',        '2026-10-26 06:00+05:30', 'draft'),
  -- … weeks 3–12 …
```

**Process**
1. Already loaded by STEP 1. Open `/admin` — all 12 weeks are listed with dates. Weeks 2–12 show *Draft*, which the public never sees, so nothing looks published early.
2. Each week: open the week in `/admin` → paste the approved manuscript → follow §9.
3. Week 13 onwards: `/admin` → **New article** (dated one week after the last). No code changes ever needed.

## 4. Article 1 — "Why One-Day Teacher Training Rarely Transforms Classrooms"

**Files**
| File | Content |
|---|---|
| `supabase/article-01-content.sql` | NEW · the full manuscript and all Article 1 fields (run in STEP 1) |
| `src/components/site/FrameworkCycle.tsx` | NEW · framework visual, stage names exactly as in the manuscript |
| `public/images/articles/why-one-day-teacher-training-featured.webp` | NEW · featured image, 1200 × 630 |

**How the manuscript was prepared.** `Why_One-Day_Teacher_Training_Rarely_Transforms_Classrooms.docx` was converted to Markdown by script, not retyped. Only formatting was added:
- the 9 section titles became `##` headings, and Week 1–4 became `###`;
- the five questions became a bulleted list;
- one broken bold run in the framework line was joined.

A word-by-word comparison against the .docx found **no wording added, removed or changed**. The only text not in the article body is:
- **Title, subtitle and byline:** shown in the page header.
- **"A Question for School Leaders":** shown in the highlighted closing box, under that same heading.
- **References:** shown in the References section, verbatim.
- **Related Publication citation:** shown verbatim on the Related Publication card.
- **"Research • Reflect • Lead • Transform":** already in the site footer on every page.

Placement (in the SQL): `[[FRAMEWORK]]` sits right after "The cycle then continues." and `[[DOWNLOAD]]` right after the 30-Day Follow-Up section.

**Code** — the framework stages (`FrameworkCycle.tsx`); do not rename without the Editor's approval:
```ts
export const BERE_PLF_STAGES = [
  "School Vision", "Professional Learning Opportunities", "Classroom Implementation",
  "Observation & Instructional Coaching", "Reflective Practice",
  "Collaborative Professional Dialogue", "Evidence of Student Learning",
  "Continuous School Improvement",
] as const;
```
On desktop it is drawn as a 4 × 2 loop (1→4, down, 5→8, back to 1); on phones as a numbered column. If the Editor supplies his own diagram, upload it under *Framework visual* in `/admin` and it replaces this.

**Process**
1. Run `supabase/article-01-content.sql` (STEP 1) — Article 1 is now complete and *Awaiting approval*.
2. Open `/admin` → Week 1 → **Open preview** and read it through on a computer and a phone.
3. Copy **Preview link** on the Editorial Desk and send it to the Editor together with the **five points for the Editor** at the end of this guide.

## 5. Post-Training Classroom Implementation Checklist (PDF)

**Files**
| File | Content |
|---|---|
| `public/resources/post-training-classroom-implementation-checklist.pdf` | NEW · the checklist, served by the website |
| `docs/originals/post-training-classroom-implementation-checklist-original.pdf` | the Editor's file exactly as supplied (not public) |
| `supabase/article-01-content.sql` | creates the resource record and links it both ways |
| `src/components/site/DownloadableResources.tsx` | NEW · "Downloadable Resources" on `/resources` |
| `src/lib/analytics.ts` | NEW · download tracking |

**What was checked in the supplied PDF.** It is a 1-page A4 file (69 KB) with fonts embedded and text selectable, and it opens in every browser. One defect: the gold footer rule ran through the "Teacher signature / Reviewer / Date" line, so those fields printed struck through. The website copy moves that one line 10 points up, clear of the rule. Every word is identical (checked by text comparison), and a document title was added so phones show the checklist name instead of a file name. **This needs the Editor's OK** (point 2 below); to use the original instead:
```bash
cp docs/originals/post-training-classroom-implementation-checklist-original.pdf \
   public/resources/post-training-classroom-implementation-checklist.pdf
```

**Code** — the resource record (`article-01-content.sql`):
```sql
insert into public.resources (slug, title, subtitle, categories, file_url, file_name, status, publish_at)
values ('post-training-classroom-implementation-checklist',
        'Post-Training Classroom Implementation Checklist', '30-Day Professional Learning Follow-Up Tool',
        array['Teacher Professional Development', 'School Leadership'],
        '/resources/post-training-classroom-implementation-checklist.pdf',
        'post-training-classroom-implementation-checklist.pdf',
        'published', '2026-10-19 06:00+05:30');   -- hidden until Monday 06:00 IST
```
The download button (`ArticleBody.tsx`) saves the file with a clean name and sends the Analytics event:
```tsx
<a href={downloadUrl(resource)} download={downloadAttr(resource)} onClick={onDownload}>
  Download Checklist (PDF)
</a>
```

**Process**
1. Nothing to upload — the PDF deploys with the code and the record is created by STEP 1.
2. From Monday it appears in three places, all linked back to Article 1:
   - a prominent **DOWNLOAD CHECKLIST (PDF)** panel inside the article, with a *View online* button;
   - the article sidebar on desktop;
   - `/resources` → *Downloadable Resources* (category "Teacher Professional Development / School Leadership"), with "Read the accompanying article".
3. Monday test: tap **Download Checklist (PDF)** on an Android phone (it saves), an iPhone (it opens; Share → Save to Files) and a computer (it saves).
4. Future months: `/admin` → **Upload a new resource** (stored in Supabase Storage — no developer needed).

## 6. SEO for Article 1

**Files** — `supabase/article-01-content.sql` (values), `articles.$slug.tsx` → `insightHead()` (tags), `src/routes/sitemap[.]xml.tsx` (live sitemap), `scripts/generate-seo-files.mjs` (robots.txt).

**Code** — values loaded exactly as supplied:
```sql
seo_title       = 'Why One-Day Teacher Training Rarely Transforms Classrooms | Venugopal Bere',
seo_description = 'Explore why one-day teacher training often fails to produce lasting classroom change and discover practical strategies for continuous professional learning.',
seo_keywords    = 'Teacher Professional Development, Teacher Training, Instructional Leadership, Professional Learning, Classroom Observation, Teacher Reflection, School Improvement, Venugopal Bere',
```
Each article page outputs a canonical URL, Open Graph and X tags using the featured image, and `Article` + breadcrumb structured data. Preview links carry `noindex`. `robots.txt` blocks `/admin`. The sitemap is generated on every request, so Article 1 enters it at 06:00 IST Monday by itself.

**Process**
1. Before Monday: `https://thereviewer.co.in/sitemap.xml` must **not** list Article 1 (the verify script checks this).
2. Monday after 06:00: open the sitemap — Article 1 is listed.
3. Google Search Console → **URL Inspection** → paste the article URL → **Request indexing**. Under **Sitemaps**, resubmit `https://thereviewer.co.in/sitemap.xml` once (it is now generated live).
4. Test the share preview: paste the URL into a LinkedIn post draft — the featured image, title and description should appear.

Note: the SEO title is 74 characters; Google may shorten it on small screens. It is kept exactly as specified.

## 7. Homepage — Latest Articles

**Files** — `src/routes/index.tsx` (CHANGED), `ArticleCard.tsx`.

**Code**
```tsx
loader: async () => ({ latestArticles: await listLatestArticlesSafe(3) }),
…
{latestArticles.length > 0 && ( <section> … "Latest Articles" … <ArticleCard/> × 3 </section> )}
```

**Process** — nothing to do. The section is hidden until Article 1 is live. From Monday it shows the three most recent articles: image, title, summary, date, reading time and **READ ARTICLE**. It updates itself each Monday. If Supabase is ever slow, the homepage waits at most 2.5 seconds and then loads without the section, so it can never break the homepage.

## 8. Analytics (GA4 `G-L0296QWPTF`, already on every page)

**Files** — `src/lib/analytics.ts` (NEW), called from the article page, share buttons, download buttons and `SubscribeForm.tsx`.

**Code**
```ts
track("resource_download", { resource_slug, resource_title, file_name, article_slug, placement });
track("article_view",      { article_slug, article_title, article_category, article_series });
track("article_to_resource", { article_slug, link_url, link_kind });
track("share",             { method, content_type: "article", item_id });
track("sign_up",           { method: "newsletter", form_location });
```

**Process — one-time GA4 setup (Admin):**
1. **Data streams → Web → Enhanced measurement**: keep on. Under *Page views → Show advanced settings*, keep "Page changes based on browser history events" ticked.
2. **Custom definitions → Create custom dimension** (scope *Event*), one each for: `article_slug`, `article_category`, `resource_title`, `placement`, `link_kind`, `form_location`.
3. **Events → Key events**: mark `resource_download` and `sign_up`.
4. Count downloads with `resource_download` only. GA's automatic `file_download` may fire on the same click, so don't add the two together.

**Monthly report (last Saturday)** — where each figure is:
| Brief asks for | GA4 location |
|---|---|
| Page views, unique readers, engagement time | Reports → Engagement → **Pages and screens**, filter path contains `/articles/` |
| Traffic sources | Reports → Acquisition → **Traffic acquisition** |
| Article-to-resource navigation | Engagement → Events → `article_to_resource` by `link_kind` |
| PDF downloads | Engagement → Events → `resource_download` by `resource_title` |
| Sharing | Engagement → Events → `share` by `method` |
| Newsletter | Engagement → Events → `sign_up` (subscriber list: Supabase → table `subscribers`) |
| Returning visitors | Explore → Free form → dimension *New / established*, metric *Active users* |

Report outline: top 3 articles, top resources, traffic sources, new vs returning, 3 improvement ideas.

## 9. Editorial approval and publishing protocol

**Files** — `supabase/articles-programme.sql` → function `articles_protocol()`, `src/routes/admin.index.tsx`, `src/routes/admin.articles.$id.tsx`.

**Code** — enforced by the database:
```sql
if new.status = 'approved' and (tg_op = 'INSERT' or old.status is distinct from 'approved') then
  if r is distinct from 'editor' then
    raise exception 'Only the Founder & Editor can approve an article for publication.';
  end if;
…
-- a developer editing an approved article's content sends it back to 'in_review'
```

**Process**
| Brief step | In `/admin` |
|---|---|
| Article Received | manuscript in the week's row |
| Webpage Prepared | images, references, links, SEO checked |
| Preview Shared | **Send for approval** → *Awaiting approval* → copy **Preview link** to the Editor |
| Editorial Approval Obtained | Editor signs in → **Approve & schedule** |
| Article Scheduled | *Approved · Scheduled* |
| Article Published | automatic at the date → *Live* |
| Links Tested | `npm run verify:articles -- https://thereviewer.co.in` and `npm run check:links -- https://thereviewer.co.in` |

Any change to wording, references, quotations or framework terms must be sent to the Editor first. Technically, any content edit by the developer after approval automatically withdraws the approval.

## 10. Immediate actions — this weekend

| When | Who | Action |
|---|---|---|
| **Sat 17 Oct** | Developer | STEP 0 → STEP 3. Open the Article 1 preview on a computer and a phone. Send the preview link + the five points below to the Editor. |
| **Sun 18 Oct** | Editor | Review the preview and answer the five points. Sign in to `/admin` → Week 1 → **Approve & schedule**. |
| **Sun 18 Oct** | Developer | `VERIFY_EMAIL=… VERIFY_PASSWORD=… npm run verify:articles -- https://thereviewer.co.in` — every line ✓ (it checks the manuscript, images, SEO, the 06:00 IST time, that the PDF opens, and approval). |
| **Mon 19 Oct, after 06:00 IST** | Developer | Re-run the verify script (now checks the sitemap); open the article, homepage and `/resources`; test the PDF on Android, iPhone and desktop; Search Console → Request indexing. |
| **Wed 21 Oct** | Editor | LinkedIn post with the `wk01` link (§2). |
| **Fri 23 Oct** | Editor | LinkedIn reflective post. |
| **Sat 31 Oct** | Both | First monthly resource and analytics report. |

**Answers to the two questions in the brief**
- **Does the system support advance scheduling?** Yes. Approve any time before the date; it publishes itself at the set date and time (default 06:00 IST).
- **Can future uploads be managed without a developer?** Yes. Articles, images and PDFs are all managed at `/admin`. A developer is needed only for design or structural changes.

---

## Five points for the Editor (send with the preview link)

1. **Subtitle capitalisation.** The manuscript has *"The missing link between professional development and meaningful classroom change"*. The brief has *"The Missing Link Between Professional Development and Meaningful Classroom Change"*. The page uses the brief's version. Please confirm.
2. **Checklist PDF correction.** In the supplied PDF the footer line crossed through "Teacher signature / Reviewer / Date". The website copy moves that line up so it prints clearly; nothing else changed. Please approve, or ask for the original to be used.
3. **Framework visual.** The article shows your eight stages as a cycle, using your exact wording. If you have your own diagram, send it and it will replace this one. Separately, the existing framework page shows a four-pillar diagram (Research, Policy, Leadership, Practice), which differs from the eight stages in this article. Would you like that page updated? No change has been made to it.
4. **Placement.** The framework visual follows "The cycle then continues." The download panel follows the 30-Day Follow-Up section. Please confirm, or name other positions.
5. **Featured image.** The photo is from your own training session (the "What happens when a teacher stops changing?" slide). Please confirm, or send a preferred image.

For awareness only (no change made): the article's 30-day weeks are *Choose and Plan / Implement / Reflect and Collaborate / Review the Evidence*, while the PDF uses *Plan / Implement / Reflect & Collaborate / Review*. The article says *continue, refine or reconsider*; the PDF's Week 4 says *continue, modify or discontinue*.

---

## Test record

**Database (PostgreSQL 16, Supabase auth/storage stand-in): all passed**

| # | Test | Result |
|---|---|---|
| T1 | Public sees no draft or scheduled articles | 0 visible ✓ |
| T2 | Public cannot create an article | blocked ✓ |
| T3 | Developer cannot approve | blocked with message ✓ |
| T4 | Editor approves | approved, time-stamped ✓ |
| T5 | Approved but before Monday: still hidden, PDF hidden | 0 / 0 ✓ |
| T6 | Preview link: right token shows article + PDF; wrong token rejected | ✓ |
| T7 | At publication time: public sees exactly Article 1 + checklist | ✓ |
| T8 | Developer edits approved text → back to *Awaiting approval*, hidden | ✓ |
| T9 | A non-content change keeps the approval | ✓ |
| T10 | Public upload blocked; Editor upload allowed | ✓ |
| T11 | Weeks 2–12 remain hidden drafts | 11 ✓ |

**Website:** type-check, lint and production build pass. Article 1 was rendered with its real content in Chromium at 390 px (phone) and 1366 px (laptop), with no sideways scrolling. The logo is readable at 1024, 1280, 1366 and 1440 px. The homepage, archive, `/resources` and sitemap still load if Supabase is unreachable.
