const CACHE_NAME = "wapromo-pwa-v2";
const urlsToCache = [
  "/manifest.webmanifest",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
];

// Check if we're in development mode
const isDevelopment =
  self.location.hostname === "localhost" ||
  self.location.hostname === "127.0.0.1" ||
  self.location.port !== "";

self.addEventListener("install", (event) => {
  self.skipWaiting();
  // Only cache static assets in production
  if (!isDevelopment) {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
  }
});

self.addEventListener("fetch", (event) => {
  // Skip caching in development to avoid stale chunks
  if (isDevelopment) {
    return;
  }

  // Only handle GET requests
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  // Never put third-party responses into our origin's offline cache
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  // Never cache HTML document navigations, RSC payloads, Next.js chunks, or API routes.
  const acceptHeader = event.request.headers.get("accept") || "";
  if (
    event.request.mode === "navigate" ||
    event.request.destination === "document" ||
    acceptHeader.includes("text/html") ||
    event.request.headers.get("rsc") === "1" ||
    requestUrl.searchParams.has("_rsc") ||
    requestUrl.pathname === "/" ||
    requestUrl.pathname.startsWith("/_next/") ||
    requestUrl.pathname.startsWith("/api/") ||
    requestUrl.pathname.includes("/sw.js")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
            return false;
          })
        )
      )
      .then(() => self.clients.claim())
  );
});
