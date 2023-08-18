import CssBaseline from '@mui/material/CssBaseline'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Locale as FnsLocale } from 'date-fns'
import { SessionProvider } from 'next-auth/react'
import NextNprogress from 'nextjs-progressbar'
import { use, useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { Hydrate } from 'react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Script from 'next/script'
import QueryProvider from 'app/providers/QueryProvider'
import ThemeProvider from 'app/providers/ThemeProvider'
import { Socket } from 'app/socket'
import { AppProps } from 'next/app'
import { DeviceContext } from 'entities/device'
import { Locale } from 'entities/locale'
import { useSignIn } from 'entities/viewer'
import { makeMapLoader } from 'shared/lib/helpers'
import { getLocaleFolder } from 'shared/lib/utils'
import Snackbar from 'shared/ui/snackbar'

const SignInModal = dynamic(() => import('features/viewer/sign-in'))

const messagesLoader = makeMapLoader<Record<string, string>>()
const adapterLocaleLoader = makeMapLoader<FnsLocale>()

function App({
  Component,
  pageProps: { session, dehydratedState, device, ...pageProps },
}: AppProps) {
  const { locale = Locale.En } = useRouter()
  const { options, closeSignIn } = useSignIn()
  const folder = getLocaleFolder(locale)
  const messages = use(
    messagesLoader(locale, () => import(`src/shared/config/lang/${locale}.json`)),
  )
  const adapterLocale = use(
    adapterLocaleLoader(locale, () => import(`date-fns/locale/${folder}/index.js`)),
  )
  const deviceValue = useMemo(
    () => ({ type: device?.device.type, browser: device?.client.name }),
    [device],
  )

  return (
    <IntlProvider locale={locale} messages={messages}>
      <SessionProvider session={session} refetchOnWindowFocus>
        <QueryProvider message={messages['common.error']}>
          <Hydrate state={dehydratedState}>
            <DeviceContext.Provider value={deviceValue}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={adapterLocale}>
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
                  <NextNprogress color="#7638fa" options={{ showSpinner: false }} />
                  <CssBaseline />
                  <Component {...pageProps} />
                  <Snackbar />
                  {options && <SignInModal options={options} onClose={closeSignIn} />}
                  <Socket />
                </ThemeProvider>
              </LocalizationProvider>
            </DeviceContext.Provider>
          </Hydrate>
        </QueryProvider>
      </SessionProvider>
    </IntlProvider>
  )
}

export default App
