// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
const { Router } = require('@layer0/core/router')
const { nextRoutes } = require('@layer0/next')
import { CustomCacheKey } from '@layer0/core/router'

module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js')
  })
  .use(nextRoutes) // automatically adds routes for all files under /pages

router.get('/pokemonList/1-20', ({ cache }) => {
  cache({
    browser: {
      // Sets the cache-control: maxage=n header sent to the browser.  To prevent the browser from caching this route
      // set maxAgeSeconds: 0
      maxAgeSeconds: 0,

      // Sends a non-standard header `x-sw-cache-control: n` that you can use to control caching your service worker.
      // Note that service workers do not understand this header by default, so you would need to add code to your service
      // worker to support it
      serviceWorkerSeconds: 60 * 60,
    },
    edge: {
      // Sets the TTL for a response in Layer0's edge cache
      maxAgeSeconds: 60 * 60 * 24,

      // Sets the amount of time a stale response will be served from the cache.  When a stale response is sent, Layer0
      // will simultaneously fetch a new response to serve subsequent requests.
      // Using stale-while-revalidate helps raise your effective cache hit rate to near 100%.
      staleWhileRevalidateSeconds: 60 * 60, // serve stale responses for up to 1 hour while fetching a new response

      // And many other options
    },
    // Optionally customizes the cache key for both edge and browser
    key: new CustomCacheKey()
      .addBrowser() // Split cache by browser type
      .addCookie('some-cookie'), // Split cache by some-cookie cookie
  })
})