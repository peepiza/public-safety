const CACHE_NAME = 'safepath-v1';

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/woof/map.html',
    '/woof/humburger.html',
    '/woof/settings.html',
    '/woof/account.html',
    '/woof/register.html',
    '/woof/openAc.html',
    '/woof/agreement.html',
    '/meow/account.js',
    '/meow/calculate.js',
    '/meow/login.js',
    '/meow/settings.js',
    '/meow/validation.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

