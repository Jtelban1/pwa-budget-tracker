if("serviceWorker" in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('webworkers.js').then(function(reg){
            console.log('service worker registered');

        })
    })
}

const cacheFiles = [
    '/',
    'db.js',
    'index.js',
    'webworkers.js',
    'styles.css',
    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
    "icons/icon-192x192.png",
    "https://cdn.jsdelivr.net/npm/chart.js@2.8.0",
    "manifest.webmanifest"
];

// service worker

self.addEventListener('install', function(ev){
    ev.waitUntil(
        caches.open("budgetTracker").then(function(cache){
            return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('fetch', function(ev){
    ev.respondWith(
        caches.match(ev.request).then(function(response){
            if(!response || response.status !== 200 || response.type !== 'basic'){
                return response;
            }
            let localAnswer = response.clone();
            caches.open('budgetTracker').then(function(cache){
                cache.put(ev.request, localAnswer);
            });

            return response;

        })

    )
});
