const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  trailingSlash: true,
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
})
