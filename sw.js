/* Service worker — makes the app open instantly and work with no signal.

   The page itself is network-first: online you always get the current
   version, offline you get the cached copy. Everything else is cache-first
   with a background refresh.

   Bump VERSION whenever the shell changes. It names the cache, so changing
   it discards the old one on activate — without that, a stale copy can be
   served indefinitely. */

const VERSION = 'nius-v3';
const SHELL = [
  './',
  './index.html',
  './config.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      // Individual misses must not fail the whole install.
      .then(c => Promise.allSettled(SHELL.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never cache the database or its realtime socket — always go to network,
  // and let the app's own offline handling deal with failure.
  if(url.hostname.endsWith('supabase.co') || url.protocol === 'ws:' || url.protocol === 'wss:') return;

  const save = res => {
    if(res && res.status === 200 && res.type !== 'error'){
      const copy = res.clone();
      caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
    }
    return res;
  };

  // The page: network first, so a deploy shows up on the next launch rather
  // than the one after. Falls back to cache when there's no signal.
  if(req.mode === 'navigate' || req.destination === 'document'){
    e.respondWith(
      fetch(req).then(save).catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  // Everything else: cache first, refreshed in the background.
  e.respondWith(
    caches.match(req).then(hit => {
      const fromNet = fetch(req).then(save).catch(() => hit);
      return hit || fromNet;
    })
  );
});
