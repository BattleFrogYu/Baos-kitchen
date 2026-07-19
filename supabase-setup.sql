-- ═══════════════════════════════════════════════════════════════════════
--  Niu's Kitchen — database setup
--
--  Run this ONCE in your Supabase project:
--      Dashboard → SQL Editor → New query → paste → Run
-- ═══════════════════════════════════════════════════════════════════════

-- One row per household. Fields are updated independently, so one person
-- editing the menu does not overwrite the other checking off the shopping list.
create table if not exists kitchens (
  id         text primary key,
  recipes    jsonb,
  cart       jsonb,
  checked    jsonb,
  updated_at timestamptz default now()
);

-- Photos live in their own table so syncing the menu doesn't re-download
-- every image. The app fetches only the ones this device doesn't have.
create table if not exists photos (
  household  text not null,
  slot       text not null,
  data       text,
  updated_at timestamptz default now(),
  primary key (household, slot)
);

alter table kitchens enable row level security;
alter table photos   enable row level security;

-- ⚠ READ THIS.
--
-- These policies let anyone holding the anon key read and write ANY
-- household. That key ships in your public GitHub repo, so the only thing
-- keeping your data private is that your household ID is long and random
-- and you never post it publicly.
--
-- This is the "unlisted, no login" trade-off: zero sign-in friction, but
-- not real security. Keep using Back up menu so a wipe is recoverable.
-- To lock it down properly, switch to Supabase Auth and replace `true`
-- below with a check against auth.uid().
drop policy if exists "open access" on kitchens;
drop policy if exists "open access" on photos;

create policy "open access" on kitchens for all to anon using (true) with check (true);
create policy "open access" on photos   for all to anon using (true) with check (true);

-- Live updates: changes appear on the other phone without a refresh.
alter publication supabase_realtime add table kitchens;
alter publication supabase_realtime add table photos;
