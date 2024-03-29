import CssBaseline from '@mui/material/CssBaseline'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Locale as FnsLocale } from 'date-fns'
import { Details, parse } from 'express-useragent'
import { Session } from 'next-auth'
import { getSession, SessionProvider } from 'next-auth/react'
import NextProgress from 'nextjs-progressbar'
import { use, useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { Hydrate } from 'react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Script from 'next/script'
import QueryProvider from 'app/providers/query-provider'
import ThemeProvider from 'app/providers/theme-provider'
import { Socket } from 'app/socket'
import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import { DeviceContext, toDevice } from 'entities/device'
import { Locale } from 'entities/locale'
import { useSignIn } from 'entities/viewer'
import { makeMapLoader } from 'shared/lib/helpers'
import Snackbar from 'shared/ui/snackbar'

const SignInModal = dynamic(() => import('features/viewer/sign-in'))

const messagesLoader = makeMapLoader<Record<string, string>>()
const adapterLocaleLoader = makeMapLoader<FnsLocale>()

interface AppOwnProps {
  session: Session | null
  userDevice: Details
}

function MyApp({
  Component,
  pageProps: { session, dehydratedState, userDevice, ...pageProps },
}: AppProps) {
  const router = useRouter()
  const locale = router.locale === 'default' ? Locale.En : router.locale || Locale.En
  const { options, closeSignIn } = useSignIn()
  const folder = locale === 'en' ? 'en-US' : locale
  const messages = use(
    messagesLoader(locale, () => import(`src/shared/config/lang/${locale}.json`)),
  )
  const adapterLocale = use(
    adapterLocaleLoader(locale, () => import(`date-fns/locale/${folder}/index.js`)),
  )
  const deviceValue = useMemo(() => toDevice(userDevice), [])

  return (
    <IntlProvider locale={locale} messages={messages}>
      <SessionProvider session={session} refetchOnWindowFocus>
        <QueryProvider message={messages['common.error']}>
          <Hydrate state={dehydratedState}>
            <DeviceContext.Provider value={deviceValue}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={adapterLocale}
                localeText={{
                  datePickerDefaultToolbarTitle: messages['common.date-selection'],
                  okButtonLabel: messages['common.save'],
                  cancelButtonLabel: messages['common.cancel'],
                }}
              >
                <ThemeProvider>
                  <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    strategy="afterInteractive"
                  />
                  <Script id="google-analytics" strategy="afterInteractive">
                    {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){window.dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                    `}
                  </Script>
                  <NextProgress color="#7638fa" options={{ showSpinner: false }} />
                  <CssBaseline />
                  <Component {...pageProps} />
                  <Snackbar />
                  <Socket />
                  {options && <SignInModal options={options} onClose={closeSignIn} />}
                </ThemeProvider>
              </LocalizationProvider>
            </DeviceContext.Provider>
          </Hydrate>
        </QueryProvider>
      </SessionProvider>
    </IntlProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps<AppOwnProps>> => {
  const appProps = await App.getInitialProps(appContext)
  const session = await getSession(appContext.ctx)
  const userDevice = parse(appContext.ctx.req?.headers['user-agent'] || '')

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      session,
      userDevice,
    },
  }
}

export default MyApp
