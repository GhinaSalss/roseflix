const CACHE_NAME = "roseflix-v1"
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/detail.html",
  "/wishlist.html",
  "/history.html",
  "/settings.html",
  "/manifest.json",
  "/js/api.js",
  "/js/storage.js",
  "/js/movies.js",
  "/js/detail.js",
  "/components/navbar.js",
  "/components/modal.js",
  "/components/toast.js",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "https://cdn.tailwindcss.com",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
  "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap",
]

// Install Event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE)
    }),
  )
})

// Activate Event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      )
    }),
  )
})

// Fetch Event
self.addEventListener("fetch", (event) => {
  // skip external API calls or handle them differently
  if (event.request.url.includes("api.themoviedb.org")) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request)
    }),
  )
})
