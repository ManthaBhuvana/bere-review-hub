-- =============================================================================
-- Articles & Insights + Resources — run ONCE in Supabase:
--   Dashboard → SQL Editor → New query → paste this whole file → Run.
-- Safe to re-run (uses "if not exists" / "or replace" / "on conflict").
--
-- What it creates
--   • editors        — who may log in to /admin, and with which role
--   • articles       — one row per article (scheduled, previewable, approvable)
--   • resources      — downloadable PDFs (Resources section + article CTA)
--   • storage buckets "article-images" and "resources" (public read)
--   • get_article_preview(slug, token) — lets the Editor read a draft via a
--     secret preview link without making it public
--   • the 12-week editorial calendar as DRAFTS (never visible to the public)
--
-- Visibility rule (enforced in the database, not just the website):
--   the public can read an article only when
--     status = 'approved'  AND  publish_at <= now()
--   so an approved article dated next Monday appears by itself on Monday.
-- =============================================================================

-- ---------------------------------------------------------------- editors ----
create table if not exists public.editors (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  role       text not null check (role in ('editor', 'developer')),
  created_at timestamptz not null default now()
);
alter table public.editors enable row level security;

drop policy if exists "editors read own row" on public.editors;
create policy "editors read own row" on public.editors
  for select to authenticated using (user_id = auth.uid());

create or replace function public.current_editor_role()
returns text language sql stable security definer set search_path = public as $$
  select role from public.editors where user_id = auth.uid();
$$;

-- --------------------------------------------------------------- articles ----
create table if not exists public.articles (
  id                   uuid primary key default gen_random_uuid(),
  slug                 text not null unique
                         check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  week_number          int,
  title                text not null,
  subtitle             text,
  author               text not null default 'Venugopal Bere',
  author_role          text not null default 'Founder & Editor',
  category             text not null default 'Teacher Professional Development',
  series               text,
  excerpt              text,              -- 1–2 sentences for cards
  body_md              text not null default '',  -- the approved manuscript, in Markdown
  featured_image_url   text,
  featured_image_alt   text,
  framework_image_url  text,              -- visual used by [[FRAMEWORK]] in the body
  reference_list       text[] not null default '{}',
  related_links        jsonb  not null default '[]',  -- [{label,url,kind}]
  reflective_question  text,
  reading_time_minutes int,               -- leave empty to auto-calculate
  seo_title            text,
  seo_description      text,
  seo_keywords         text,
  resource_id          uuid,
  status               text not null default 'draft'
                         check (status in ('draft', 'in_review', 'approved')),
  publish_at           timestamptz not null,
  preview_token        uuid not null default gen_random_uuid(),
  approved_at          timestamptz,
  approved_by          uuid references auth.users (id),
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);
-- Added for Article 1: the heading above the concluding reflective question.
alter table public.articles add column if not exists reflective_heading text;

create index if not exists articles_live_idx on public.articles (status, publish_at desc);

alter table public.articles enable row level security;

drop policy if exists "public reads live articles" on public.articles;
create policy "public reads live articles" on public.articles
  for select to anon, authenticated
  using (status = 'approved' and publish_at <= now());

drop policy if exists "editors read all articles" on public.articles;
create policy "editors read all articles" on public.articles
  for select to authenticated using (public.current_editor_role() is not null);

drop policy if exists "editors write articles" on public.articles;
create policy "editors write articles" on public.articles
  for all to authenticated
  using (public.current_editor_role() is not null)
  with check (public.current_editor_role() is not null);

-- Publishing protocol, enforced by the database:
--   • only the 'editor' role (the Founder & Editor) can approve
--   • if a 'developer' changes the content of an approved article, it goes
--     back to 'in_review' and needs approval again
create or replace function public.articles_protocol()
returns trigger language plpgsql security definer set search_path = public as $$
declare r text := public.current_editor_role();
begin
  new.updated_at := now();

  if r = 'developer' and tg_op = 'UPDATE' and old.status = 'approved'
     and (new.title, new.subtitle, new.body_md, new.reference_list, new.related_links,
          new.reflective_question, new.reflective_heading, new.featured_image_url, new.framework_image_url,
          new.publish_at, new.slug)
         is distinct from
         (old.title, old.subtitle, old.body_md, old.reference_list, old.related_links,
          old.reflective_question, old.reflective_heading, old.featured_image_url, old.framework_image_url,
          old.publish_at, old.slug)
  then
    new.status := 'in_review';
    new.approved_at := null;
    new.approved_by := null;
  end if;

  if new.status = 'approved'
     and (tg_op = 'INSERT' or old.status is distinct from 'approved') then
    if r is distinct from 'editor' then
      raise exception 'Only the Founder & Editor can approve an article for publication.';
    end if;
    new.approved_at := now();
    new.approved_by := auth.uid();
  end if;

  return new;
end $$;

drop trigger if exists articles_protocol on public.articles;
create trigger articles_protocol before insert or update on public.articles
  for each row execute function public.articles_protocol();

-- -------------------------------------------------------------- resources ----
create table if not exists public.resources (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title       text not null,
  subtitle    text,
  description text,
  categories  text[] not null default '{}',
  file_url    text not null,            -- public URL of the PDF
  file_name   text not null,            -- name the reader's device saves it as
  article_id  uuid references public.articles (id) on delete set null,
  status      text not null default 'draft' check (status in ('draft', 'published')),
  publish_at  timestamptz not null default now(),
  created_at  timestamptz not null default now()
);
alter table public.resources enable row level security;

do $$ begin
  alter table public.articles
    add constraint articles_resource_fk foreign key (resource_id)
    references public.resources (id) on delete set null;
exception when duplicate_object then null; end $$;

