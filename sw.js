const CACHE_NAME = "imajinasyonm-cache-v1";
const urlsToCache = [
  "index.html",
  "style.css",
  "script.js",
  "icon-192.png",
  "icon-512.png",
  "manifest.json"
];

// Enstale cache yo
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// Kenbe cache sou rezo
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
