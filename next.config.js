/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = withPWA({
  swcMinify: true, // minification using SWC as part of the Next.js Compiler
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching,
  },
  images: {
    domains: ['localhost', '127.0.0.1', '2bebetter.pro', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  experimental: {
    outputStandalone: true,
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
})
