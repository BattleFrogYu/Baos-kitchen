# Niu's Kitchen

A little menu app — pick tonight's dishes, get a combined shopping list, send it over.

Single self-contained page. No build step, no dependencies, no server.

## Running it

Open `index.html` in a browser, or serve the folder over HTTP.

## Where the data lives

Everything is stored **on the device, in the browser** — there is no account and no server.

| What | Where |
|---|---|
| Recipes, order, check-offs | `localStorage` |
| Dish photos | IndexedDB (localStorage's ~5 MB cap is too small for images) |

This means:

- Data does **not** sync between phones. Each device has its own menu.
- Use **Back up menu** (bottom of the Menu screen) to save a `.json` file with everything
  including photos. **Restore** loads it back — that's how you move a menu to another device.
- Add the app to the iOS Home Screen. Safari clears ordinary website storage after ~7 days
  of not visiting; installed Home Screen web apps are exempt.

## Files

- `index.html` — the whole app
- `manifest.webmanifest` — makes it installable as a Home Screen app
- `icon-*.png`, `apple-touch-icon.png` — app icons
