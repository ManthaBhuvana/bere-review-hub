# Articles & Insights — 12-Week Publishing Programme

Implementation guide for the brief "Educational Articles Publishing Programme" (starts Monday 19 October 2026).
Branch: `articles-insights-programme`.

## How it works (one paragraph)

The four Volume 1, Issue 1 pieces stay exactly as they are (`src/data/articles.ts`). Every **new** weekly article
lives in Supabase (table `articles`). The database itself decides what the public can see: an article is visible
only when `status = 'approved'` **and** `publish_at <= now()`. So an article approved on Saturday and dated Monday
06:00 IST appears by itself on Monday — on its page, in the archive, on the homepage, and in `sitemap.xml` — with
no rebuild and no developer. Drafts and scheduled articles are invisible everywhere except through a secret
preview link. Articles and PDFs are managed at **`/admin`** (the Editorial Desk).

---

## Part A — One-time setup (do this first, in this order)

**A1. Merge the code.** Open a pull request from `articles-insights-programme` into the branch Vercel deploys, review,
and merge (normal merge — do not force-push or squash already-pushed commits, because the repo syncs with Lovable).
Vercel installs the two new packages (`react-markdown`, `remark-gfm`) automatically. No new environment variables.

**A2. Create the database tables.** Supabase → SQL Editor → New query → paste all of
`supabase/articles-programme.sql` → Run. This creates `editors`, `articles`, `resources`, the two storage buckets,
the preview function, the approval rules, and the 12 calendar entries as **drafts**.

**A3. Create the two log-ins.**
1. Supabase → Authentication → Users → *Add user* → *Create new user*: the Editor's email + a strong password,
   tick *Auto confirm*. Repeat for the developer.
2. Copy each user's **UID**, then in SQL Editor run:
   ```sql
   insert into public.editors (user_id, role) values
     ('<EDITOR-UID>',    'editor'),     -- Venugopal Bere: the only role that can approve
     ('<DEVELOPER-UID>', 'developer');
   ```
3. Supabase → Authentication → Providers → Email: turn **off** "Allow new users to sign up", so nobody else can
   create an account.

**A4. Check the deployment.** Visit, in order:
- `/articles` — the archive shows "New articles are published every Monday" (nothing is live yet — correct).
- `/sitemap.xml` — lists the site pages plus `/articles`; no draft articles.
- `/admin` — sign in; the Editorial Desk lists Weeks 1–12 as *Draft*.
- Homepage — the *Latest Articles* section is hidden until the first article is live (correct).

---

## Part B — The ten points of the brief

### 1. Articles & Insights section

Already built — the developer's job is only to verify. "Articles & Insights" is in the main menu (desktop and
mobile) and in site search, pointing to `/articles`.

| Requirement | Where it comes from |
|---|---|
| Own page, SEO-friendly URL | `/articles/<slug>`; slug editable in /admin ("From title" button) |
| Title + subtitle | *Title*, *Subtitle* fields |
| Author attribution | defaults to "Venugopal Bere – Founder & Editor" |
| Date, category, reading time | *Publication date*, *Category*; reading time auto-calculated (≈200 words/min) or set manually |
| Headings, readable paragraphs | Markdown `##` subheadings; 70-character line length; tuned spacing for desktop and mobile |
| Featured image | *Featured image* (upload in /admin; 1200 × 630 px also becomes the LinkedIn/WhatsApp preview) |
| References | *References* field → separate References section |
| Related publications/frameworks/resources | *Related links* field → labelled cards |
| Sharing | LinkedIn, WhatsApp, Facebook, X, email, copy link (+ phone share sheet) |
| Previous / Next | automatic, by publication date, live articles only |
| Back to archive | top of page and after the article |

Colours use the existing Oxford Blue / Gold / White tokens from `src/styles.css`; no new palette.

### 2. Weekly publishing schedule

1. **Monday — website (automatic).** Approved articles go live at 06:00 IST on their date. To change the time,
   edit *Publication date & time* in /admin.
2. **Wednesday — LinkedIn.** Post with a tracked link so Google Analytics shows LinkedIn as the source:
   `https://thereviewer.co.in/articles/<slug>?utm_source=linkedin&utm_medium=social&utm_campaign=articles_wk01`
   (change `wk01` each week). The canonical tag keeps Google indexing the clean URL.
3. **Friday — reflective question/insight.** A LinkedIn post (no website change needed), using the same UTM link
   with `utm_content=friday`.
4. **Last Saturday of each month — resource + analytics.** Upload the PDF in /admin → Resources (see §5), then
   prepare the monthly report (see §8). Dates: 31 Oct, 28 Nov, 26 Dec 2026.

### 3. Twelve-week editorial calendar

