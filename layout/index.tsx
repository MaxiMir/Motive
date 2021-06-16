import React, { FC } from 'react'
import Head from 'next/head'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { theme } from 'theme'
import { makeStyles } from '@material-ui/core/styles'

interface LayoutProps {
  withPadding?: boolean
}

export const Layout: FC<LayoutProps> = ({ withPadding = true, children }) => {
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
    padding: (props: { withPadding: boolean }) =>
      !props.withPadding ? '0' : '24px 16px 24px',
  },
})
