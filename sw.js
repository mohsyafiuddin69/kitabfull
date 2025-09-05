// Nama cache unik untuk versi aplikasi Anda
const CACHE_NAME = 'kitab-wirid-cache-v1';

// Daftar file yang perlu di-cache untuk mode offline
const urlsToCache = [
  './', // Ini merujuk ke file HTML utama
  './KITAB OK BARU.html', // Nama file HTML Anda
  './manifest.json',
  './logo-192.png',
  './logo-512.png',
  'https://cdn.jsdelivr.net/gh/mohsyafiuddin69/kitab/KITAB_FULL.pdf',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];

// Event 'install': menyimpan file-file di atas ke cache browser
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event 'fetch': menyajikan file dari cache jika tersedia (mode offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ada di cache, kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak, ambil dari jaringan
        return fetch(event.request);
      }
    )
  );
});
