import { Stack } from '@mui/material'
import { ReactNode } from 'react'
import { useIntl } from 'react-intl'
import { useIsFetching } from 'react-query'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDetectOnline } from 'features/page/offline'
import { useDeviceContext } from 'entities/device'
import { getLocaleHrefList } from 'entities/locale'
import { OGType } from 'shared/api'

const HeaderMobile = dynamic(() => import('widgets/headerMobile'))
const FooterMobile = dynamic(() => import('widgets/footerMobile'))
const Sidebar = dynamic(() => import('widgets/sidebar'))
const Footer = dynamic(() => import('widgets/footer'))
const Offline = dynamic(() => import('features/page/offline'))
const Updating = dynamic(() => import('./updating'))

interface LayoutProps {
  title?: string
  description?: string
  keywords?: string
  type?: OGType
  image?: string
  canonical?: string
  children?: ReactNode
}

export function Layout({
  title,
  description,
  keywords,
  type = OGType.Website,
  image,
  canonical,
  children,
}: LayoutProps) {
  const { locale } = useIntl()
  const { asPath } = useRouter()
  const online = useDetectOnline()
  const device = useDeviceContext()
  const localeHrefList = getLocaleHrefList(asPath)
  const fetchingNumber = useIsFetching({ queryKey: ['page'] })
  const renderUpdating = fetchingNumber > 0
  const url = localeHrefList[locale]
  const possibleDesktop = device === 'desktop'
  const renderDesktop = !device || possibleDesktop
  const renderMobile = !device || !possibleDesktop
  const fullTitle = `${title} - ${process.env.NEXT_PUBLIC_APP_NAME}`

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
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
      {renderMobile && <HeaderMobile type={type} />}
      {renderDesktop && <Sidebar breakpoints={!device} />}
      <Stack
        component="main"
        id="main"
        flex={1}
        sx={(theme) => ({ background: theme.palette.mode === 'dark' ? '#121212' : undefined })}
      >
        {renderUpdating && <Updating />}
        {online ? children : <Offline />}
      </Stack>
      {renderMobile && <FooterMobile />}
      {renderDesktop && <Footer breakpoints={!device} />}
    </>
  )
}