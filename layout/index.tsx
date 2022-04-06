import { FC } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import useClient from 'hooks/useClient'
import Header from './Header'
import Footer from './Footer'

const Error = dynamic(() => import('pages/_error'))
const AppBox = dynamic(() => import('components/UI/AppBox'))

interface LayoutProps {
  title?: string
  description?: string
  url?: string
  type?: string
  image?: string
  statusCode?: number
  mainPage?: boolean
}

const Layout: FC<LayoutProps> = ({
  title,
  description,
  url,
  type,
  image,
  mainPage = false,
  statusCode = 200,
  children,
}) => {
  const client = useClient()
  const padding = mainPage ? undefined : '24px 0'

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
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        {/* PWA primary color */}
        <meta name="theme-color" content="#121212" />
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Header authenticated={!!client} />
      {statusCode !== 200 ? (
        <Error statusCode={statusCode} />
      ) : (
        <AppBox
          component="main"
          id="main"
          flexDirection="column"
          sx={{ height: 'calc(100vh - 125px)', overflow: 'scroll', padding }}
        >
          {children}
        </AppBox>
      )}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <Footer nickname={client?.nickname} />
    </>
  )
}

// TODO https://shivamethical.medium.com/creating-web-page-preview-while-sharing-url-via-social-applications-like-whats-app-fb-cd2e19b11bf2
// TODO https://developer.mozilla.org/ru/docs/Web/Progressive_web_apps/Installable_PWAs

export default Layout
