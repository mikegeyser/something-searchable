import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { Queue } from 'workbox-background-sync';

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

/* 
    Aaaaand here I ran out of time

    I was trying to implement an exponential backoff for the api, so if
    it does get rate limited it would try and store the requests for retrying.
    The idea was that if the user stays on the page, the retry would fire and 
    then postMessage back to the window with updated date. Changing page would
    clear out the queue (so we don't make unnecessary requests).
*/

/*
const queue = new Queue('retry-queue', { onSync: async () => {} });
let delay;
const retry = {
  fetchDidFail: async ({ request }) => {
    console.log('Queueing request.');
    await queue.pushRequest(request);

    if (!delay) {
      delay = setTimeout(async () => {
        let entry;
        while ((entry = await queue.shiftRequest())) {
          try {
            console.log('Trying to replay request.');
            await fetch(entry.request);
            self.postMessage('Retry successful');
          } catch (error) {
            console.log(`Still can't replay request, aborting attempt`);
            await queue.unshiftRequest(entry);
            break;
          }
        }

        delay = null;
      }, 30 * 1000);
    }
  },
};
*/

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
