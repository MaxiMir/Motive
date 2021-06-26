import React, { FC } from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import { Header } from './Header'
import { Footer } from './Footer'
import AppBox from 'components/UI/AppBox'
import { theme } from 'theme'

interface LayoutProps {
  withVerticalPadding?: boolean
}

const Layout: FC<LayoutProps> = ({ withVerticalPadding = true, children }) => {
  const classes = useStyles()

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
        <meta property="og:title" content="{{title}}" />
        <meta property="og:description" content="{{description}}" />
        <meta property="og:url" content="{{url}}" />
        <meta property="og:image" content="{{image}}" />
        <meta property="og:type" content="website" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Header />
      <main>
        <AppBox
          className={classes.content}
          paddingY={!withVerticalPadding ? undefined : 3}
        >
          {children}
        </AppBox>
      </main>
      <Footer />
    </>
  )
}

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    'min-height': 'calc(100vh - 170px)',
  },
})

export default Layout
