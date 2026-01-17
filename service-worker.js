const CACHE_NAME = 'elfon-os-v2-offline';
const urlsToCache = [
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/logo.jpg',
  '/logo.png',
  '/icon-192.png',
  '/icon-512.png',
  '/libs/jspdf.umd.min.js',
  '/libs/jspdf.plugin.autotable.min.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aberto - Modo Offline');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('Erro ao adicionar ao cache:', err);
      })
  );
  // Força o service worker a se tornar ativo imediatamente
  self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache first, depois rede
        if (response) {
          return response;
        }
        // Se não estiver no cache, tenta buscar da rede
        return fetch(event.request)
          .then(function(response) {
            // Verifica se é uma resposta válida
            if (!response || response.status !== 200) {
              return response;
            }
            
            // Clona a resposta
            const responseToCache = response.clone();
            
            // Adiciona ao cache
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(function() {
            // Se falhar (offline), retorna da cache se possível
            return caches.match('/index.html');
          });
      })
  );
});

self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Assume controle imediatamente
  return self.clients.claim();
});
