# Bao's Kitchen

A little menu app — pick tonight's dishes, get a combined shopping list, send it over.

Single self-contained page. No build step, no dependencies, no server.

## Running it

Open `index.html` in a browser, or serve the folder over HTTP.

## Where the data lives

The app is **local-first**: every change is written to this device and shown
immediately, so it works with no signal. If cloud sync is switched on, changes
are pushed in the background and catch up when the connection returns.

| What | Where |
|---|---|
| Recipes, order, check-offs | `localStorage`, mirrored to Supabase if configured |
| Dish photos | IndexedDB, mirrored to a `photos` table if configured |

### On-device only (default)

Out of the box `config.js` is blank and nothing leaves the phone. Each device
has its own separate menu. Use **Back up menu** at the bottom of the Menu
screen to save a `.json` of everything including photos; **Restore** loads it
back. That's how you move a menu between devices without the cloud.

### Sharing between two phones

1. Create a free Supabase project.
2. Run `supabase-setup.sql` in the SQL Editor.
3. Put the Project URL and the **anon** key into `config.js` and push.
4. On the first phone, Menu → **Pair a phone** → copy the link.
5. Open that link on the second phone. Both now share one live menu — an order
   added on one appears on the other within a second.

The link contains a random household ID. **Anyone with it can read and change
your menu** — the anon key is public by design and the setup SQL allows open
access. That is the deliberate trade for having no login. Don't post the link,
and keep taking backups.

### iOS

Add to the Home Screen from Safari. Beyond the app icon and full-screen launch,
this matters for storage: Safari clears ordinary website storage after ~7 days
of not visiting, and installed Home Screen web apps are exempt.

## Files

- `index.html` — the whole app
- `config.js` — cloud credentials; blank means on-device only
- `sw.js` — service worker; makes the app open instantly and work offline
- `supabase-setup.sql` — run once to create the tables
- `manifest.webmanifest` — makes it installable as a Home Screen app
- `icon-*.png`, `apple-touch-icon.png` — app icons
