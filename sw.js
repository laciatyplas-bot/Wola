const CACHE = 'wola-v3.2';
const urlsToCache = [
  '/', '/index.html', '/style.css', '/app.js', '/bookEditor.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});