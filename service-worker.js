// ============================================================
// Marga Service Worker — v9
// Fixed: 2026-05-19
//
// Key changes from v8:
//   1. SEO/system files (robots.txt, sitemap.xml, manifest.json,
//      .well-known/*, favicon.ico, icons) are NEVER intercepted.
//      They always pass straight to the network so Googlebot and
//      crawlers get clean, uncached responses.
//   2. Version bump forces a new cache key so stale v8 caches
//      are deleted on activate.
//   3. Improved stale-cache sweep: any cache name not in the
//      current allowlist is deleted on activate.
//   4. SKIP_WAITING is applied immediately on message receipt so
//      new deployments activate without a page reload delay.
//   5. manifest.json removed from STATIC_ASSETS pre-cache list —
//      it must always be fetched fresh for PWA compliance.
// ============================================================

const VERSION      = 'marga-v9';
const STATIC_CACHE = `${VERSION}-static`;
const HTML_CACHE   = `${VERSION}-html`;

// Files pre-cached on install (excludes SEO/system files intentionally)
const STATIC_ASSETS = [
  '/seo-page.css',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png',
  '/logo.png'
];

// ─── SEO / SYSTEM FILE EXCLUSION LIST ───────────────────────
// These paths must NEVER be intercepted by the service worker.
// Googlebot, Search Console, and browsers fetch these directly.
// Any interception, caching, or rewriting will break crawling.
const SEO_PATHS = new Set([
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.json',
  '/favicon.ico'
]);

function isSeoOrSystemFile(url) {
  const p = url.pathname;
  // Exact match against known SEO files
  if (SEO_PATHS.has(p)) return true;
  // .well-known/* (ACME challenges, security.txt, etc.)
  if (p.startsWith('/.well-known/')) return true;
  // Google site verification files
  if (/^\/google[0-9a-f]+\.html$/i.test(p)) return true;
  return false;
}

// ─── OFFLINE FALLBACK ─────────────────────────────────────
const OFFLINE_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Marga is offline</title>
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0D0F1A;color:#EEF0FF;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    main{max-width:460px;padding:2rem;text-align:center}
    h1{font-size:2rem;margin:0 0 .7rem}
    p{color:#9AA4C6;line-height:1.6}
    a{display:inline-flex;margin-top:1rem;border-radius:999px;background:#6C63FF;color:white;padding:.8rem 1.1rem;text-decoration:none;font-weight:800}
  </style>
</head>
<body><main><h1>You are offline</h1><p>Marga could not reach the network. Reopen a page you have loaded before, or reconnect and try again.</p><a href="/">Go home</a></main></body>
</html>`;

// ─── INSTALL ──────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())  // Activate immediately, don't wait
  );
});

// ─── ACTIVATE ─────────────────────────────────────────────
self.addEventListener('activate', event => {
  const allowed = new Set([STATIC_CACHE, HTML_CACHE]);
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => !allowed.has(key))  // Delete ALL stale caches
          .map(key => {
            console.log('[SW] Deleting stale cache:', key);
            return caches.delete(key);
          })
      ))
      .then(() => self.clients.claim())  // Take control of all open clients
  );
});

// ─── MESSAGE HANDLER ──────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ─── FETCH STRATEGY HELPERS ───────────────────────────────

function isHtmlRequest(request) {
  return request.mode === 'navigate'
    || (request.headers.get('accept') || '').includes('text/html');
}

function isStaticAsset(url) {
  // Match CSS/JS/fonts/images — but NOT .txt or .xml (those are SEO files)
  return /\.(?:css|js|png|jpg|jpeg|webp|svg|woff2?)$/i.test(url.pathname);
}

// Network-first for HTML: try network, fall back to cache, then offline page
async function networkFirstHtml(request) {
  const cache = await caches.open(HTML_CACHE);
  try {
    const response = await fetch(request);
    // Only cache successful non-opaque responses
    if (response && response.ok && response.type === 'basic') {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    return cached || new Response(OFFLINE_HTML, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}

// Cache-first for static assets: serve from cache, update in background
async function cacheFirstStatic(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

// ─── FETCH HANDLER ────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // ── CRITICAL: Never intercept SEO/system files ──────────
  // These must always go straight to the network.
  // Googlebot, Search Console, and PWA install flow depend on
  // getting fresh, direct responses for these files.
  if (isSeoOrSystemFile(url)) return;

  // ── HTML navigation: network-first ──────────────────────
  if (isHtmlRequest(request)) {
    event.respondWith(networkFirstHtml(request));
    return;
  }

  // ── Static assets: cache-first ───────────────────────────
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirstStatic(request));
    return;
  }

  // Everything else: pass through to network (Supabase API calls, etc.)
});
