import React, { FC, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import { Client } from 'dto'
import { useSnackbar } from 'hooks/useSnackbar'
import Header from './Header'
import Footer from './Footer'

const AppHistory = dynamic(() => import('components/UI/AppHistory'))

interface LayoutProps {
  title: string
  description: string
  keywords: string
  url: string
  type: string
  error: boolean
  withVerticalPadding?: boolean
  withHistory?: boolean
  client: Client
}

const Layout: FC<LayoutProps> = ({
  title,
  description,
  keywords,
  url,
  type,
  withHistory = true,
  withVerticalPadding = true,
  error,
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
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="/images/app.png" />
        <meta property="og:type" content={type} />
        {/* PWA primary color */}
        <meta name="theme-color" content="#4DA0EC" />
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <Header />
      <main className={classes.main}>
        {withHistory && <AppHistory />}
        {!error && <>{children}</>}
      </main>
      <Footer />
    </>
  )
}

// TODO https://shivamethical.medium.com/creating-web-page-preview-while-sharing-url-via-social-applications-like-whats-app-fb-cd2e19b11bf2

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 80px)',
    padding: (props: { withVerticalPadding: boolean }) => (!props.withVerticalPadding ? '0 0 112px' : '24px 0 112px'),
  },
})

export default Layout
