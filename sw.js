const cacheName = 'cache-v1';
const resourcesToPrecache = [
  '/',
  'index.html',
  'AAAAHHHH.css',
  'game.js',
  'input.js',
  'snake.js',
  'mathymath.js',
  'water.js',
  'icons/down-arrow.webp',
  'icons/left-arrow.webp',
  'icons/right-arrow.webp',
  'icons/up-arrow.webp',
  'icons/play.svg',
  'icons/pause.svg',
];
// var btnAdd = document.getElementById('install');


self.addEventListener('install', event => {
  console.log('install event');
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      return cache.addAll (resourcesToPrecache);
    })
  )
});
self.addEventListener('activate', event => {
  console.log('Activate event');
});
self.addEventListener('fetch', event => {
  console.log('fetch interceptedf for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((resourcesToPrecache) => {
      if (resourcesToPrecache) {
        return resourcesToPrecache;
      }
      return fetch(event.request);
    }),
  );
});
// window.addEventListener('beforeinstallprompt', (e) =>{
//   e.preventDefault();
//   deferredPrompt = e;
//   btnAdd.style.display = 'block';
// });
// btnAdd.addEventListener('click', (e) => {
//   deferredPrompt.prompt();
//   deferredPrompt.userChoice.then((choiceResult) => {
//     if (choiceResult.outcome === 'accepted') {
//       console.log('User accepted a2hs prompt');
//     }
//     deferredPrompt = null;
//   });
// });
