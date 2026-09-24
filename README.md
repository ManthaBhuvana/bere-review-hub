# The Venugopal Bere Educational Review

TanStack Start + React + Tailwind site, hosted on Vercel.

## Run locally
```
cp .env.example .env      # then fill in the Supabase key
npm ci
npm run dev
```

## Deploy (Vercel)
Push to GitHub; Vercel builds with `npm run build` (this first regenerates `sitemap.xml` and `robots.txt`).
Set these as Environment Variables in Vercel:
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SITE_URL` — the public address of the site (see below)

## Moving to a custom domain
No code change is needed:
1. Vercel → Project → Settings → Domains → add the domain, and set it as the primary domain
   (Vercel can redirect the old `*.vercel.app` address to it).
2. Vercel → Settings → Environment Variables → set `VITE_SITE_URL` to the new address, e.g. `https://www.yourdomain.com`.
3. Redeploy. Canonical URLs, share previews (og:image), citations, `sitemap.xml` and `robots.txt` all switch to the new domain.
4. Run `npm run check:links -- https://www.yourdomain.com` and fix anything it reports.
5. Add the new domain in Google Search Console and submit `https://www.yourdomain.com/sitemap.xml`.

## Before every release
```
npm run check:links -- https://your-site-address
```
Visits every page as a desktop and a mobile browser and checks every link, PDF/image download,
video thumbnail and embed, plus the page title, description, canonical URL and social-sharing tags.
Then tap the Jotform forms, chat assistant and Subscribe box once on a real phone.

## Where things live
- Site-wide wording, copyright, footer text, publication date, contact email, social links, site address: `src/lib/site.ts`
- Page titles / descriptions / share previews: `src/lib/seo.ts` (used by every route)
- Articles: `src/data/articles.ts`
- PDFs: `public/images/pdfs/`
- Framework infographics: `public/images/framework/` (WebP)

## Editorial style notes
- Publication is an *Independent Educational Review* — use "Review Issue" or "Issue", never "Journal Issue".
- The Bere Professional Learning Framework is a **Practice-Informed Conceptual Framework**.
- Copyright line: `© 2026 Venugopal Bere. All Rights Reserved.` Developer credit is separate
  ("Website Designed/Developed by Readmi Solutions").
