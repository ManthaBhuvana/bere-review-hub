-- Run once in Supabase: SQL Editor > New query > paste > Run.
-- Creates the table behind the "Subscribe" forms and lets the public website
-- ADD an email, but never read, change or delete the list.

create table if not exists public.subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now(),
  constraint subscribers_email_format
    check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

alter table public.subscribers enable row level security;

drop policy if exists "Anyone can subscribe" on public.subscribers;
create policy "Anyone can subscribe"
  on public.subscribers
  for insert
  to anon, authenticated
  with check (true);

-- No select/update/delete policy on purpose: only you (in the Supabase
-- dashboard) can see the subscriber list.
