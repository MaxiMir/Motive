/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = withPWA({
  trailingSlash: true,
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching,
  },
  images: {
    domains: ['localhost'], // TODO REPLACE
  },
})
