// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
const { Router } = require('@layer0/core/router')
const { nextRoutes } = require('@layer0/next')
import { CustomCacheKey } from '@layer0/core/router'
const {
  NEWS,
  SERVICE_WORKER,
  STATIC_ASSETS,
  THIRD_PARTY_SCRIPTS,
  cacheResponse,
} = require('./cache');

module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js')
  })

  .match('/pokemonList/:id', ({ cache }) => {
    cache({
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: 60 * 60 * 24,
      },
      edge: {
        maxAgeSeconds: 60 * 60 * 24,
        staleWhileRevalidateSeconds: 60 * 60,
      },
    })
  })

  // .match('/pokemonList/:id', cacheResponse(NEWS)) 

  .use(nextRoutes) // automatically adds routes for all files under /pages
