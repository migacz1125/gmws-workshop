(function(){
    const myCashName= 'workshop-cache';
    const cacheSourceUrl = [
        'index.js',
        'index.html',
        'contact.html',
        'styles.css',
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        'image4.jpg'
    ];

    /**
     * Open cache and set source to store when sw install
     */
    self.addEventListener('install', (event) => {
        event.waitUntil(
            event.currentTarget.caches.open(myCashName).then((opendCache) => {
                return opendCache.addAll(cacheSourceUrl);
            }).catch((error) => {
                console.error(error);
            })
        );
    });

    /**
     * Remove no needed caches when sw activate
     */
    self.addEventListener('activate', (event) => {
        const cacheWhiteList = [myCashName];

        event.waitUntil(
            event.currentTarget.caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheWhiteList.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
        );
    })

    /**
     * Reaturn source from cache when are stored
     */
    self.addEventListener('fetch', (event) => {
        event.respondWith(
            event.currentTarget.caches.match(event.request)
                .then((response) => {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                })
        )
    });
})();