import { use } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Hydrate, QueryClientProvider } from 'react-query'
import NextNprogress from 'nextjs-progressbar'
import { IntlProvider } from 'react-intl'
import { Locale as FnsLocale } from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import CssBaseline from '@mui/material/CssBaseline'
import SnackbarProvider from '@features/snackbar'
import SignInProvider from '@features/signin'
import ThemeProvider from '@features/theme'
import { Locale } from '@features/locale'
import { DeviceContext } from '@features/device'
import { getLocaleFolder } from '@lib/date'
import { makeMapLoader } from '@helpers/iterable'
import EventSocket from '@components/EventSocket'
import { useQueryClient } from '@hooks/useQueryClient'

const messagesLoader = makeMapLoader<Record<string, string>>()
const adapterLocaleLoader = makeMapLoader<FnsLocale>()

function App({
  Component,
  pageProps: { session, dehydratedState, providers, device, ...pageProps },
}: AppProps) {
  const { locale = Locale.En } = useRouter()
  const folder = getLocaleFolder(locale)
  const messages = use(messagesLoader(locale, () => import(`src/shared/lang/${locale}.json`)))
  const adapterLocale = use(
    adapterLocaleLoader(locale, () => import(`date-fns/locale/${folder}/index.js`)),
  )
  const queryClient = useQueryClient(messages['common.error'])

  return (
    <IntlProvider locale={locale} messages={messages}>
      <SessionProvider session={session} refetchOnWindowFocus>
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={dehydratedState}>
              <DeviceContext.Provider value={device?.type}>
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
              </DeviceContext.Provider>
            </Hydrate>
          </QueryClientProvider>
        </SnackbarProvider>
      </SessionProvider>
    </IntlProvider>
  )
}

export default App
