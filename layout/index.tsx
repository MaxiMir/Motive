import { ReactNode } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import useClient from 'hooks/useClient'
import { RU, UK } from 'hooks/useLocale'
import Header from './components/Header'
import Footer from './components/Footer'
import { getLocaleHref } from './helper'

const Error = dynamic(() => import('pages/_error'))
const Box = dynamic(() => import('@mui/material/Box'))

interface LayoutProps {
  title?: string
  description?: string
  url?: string
  type?: string
  image?: string
  statusCode?: number
  children?: ReactNode
}

export default function Layout({ title, description, url, type, image, statusCode = 200, children }: LayoutProps) {
  const client = useClient()
  const enLocaleHref = getLocaleHref()
  const ruLocaleHref = getLocaleHref(RU)
  const ukLocaleHref = getLocaleHref(UK)

  return (
    <>
      <Head>
        <title>{title || process.env.NEXT_PUBLIC_APP_NAME}</title>
        {description && <meta name="description" content={description} />}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        {url && <meta property="og:url" content={url} />}
        {image && <meta property="og:image" content={image} />}
        {type && <meta property="og:type" content={type} />}
        <link rel="canonical" href={url} />
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-180.png" />
        <meta name="theme-color" content="#19191A" />
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        {/* Add hreflang links */}
        <link rel="alternate" href={enLocaleHref} hrefLang="x-default" />
        <link rel="alternate" href={enLocaleHref} hrefLang="en" />
        <link rel="alternate" href={ruLocaleHref} hrefLang="ru" />
        <link rel="alternate" href={ukLocaleHref} hrefLang="uk" />
      </Head>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
      <Header authenticated={!!client} />
      <Box
        component="main"
        id="main"
        display="flex"
        flexDirection="column"
        sx={{
          flex: 1,
          background: (theme) => (theme.palette.mode === 'dark' ? '#19191A' : undefined),
          '@supports not (-moz-appearance:none)': {
            background: (theme) =>
              theme.palette.mode === 'dark' ? 'linear-gradient(#19191A, #0A0A0A 60%)' : undefined,
          },
        }}
      >
        {statusCode !== 200 ? <Error statusCode={statusCode} /> : children}
      </Box>
      <Footer nickname={client?.nickname} />
    </>
  )
}

// TODO https://shivamethical.medium.com/creating-web-page-preview-while-sharing-url-via-social-applications-like-whats-app-fb-cd2e19b11bf2
// TODO https://developer.mozilla.org/ru/docs/Web/Progressive_web_apps/Installable_PWAs
