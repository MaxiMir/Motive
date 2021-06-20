import React, { FC } from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import { Header } from './Header'
import { Footer } from './Footer'
import { theme } from 'theme'

interface LayoutProps {
  withPadding?: boolean
}

const Layout: FC<LayoutProps> = ({ withPadding = true, children }) => {
  const classes = useStyles({ withPadding })

  return (
    <>
      <Head>
        <title>Title #Motive</title>
        <meta name="description" content="description #Motive" />
        <meta name="keywords" content="keywords #Motive" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </>
  )
}

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    padding: (props: { withPadding: boolean }) =>
      !props.withPadding ? '0' : '24px 16px 24px',
  },
})

export default Layout
