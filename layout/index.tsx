import { FC, useEffect } from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import { UserBaseDto } from 'dto'
import useSnackbar from 'hooks/useSnackbar'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  title?: string
  description?: string
  url?: string
  type?: string
  image?: string
  error?: boolean
  client?: UserBaseDto
  withVerticalPadding?: boolean
}

const Layout: FC<LayoutProps> = ({
  title,
  description,
  url,
  type,
  image,
  withVerticalPadding = true,
  error,
  client,
  children,
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles({ withVerticalPadding })

  useEffect(() => {
    error && enqueueSnackbar({ message: 'Something went wrong...', severity: 'error' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

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
        <link rel="canonical" href="https://www.instagram.com/astrogks/" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        {/* PWA primary color */}
        <meta name="theme-color" content="#4DA0EC" />
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Header isAuthenticated={!!client?.id} />
      {!error && <main className={classes.main}>{children}</main>}
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
