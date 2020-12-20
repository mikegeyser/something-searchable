import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

self.skipWaiting();

const manifest = self.__WB_MANIFEST;

precacheAndRoute(manifest);

const five_minute_cache = new ExpirationPlugin({
  maxAgeSeconds: 5 * 60,
  purgeOnQuotaError: true,
});
const cacheAllResponses = new CacheableResponsePlugin({
  statuses: [0, 200],
});

// User images
registerRoute(
  /.*githubusercontent.com\/u\/.*/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [five_minute_cache, cacheAllResponses],
  })
);

// User data
registerRoute(
  /.*api.github.com\/users\/.*/,
  new CacheFirst({ cacheName: 'users', plugins: [five_minute_cache] })
);

// Search results
registerRoute(
  /.*api.github.com\/search\/users.*/,
  new CacheFirst({ cacheName: 'search', plugins: [five_minute_cache] })
);