drop policy if exists "public reads live resources" on public.resources;
create policy "public reads live resources" on public.resources
  for select to anon, authenticated
  using (status = 'published' and publish_at <= now());

drop policy if exists "editors manage resources" on public.resources;
create policy "editors manage resources" on public.resources
  for all to authenticated
  using (public.current_editor_role() is not null)
  with check (public.current_editor_role() is not null);

-- -------------------------------------------------------- preview function ---
-- Returns the article (any status) plus its resource, only if the secret
-- preview token matches. Used by /articles/<slug>?preview=<token>.
create or replace function public.get_article_preview(p_slug text, p_token uuid)
returns jsonb language sql stable security definer set search_path = public as $$
  select to_jsonb(a) || jsonb_build_object('resource', to_jsonb(r))
  from public.articles a
  left join public.resources r on r.id = a.resource_id
  where a.slug = p_slug and a.preview_token = p_token;
$$;
revoke all on function public.get_article_preview(text, uuid) from public;
grant execute on function public.get_article_preview(text, uuid) to anon, authenticated;

-- ---------------------------------------------------------------- storage ----
insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true), ('resources', 'resources', true)
on conflict (id) do update set public = true;

drop policy if exists "editors upload site files" on storage.objects;
create policy "editors upload site files" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('article-images', 'resources')
              and public.current_editor_role() is not null);

drop policy if exists "editors update site files" on storage.objects;
create policy "editors update site files" on storage.objects
  for update to authenticated
  using (bucket_id in ('article-images', 'resources')
         and public.current_editor_role() is not null);

drop policy if exists "editors delete site files" on storage.objects;
create policy "editors delete site files" on storage.objects
  for delete to authenticated
  using (bucket_id in ('article-images', 'resources')
         and public.current_editor_role() is not null);

-- ------------------------------------------------ 12-week editorial calendar --
-- Entered as DRAFTS: they do not appear anywhere on the public site until the
-- Editor approves the final manuscript. Publication time: 06:00 IST, Monday.
insert into public.articles (week_number, slug, title, publish_at, status)
values
  (1,  'why-one-day-teacher-training-rarely-transforms-classrooms',
       'Why One-Day Teacher Training Rarely Transforms Classrooms',            '2026-10-19 06:00+05:30', 'draft'),
  (2,  'from-school-administrator-to-instructional-leader',
       'From School Administrator to Instructional Leader',                    '2026-10-26 06:00+05:30', 'draft'),
  (3,  'classroom-observation-inspection-or-professional-growth',
       'Classroom Observation: Inspection or Professional Growth?',            '2026-11-02 06:00+05:30', 'draft'),
  (4,  'experience-does-not-automatically-become-expertise',
       'Experience Does Not Automatically Become Expertise',                   '2026-11-09 06:00+05:30', 'draft'),
  (5,  'from-completing-the-syllabus-to-building-competencies',
       'From Completing the Syllabus to Building Competencies',                '2026-11-16 06:00+05:30', 'draft'),
  (6,  'beyond-marks-what-student-assessments-should-reveal',
       'Beyond Marks: What Student Assessments Should Reveal',                 '2026-11-23 06:00+05:30', 'draft'),
  (7,  'why-teachers-need-to-learn-together',
       'Why Teachers Need to Learn Together',                                  '2026-11-30 06:00+05:30', 'draft'),
  (8,  'nep-2020-and-ncf-se-2023-closing-the-implementation-gap',
       'NEP 2020 and NCF-SE 2023: Closing the Implementation Gap',             '2026-12-07 06:00+05:30', 'draft'),
  (9,  'the-power-of-feedback-in-teacher-development',
       'The Power of Feedback in Teacher Development',                         '2026-12-14 06:00+05:30', 'draft'),
  (10, 'ai-cannot-replace-the-reflective-teacher',
       'AI Cannot Replace the Reflective Teacher',                             '2026-12-21 06:00+05:30', 'draft'),
  (11, 'what-makes-a-school-a-learning-organisation',
       'What Makes a School a Learning Organisation?',                         '2026-12-28 06:00+05:30', 'draft'),
  (12, 'twelve-lessons-in-educational-leadership-and-professional-learning',
       'Twelve Lessons in Educational Leadership and Professional Learning',  '2027-01-04 06:00+05:30', 'draft')
on conflict (slug) do nothing;

-- Article 1 metadata from the Editor's brief (the manuscript itself is pasted
-- into body_md through /admin — never typed here).
update public.articles set
  subtitle            = 'The Missing Link Between Professional Development and Meaningful Classroom Change',
  category            = 'Teacher Professional Development',
  series              = 'Research to Classroom Practice',
  featured_image_url  = '/images/articles/why-one-day-teacher-training-featured.webp',
  featured_image_alt  = 'Venugopal Bere leading a teacher professional development session',
  seo_title           = 'Why One-Day Teacher Training Rarely Transforms Classrooms | Venugopal Bere',
  seo_description     = 'Explore why one-day teacher training often fails to produce lasting classroom change and discover practical strategies for continuous professional learning.',
  seo_keywords        = 'Teacher Professional Development, Teacher Training, Instructional Leadership, Professional Learning, Classroom Observation, Teacher Reflection, School Improvement, Venugopal Bere',
  related_links       = '[
    {"kind":"publication","label":"Volume 1, Issue 1 – Teacher Professional Development: The Most Powerful Investment a School Can Make","url":"/articles/volume-1"},
    {"kind":"framework","label":"The Bere Professional Learning Framework","url":"/frameworks/professional-learning-framework"}
  ]'::jsonb
where slug = 'why-one-day-teacher-training-rarely-transforms-classrooms' and body_md = '';
