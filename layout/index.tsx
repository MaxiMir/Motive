import React, { FC } from 'react'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import { Header } from './Header'
import { Footer } from './Footer'
import AppBox from 'components/UI/AppBox'
import { theme } from 'theme'

interface LayoutProps {
  withVerticalPadding?: boolean
  withHorizontalPadding?: boolean
}

const Layout: FC<LayoutProps> = ({
  withVerticalPadding = true,
  withHorizontalPadding = true,
  children,
}) => {
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Header />
      <AppBox
        className={classes.content}
        paddingX={!withHorizontalPadding ? undefined : 2}
        paddingY={withVerticalPadding ? undefined : 3}
      >
        {children}
      </AppBox>
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
