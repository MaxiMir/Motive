import { Fragment, ReactNode } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { useIsFetching } from 'react-query'
import { Stack } from '@mui/material'
import { getLocaleHrefList } from '@entities/locale'
import { useDeviceContext } from '@entities/device'
import { OGType } from '@entities/pages'
import Scrollbar from '@shared/ui/Scrollbar'

const Loader = dynamic(() => import('@widgets/loader/ui'))
const Header = dynamic(() => import('@widgets/header/ui'))
const Footer = dynamic(() => import('@widgets/footer/ui'))
const Sidebar = dynamic(() => import('@widgets/sidebar/Sidebar'))

interface LayoutProps {
  title?: string
  description?: string
  keywords?: string
  type?: OGType
  image?: string
  canonical?: string
  children?: ReactNode
}

function Layout({
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
  const device = useDeviceContext()
  const fetchingNumber = useIsFetching({ queryKey: ['page'] })
  const localeHrefList = getLocaleHrefList(asPath)
  const url = localeHrefList[locale]
  const renderLoader = fetchingNumber > 0
  const possibleDesktop = device === 'desktop'
  const renderDesktop = !device || possibleDesktop
  const renderCompact = !device || !possibleDesktop
  const MainWrap = renderDesktop ? Sidebar : Fragment
  const mainWrapProps = renderDesktop ? { breakpoints: !device } : null

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
      {renderCompact && <Header type={type} />}
      <Scrollbar>
        <MainWrap {...mainWrapProps}>
          <Stack
            component="main"
            id="main"
            flex={1}
            sx={({ palette }) => ({ background: palette.mode === 'dark' ? '#121212' : undefined })}
          >
            {renderLoader && <Loader />}
            {children}
          </Stack>
        </MainWrap>
      </Scrollbar>
      {renderCompact && <Footer />}
    </>
  )
}

export default Layout
