const nextPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
})

module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: [
      'localhost',
      '2bebetter.pro',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
    ],
  },
  i18n: {
    locales: ['en', 'ru', 'uk', 'zh-CN'],
    defaultLocale: 'en',
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/system': {
      transform: '@mui/system/{{member}}',
    },
    '@mui/styles': {
      transform: '@mui/styles/{{member}}',
    },
    'date-fns': {
      transform: 'date-fns/{{member}}',
    },
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
})
