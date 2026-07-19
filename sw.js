/* Service worker — makes the app open instantly and work with no signal.
   Strategy: serve from cache immediately, refresh the cache in the
   background. A published update therefore appears on the next launch. */

const VERSION = 'nius-v1';
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

  e.respondWith(
    caches.match(req).then(hit => {
      const fromNet = fetch(req).then(res => {
        if(res && res.status === 200 && res.type !== 'error'){
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => hit);

      return hit || fromNet;
    })
  );
});
