-- ═══════════════════════════════════════════════════════════════════════
--  Adds the columns newer features need, so they sync between phones.
--
--  Run once:  Dashboard → SQL Editor → New query → paste → Run
--
--  Safe to run at any time, and safe to run twice: `if not exists` means
--  re-running does nothing. No existing data is read, changed or deleted.
--
--  Until you run this the app still works — your categories and staples
--  simply stay on each phone separately instead of being shared.
--
--    categories : your editable dish categories
--    staples    : ingredients you always have, kept off the shopping list
-- ═══════════════════════════════════════════════════════════════════════

alter table kitchens add column if not exists categories jsonb;
alter table kitchens add column if not exists staples    jsonb;
