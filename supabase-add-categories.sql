-- ═══════════════════════════════════════════════════════════════════════
--  Adds the categories column, so your category list syncs between phones.
--
--  Run once:  Dashboard → SQL Editor → New query → paste → Run
--
--  Safe to run: it only ADDS a column, and `if not exists` means running it
--  twice does nothing. No existing data is read, changed or deleted.
--
--  Until you run this the app still works — your categories simply stay on
--  each phone separately instead of being shared.
-- ═══════════════════════════════════════════════════════════════════════

alter table kitchens add column if not exists categories jsonb;
