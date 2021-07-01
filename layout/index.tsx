import React, { FC } from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import theme from 'theme'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  title: string
  description: string
  keywords: string
  url: string
  type: string
  withVerticalPadding?: boolean
}

const Layout: FC<LayoutProps> = ({ title, description, keywords, url, type, withVerticalPadding = true, children }) => {
  const classes = useStyles({ withVerticalPadding })

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
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta charSet="UTF-8" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </>
  )
}

// TODO https://shivamethical.medium.com/creating-web-page-preview-while-sharing-url-via-social-applications-like-whats-app-fb-cd2e19b11bf2

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 170px)',
    padding: (props: { withVerticalPadding: boolean }) => (!props.withVerticalPadding ? 0 : '24px 0'),
  },
})

export default Layout
