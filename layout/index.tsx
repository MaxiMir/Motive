import { FC } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import useClient from 'hooks/useClient'
import Header from './Header'
import Footer from './Footer'

const Error = dynamic(() => import('pages/_error'))

interface LayoutProps {
  title?: string
  description?: string
  url?: string
  type?: string
  image?: string
  statusCode?: number
  withVerticalPadding?: boolean
}

const Layout: FC<LayoutProps> = ({
  title,
  description,
  url,
  type,
  image,
  withVerticalPadding = true,
  statusCode = 200,
  children,
}) => {
  const classes = useStyles({ withVerticalPadding })
  const client = useClient()

  return (
    <>
      <Head>
        <title>{title || process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta
          name="description"
          content={description || `${process.env.NEXT_PUBLIC_APP_NAME} • your assistant to achieve your goals`}
        />
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
        <meta name="theme-color" content="#4DA0EC" />
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Header authenticated={!!client} />
      {statusCode !== 200 ? (
        <Error statusCode={statusCode} />
      ) : (
        <main id="main" className={classes.main}>
          {children}
        </main>
      )}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <Footer nickname={client?.nickname} />
    </>
  )
}

// TODO https://shivamethical.medium.com/creating-web-page-preview-while-sharing-url-via-social-applications-like-whats-app-fb-cd2e19b11bf2
// TODO https://developer.mozilla.org/ru/docs/Web/Progressive_web_apps/Installable_PWAs

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 65px)',
    padding: (props: { withVerticalPadding: boolean }) => (!props.withVerticalPadding ? '60px 0 0' : '84px 0 112px'),
  },
})

export default Layout
