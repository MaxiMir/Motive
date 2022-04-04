/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = withPWA({
  swcMinify: true, // minification using SWC as part of the Next.js Compiler
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching,
  },
  images: {
    domains: ['localhost', '2bebetter.pro', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  experimental: {
    outputStandalone: true,
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
  },
})
