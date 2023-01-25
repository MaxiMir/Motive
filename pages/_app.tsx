import { use } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Hydrate } from 'react-query'
import NextNprogress from 'nextjs-progressbar'
import { IntlProvider } from 'react-intl'
import { Locale as FnsLocale } from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@app/providers/ThemeProvider'
import SnackbarProvider from '@app/providers/SnackbarProvider'
import SignInProvider from '@app/providers/SignInProvider'
import DeviceProvider from '@app/providers/DeviceProvider'
import CacheProvider from '@app/providers/CacheProvider'
import { Locale } from '@entities/locale'
import EventSocket from '@app/ui/EventSocket'
import { getLocaleFolder } from '@shared/lib/utils/date'
import { makeMapLoader } from '@shared/lib/helpers/iterable'

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
