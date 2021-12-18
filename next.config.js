const withPWA = require('next-pwa') // eslint-disable-line @typescript-eslint/no-var-requires
const runtimeCaching = require('next-pwa/cache') // eslint-disable-line @typescript-eslint/no-var-requires

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