All 12 titles and dates are already entered as **drafts** (they never appear publicly until approved, so nothing
looks published early). Each draft already has its intended URL, e.g.
`/articles/from-school-administrator-to-instructional-leader`. For Week 13 onward: /admin → **New article**
(dated one week after the last one). No structural or code changes are needed for future articles.

### 4. Article 1 — "Why One-Day Teacher Training Rarely Transforms Classrooms"

Pre-filled by the SQL: subtitle, category, series, URL
`/articles/why-one-day-teacher-training-rarely-transforms-classrooms`, publication date (Mon 19 Oct 2026, 06:00
IST), SEO title/description/keywords, featured image
(`public/images/articles/why-one-day-teacher-training-featured.webp`, from the Review's own training photographs —
replace it in /admin if the Editor prefers another), Related Publication (Volume 1, Issue 1) and Related Framework.

Steps for the developer:
1. /admin → Week 1 → paste the **approved manuscript** into *Approved manuscript*. Do not edit wording,
   quotations, references or framework terminology. Only add formatting:
   - each subheading on its own line starting with `## `
   - quotations start with `> `; lists with `- `
   - from Word, `pandoc article.docx -t gfm -o article.md` converts headings and lists automatically
2. Put `[[FRAMEWORK]]` on its own line where the manuscript discusses the Bere Professional Learning Framework, and
   upload the Editor's framework visual in *Framework visual*. Use the Editor's own diagram — do not draw one.
   (Note for the Editor: the current framework web page shows a four-pillar diagram, while Volume 1 describes an
   eight-stage framework; please confirm which visual belongs in this article.)
3. Put `[[DOWNLOAD]]` on its own line where the checklist button should appear (a natural spot is just before the
   conclusion). If omitted, the button appears after the article body.
4. Paste the references into *References*, one per line, exactly as supplied.
5. Paste the concluding question into *Concluding reflective question* (shown as "Pause & Reflect").
6. Write a 1–2 sentence *Card summary* for the homepage, or leave it empty to use the first paragraph.
7. *Save* → use the *Preview* tab → **Send for approval** → copy *Preview link* from the Editorial Desk and send it
   to the Editor. Continue with §9.

### 5. The Post-Training Classroom Implementation Checklist (PDF)

1. /admin → **Upload a new resource**:
   - Title: `Post-Training Classroom Implementation Checklist`
   - Subtitle: `30-Day Professional Learning Follow-Up Tool`
   - Categories: `Teacher Professional Development, School Leadership`
   - Accompanies article: *Wk 1: Why One-Day Teacher Training…*
   - Visible from: `19/10/2026 06:00` · Status: **Published** (it still stays hidden until that moment)
   - PDF file: the final PDF
2. *Upload resource*. This stores the PDF in Supabase Storage, links it to Article 1, and from Monday shows it
   (a) as a prominent **DOWNLOAD CHECKLIST (PDF)** panel inside the article, (b) in the article sidebar on desktop,
   and (c) on `/resources` under *Downloadable Resources*, with "Read the accompanying article" linking back.
3. Click *Test PDF* in /admin on a phone and on a computer. The download button saves the file with a clean name
   (`post-training-classroom-implementation-checklist.pdf`); *View online* opens it in the browser.
4. Download tracking is automatic (event `resource_download`, see §8).

### 6. SEO for Article 1

- SEO title, meta description and keywords are pre-filled exactly as supplied. (The title is 74 characters;
  Google may shorten it on narrow screens. The /admin counter shows the length.)
- Canonical URL is `https://thereviewer.co.in/articles/why-one-day-teacher-training-rarely-transforms-classrooms`.
- Structured data (`Article` + breadcrumb), Open Graph and X cards use the featured image.
- `/sitemap.xml` adds the article automatically at 06:00 IST Monday. Previews carry `noindex` and are never in the
  sitemap; `/admin` is blocked in `robots.txt`.
- After it is live (Monday): Google Search Console → URL Inspection → paste the article URL → *Request indexing*.
  Confirm `https://thereviewer.co.in/sitemap.xml` is submitted under *Sitemaps* (resubmit once, since it is now
  generated live).

### 7. Homepage — Latest Articles

Automatic. The section appears above the Principal Feature as soon as the first article is live and always
shows the three most recent live articles (featured image, title, summary, date, reading time, **READ ARTICLE**).
Nothing to do each week.

### 8. Analytics (GA4 property `G-L0296QWPTF`, already on every page)

Events the site now sends:

