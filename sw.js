const CACHE_NAME = 'service-nsw-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.png',
  './apple-touch-icon.png',
  './about-ic1.png',
  './about-ic2.png',
  './about-ic3.png',
  './about-ic4.png',
  './about-ic5.png',
  './about-ic6.png',
  './about-ic7.png',
  './prov-card.png',
  './prov-card-wallet.png',
  './svc-all-services.jpg',
  './svc-bushfire.jpg',
  './svc-cost-of-living.jpg',
  './svc-discover-apps.jpg',
  './svc-health-care.jpg',
  './svc-register-aed.jpg',
  './svc-storm-flood.jpg',
  './badge-flower.png',
  './feat-col.png',
  './feat-discover.png',
  './feat-dkt.png',
  './feat-fuel.png',
  './feat-organ.png',
  './feat-toll.png',
  './login-logos.png',
  './qr5.png',
  './badge-flower.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
