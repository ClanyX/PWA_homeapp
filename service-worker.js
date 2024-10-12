//Registration of serivice worker
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('Service Worker registration with scope:', registration.scope);
        }, err => {
            console.log('Service Worker not registrate:', err);
        });
    });
}

//Instalation of service worker
self.addEventListener('install', event => {
    console.log('Service Worker is instalating...');
    event.waitUntil(
        caches.open('my-cache').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/index_style.css',
                '/app.js'
            ]);
        })
    );
});

//Aktivation of Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker was aktivated');
});

//Capturing requirements
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});