| Event | When | Parameters |
|---|---|---|
| `page_view` | every page (GA4 automatic) | — |
| `article_view` | an article page opens | `article_slug`, `article_title`, `article_category`, `article_series` |
| `resource_download` | a PDF download/view is clicked | `resource_slug`, `resource_title`, `file_name`, `article_slug`, `placement` |
| `article_to_resource` | reader clicks a related publication/framework/resource | `article_slug`, `link_url`, `link_kind` |
| `share` | a share button is clicked | `method`, `content_type`, `item_id` |
| `sign_up` | newsletter subscription succeeds | `method` = newsletter, `form_location` |

One-time GA4 settings (Admin):
1. *Data streams → Enhanced measurement*: keep **Page views** on, and under its advanced settings keep
   "Page changes based on browser history events" on (the site is a single-page app).
2. *Custom definitions → Create custom dimension* (scope **Event**) for: `article_slug`, `article_category`,
   `resource_title`, `placement`, `link_kind`, `form_location`.
3. *Events*: mark `resource_download` and `sign_up` as **Key events**.
4. Use `resource_download` for download counts; GA's own `file_download` may also fire for the same click, so do
   not add the two together.

Monthly report (last Saturday) — where to find each figure:
- Most-read articles, unique readers, engagement time: *Reports → Engagement → Pages and screens*, filter page path
  contains `/articles/` (columns: Views, Active users, Average engagement time).
- Traffic sources: *Acquisition → Traffic acquisition* (LinkedIn appears via the UTM links in §2).
- Most-downloaded resources: *Engagement → Events → resource_download*, broken down by `resource_title`.
- Article → resource navigation: event `article_to_resource` by `link_kind`.
- Shares: event `share` by `method`. Newsletter: event `sign_up`; the subscriber list itself is in Supabase →
  table `subscribers`.
- Returning visitors: *Explore → Free form*, dimension *New / established*, metric *Active users*.

Suggested report outline: top 3 articles, top resources, traffic sources, new vs returning, 3 improvement ideas.

### 9. Editorial approval and publishing protocol

| Brief step | On the site |
|---|---|
| Article Received | manuscript pasted into a *Draft* |
| Webpage Prepared | images, references, links, SEO checked |
| Preview Shared | **Send for approval** → status *Awaiting approval* → send the preview link |
| Editorial Approval Obtained | the Editor signs in to /admin and clicks **Approve & schedule** |
| Article Scheduled | status *Approved · Scheduled* |
| Article Published | automatic at the publication time → status *Live* |
| Links Tested | run `npm run check:links -- https://thereviewer.co.in` and open the page on a phone |

These rules are enforced by the database, not just by convention: only the `editor` role can approve; if a
`developer` changes the content of an approved article, it automatically returns to *Awaiting approval* and will
not go live until the Editor approves again. Any editorial change must be referred to the Editor before it is made.

### 10. Immediate actions (today is Saturday 17 October)

1. **Sat 17 Oct** — Part A (merge, SQL, log-ins). Upload the checklist PDF (§5).
2. **Sat 17 / Sun 18 Oct** — prepare Article 1 (§4) and send the preview link to the Editor.
3. **Sun 18 Oct** — the Editor reviews and clicks *Approve & schedule*.
4. **Mon 19 Oct, after 06:00 IST** — open the article, the homepage, `/resources` and `/sitemap.xml`; test the PDF
   on a phone; run `check:links`; request indexing in Search Console.
5. **Wed 21 Oct** — LinkedIn post with the UTM link.

Answers to the two questions in the brief:
- **Advance scheduling?** Yes. Approve any time before the date; it publishes itself at the set date and time.
- **Future uploads without a developer?** Yes. Articles, images and PDFs are all managed at `/admin`. A developer
  is needed only for design or structural changes.

---

## Files changed

- `supabase/articles-programme.sql` — tables, security rules, approval rules, calendar
- `src/lib/articles-db.ts`, `src/lib/analytics.ts` — data access, GA4 events
- `src/routes/articles.index.tsx` — archive · `src/routes/articles.$slug.tsx` — article page (Volume 1 pages unchanged)
- `src/routes/sitemap[.]xml.tsx` — live sitemap (replaces the build-time `public/sitemap.xml`)
- `src/routes/admin.index.tsx`, `src/routes/admin.articles.$id.tsx`, `src/components/admin/admin-kit.tsx` — Editorial Desk
- `src/components/site/` — `InsightArticlePage`, `ArticleBody`, `ArticleCard`, `ShareButtons`, `DownloadableResources`
- `src/routes/index.tsx` (Latest Articles), `src/routes/resources.tsx` (Downloadable Resources),
  `src/components/site/SiteNav.tsx` (menu item), `src/components/site/SubscribeForm.tsx` (sign-up event)
- `scripts/generate-seo-files.mjs` — now writes only `robots.txt` (adds `Disallow: /admin`)
- `public/images/articles/why-one-day-teacher-training-featured.webp` — Article 1 featured image
