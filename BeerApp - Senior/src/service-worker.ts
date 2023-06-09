/* eslint-disable no-restricted-globals */
/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkOnly } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Precache all files generated by "npm run build"
// precacheAndRoute(self.__WB_MANIFEST);

// Cache external API calls
if(process.env.REACT_APP_API) {
registerRoute(
  process.env.REACT_APP_API,
  new CacheFirst({
    cacheName: 'api-cache',
    plugins: [
      // Expire cache after 1 day
      new ExpirationPlugin({ maxAgeSeconds: 60 * 60 * 24 }),
    ],
  })
);
}

// Serve cached resources if network is unavailable or times out
registerRoute(
  ({ url }) => matchPrecache(url.toString()),
  new NetworkOnly()
);
