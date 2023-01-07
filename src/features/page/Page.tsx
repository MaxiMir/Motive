import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useIntl } from 'react-intl'
import { useIsFetching } from 'react-query'
import { Box } from '@mui/material'
import { getLocaleHrefList } from '@features/locale'
import { OGType } from './dto'
import Header from './components/Header'
import Footer from './components/Footer'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface PageProps {
  title?: string
  description?: string
  keywords?: string
  type?: OGType
  image?: string
  canonical?: string
  children?: ReactNode
}

function Page({
  title,
  description,
  keywords,
  type = OGType.Website,
  image,
  canonical,
  children,
}: PageProps) {
  const { locale } = useIntl()
  const { asPath } = useRouter()
  const fetchingNumber = useIsFetching({ queryKey: ['page'] })
  const localeHrefList = getLocaleHrefList(asPath)
  const url = localeHrefList[locale]
  const renderLoader = fetchingNumber > 0

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
        <link rel="alternate" href={localeHrefList.en} hrefLang="en" />
        <link rel="alternate" href={localeHrefList.ru} hrefLang="ru" />
        <link rel="alternate" href={localeHrefList.uk} hrefLang="uk" />
        <link rel="alternate" href={localeHrefList.en} hrefLang="x-default" />
      </Head>
      <Header type={type} />
      <Box
        component="main"
        id="main"
        display="flex"
        flexDirection="column"
        sx={({ palette }) => ({
          flex: 1,
          background: palette.mode === 'dark' ? '#121212' : undefined,
        })}
      >
        {renderLoader && (
          <Box display="flex" mt={3} justifyContent="center">
            <CircularProgress size={14.5} sx={{ color: '#7638fa' }} />
          </Box>
        )}
        {children}
      </Box>
      <Footer />
    </>
  )
}

export default Page
