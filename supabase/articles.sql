-- ARTICLES
create table if not exists public.articles (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique,
  title              text not null,
  subtitle           text,
  author             text not null default 'Venugopal Bere',
  author_role        text not null default 'Founder & Editor',
  category           text,
  series             text,
  excerpt            text,
  body_md            text not null default '',
  references_list    text[] not null default '{}',
  featured_image_url text,
  featured_image_alt text,
  related            jsonb not null default '[]',
  seo_title          text,
  meta_description   text,
  keywords           text,
  week_no            int,
  publish_at         timestamptz not null,
  approved           boolean not null default false,
  preview_token      uuid not null default gen_random_uuid(),
  created_at         timestamptz not null default now()
);

alter table public.articles enable row level security;

-- The public can see an article ONLY if approved AND its time has come.
drop policy if exists "Public reads live articles" on public.articles;
create policy "Public reads live articles"
  on public.articles for select to anon, authenticated
  using (approved and publish_at <= now());

-- Preview for the editor: works only with the secret token.
create or replace function public.get_article_preview(p_slug text, p_token uuid)
returns setof public.articles
language sql security definer set search_path = public as $$
  select * from public.articles where slug = p_slug and preview_token = p_token;
$$;
revoke all on function public.get_article_preview(text, uuid) from public;
grant execute on function public.get_article_preview(text, uuid) to anon, authenticated;

-- RESOURCES
create table if not exists public.resources (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  subtitle     text,
  category     text,
  file_url     text not null,
  article_slug text,
  publish_at   timestamptz not null,
  approved     boolean not null default false,
  created_at   timestamptz not null default now()
);
alter table public.resources enable row level security;
drop policy if exists "Public reads live resources" on public.resources;
create policy "Public reads live resources"
  on public.resources for select to anon, authenticated
  using (approved and publish_at <= now());