var myCaches = [
    {
        name: 'newCache-v1', 
        urls: [
            '/image.jpg',
            '/index.js'
        ]
    },
    {
        name: 'newCache-v2', 
        urls: [
            '/index.html'
        ]
    }
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        Promise.all(
            myCaches.map(function(myCache) {
                return caches.open(myCache.name)
                    .then(function(cache) {
                        return cache.addAll(myCache.urls)
                    })
            })
        )
    )
});


self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['newCache-v1', 'newCache-v2'];

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
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    )
});