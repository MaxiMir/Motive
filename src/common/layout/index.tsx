import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import useClient from '@hooks/useClient'
import Header from './components/Header'
import Footer from './components/Footer'
import { getLocaleHrefList } from './helper'

interface LayoutProps {
  title?: string
  description?: string
  keywords?: string
  type?: 'website' | 'profile'
  image?: string
  canonical?: string
  children?: ReactNode
}

export default function Layout({
  title,
  description,
  keywords,
  type = 'website',
  image,
  canonical,
  children,
}: LayoutProps) {
  const { locale } = useIntl()
  const client = useClient()
  const { asPath } = useRouter()
  const localeHrefList = getLocaleHrefList(asPath)
  const url = localeHrefList[locale]
  const showNickname = type === 'profile'

  return (
    <>
      <Head>
        <title>{title || process.env.NEXT_PUBLIC_APP_NAME}</title>
        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />
          </>
        )}
        {keywords && <meta property="keywords" content={keywords} />}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={type} />
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
        <meta property="og:locale" content={locale} />
        {canonical && <link rel="canonical" href={canonical} />}
        {/* Add hreflang links */}
        <link rel="alternate" href={localeHrefList.en} hrefLang="en" />
        <link rel="alternate" href={localeHrefList.ru} hrefLang="ru" />
        <link rel="alternate" href={localeHrefList.uk} hrefLang="uk" />
        <link rel="alternate" href={localeHrefList.en} hrefLang="x-default" />
      </Head>
      <Header authenticated={!!client} nickname={showNickname} />
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
        {children}
      </Box>
      <Footer nickname={client?.nickname} />
    </>
  )
}
