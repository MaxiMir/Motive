import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import useClient from 'hooks/useClient'
import useLocale, { LOCALE_MAP } from 'hooks/useLocale'
import Header from './components/Header'
import Footer from './components/Footer'
import { getLocaleHrefList } from './helper'

const Error = dynamic(() => import('pages/_error'))
const Box = dynamic(() => import('@mui/material/Box'))

interface LayoutProps {
  title?: string
  description?: string
  type?: string
  image?: string
  canonical?: string
  statusCode?: number
  children?: ReactNode
}

export default function Layout({
  title,
  description,
  type = 'website',
  image,
  statusCode = 200,
  canonical,
  children,
}: LayoutProps) {
  const client = useClient()
  const { locale } = useLocale()
  const { asPath } = useRouter()
  const localeHrefList = getLocaleHrefList(asPath)
  const localeName = LOCALE_MAP[locale]
  const url = localeHrefList[locale]

  return (
    <>
      <Head>
        <title>{title || process.env.NEXT_PUBLIC_APP_NAME}</title>
        {description && <meta name="description" content={description} />}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={type} />
        {description && (
          <>
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />
          </>
        )}
        <meta property="og:url" content={url} />
        <meta name="twitter:url" content={url} />
        {image && (
          <>
            <meta property="og:image" content={image} />
            <meta name="twitter:image" content={image} />
          </>
        )}
        <meta property="og:type" content={type} />
        <meta name="twitter:site" content={process.env.NEXT_PUBLIC_APP_NAME} />
        <meta name="twitter:card" content={type} />
        <meta property="og:locale" content={localeName} />
        {canonical && <link rel="canonical" href={canonical} />}
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        {/* Add hreflang links */}
        <link rel="alternate" href={localeHrefList.en} hrefLang="en" />
        <link rel="alternate" href={localeHrefList.ru} hrefLang="ru" />
        <link rel="alternate" href={localeHrefList.uk} hrefLang="uk" />
        <link rel="alternate" href={localeHrefList.en} hrefLang="x-default" />
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
