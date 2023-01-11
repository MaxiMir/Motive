import { use, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { AppProps } from 'next/app'
import { SessionProvider, SignInOptions } from 'next-auth/react'
import { Hydrate, MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import NextNprogress from 'nextjs-progressbar'
import { IntlProvider } from 'react-intl'
import { Locale as FnsLocale } from 'date-fns'
import { createGenerateClassName, StylesProvider } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import CssBaseline from '@mui/material/CssBaseline'
import { ModalSignInContext } from '@features/signin'
import { SnackbarContext, SnackbarState } from '@features/snackbar'
import { ThemeContext, getDesignTokens } from '@features/theme'
import { Locale } from '@features/locale'
import { DeviceContext } from '@features/device'
import { getLocaleFolder } from '@lib/date'
import { makeMapLoader } from '@helpers/iterable'
import useRemoveServerStyles from '@hooks/useRemoveServerStyles'
import EventSocket from '@components/EventSocket'

const AppSnackbar = dynamic(() => import('@ui/AppSnackbar'))
const ModalSignIn = dynamic(() => import('@features/signin'))

const generateClassName = createGenerateClassName({ productionPrefix: 'be' })
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
  const [mode, setMode] = useState<PaletteMode>('dark')
  const [state, setState] = useState<SnackbarState | null>(null)
  const [options, setOptions] = useState<SignInOptions>()
  const error = messages['common.error']
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
          },
        },
        queryCache: new QueryCache({
          onError() {
            setState({ message: error, severity: 'error' })
          },
        }),
        mutationCache: new MutationCache({
          onError() {
            setState({ message: error, severity: 'error' })
          },
        }),
      }),
  )
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  const themeCtx = useMemo(() => ({ mode, setMode }), [mode])
  const modalSignInCtx = useMemo(() => ({ options, providers, setOptions }), [options, providers])
  const snackbarCtx = useMemo(() => ({ state, setState }), [state])
  useRemoveServerStyles()

  const onCloseSignIn = () => setOptions(undefined)

  const onCloseSnackbar = () => setState(null)

  return (
    <IntlProvider locale={locale} messages={messages}>
      <SessionProvider session={session} refetchOnWindowFocus>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <DeviceContext.Provider value={device.type}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={adapterLocale}>
                <ThemeContext.Provider value={themeCtx}>
                  <StylesProvider generateClassName={generateClassName}>
                    <ThemeProvider theme={theme}>
                      <ModalSignInContext.Provider value={modalSignInCtx}>
                        <SnackbarContext.Provider value={snackbarCtx}>
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
                        </SnackbarContext.Provider>
                      </ModalSignInContext.Provider>
                      <EventSocket />
                      {state && <AppSnackbar {...state} onClose={onCloseSnackbar} />}
                      {options && <ModalSignIn options={options} onClose={onCloseSignIn} />}
                    </ThemeProvider>
                  </StylesProvider>
                </ThemeContext.Provider>
              </LocalizationProvider>
            </DeviceContext.Provider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </IntlProvider>
  )
}

export default App
