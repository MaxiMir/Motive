import CssBaseline from '@mui/material/CssBaseline'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Locale as FnsLocale } from 'date-fns'
import { SessionProvider } from 'next-auth/react'
import NextNprogress from 'nextjs-progressbar'
import { use } from 'react'
import { IntlProvider } from 'react-intl'
import { Hydrate } from 'react-query'
import { useRouter } from 'next/router'
import Script from 'next/script'
import CacheProvider from '@app/providers/CacheProvider'
import DeviceProvider from '@app/providers/DeviceProvider'
import SignInProvider from '@app/providers/SignInProvider'
import SnackbarProvider from '@app/providers/SnackbarProvider'
import ThemeProvider from '@app/providers/ThemeProvider'
import { EventSocket } from '@app/ui'
import { AppProps } from 'next/app'
import { Locale } from '@entities/locale'
import { makeMapLoader } from '@shared/lib/helpers'
import { getLocaleFolder } from '@shared/lib/utils'

const messagesLoader = makeMapLoader<Record<string, string>>()
const adapterLocaleLoader = makeMapLoader<FnsLocale>()

function App({
  Component,
  pageProps: { session, dehydratedState, providers, device, ...pageProps },
}: AppProps) {
  const { locale = Locale.En } = useRouter()
  const folder = getLocaleFolder(locale)
  const messages = use(
    messagesLoader(locale, () => import(`src/shared/config/lang/${locale}.json`)),
  )
  const adapterLocale = use(
    adapterLocaleLoader(locale, () => import(`date-fns/locale/${folder}/index.js`)),
  )

  return (
    <IntlProvider locale={locale} messages={messages}>
      <SessionProvider session={session} refetchOnWindowFocus>
        <SnackbarProvider>
          <CacheProvider message={messages['common.error']}>
            <Hydrate state={dehydratedState}>
              <DeviceProvider value={device?.type}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={adapterLocale}>
                  <ThemeProvider>
                    <SignInProvider providers={providers}>
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
                    </SignInProvider>
                    <EventSocket />
                  </ThemeProvider>
                </LocalizationProvider>
              </DeviceProvider>
            </Hydrate>
          </CacheProvider>
        </SnackbarProvider>
      </SessionProvider>
    </IntlProvider>
  )
}

export default App
