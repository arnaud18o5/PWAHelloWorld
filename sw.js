var cacheName = 'hello-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  './images/hello-icon-128.png',
  './images/hello-icon-144.png',
  './images/hello-icon-152.png',
  './images/hello-icon-192.png',
  './images/hello-icon-256.png',
  './images/hello-icon-512.png',
  './images/pwa.png',
  './fonts/roboto-black-webfont.woff2'
  //add other files
];


/* Start the service worker and cache all of the app's content */
self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
          try {
            const cache = await cacheName.open('v1');
            return cache.addAll(filesToCache);
          } catch (e) {
            console.log(e.message);
          }
      })());
  });
  

/* Serve cached content when offline */
self.addEventListener('fetch', (event) => {
    console.log('ServiceWorker Fetch', event.request.url);
    event.respondWith((async () => {
          try {
              const response = await caches.match(event.request);
              return response || fetch(event.request);
          } catch (e) {
              console.log(e.message);
          }
      })());
  });
  